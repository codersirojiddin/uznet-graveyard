import fs from "fs/promises";
import path from "path";
import type { Project, Article } from "./types";

const projectsPath = path.join(process.cwd(), "data", "projects.json");
const articlesPath = path.join(process.cwd(), "data", "articles.json");

export async function getProjects(): Promise<Project[]> {
  const raw = await fs.readFile(projectsPath, "utf-8");
  return JSON.parse(raw) as Project[];
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2), "utf-8");
}

export async function getArticles(): Promise<Article[]> {
  try {
    const raw = await fs.readFile(articlesPath, "utf-8");
    return JSON.parse(raw) as Article[];
  } catch {
    return [];
  }
}

export async function saveArticles(articles: Article[]): Promise<void> {
  await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2), "utf-8");
}
