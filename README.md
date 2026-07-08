# Project Portfolio Site

## Online URL

https://project-portfolio-site.chatapi.fun

## Project Summary

A personal portfolio site for organizing published web projects by category, with project cards, detail pages, and external links for live sites and GitHub repositories.

## Features

- Category filtering for portfolio directions
- Nine projects per page
- Search across project names, descriptions, features, and tech stack
- Project detail pages with feature and tech stack summaries
- Cover image slots for future real project screenshots

## Tech Stack

- React
- Vite
- TypeScript
- CSS
- Vitest

## Local Development

```bash
npm ci
npm run dev
```

## Environment Variables

No environment variables are required.

## Deployment

| Field | Value |
| --- | --- |
| Project slug | `project-portfolio-site` |
| GitHub repo | `https://github.com/bulingbuling688/project-portfolio-site` |
| VM deploy path | `/opt/apps/project-portfolio-site` |
| Static web root | `/var/www/project-portfolio-site` |
| Runtime mode | Static Nginx |
| Build command | `npm run build` |
| Start command | N/A |
| Internal port | N/A |
| Public domain | `https://project-portfolio-site.chatapi.fun` |
| Nginx config | `/etc/nginx/sites-available/project-portfolio-site.conf` |
| Cloudflare DNS | Proxied A record to current VM IP |
| TLS certificate | Let's Encrypt |
| Environment file | N/A |

## Directory Structure

```text
src/      Application source
public/   Static cover placeholders
dist/     Production build output
```

## Common Commands

```bash
npm test
npm run build
```

## Maintenance Log

- 2026-07-08: Initial VPS and domain publishing setup.

## Maintenance Commands

```bash
cd /opt/apps/project-portfolio-site
git pull --ff-only origin main
npm ci
npm run build
sudo rsync -a --delete dist/ /var/www/project-portfolio-site/
sudo nginx -t
sudo systemctl reload nginx
```
