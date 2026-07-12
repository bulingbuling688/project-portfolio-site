# Add Cross-Border Ecommerce AI Data Assistant

## Goal

Add the deployed Cross-Border Ecommerce AI Data Assistant as the newest published portfolio project, using the user-provided real dashboard screenshot as its cover.

## Project Data

- Title: `跨境电商 AI 数据分析助理`
- Slug: `cross-border-ecommerce-ai-data-assistant`
- Category: `AI 数据应用`
- Status: `published`
- Live URL: `https://cross-border-ecommerce-ai-data-assistant.chatapi.fun`
- GitHub URL: `https://github.com/bulingbuling688/cross-border-ecommerce-ai-data-assistant`
- Cover: `/covers/cross-border-ecommerce-ai-data-assistant-cover.png`

The description, eight features, and eight layered technology-stack entries will use the verified content supplied by the project thread. Claims about real customers, revenue, production scale, proprietary data collection, complete originality, enterprise-grade access control, or guaranteed AI accuracy must not be added.

## Portfolio Behavior

- Add `AI 数据应用` to the category list.
- Insert the new project first in the published project list so it appears as the latest project.
- Keep all existing published and draft project records unchanged.
- Keep draft projects hidden.
- Category filtering, search, card rendering, and detail routing continue to use the existing data-driven behavior.
- The published collection increases from four to five projects and remains one page at the current page size of nine.

## Cover Asset

Use the user-provided PNG without generative replacement or decorative editing. Store it at `public/covers/cross-border-ecommerce-ai-data-assistant-cover.png`. Existing card and detail-page image styling controls the visible crop; the original image remains available as the source asset.

## Testing

- Add a data test for the complete published project record and new category.
- Update published-project count expectations from four to five.
- Add UI coverage for the new project card, cover, category filter, detail page, live URL, GitHub URL, representative feature, and representative technology-stack entry.
- Run the full Vitest suite and production build.
- Verify the local preview loads the new cover before publication.

## Publication

After local verification, push the approved release to the existing GitHub repository and deploy it through the existing versioned static VPS release flow. Verify GitHub, the active VPS release, Nginx, Cloudflare DNS, HTTPS, and the public page before reporting completion.

## Scope

This change adds one portfolio entry, one category, one image asset, related tests, and deployment documentation. It does not modify the deployed AI data assistant itself, its authentication, database, model configuration, or infrastructure.
