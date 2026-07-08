import { describe, expect, it } from "vitest";
import {
  PAGE_SIZE,
  buildPageLabels,
  filterProjects,
  getDisplayProjects,
  getTotalPages,
  getVisibleProjects,
  normalizePageAfterFilterChange,
} from "./projectLogic";
import { projects, type Project } from "./projects";

const baseProject: Project = {
  slug: "fixture-project",
  title: "Fixture Project",
  description: "Fixture description",
  category: "跨境电商",
  status: "draft",
  features: ["Fixture feature"],
  techStack: ["Fixture stack"],
};

describe("portfolio project browsing", () => {
  it("filters by title, placeholder description, category, and tech stack", () => {
    expect(filterProjects(projects, "项目 01", "全部").map((project) => project.slug)).toEqual([
      "project-01",
    ]);

    expect(filterProjects(projects, "待补充", "全部")).toHaveLength(
      projects.filter((project) => project.status === "draft").length,
    );

    expect(filterProjects(projects, "占位技术", "全部").every((project) => {
      return [
        project.title,
        project.description,
        project.category,
        ...project.techStack,
      ].join(" ").includes("占位技术");
    })).toBe(true);
  });

  it("filters projects by category before pagination", () => {
    const crossBorderProjects = filterProjects(projects, "", "跨境电商");

    expect(crossBorderProjects).toHaveLength(10);
    expect(crossBorderProjects.every((project) => project.category === "跨境电商")).toBe(true);
  });

  it("includes the published Teanary project with its live links and cover", () => {
    expect(projects).toContainEqual(
      expect.objectContaining({
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
        techStack: [
          "前端展示层：Livewire、Blade、Tailwind CSS、Alpine.js，完成 SSR 友好的交互页面、响应式布局和品牌独立站视觉呈现",
          "后端业务层：Laravel、PHP、MVC 架构、Service 层、RESTful 路由、中间件，承载商品、内容、用户和运营相关业务逻辑",
          "数据持久层：SQLite、Eloquent ORM、Migration、Seeder、模型关联与查询封装，管理独立站商品、文章、用户和配置数据",
          "后台管理层：Filament Admin、Resource、Form、Table、Action、权限控制，提供商品维护、内容发布、用户管理和运营配置能力",
          "国际化与本地化：多语言路由、语言包、多币种展示、区域化内容适配，满足品牌面向海外市场的访问体验",
          "独立站业务能力：商品展示、分类浏览、详情页、内容营销、用户体系、后台运营、演示登录，覆盖从获客到转化承接的主要链路",
          "部署与基础设施：Docker Compose、Nginx、HTTPS、VPS 私有化部署、反向代理、静态资源服务、域名访问，形成完整线上交付链路",
          "工程化与运维：GitHub 版本管理、环境变量隔离、依赖管理、生产构建、日志排查、部署文档、服务器维护，支撑项目长期迭代",
        ],
      }),
    );
  });

  it("includes the published ChatAPI NewAPI project with its live links and cover", () => {
    expect(projects).toContainEqual(
      expect.objectContaining({
        slug: "newapi-cpa-proxy-deploy",
        title: "New API 中转站运营平台",
        description:
          "New API 中转站运营平台已跑通 AI API 服务从资源接入、用户增长、额度售卖、调用计费到持续复购的完整商业闭环，累计盈利 3w+，服务用户 30+，日 Token 调用量 50 亿+，具备真实商业收入、真实用户使用和高频调用验证，是一个可运营、可复制、可持续交付的多模型 API 中转平台。",
        category: "中转站",
        status: "published",
        coverImage: "/covers/newapi-cpa-dashboard.png?v=20260708-restore",
        projectUrl: "https://api.chatapi.fun/",
        githubUrl: "https://github.com/bulingbuling688/newapi-cpa-proxy-deploy",
        features: [
          "跑通 AI API 中转站从模型接入、用户注册、令牌发放、额度充值、调用计费到持续复购的完整商业闭环，累计盈利 3w+",
          "搭建统一的 OpenAI-compatible API 网关，让客户端、自动化工具和业务系统可以用统一协议接入多模型服务",
          "通过 New API 运营后台管理用户、令牌、模型渠道、倍率、额度、分组和调用权限，支撑真实用户规模化使用",
          "接入 CPA/CLIProxyAPI 账号池，将 Codex、ChatGPT OAuth 等账号资源纳入统一调度，提升资源利用率和服务稳定性",
          "支持 GPT 系列、Grok 等多上游模型路由，根据模型能力、渠道可用性、调用成本和业务场景进行灵活分发",
          "建设用量采集、额度统计、调用记录和成本追踪能力，方便分析用户消耗、控制渠道成本并优化利润空间",
          "完成 Docker Compose 私有化部署、Nginx 反向代理、Cloudflare 域名接入和 HTTPS 公网交付，具备生产环境上线与运维能力",
          "沉淀可复用的中转站部署模板，覆盖环境隔离、服务迁移、配置管理、故障排查和持续维护，支持后续快速复制新站点",
        ],
        techStack: [
          "API 网关与协议层：New API、OpenAI-compatible API、模型转发、统一鉴权、令牌管理、额度校验",
          "账号池与资源调度：CPA、CLIProxyAPI、ChatGPT OAuth、Codex 账号接入、多账号轮询、渠道可用性管理",
          "模型渠道与路由层：GPT 系列、Grok、多上游渠道配置、模型映射、倍率配置、失败切换、成本优先路由",
          "后端服务与数据层：Go、PostgreSQL、Redis、用户体系、额度系统、调用记录、用量统计、任务队列",
          "运营后台与商业化：用户管理、分组管理、令牌发放、充值额度、倍率计费、调用明细、成本追踪、利润分析",
          "部署与基础设施：Docker Compose、Nginx、Cloudflare、HTTPS、VPS 私有化部署、反向代理、域名网关",
          "监控与运维能力：服务健康检查、日志排查、渠道状态监控、账号池状态维护、故障定位、生产环境迁移",
          "工程化与安全：GitHub 版本管理、环境变量隔离、配置脱敏、部署模板沉淀、访问控制、公开仓库脱敏发布",
        ],
      }),
    );
  });

  it("keeps draft projects visible in test mode", () => {
    const fixtureProjects: Project[] = [
      { ...baseProject, slug: "draft-project", status: "draft" },
      { ...baseProject, slug: "published-project", status: "published" },
    ];

    expect(getDisplayProjects(fixtureProjects, true).map((project) => project.slug)).toEqual([
      "draft-project",
      "published-project",
    ]);
  });

  it("hides draft projects in published mode", () => {
    const fixtureProjects: Project[] = [
      { ...baseProject, slug: "draft-project", status: "draft" },
      { ...baseProject, slug: "published-project", status: "published" },
    ];

    expect(getDisplayProjects(fixtureProjects, false).map((project) => project.slug)).toEqual([
      "published-project",
    ]);
  });

  it("keeps each page to nine projects", () => {
    expect(PAGE_SIZE).toBe(9);
    expect(getVisibleProjects(projects, 1)).toHaveLength(9);
    expect(getVisibleProjects(projects, 2)).toHaveLength(9);
    expect(getTotalPages(projects)).toBe(3);
  });

  it("builds Chinese pagination labels from the data-driven page count", () => {
    expect(buildPageLabels(3)).toEqual(["第一页", "第二页", "第三页"]);
  });

  it("resets to the first page when search or category changes", () => {
    expect(normalizePageAfterFilterChange(2, "跨境电商", "中转站")).toBe(1);
    expect(normalizePageAfterFilterChange(2, "全部", "全部")).toBe(2);
  });
});
