import fs from "fs/promises";
import path from "path";
import type { Project, Article, Submission, ContactMessage } from "./types";

const projectsPath = path.join(process.cwd(), "data", "projects.json");
const articlesPath = path.join(process.cwd(), "data", "articles.json");
const submissionsPath = path.join(process.cwd(), "data", "submissions.json");
const messagesPath = path.join(process.cwd(), "data", "messages.json");

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ---- Projects ----
export async function getProjects(): Promise<Project[]> {
  return readJson<Project[]>(projectsPath, []);
}
export async function saveProjects(projects: Project[]): Promise<void> {
  await writeJson(projectsPath, projects);
}

// ---- Articles ----
export async function getArticles(): Promise<Article[]> {
  return readJson<Article[]>(articlesPath, []);
}
export async function saveArticles(articles: Article[]): Promise<void> {
  await writeJson(articlesPath, articles);
}

// ---- Submissions (foydalanuvchi taklif qilgan loyihalar) ----
export async function getSubmissions(): Promise<Submission[]> {
  return readJson<Submission[]>(submissionsPath, []);
}
export async function saveSubmissions(submissions: Submission[]): Promise<void> {
  await writeJson(submissionsPath, submissions);
}

// ---- Contact messages ----
export async function getMessages(): Promise<ContactMessage[]> {
  return readJson<ContactMessage[]>(messagesPath, []);
}
export async function saveMessages(messages: ContactMessage[]): Promise<void> {
  await writeJson(messagesPath, messages);
}
