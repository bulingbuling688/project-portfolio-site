# Add Cross-Border Ecommerce AI Data Assistant Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the deployed Cross-Border Ecommerce AI Data Assistant as the newest published portfolio project with a real dashboard cover, then publish the verified portfolio update.

**Architecture:** Extend the existing typed project data source with one category and one published record. Reuse the current data-driven list, search, category, pagination, card, and detail-page components without changing layout code; publish the resulting static Vite build through the existing versioned VPS release flow.

**Tech Stack:** React 19, TypeScript, Vite 6, Vitest, Testing Library, Nginx, GitHub, Cloudflare, VPS static releases

## Global Constraints

- Use the user-provided `2879 x 1428` PNG without generated replacement or decorative editing.
- Keep all existing published and draft project records unchanged.
- Keep `SHOW_DRAFT_PROJECTS = false`.
- Do not add claims about customers, revenue, production traffic, proprietary data collection, complete originality, enterprise-grade access control, or guaranteed AI accuracy.
- Do not expose model keys, database passwords, environment values, server credentials, or Cloudflare credentials.

---

### Task 1: Add the Published Project and Cover

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/data/projectLogic.test.ts`
- Modify: `src/App.test.tsx`
- Create: `public/covers/cross-border-ecommerce-ai-data-assistant-cover.png`

**Interfaces:**
- Consumes: `Project`, `ProjectCategory`, `projects`, and the existing data-driven `App` rendering flow.
- Produces: category `AI 数据应用` and published project slug `cross-border-ecommerce-ai-data-assistant`.

- [ ] **Step 1: Write failing data tests**

Add `projectCategories` to the import from `./projects`, then add this test before the existing Teanary record test in `src/data/projectLogic.test.ts`:

```ts
it("includes the published cross-border ecommerce AI data assistant", () => {
  expect(projectCategories).toContain("AI 数据应用");
  expect(projects[0]).toEqual(
    expect.objectContaining({
      slug: "cross-border-ecommerce-ai-data-assistant",
      title: "跨境电商 AI 数据分析助理",
      category: "AI 数据应用",
      status: "published",
      coverImage: "/covers/cross-border-ecommerce-ai-data-assistant-cover.png",
      projectUrl: "https://cross-border-ecommerce-ai-data-assistant.chatapi.fun",
      githubUrl:
        "https://github.com/bulingbuling688/cross-border-ecommerce-ai-data-assistant",
    }),
  );
  expect(projects[0].features).toHaveLength(8);
  expect(projects[0].techStack).toHaveLength(8);
});
```

Update the published pagination assertions in the same file:

```ts
expect(draftProjects).toHaveLength(18);
expect(publishedProjects).toHaveLength(5);
expect(getVisibleProjects(publishedProjects, 1)).toHaveLength(5);
```

- [ ] **Step 2: Write failing UI tests**

Update the first-page card count and cover count in `src/App.test.tsx` from `4` to `5`, and assert the newest project is visible:

```tsx
expect(screen.getAllByRole("article")).toHaveLength(5);
expect(
  screen.getByRole("heading", { name: "跨境电商 AI 数据分析助理" }),
).toBeInTheDocument();
```

Add the new cover assertion to the existing cover test:

```tsx
expect(screen.getByAltText("跨境电商 AI 数据分析助理封面")).toHaveAttribute(
  "src",
  "/covers/cross-border-ecommerce-ai-data-assistant-cover.png",
);
```

Add a category-filter test:

```tsx
it("filters the AI data application category", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("tab", { name: "AI 数据应用" }));

  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(
    screen.getByRole("heading", { name: "跨境电商 AI 数据分析助理" }),
  ).toBeInTheDocument();
  expect(screen.getByText("第 1 / 1 页")).toBeInTheDocument();
});
```

Add a detail-page test:

```tsx
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
```

- [ ] **Step 3: Run focused tests and verify RED**

Run:

```bash
npm test -- src/data/projectLogic.test.ts src/App.test.tsx
```

Expected: FAIL because the new category, project record, card, cover, and detail route do not exist yet.

- [ ] **Step 4: Copy the approved cover asset**

Run:

```bash
install -m 0644 \
  /mnt/c/Users/buling/AppData/Local/Temp/tmpC341.png \
  public/covers/cross-border-ecommerce-ai-data-assistant-cover.png
