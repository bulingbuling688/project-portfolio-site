# Hide Draft Placeholder Projects

## Goal

The public portfolio page must show only completed, published projects. The existing draft placeholder records remain in the source so they can be filled in and published later.

## Design

- Keep the generated draft project records in `src/data/projects.ts`.
- Set the existing `SHOW_DRAFT_PROJECTS` configuration to `false`.
- Continue using `getDisplayProjects` as the single filtering boundary before search, category filtering, pagination, and card rendering.
- Do not change card layout, styling, category controls, or the published project data.
- A future project becomes visible by adding a project with `status: "published"` or by completing a retained draft record and changing its status to `"published"`.

## Public Behavior

- Placeholder cards such as `项目 01` and text such as `简介待补充` are absent from the portfolio listing.
- Search, category counts, and pagination operate only on published projects.
- The current four published projects remain visible.
- Draft data remains available in the source and is not deleted.

## Testing

- Add or update a rendering test proving draft placeholder cards are absent from the public portfolio page.
- Keep a data/logic test proving draft records still exist and `getDisplayProjects(..., false)` excludes them.
- Update pagination and category expectations to use the published project count.
- Run the complete Vitest suite and production build.

## Scope

This change affects only public visibility of draft placeholders. It does not add an admin interface, change project editing workflow, publish new projects, or deploy the result to GitHub or VPS.
