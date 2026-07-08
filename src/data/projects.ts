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
    title: "Teanary(自建独立站)",
    description:
      "Teanary 是一个面向跨境品牌增长打造的高完成度电商独立站，围绕海外流量承接、品牌信任建立、内容种草转化、用户路径优化和后台运营管理构建完整业务体系，突出独立站在品牌资产沉淀、转化链路掌控和私域运营中的核心价值，基本上已经完成了独立站需要的全部功能。",
    category: "跨境电商",
    status: "published",
    coverImage: "/covers/teanary-service-cover.png",
    projectUrl: "https://teanary-service.chatapi.fun/zh_CN",
    githubUrl: "https://github.com/TeanaryService/teanary_service",
    features: [
      "构建独立域名流量承接入口，帮助品牌摆脱平台依赖并沉淀自有用户资产",
      "设计商品展示、分类浏览和详情页链路，覆盖海外用户从了解产品到产生购买兴趣的核心路径",
      "集成内容营销能力，通过品牌内容和产品种草提升用户信任与转化效率",
      "支持多语言与多币种切换，降低跨区域访问门槛，增强海外市场适配能力",
      "打通前台展示与后台运营管理，支持商品、内容、用户体验和站点信息的统一维护",
      "内置演示用户与管理员登录流程，便于招聘方或业务方快速验证完整业务闭环",
      "基于 Docker Compose 完成私有化部署，体现独立站在数据掌控、环境隔离和长期运维上的优势",
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
