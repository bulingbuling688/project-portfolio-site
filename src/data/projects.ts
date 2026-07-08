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

const publishedProjects: Project[] = [
  {
    slug: "teanary-service",
    title: "Teanary",
    description: "面向中国茶品展示与演示管理的多语言茶文化电商站。",
    category: "跨境电商",
    status: "published",
    coverImage: "/covers/teanary-service-cover.png",
    projectUrl: "https://teanary-service.chatapi.fun/zh_CN",
    githubUrl: "https://github.com/TeanaryService/teanary_service",
    features: [
      "中国茶品首页展示与产品浏览",
      "中文茶文化文章与详情阅读页",
      "演示用户与管理员自动登录",
      "前台与管理后台双向跳转",
      "多语言与多币种切换",
    ],
    techStack: ["Laravel", "Livewire", "Tailwind CSS", "SQLite", "Docker Compose", "Nginx"],
  },
];

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
  ...publishedProjects,
  ...Array.from({ length: 9 }, (_, index) =>
    createPlaceholderProject(index + 1, "跨境电商"),
  ),
  ...Array.from({ length: 9 }, (_, index) =>
    createPlaceholderProject(index + 10, "中转站"),
  ),
];
