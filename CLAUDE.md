# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```powershell
npm install        # install deps (Node 20+)
npm run dev        # dev server with HMR — http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the built dist/ — http://localhost:4173
```

There is **no test runner and no linter** configured. CI does not build either (see Deployment), so run `npm run build` locally to catch build errors before pushing.

To preview the static SEO/OG `<head>` tags (see SEO below) you must use `npm run preview`, not `npm run dev` — those tags only matter for the production `index.html`.

## Architecture

Vue 3 (Composition API, `<script setup>`) + Vue Router + vue-i18n, built with Vite. Plain CSS with design tokens in `src/assets/styles/variables.css`; no UI framework. Single-page app with no backend — the in-browser tools call third-party public APIs directly.

### SEO is a coordinated multi-layer system

Changing page metadata correctly requires editing **four** places that work together:

1. `src/router/index.js` — each route defines `meta.titleKey`, `meta.descriptionKey` (i18n keys), and `meta.canonicalPath`.
2. `src/locales/tr.js` & `src/locales/en.js` — the `seo.*` keys those meta fields point to. **Both locale files must stay in sync** (same key shape).
3. `src/seo.js` — site-wide constants (`siteConfig`, `personSchema` JSON-LD). Single source of truth for baseUrl, author, OG image path.
4. `src/components/SeoHead.vue` — a render-less component mounted once in `App.vue`. On route/locale change it imperatively rewrites `document.head` (title, meta, canonical, JSON-LD) from the above.

Because this is a client-rendered SPA, `SeoHead.vue` runs only after JS executes. `index.html` therefore carries a **static fallback** copy of the home-page meta/OG/Twitter tags for crawlers and social scrapers that don't run JS. When changing default/home SEO, update the static `index.html` tags too — they will otherwise drift from `seo.js`/locales.

`public/sitemap.xml` lists the same routes with hand-maintained `lastmod` dates and must be updated when routes change.

### Routing and i18n

- Route paths are Turkish (`/`, `/hakkimda`, `/iletisim`, `/araclar`); `HomeView` is eager, the rest lazy-loaded.
- Default locale `tr`, fallback `tr`; selection persisted in `localStorage` under `locale` (`src/i18n.js`). vue-i18n runs in non-legacy (Composition) mode — use `useI18n()` / `t()`.
- SPA routing in production relies on `nginx.conf` `try_files ... /index.html`.

### Global custom directives

Registered in `src/main.js`, used across views:
- `v-scroll-reveal="{ type, delay, duration, repeat }"` (`src/directives/scrollReveal.js`) — IntersectionObserver entrance animations.
- `v-parallax="{ speed, direction }"` (`src/directives/parallax.js`).

### Terminal design system (single source of truth)

The whole UI shares one theme-aware terminal language. `src/assets/styles/terminal.css` (imported globally in `main.js`) defines:
- `--tw-*` palette tokens on `:root` (light "editor") with a `[data-theme="dark"]` override (dark "phosphor"). This is the **only** place colours are defined for the terminal look.
- Reusable classes: `.tw-window/.tw-bar/.tw-screen/.tw-body/.tw-line/.tw-out/.tw-chips/.tw-btn/.tw-flag/.tw-heading/.tw-page` + staggered `.tw-body > *` reveal.

`src/components/TerminalWindow.vue` is the shared window-chrome wrapper (traffic lights + `aek@portfolio:<path>` title + optional `live`), used by About/Contact/Tools views. `ProfileCard.vue` (hero, with extra CRT effects) and `Terminal.vue` (interactive shell) keep their own scoped styles but **alias their local vars to `--tw-*`** so everything stays visually unified and theme-switches together. Persona is `aek@portfolio` everywhere — keep it consistent.

### Components

`src/components/tools/*` are self-contained interactive widgets rendered by `ToolsView.vue`. Each exposes `.tool` / `.tool-content` / `.tool-header h3` / `.tool-btn` classes. `ToolsView.vue` themes all six at once by **remapping the site `--color-*` tokens to `--tw-*`** on the grid wrapper (custom-property inheritance into child components) — no per-tool rewrite. A few semantic hex colours (status red/green, JSON syntax) are intentionally left hardcoded.

## Deployment (auto-deploy on push to main)

`.github/workflows/deploy.yml`: any push to `main` SSHes into the server, runs `git pull` + `docker compose build --no-cache` + `up -d`. **There is no build/test gate** — a broken build only surfaces on the server, briefly taking the site down (old container is stopped before the new one's build is validated). Treat pushes to `main` as production deploys.

The Docker image is a multi-stage build (`Dockerfile`): Node builds `dist/`, then nginx (`nginx.conf`) serves it on port 80, exposed as 3000 on the host.

## OG image regeneration

`public/og-image.svg` is the editable design source. The referenced asset is `public/og-image.png` (1200×630), regenerated from the SVG with `sharp`:

```powershell
npm install --no-save sharp
node -e "const s=require('sharp'),f=require('fs');s(f.readFileSync('public/og-image.svg')).resize(1200,630).png().toFile('public/og-image.png')"
```

`sharp` is intentionally not in `package.json` (not needed at build/deploy time).
