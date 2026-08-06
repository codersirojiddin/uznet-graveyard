"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getProjects, saveProjects, getArticles, saveArticles } from "./data";
import { createSessionToken, getSession, SESSION_COOKIE } from "./session";
import { slugify } from "./utils";
import type { Project, Article } from "./types";

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

  revalidatePath("/graveyard");
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
  revalidatePath("/graveyard");
  revalidatePath(`/maqolalar/${projects[idx].slug}`);
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  requireAuth();

  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  await saveProjects(filtered);

  revalidatePath("/graveyard");
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

  revalidatePath("/graveyard");
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

  revalidatePath("/graveyard");
  revalidatePath(`/maqolalar/${slug}`);
  redirect("/admin/articles");
}
