# Hide Draft Placeholder Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide every draft placeholder card from the public portfolio while retaining the draft records for future project additions.

**Architecture:** Keep `projects` as the complete source containing published and draft records. Use the existing `SHOW_DRAFT_PROJECTS` flag and `getDisplayProjects` boundary so only published records enter public search, category filtering, pagination, and card rendering.

**Tech Stack:** React 19, TypeScript, Vite 6, Vitest, Testing Library

## Global Constraints

- Keep all generated draft project records in `src/data/projects.ts`.
- Do not change card layout, styling, category controls, or published project content.
- Future projects become visible only when their `status` is `"published"`.
- Do not publish to GitHub or deploy to VPS as part of this implementation.

---

### Task 1: Hide Draft Projects From the Public Portfolio

**Files:**
- Modify: `src/App.test.tsx:11-88`
- Modify: `src/data/projectLogic.test.ts:196-226`
- Modify: `src/data/projects.ts:25`

**Interfaces:**
- Consumes: `getDisplayProjects(projects: Project[], showDraftProjects: boolean): Project[]`
- Produces: `SHOW_DRAFT_PROJECTS = false`, making the public portfolio consume only `status: "published"` records.

- [ ] **Step 1: Write the failing public-rendering tests**

Update the first-page, cover, pagination, and category tests in `src/App.test.tsx` to assert the public behavior:

```tsx
it("renders only published project cards", () => {
  render(<App />);

  expect(screen.getAllByRole("article")).toHaveLength(4);
  expect(screen.getByRole("heading", { name: "Teanary(自建独立站)" })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "项目 01" })).not.toBeInTheDocument();
  expect(screen.getByText("第 1 / 1 页")).toBeInTheDocument();
});

it("renders real project covers without draft cover placeholders", () => {
  const { container } = render(<App />);

  expect(container.querySelectorAll("img.project-cover")).toHaveLength(4);
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
```

- [ ] **Step 2: Run the focused UI tests and verify RED**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because the page still renders nine cards, includes `项目 01`, exposes draft cover placeholders, and has three pages.

- [ ] **Step 3: Disable draft rendering with the existing configuration boundary**

Change `src/data/projects.ts`:

```ts
export const SHOW_DRAFT_PROJECTS = false;
```

Do not remove `createPlaceholderProject` or either `Array.from` block that creates draft records.

- [ ] **Step 4: Verify the focused UI tests are GREEN**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: all `src/App.test.tsx` tests pass, including the existing direct draft-detail test because draft records remain in the data source.

- [ ] **Step 5: Add data-retention and published-pagination coverage**

Replace the existing page-size test in `src/data/projectLogic.test.ts` with:

```ts
it("retains draft records while paginating only published projects", () => {
  const draftProjects = projects.filter((project) => project.status === "draft");
  const publishedProjects = getDisplayProjects(projects, false);

  expect(draftProjects).toHaveLength(18);
  expect(publishedProjects).toHaveLength(4);
  expect(publishedProjects.every((project) => project.status === "published")).toBe(true);
  expect(PAGE_SIZE).toBe(9);
  expect(getVisibleProjects(publishedProjects, 1)).toHaveLength(4);
  expect(getTotalPages(publishedProjects)).toBe(1);
  expect(buildPageLabels(getTotalPages(publishedProjects))).toEqual(["第一页"]);
});
```

Remove the now-redundant standalone test that expects `buildPageLabels(3)`.

- [ ] **Step 6: Run the complete test suite**

Run:

```bash
npm test
```

Expected: 3 test files pass with zero failed tests.

- [ ] **Step 7: Run the production build**

Run:

```bash
npm run build
```

Expected: Vite exits with code 0 and writes the production bundle to `dist/`.

- [ ] **Step 8: Inspect the final diff and commit**

Run:

```bash
git diff --check
git diff -- src/App.test.tsx src/data/projectLogic.test.ts src/data/projects.ts
git add src/App.test.tsx src/data/projectLogic.test.ts src/data/projects.ts
git commit -m "fix: hide draft portfolio placeholders"
```

Expected: the diff contains only test expectation changes and `SHOW_DRAFT_PROJECTS = false`; the implementation commit succeeds.
