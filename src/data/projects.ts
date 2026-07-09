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
  },
  {
    slug: "opentalking",
    title: "AI 数字人口播生产台",
    description:
      "AI 数字人口播生产台已成功应用于抖音、TikTok 等短视频内容生产场景，累计生产 100+ 条数字人口播短视频，播放量超 100w+，是一个围绕数字人形象资产、声音配置、口播内容生成、AI 模型接入、视频驱动和私有化部署打造的数字人内容生产系统，支持从角色配置、脚本生成、语音合成到数字人口播视频生成的完整链路。",
    category: "跨境电商",
    status: "published",
    coverImage: "/covers/opentalking-cover.png",
    projectUrl: "https://opentalking.chatapi.fun",
    githubUrl: "https://github.com/bulingbuling688/opentalking",
    features: [
      "构建数字人口播内容生产工作台，支持从角色选择、声音配置、口播脚本到视频生成的完整生产流程",
      "支持数字人形象资产管理，可浏览、选择和维护多种人物形象，为抖音、TikTok 等账号矩阵提供可复用素材基础",
      "接入 TTS 语音合成能力，可根据口播脚本生成自然语音，为数字人口播视频提供声音驱动",
      "保留 FlashTalk、MuseTalk、Wav2Lip、QuickTalk 等多种数字人驱动模型接入位，支持按不同质量、速度和成本场景切换",
      "集成 LLM 与知识库能力，支持基于主题、产品卖点和角色设定生成或扩展口播内容，提高短视频脚本生产效率",
      "提供 WebRTC、WebSocket、SSE 等实时交互基础，支撑数字人预览、生成状态同步和前后端实时反馈",
      "通过 Docker Compose 完成 Web、API、Worker、Redis 的私有化部署，支持数字人内容生产系统独立上线和持续运维",
      "已应用于抖音、TikTok 等短视频内容生产场景，累计生产 100+ 条数字人口播短视频，播放量超 100w+",
    ],
    techStack: [
      "前端生产台：React 18、Vite 5、TypeScript、Tailwind CSS、PostCSS、响应式工作台布局、数字人资产选择、脚本与生成面板",
      "后端接口层：Python 3.11、FastAPI、Uvicorn、Pydantic、Pydantic Settings、REST API、事件流接口、服务配置管理",
      "AI 文案与模型接入：OpenAI SDK、OpenAI-compatible API、DashScope、LightRAG、mem0、Hugging Face Hub，支持脚本生成、知识增强和可插拔模型配置",
      "语音与口播生成：edge-tts、TTS 配置、声音选择、语音合成、口播音频生成，为数字人视频驱动提供音频输入",
      "数字人视频驱动：FlashTalk、MuseTalk、Wav2Lip、QuickTalk、FFmpeg、OpenCV、MediaPipe、Kornia、InsightFace、Transformers、rembg、Pillow、AV",
      "实时通信与任务状态：WebRTC、aiortc、WebSockets、SSE、Redis、Worker 服务、任务队列式处理、健康检查",
      "部署与基础设施：Docker Compose、Nginx 反向代理、HTTPS、Cloudflare 域名、VPS 私有化部署，实现公网访问和生产环境交付",
      "工程化与运维：GitHub、pyproject.toml、Dockerfile、环境变量隔离、容器日志、生产构建、健康检查、部署文档和故障排查",
    ],
  },
  {
    slug: "newapi-cpa-proxy-deploy",
    title: "New API 中转站运营平台",
    description:
      "New API 中转站运营平台已跑通 AI API 服务从资源接入、用户增长、额度售卖、调用计费到持续复购的完整商业闭环。",
    category: "中转站",
    status: "published",
    coverImage: "/covers/newapi-cpa-dashboard.png",
    projectUrl: "https://api.chatapi.fun/",
    githubUrl: "https://github.com/bulingbuling688/newapi-cpa-proxy-deploy",
    features: [
      "搭建统一的 OpenAI-compatible API 网关，支持客户端和自动化工具通过标准协议接入多模型服务",
      "通过 New API 管理用户、令牌、模型渠道、倍率、额度、分组和调用权限",
      "接入 CPA/CLIProxyAPI 账号池，将 Codex、ChatGPT OAuth 账号纳入统一调度",
      "支持 GPT、Grok、Claude、Gemini 等多上游渠道和模型映射",
      "建设用量采集、额度统计、调用记录和成本追踪能力",
      "完成 Docker Compose 私有化部署、Nginx 反向代理、Cloudflare 域名和 HTTPS 公网交付",
      "沉淀服务迁移、配置脱敏、故障排查和持续维护流程",
    ],
    techStack: [
      "API 网关与协议层：New API、OpenAI-compatible API、模型转发、统一鉴权、令牌管理、额度校验",
      "账号池与资源调度：CPA、CLIProxyAPI、ChatGPT OAuth、Codex 账号接入、多账号轮询、渠道可用性管理",
      "模型渠道与路由层：GPT 系列、Grok、Claude、Gemini、多上游渠道配置、模型映射、倍率配置、失败切换",
      "后端服务与数据层：Go、PostgreSQL、Redis、用户体系、额度系统、调用记录、用量统计",
      "部署与基础设施：Docker Compose、Nginx、Cloudflare、HTTPS、VPS 私有化部署、反向代理、域名网关",
      "监控与运维能力：服务健康检查、日志排查、账号池状态维护、备份、生产环境迁移",
      "工程化与安全：GitHub、环境变量隔离、配置脱敏、访问控制、公开仓库脱敏发布",
    ],
  },
  {
    slug: "openclaw-digest-hub",
    title: "openclaw:跨境电商+AI资讯推送",
    description:
      "面向跨境电商运营和 AI 资讯追踪打造的信息推送中枢，聚合行业动态、平台政策、AI 工具更新和重点观点，帮助快速筛选高价值信息并形成持续情报输入。",
    category: "跨境电商",
    status: "published",
    coverImage: "/covers/openclaw-digest-hub-cover.png",
    projectUrl: "https://openclaw.chatapi.fun",
    githubUrl: "https://github.com/bulingbuling688/openclaw-digest-hub",
    features: [
      "构建跨境电商与 AI 资讯统一推送中枢，将行业动态、平台政策、AI 工具更新和重点人物观点集中到一个面板查看",
      "自动聚合跨境电商动态，对英文资讯、平台变化和行业消息进行中文整理，降低信息筛选和理解成本",
      "接入 AI 资讯源，筛选高价值短讯并生成中文摘要，帮助快速捕捉工具更新、模型变化和行业机会",
      "追踪知乎关注内容，对重点回答、长文和行业观点进行抓取、去重和推送，沉淀可复用的信息来源",
      "为跨境选品、独立站运营、内容营销和 AI 工具使用提供持续信息输入，提升业务判断和执行效率",
      "按 AI资讯、跨境电商、知乎关注等主题拆分订阅频道，让不同类型信息独立流转，避免重要消息被噪音淹没",
      "通过定时任务自动更新信息流，实现无需人工反复刷平台的行业监控能力",
      "支持浏览器端消息查看和实时推送提醒，适合作为跨境电商运营者的日常情报工作台",
    ],
    techStack: [
      "前端信息工作台：Web 消息面板、主题频道订阅、实时消息列表、浏览器通知、移动端适配、信息流展示",
      "信息采集层：Python 3、RSS/Atom 解析、Zhihu API、跨境电商资讯源、AI 资讯源、定时采集任务",
      "内容处理层：内容清洗、关键词过滤、重复内容去重、长文摘要、信息价值筛选、中文结构化整理",
      "AI 分析层：DeepSeek-compatible Chat Completions、中文翻译、AI 摘要、AI 点评、行业动态解读",
      "推送与实时通信：ntfy HTTP API、WebSocket 消息订阅、分 topic 消息流、实时推送提醒",
      "任务调度与状态管理：systemd service、systemd timer、错峰定时任务、缓存状态、去重记录、运行日志",
      "部署与基础设施：Docker Compose、Nginx、HTTPS、Cloudflare DNS、VPS、公网域名访问",
      "工程化与安全：GitHub、环境变量隔离、密钥文件隔离、配置备份、日志排查、发布代码脱敏",
    ],
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
