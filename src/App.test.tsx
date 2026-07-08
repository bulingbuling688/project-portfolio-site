import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders nine project cards on the first page", () => {
    render(<App />);

    expect(screen.getAllByRole("article")).toHaveLength(9);
    expect(screen.getByRole("heading", { name: "Teanary(自建独立站)" })).toBeInTheDocument();
    expect(screen.getByText("第 1 / 3 页")).toBeInTheDocument();
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

  it("reserves cover slots without rendering placeholder image files", () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll("img.project-cover")).toHaveLength(3);
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
    expect(screen.getByLabelText("项目 01封面预留位")).toBeInTheDocument();
  });

  it("switches to the second page through pagination", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "第二页" }));

    expect(screen.getByText("第 2 / 3 页")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "项目 09" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "项目 01" })).not.toBeInTheDocument();
  });

  it("filters by the expandable category tabs", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("tab", { name: "中转站" }));

    expect(screen.getAllByRole("article")).toHaveLength(9);
    expect(screen.getByRole("heading", { name: "New API 中转站运营平台" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "项目 10" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "AI 数字人口播生产台" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "项目 01" })).not.toBeInTheDocument();
    expect(screen.getByText("第 1 / 2 页")).toBeInTheDocument();
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

  it("renders draft detail pages without unavailable external links", () => {
    window.history.pushState({}, "", "/projects/project-01");

    render(<App />);

    expect(screen.getByRole("heading", { name: "项目 01" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /上线网站/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /GitHub/ })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "核心功能" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "技术栈" })).toBeInTheDocument();
    expect(screen.getByLabelText("项目 01封面预留位")).toBeInTheDocument();
  });

  it("shows a not found state for unknown project detail routes", () => {
    window.history.pushState({}, "", "/projects/not-a-project");

    render(<App />);

    expect(screen.getByRole("heading", { name: "项目不存在" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "返回项目列表" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("heading", { name: "项目作品集" })).not.toBeInTheDocument();
  });
});
