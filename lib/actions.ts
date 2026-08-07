"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getProjects, saveProjects, getArticles, saveArticles, getSubmissions, saveSubmissions, getMessages, saveMessages } from "./data";
import { createSessionToken, getSession, SESSION_COOKIE } from "./session";
import { slugify } from "./utils";
import type { Project, Article, Submission, ContactMessage } from "./types";

// ---------------------------------------------------------------------------
// AUTH
// ---------------------------------------------------------------------------

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass || username !== validUser || password !== validPass) {
    redirect("/admin/login?error=1");
  }

  const token = createSessionToken(username);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 kun
  });

  redirect("/admin");
}

export async function logoutAction() {
  cookies().delete(SESSION_COOKIE);
  redirect("/admin/login");
}

function requireAuth() {
  if (!getSession()) {
    redirect("/admin/login");
  }
}

// ---------------------------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------------------------

export async function createProjectAction(formData: FormData) {
  requireAuth();

  const projects = await getProjects();
  const name = String(formData.get("name") || "").trim();
  const rawSlug = String(formData.get("slug") || name).trim();
  const slug = `${slugify(rawSlug)}-tarixi`;
  const id = slugify(name);

  const newProject: Project = {
    id,
    slug,
    name,
    tagline: String(formData.get("tagline") || ""),
    founded_year: Number(formData.get("founded_year") || 0),
    closed_year: Number(formData.get("closed_year") || 0),
    status: String(formData.get("status") || "RIP") as Project["status"],
    category: String(formData.get("category") || ""),
    logo_url: String(formData.get("logo_url") || "/logos/default.png"),
    stats: {
      peak_users: String(formData.get("peak_users") || ""),
      peak_rank: String(formData.get("peak_rank") || ""),
    },
    short_summary: String(formData.get("short_summary") || ""),
    death_cause_tags: String(formData.get("death_cause_tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    founders: String(formData.get("founders") || ""),
    has_full_article: false,
  };

  projects.push(newProject);
  await saveProjects(projects);

  revalidatePath("/muzey");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProjectAction(id: string, formData: FormData) {
  requireAuth();

  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) redirect("/admin/projects");

  const existing = projects[idx];
  projects[idx] = {
    ...existing,
    name: String(formData.get("name") || existing.name),
    tagline: String(formData.get("tagline") || existing.tagline),
    founded_year: Number(formData.get("founded_year") || existing.founded_year),
    closed_year: Number(formData.get("closed_year") || existing.closed_year),
    status: String(formData.get("status") || existing.status) as Project["status"],
    category: String(formData.get("category") || existing.category),
    logo_url: String(formData.get("logo_url") || existing.logo_url),
    stats: {
      peak_users: String(formData.get("peak_users") || existing.stats.peak_users),
      peak_rank: String(formData.get("peak_rank") || existing.stats.peak_rank),
    },
    short_summary: String(formData.get("short_summary") || existing.short_summary),
    death_cause_tags: String(
      formData.get("death_cause_tags") || existing.death_cause_tags.join(", ")
    )
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    founders: String(formData.get("founders") || existing.founders),
  };

  await saveProjects(projects);
  revalidatePath("/muzey");
  revalidatePath("/");
  revalidatePath(`/maqolalar/${projects[idx].slug}`);
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  requireAuth();

  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  await saveProjects(filtered);

  revalidatePath("/muzey");
  revalidatePath("/");
  redirect("/admin/projects");
}

// ---------------------------------------------------------------------------
// ARTICLES
// ---------------------------------------------------------------------------

export async function createArticleAction(formData: FormData) {
  requireAuth();

  const projectId = String(formData.get("project_id") || "");
  const projects = await getProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) redirect("/admin/articles/new?error=project");

  const articles = await getArticles();

  const newArticle: Article = {
    slug: project.slug,
    project_id: project.id,
    title: String(formData.get("title") || project.name),
    content: String(formData.get("content") || ""),
    cover_image: String(formData.get("cover_image") || ""),
    published_at: new Date().toISOString(),
  };

  const existingIdx = articles.findIndex((a) => a.slug === newArticle.slug);
  if (existingIdx !== -1) {
    articles[existingIdx] = newArticle;
  } else {
    articles.push(newArticle);
  }
  await saveArticles(articles);

  const pIdx = projects.findIndex((p) => p.id === projectId);
  if (pIdx !== -1) {
    projects[pIdx].has_full_article = true;
    await saveProjects(projects);
  }

  revalidatePath("/muzey");
  revalidatePath("/");
  revalidatePath(`/maqolalar/${newArticle.slug}`);
  redirect("/admin/articles");
}

export async function updateArticleAction(slug: string, formData: FormData) {
  requireAuth();

  const articles = await getArticles();
  const idx = articles.findIndex((a) => a.slug === slug);
  if (idx === -1) redirect("/admin/articles");

  articles[idx] = {
    ...articles[idx],
    title: String(formData.get("title") || articles[idx].title),
    content: String(formData.get("content") || articles[idx].content),
    cover_image: String(formData.get("cover_image") || articles[idx].cover_image || ""),
  };

  await saveArticles(articles);
  revalidatePath(`/maqolalar/${slug}`);
  redirect("/admin/articles");
}

export async function deleteArticleAction(slug: string) {
  requireAuth();

  const articles = await getArticles();
  const article = articles.find((a) => a.slug === slug);
  const filtered = articles.filter((a) => a.slug !== slug);
  await saveArticles(filtered);

  if (article) {
    const projects = await getProjects();
    const pIdx = projects.findIndex((p) => p.id === article.project_id);
    if (pIdx !== -1) {
      projects[pIdx].has_full_article = false;
      await saveProjects(projects);
    }
  }

  revalidatePath("/muzey");
  revalidatePath("/");
  revalidatePath(`/maqolalar/${slug}`);
  redirect("/admin/articles");
}

// ---------------------------------------------------------------------------
// PUBLIC SUBMISSIONS ("O'zingiz nomzod qo'shing")
// ---------------------------------------------------------------------------

export async function submitProjectNominationAction(formData: FormData) {
  const submissions = await getSubmissions();

  const newSubmission: Submission = {
    id: `sub-${Date.now()}`,
    name: String(formData.get("name") || "").trim(),
    tagline: String(formData.get("tagline") || "").trim(),
    founded_year: Number(formData.get("founded_year") || 0),
    closed_year: Number(formData.get("closed_year") || 0),
    category: String(formData.get("category") || "").trim(),
    short_summary: String(formData.get("short_summary") || "").trim(),
    founders: String(formData.get("founders") || "").trim(),
    death_cause_tags: String(formData.get("death_cause_tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    submitter_name: String(formData.get("submitter_name") || "").trim(),
    submitter_contact: String(formData.get("submitter_contact") || "").trim(),
    status: "pending",
    submitted_at: new Date().toISOString(),
  };

  submissions.push(newSubmission);
  await saveSubmissions(submissions);

  redirect("/taklif-qilish?success=1");
}

export async function approveSubmissionAction(id: string) {
  requireAuth();

  const submissions = await getSubmissions();
  const submission = submissions.find((s) => s.id === id);
  if (!submission) redirect("/admin/submissions");

  const projects = await getProjects();
  const projectId = slugify(submission.name);
  const projectSlug = `${slugify(submission.name)}-tarixi`;

  const newProject: Project = {
    id: projectId,
    slug: projectSlug,
    name: submission.name,
    tagline: submission.tagline,
    founded_year: submission.founded_year,
    closed_year: submission.closed_year,
    status: "RIP",
    category: submission.category,
    logo_url: "/logos/default.png",
    stats: { peak_users: "Noma'lum", peak_rank: "Noma'lum" },
    short_summary: submission.short_summary,
    death_cause_tags: submission.death_cause_tags,
    founders: submission.founders,
    has_full_article: false,
  };

  projects.push(newProject);
  await saveProjects(projects);

  const idx = submissions.findIndex((s) => s.id === id);
  submissions[idx].status = "approved";
  await saveSubmissions(submissions);

  revalidatePath("/muzey");
  revalidatePath("/");
  redirect("/admin/submissions");
}

export async function rejectSubmissionAction(id: string) {
  requireAuth();

  const submissions = await getSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);
  await saveSubmissions(filtered);

  redirect("/admin/submissions");
}

// ---------------------------------------------------------------------------
// CONTACT FORM
// ---------------------------------------------------------------------------

export async function submitContactMessageAction(formData: FormData) {
  const messages = await getMessages();

  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    subject: String(formData.get("subject") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    submitted_at: new Date().toISOString(),
  };

  messages.push(newMessage);
  await saveMessages(messages);

  redirect("/contact?success=1");
}

export async function deleteMessageAction(id: string) {
  requireAuth();
  const messages = await getMessages();
  const filtered = messages.filter((m) => m.id !== id);
  await saveMessages(filtered);
  redirect("/admin/messages");
}
