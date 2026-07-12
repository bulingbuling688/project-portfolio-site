# 项目作品集

## 在线地址

https://project-portfolio-site.chatapi.fun

## 项目简介

这是一个用于集中展示个人已发布 Web 项目的作品集网站。项目按照业务方向组织内容，提供分类筛选、关键词搜索、项目卡片和详情页，方便查看项目定位、核心功能、技术栈、线上地址与 GitHub 仓库。

## 解决的问题与目标

个人项目分散在不同域名和仓库中，不便于统一浏览和对外展示。本项目提供一个稳定入口，只展示已经完成并发布的项目；未完成的草稿数据保留在源码中，但不会出现在公开页面或通过直链访问。

## 核心功能

- 按“跨境电商”“中转站”等方向筛选项目。
- 搜索项目名称、简介、功能和技术栈关键词。
- 使用项目卡片展示真实项目封面、简介和分类。
- 通过详情页查看完整功能、技术栈、线上网站和 GitHub 链接。
- 自动隐藏 `draft` 状态的占位项目，避免未完成内容公开展示。
- 根据已发布项目数量自动计算分页。

## 我的工作

- 设计作品集的信息结构、分类方式和项目展示流程。
- 使用 React、TypeScript 和 CSS 实现列表、筛选、搜索、分页与详情页。
- 整理真实项目资料、封面、功能说明、技术栈和外部链接。
- 为项目筛选、分页、详情路由和草稿隐藏行为编写自动化测试。
- 完成 GitHub 版本管理、VPS 静态部署、Nginx 路由、Cloudflare DNS 和 HTTPS 配置。

## 系统架构

项目是一个 Vite 构建的 React 单页应用。项目数据保存在前端 TypeScript 数据模块中，浏览器负责筛选、搜索、分页和详情路由；生产构建输出到 `dist/`，由 VPS 上的 Nginx 提供静态文件服务，并通过 Cloudflare 代理域名访问。

## 技术栈

| 类别 | 技术 | 用途 |
| --- | --- | --- |
| 前端 | React 19 | 页面组件与交互 |
| 开发语言 | TypeScript | 类型约束与项目数据建模 |
| 构建工具 | Vite 6 | 本地开发与生产构建 |
| 样式 | CSS | 响应式布局与视觉样式 |
| 图标 | Lucide React | 页面操作图标 |
| 测试 | Vitest、Testing Library、happy-dom | 组件与数据逻辑测试 |
| 部署 | Nginx、Cloudflare、Certbot | 静态托管、DNS 代理与 HTTPS |

## 项目截图

当前仓库暂未提供作品集页面截图。项目卡片使用 `public/covers/` 中的真实项目封面。

## 本地运行

```bash
npm ci
npm run dev
```

生产构建：

```bash
npm test
npm run build
```

## 环境变量

本项目当前不需要额外环境变量。

## 部署信息

| 字段 | 内容 |
| --- | --- |
| 中文项目名 | `项目作品集` |
| GitHub 仓库名 | `project-portfolio-site` |
| GitHub 仓库 | `https://github.com/bulingbuling688/project-portfolio-site` |
| Git 分支 | `main` |
| 包管理器 | `npm@10.8.2` |
| 安装命令 | `npm ci` |
| 上线代码提交 | `0765ce7d39083a23775a15e62414542654768bfc` |
| 文档提交 | 本次 README 最终化提交，以 GitHub `main` 最新提交为准 |
| VPS 项目目录 | `/opt/apps/project-portfolio-site` |
| 源码目录 | `/opt/apps/project-portfolio-site` |
| 版本目录 | `/opt/apps/project-portfolio-site/releases` |
| 当前版本 | `/opt/apps/project-portfolio-site/releases/0765ce7d39083a23775a15e62414542654768bfc` |
| 上一版本 | `/opt/apps/project-portfolio-site/releases/2717f2a37790890eb801edde49e90f8b2ee4537c` |
| 静态入口 | `/var/www/project-portfolio-site` |
| 运行方式 | `Static Nginx` |
| 构建命令 | `npm run build` |
| 启动命令 | 不适用 |
| 内部端口 | 不适用 |
| 在线域名 | `https://project-portfolio-site.chatapi.fun` |
| Nginx 配置 | `/etc/nginx/sites-available/project-portfolio-site.conf` |
| Cloudflare DNS | 指向当前 VPS 的代理 A 记录 |
| HTTPS | `Let's Encrypt` |
| 环境文件 | 不适用 |
| 更新方式 | 重新运行 `github-vps-domain-publish` |
| 回滚方式 | 将 `current` 和 `/var/www/project-portfolio-site` 原子切换到上一版本的 `dist/` |

## 目录结构

```text
src/                         React 应用与项目数据
public/covers/               项目封面资源
docs/superpowers/specs/      功能设计规格
docs/superpowers/plans/      实施计划
dist/                        生产构建输出
```

## 常用命令

```bash
git -C /opt/apps/project-portfolio-site status --short
git -C /opt/apps/project-portfolio-site branch --show-current
readlink -f /opt/apps/project-portfolio-site/current
readlink -f /var/www/project-portfolio-site
```

回滚到上一版本：

```bash
root=/opt/apps/project-portfolio-site
previous=$root/releases/2717f2a37790890eb801edde49e90f8b2ee4537c
sudo ln -sfn "$previous" "$root/current.next"
sudo mv -Tf "$root/current.next" "$root/current"
sudo ln -sfn "$root/current/dist" /var/www/project-portfolio-site.next
sudo mv -Tf /var/www/project-portfolio-site.next /var/www/project-portfolio-site
sudo nginx -t
```

## 维护记录

- 2026-07-08：完成首次 GitHub、VPS、Nginx、Cloudflare DNS 和 HTTPS 发布。
- 2026-07-11：隐藏公开页面中的草稿占位项目，保留草稿数据供后续补充，并升级为版本化静态发布流程。
- 2026-07-12：新增“跨境电商 AI 数据分析 Agent”项目并归入“跨境电商”分类，补充真实工作台封面，并修复移动端分类与长标题溢出。
- 2026-07-12：新增“跨境电商 AI 售后客服 Agent”项目，展示多 Agent 售后协作、订单物流核验、RAG 政策检索和风险审核能力。

## 开源许可与第三方说明

当前仓库未单独提供许可证文件。项目依赖的 React、Vite、Lucide React、Vitest 等第三方软件遵循各自许可证；仓库未声明这些第三方组件为原创实现。
