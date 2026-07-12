import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders only published project cards", () => {
    render(<App />);

    expect(screen.getAllByRole("article")).toHaveLength(5);
    expect(
      screen.getByRole("heading", { name: "跨境电商 AI 数据分析助理" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Teanary(自建独立站)" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "项目 01" })).not.toBeInTheDocument();
    expect(screen.getByText("第 1 / 1 页")).toBeInTheDocument();
  });

  it("keeps the header free of redundant top navigation links", () => {
    render(<App />);

    expect(screen.queryByRole("navigation", { name: "主导航" })).not.toBeInTheDocument();
  });

  it("does not show explanatory project statistics in the hero", () => {
    render(<App />);

    expect(screen.queryByLabelText("作品集说明")).not.toBeInTheDocument();
    expect(screen.queryByText("18 个项目")).not.toBeInTheDocument();
    expect(screen.queryByText("2 个方向")).not.toBeInTheDocument();
    expect(screen.queryByText("每页 9 个")).not.toBeInTheDocument();
  });

  it("renders real project covers without draft cover placeholders", () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll("img.project-cover")).toHaveLength(5);
    expect(screen.getByAltText("跨境电商 AI 数据分析助理封面")).toHaveAttribute(
      "src",
      "/covers/cross-border-ecommerce-ai-data-assistant-cover.png",
    );
    expect(screen.getByAltText("Teanary(自建独立站)封面")).toHaveAttribute(
      "src",
      "/covers/teanary-service-cover.png",
    );
    expect(screen.getByAltText("AI 数字人口播生产台封面")).toHaveAttribute(
      "src",
      "/covers/opentalking-cover.png",
    );
    expect(screen.getByAltText("New API 中转站运营平台封面")).toHaveAttribute(
      "src",
      "/covers/newapi-cpa-dashboard.png",
    );
    expect(screen.getByAltText("openclaw:跨境电商+AI资讯推送封面")).toHaveAttribute(
      "src",
      "/covers/openclaw-digest-hub-cover.png",
    );
    expect(screen.queryByLabelText("项目 01封面预留位")).not.toBeInTheDocument();
  });

  it("keeps technology stack previews off project cards", () => {
    render(<App />);

    expect(screen.queryByLabelText("Teanary(自建独立站)技术栈")).not.toBeInTheDocument();
    expect(screen.queryByText(/前端展示层：Livewire/)).not.toBeInTheDocument();
  });

  it("does not create extra pagination for hidden draft projects", () => {
    render(<App />);

    expect(screen.queryByRole("button", { name: "第二页" })).not.toBeInTheDocument();
    expect(screen.getByText("第 1 / 1 页")).toBeInTheDocument();
  });

  it("filters published projects by category", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("tab", { name: "中转站" }));

    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "New API 中转站运营平台" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "项目 10" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "openclaw:跨境电商+AI资讯推送" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("第 1 / 1 页")).toBeInTheDocument();
  });

  it("filters the AI data application category", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("tab", { name: "AI 数据应用" }));

    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "跨境电商 AI 数据分析助理" }),
    ).toBeInTheDocument();
    expect(screen.getByText("第 1 / 1 页")).toBeInTheDocument();
  });

  it("filters through search and keeps detail navigation available", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("搜索项目、技术栈或关键词"), {
      target: { value: "Teanary" },
    });

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(1);
    expect(within(cards[0]).getByRole("link", { name: "查看详情" })).toHaveAttribute(
      "href",
      "/projects/teanary-service",
    );
  });

  it("renders the Teanary detail page with external links and cover image", () => {
    window.history.pushState({}, "", "/projects/teanary-service");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Teanary(自建独立站)" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /上线网站/ })).toHaveAttribute(
      "href",
      "https://teanary-service.chatapi.fun/zh_CN",
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/TeanaryService/teanary_service",
    );
    expect(
      screen.getByText("构建独立域名流量承接入口，帮助品牌摆脱平台依赖并沉淀自有用户资产"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "部署与基础设施：Docker Compose、Nginx、HTTPS、VPS 私有化部署、反向代理、静态资源服务、域名访问，形成完整线上交付链路",
      ),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Teanary(自建独立站)封面")).toHaveAttribute(
      "src",
      "/covers/teanary-service-cover.png",
    );
  });

  it("renders the cross-border ecommerce AI data assistant detail page", () => {
    window.history.pushState({}, "", "/projects/cross-border-ecommerce-ai-data-assistant");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: "跨境电商 AI 数据分析助理" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /上线网站/ })).toHaveAttribute(
      "href",
      "https://cross-border-ecommerce-ai-data-assistant.chatapi.fun",
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/bulingbuling688/cross-border-ecommerce-ai-data-assistant",
    );
    expect(
      screen.getByText("实现基于 DB-GPT ReAct Agent 的数据库查询与知识库检索链路"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Agent / AI 能力层：DB-GPT ReAct Agent、DeepSeek API、OpenCode 模型接口，承担自然语言分析和工具调用",
      ),
    ).toBeInTheDocument();
    expect(screen.getByAltText("跨境电商 AI 数据分析助理封面")).toHaveAttribute(
      "src",
      "/covers/cross-border-ecommerce-ai-data-assistant-cover.png",
    );
  });

  it("renders the ChatAPI NewAPI detail page with external links and cover image", () => {
    window.history.pushState({}, "", "/projects/newapi-cpa-proxy-deploy");

    render(<App />);

    expect(screen.getByRole("heading", { name: "New API 中转站运营平台" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /上线网站/ })).toHaveAttribute(
      "href",
      "https://api.chatapi.fun/",
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/bulingbuling688/newapi-cpa-proxy-deploy",
    );
    expect(
      screen.getByText(
        "搭建统一的 OpenAI-compatible API 网关，支持客户端和自动化工具通过标准协议接入多模型服务",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "账号池与资源调度：CPA、CLIProxyAPI、ChatGPT OAuth、Codex 账号接入、多账号轮询、渠道可用性管理",
      ),
    ).toBeInTheDocument();
    expect(screen.getByAltText("New API 中转站运营平台封面")).toHaveAttribute(
      "src",
      "/covers/newapi-cpa-dashboard.png",
    );
  });

  it("renders the OpenTalking detail page with production positioning and cover image", () => {
    window.history.pushState({}, "", "/projects/opentalking");

    render(<App />);

    expect(screen.getByRole("heading", { name: "AI 数字人口播生产台" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /上线网站/ })).toHaveAttribute(
      "href",
      "https://opentalking.chatapi.fun",
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/bulingbuling688/opentalking",
    );
    expect(
      screen.getByText(
        "已应用于抖音、TikTok 等短视频内容生产场景，累计生产 100+ 条数字人口播短视频，播放量超 100w+",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "数字人视频驱动：FlashTalk、MuseTalk、Wav2Lip、QuickTalk、FFmpeg、OpenCV、MediaPipe、Kornia、InsightFace、Transformers、rembg、Pillow、AV",
      ),
    ).toBeInTheDocument();
    expect(screen.getByAltText("AI 数字人口播生产台封面")).toHaveAttribute(
      "src",
      "/covers/opentalking-cover.png",
    );
  });

  it("renders the OpenClaw detail page with external links and cover image", () => {
    window.history.pushState({}, "", "/projects/openclaw-digest-hub");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: "openclaw:跨境电商+AI资讯推送" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /上线网站/ })).toHaveAttribute(
      "href",
      "https://openclaw.chatapi.fun",
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/bulingbuling688/openclaw-digest-hub",
    );
    expect(
      screen.getByText(
        "自动聚合跨境电商动态，对英文资讯、平台变化和行业消息进行中文整理，降低信息筛选和理解成本",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "AI 分析层：DeepSeek-compatible Chat Completions、中文翻译、AI 摘要、AI 点评、行业动态解读",
      ),
    ).toBeInTheDocument();
    expect(screen.getByAltText("openclaw:跨境电商+AI资讯推送封面")).toHaveAttribute(
      "src",
      "/covers/openclaw-digest-hub-cover.png",
    );
  });

  it("keeps hidden draft detail routes inaccessible", () => {
    window.history.pushState({}, "", "/projects/project-01");

    render(<App />);

    expect(screen.getByRole("heading", { name: "项目不存在" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "返回项目列表" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("heading", { name: "项目 01" })).not.toBeInTheDocument();
  });

  it("shows a not found state for unknown project detail routes", () => {
    window.history.pushState({}, "", "/projects/not-a-project");

    render(<App />);

    expect(screen.getByRole("heading", { name: "项目不存在" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "返回项目列表" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("heading", { name: "项目作品集" })).not.toBeInTheDocument();
  });
});
