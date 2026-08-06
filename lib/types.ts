export type ProjectStatus = "RIP" | "Acquired" | "Archived";

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  founded_year: number;
  closed_year: number;
  status: ProjectStatus;
  category: string;
  logo_url: string;
  stats: {
    peak_users: string;
    peak_rank: string;
  };
  short_summary: string;
  death_cause_tags: string[];
  founders: string;
  has_full_article: boolean;
}

export interface Article {
  slug: string;
  project_id: string;
  title: string;
  content: string;
  cover_image?: string;
  published_at: string;
}