```

Verify:

```bash
file public/covers/cross-border-ecommerce-ai-data-assistant-cover.png
```

Expected: PNG, `2879 x 1428`, RGBA.

- [ ] **Step 5: Add the category and complete published record**

Change the category declaration in `src/data/projects.ts`:

```ts
export const projectCategories = ["AI 数据应用", "跨境电商", "中转站"] as const;
```

Insert this record first in `publishedProjects`:

```ts
{
  slug: "cross-border-ecommerce-ai-data-assistant",
  title: "跨境电商 AI 数据分析助理",
  description:
    "面向跨境电商运营和数据分析场景的智能经营分析工作台。项目接入 Olist 真实公开电商订单数据，覆盖订单、商品、客户、卖家、支付、评价和地理位置等业务对象，支持用户通过自然语言完成销售趋势、品类表现、区域履约和客户体验分析。系统打通了业务提问、默认数据源与知识库加载、SQL 分析、执行过程查看和结果追问链路，当前已完成前端业务化改造、中文本地化、AI 模型接入、容器化部署及公网 HTTPS 上线。",
  category: "AI 数据应用",
  status: "published",
  coverImage: "/covers/cross-border-ecommerce-ai-data-assistant-cover.png",
  projectUrl: "https://cross-border-ecommerce-ai-data-assistant.chatapi.fun",
  githubUrl: "https://github.com/bulingbuling688/cross-border-ecommerce-ai-data-assistant",
  features: [
    "构建跨境电商 AI 分析工作台，支持通过自然语言发起订单与经营分析",
    "接入 Olist 真实公开数据，覆盖订单、商品、客户、支付、评价和地理位置",
    "支持默认加载跨境电商 MySQL 数据源和业务知识库",
    "提供周度销售、品类表现、区域履约和客户体验推荐分析",
    "实现基于 DB-GPT ReAct Agent 的数据库查询与知识库检索链路",
    "打通 GMV、订单量、客单价、复购和评价等指标口径",
    "实现普通分析与 HTML 报告意图区分，控制不同任务的输出链路",
    "完成会话自动命名、任务历史、SQL 结果查看和中文界面改造",
  ],
  techStack: [
    "前端展示层：Next.js 13、React 18、TypeScript、Ant Design、Tailwind CSS，承担分析工作台和任务交互界面",
    "数据可视化层：AntV G2、G6、S2、GPT-Vis，承担分析表格、图表和结果展示",
    "后端接口层：DB-GPT WebServer、Python API，承担会话、模型、数据源和知识库接口",
    "Agent / AI 能力层：DB-GPT ReAct Agent、DeepSeek API、OpenCode 模型接口，承担自然语言分析和工具调用",
    "数据持久层：MySQL 8.0、Olist 公开数据集，存储系统元数据和跨境电商分析数据",
    "知识检索层：Elasticsearch 8.7、DB-GPT Knowledge Space，承担业务口径文档索引与检索",
    "测试与工程化：Python unittest、Node Test Runner、TypeScript，覆盖报告意图和前端核心逻辑",
    "部署与基础设施：Docker Compose、Nginx、Cloudflare、Origin CA TLS，承担服务编排和公网 HTTPS 发布",
  ],
},
```

- [ ] **Step 6: Run focused and full verification**

Run:

```bash
npm test -- src/data/projectLogic.test.ts src/App.test.tsx
npm test
npm run build
```

Expected: all test files pass and Vite writes `dist/` successfully.

- [ ] **Step 7: Verify the local preview and asset response**

Start or reuse the managed preview, then verify:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' \
  http://127.0.0.1:5174/covers/cross-border-ecommerce-ai-data-assistant-cover.png
```

Expected: `200`. Inspect the local page and confirm the newest card uses the approved dashboard screenshot without text overlap.

- [ ] **Step 8: Review and commit the implementation**

Run:

```bash
git diff --check
git status --short
git add src/data/projects.ts src/data/projectLogic.test.ts src/App.test.tsx \
  public/covers/cross-border-ecommerce-ai-data-assistant-cover.png
git commit -m "feat: add AI data assistant portfolio project"
```

Expected: the commit contains only the project data, tests, and approved cover asset.

---

### Task 2: Publish the Portfolio Update

**Files:**
- Modify during publish preparation/finalization: `README.md`
- Deploy generated output: `dist/`

**Interfaces:**
- Consumes: clean committed `main`, GitHub repository `bulingbuling688/project-portfolio-site`, VPS app root `/opt/apps/project-portfolio-site`, and domain `project-portfolio-site.chatapi.fun`.
- Produces: one GitHub release commit, one active versioned VPS release, one previous rollback release, and one optional README-only documentation commit.

- [ ] **Step 1: Merge the verified feature branch into local `main`**

Use `superpowers:finishing-a-development-branch`, select local merge, and rerun:

```bash
npm test
npm run build
```

Expected: all tests and the production build pass on merged `main`.

- [ ] **Step 2: Invoke the existing publication workflow**

Use the `github-vps-domain-publish` skill with:

```text
project_slug: project-portfolio-site
branch: main
deployment_class: same-project-update
runtime_mode: static
output_dir: dist
publish_profile: compatibility
artifact_mode: prebuilt
health_expected_status: 200
health_marker: cross-border-ecommerce-ai-data-assistant
```

The workflow must resolve `release_commit=$(git rev-parse HEAD)`, push exactly that commit, create a checksum-bound prebuilt release archive, upload a candidate without activating it, and require GitHub and VPS candidate verification before switching `current`.

- [ ] **Step 3: Verify public deployment evidence**

Run the publication workflow's final evidence matrix and require:

```bash
curl -L -sS --max-time 15 \
  https://project-portfolio-site.chatapi.fun/ \
  | grep -F 'index-'

curl -L -sS -o /dev/null -w '%{http_code}\n' --max-time 15 \
  https://project-portfolio-site.chatapi.fun/covers/cross-border-ecommerce-ai-data-assistant-cover.png
```

Expected: the public page and new cover return `200`; GitHub `main`, VPS release manifest, `current`, Nginx, Cloudflare DNS, HTTPS, and public assets all agree with the release context.

- [ ] **Step 4: Finalize documentation and cleanup**

Update only deployment facts in `README.md`, push any README-only documentation commit, verify GitHub README read-back, retain current and previous releases, remove temporary archives, and leave no dirty local files.
