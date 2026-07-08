export const projectCategories = ["跨境电商", "中转站"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const categories = ["全部", ...projectCategories] as const;

export type CategoryFilter = (typeof categories)[number];

export type ProjectStatus = "draft" | "published";

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  coverImage?: string;
  projectUrl?: string;
  githubUrl?: string;
  features: string[];
  techStack: string[];
};

export const SHOW_DRAFT_PROJECTS = true;

function formatProjectNumber(value: number): string {
  return value.toString().padStart(2, "0");
}

function createPlaceholderProject(index: number, category: ProjectCategory): Project {
  const projectNumber = formatProjectNumber(index);

  return {
    slug: `project-${projectNumber}`,
    title: `项目 ${projectNumber}`,
    description: "简介待补充",
    category,
    status: "draft",
    features: ["功能待补充"],
    techStack: ["占位技术栈"],
  };
}

export const projects: Project[] = [
  ...Array.from({ length: 9 }, (_, index) =>
    createPlaceholderProject(index + 1, "跨境电商"),
  ),
  ...Array.from({ length: 9 }, (_, index) =>
    createPlaceholderProject(index + 10, "中转站"),
  ),
];
