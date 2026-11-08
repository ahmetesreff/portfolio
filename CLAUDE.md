# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```powershell
npm install        # install deps (Node 20+)
npm run dev        # dev server with HMR — http://localhost:5173
npm run build      # production build to dist/ (vite build + scripts/postbuild.mjs)
npm run preview    # serve the built dist/ — http://localhost:4173
```

There is **no test runner and no linter** configured. Run `npm run build` locally before pushing: a push to `main` is a production deploy (see Deployment).

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

`scripts/postbuild.mjs` (runs after `vite build`) writes one HTML copy per page (`dist/hakkimda.html`, …) with that page's title, description, canonical and OG/Twitter tags taken from `tr.js` `seo.*`, plus `dist/404.html` (noindex, no canonical). Its `PAGES` list must match the sitemap, or the build fails on purpose. It also fails if it can't find a static tag in `index.html` exactly once, so keep those tags' shape (`<meta name="…" content="…">`) when editing them. When adding a route, add it to `PAGES` and the sitemap.

### Routing and i18n

- Route paths are Turkish (`/`, `/hakkimda`, `/iletisim`, `/araclar`); `HomeView` is eager, the rest lazy-loaded.
- Default locale `tr`, fallback `tr`; selection persisted in `localStorage` under `locale` (`src/i18n.js`). vue-i18n runs in non-legacy (Composition) mode — use `useI18n()` / `t()`.
- In production, Cloudflare Workers static assets serve `/hakkimda` from `hakkimda.html` (written by the postbuild script), with status 200. A trailing slash (`/hakkimda/`) gets a 307 to the slash-less URL.
- Unknown paths get `404.html` with a **real 404 status**. It is the same SPA, so the catch-all route renders `NotFoundView.vue` with `meta.noindex`.
- `main.js` mounts only after `router.isReady()`. Without it, the header and footer paint before the lazy route chunk arrives, and the footer jumps down (CLS ≈ 0.13 on `/hakkimda` and `/araclar`). Keep it.

### Global custom directives

Registered in `src/main.js`:
- `v-scroll-reveal="{ type, delay, duration, repeat }"` (`src/directives/scrollReveal.js`) — IntersectionObserver entrance animations.
- `v-parallax="{ speed, direction }"` (`src/directives/parallax.js`) — currently unused (the home page parallax shapes were removed).

### Terminal design system (single source of truth)

The whole UI shares one theme-aware terminal language. `src/assets/styles/terminal.css` (imported globally in `main.js`) defines:
- `--tw-*` palette tokens on `:root` (light "editor") with a `[data-theme="dark"]` override (dark "phosphor"). This is the **only** place colours are defined for the terminal look.
- Reusable classes: `.tw-window/.tw-bar/.tw-screen/.tw-body/.tw-line/.tw-out/.tw-chips/.tw-btn/.tw-flag/.tw-heading/.tw-page` + staggered `.tw-body > *` reveal.

`src/components/TerminalWindow.vue` is the shared window-chrome wrapper (traffic lights + `aek@portfolio:<path>` title + optional `live`), used by About/Contact/Tools views. `ProfileCard.vue` (hero, with extra CRT effects) and `Terminal.vue` (interactive shell) keep their own scoped styles but **alias their local vars to `--tw-*`** so everything stays visually unified and theme-switches together. Persona is `aek@portfolio` everywhere — keep it consistent.

### Components

`src/components/tools/*` are self-contained interactive widgets rendered by `ToolsView.vue`. The current set is IP, DNS, JWT, JSON, timestamp, cron, password and QR. Each exposes `.tool` / `.tool-content` / `.tool-header h2` / `.tool-btn` classes (h2: they sit directly under the page h1). `ToolsView.vue` themes every tool at once by **remapping the site `--color-*` tokens to `--tw-*`** on the grid wrapper (custom-property inheritance into child components), so no per-tool rewrite is needed. A few semantic hex colours (status red/green, JSON syntax) are intentionally left hardcoded.

- Newer tools share `tool-base.css` via `<style scoped src="./tool-base.css">` (header, inputs, buttons, `.kv` result list). Prefer it over copying CSS into a new tool.
- Helpers live next to the tools:
  - `time.js`: Intl date and relative-time formatting.
  - `cron.js`: 5-field cron parser and next-run calculator, Vixie day-of-month/day-of-week OR rule. It was checked against a brute-force minute scan.
  - `json-error.js`: finds the line and column of a JSON syntax error, because Chrome's `JSON.parse` messages often omit the position.
- **Privacy rule:** only IP (`ipinfo.io`, falling back to `ipapi.co`) and DNS (`cloudflare-dns.com`, falling back to `dns.google`, DoH JSON) call external services. Everything else runs in the browser, and the page tells visitors so (`tools.privacy`). QR codes are generated locally with `uqr`; do not reintroduce a QR API. If a CSP is ever added, whitelist those four hosts in `connect-src`.

### Typography and layout gotchas

- Fonts are self-hosted. IBM Plex Mono (OFL) lives in `src/assets/fonts/`, and its `@font-face` rules are in `src/assets/styles/fonts.css` (imported first in `main.js`). `index.html` preloads the 400/600 latin and latin-ext files through `/src/assets/fonts/...` hrefs, and Vite rewrites those to the same hashed URLs the CSS uses. Do not re-add the Google Fonts `<link>`.
- `main.css` has a global `p { font-size: var(--font-size-lg) }` (≈19px). Any `<p>` inside terminal-style UI must set `font-size: inherit`, as `.tw-out p` and `.terminal-welcome p` do. Otherwise text balloons, especially on phones.
- The interactive terminal's ASCII banner has two variants: `.art-wide`, and `.art-narrow` ("Backend" / "Dev" stacked, ≤600px). This keeps it at ≥12px on phones, which is Lighthouse's legible-font-size threshold.

## Deployment (Cloudflare Workers, auto-deploy on push to main)

Since 2026-11-08 the site is a static-assets-only Cloudflare Worker named `portfolio` (`wrangler.jsonc`, serving `dist/`). Workers Builds deploys every push to `main`, with build command `npm run build` and deploy command `npx wrangler deploy`. A failed build leaves the previous version live. Treat pushes to `main` as production deploys.

- `public/_headers` sets the security headers and long-lived caching for hashed `/assets/*`. If you add a CSP, see the privacy rule above for the hosts it must allow.
- **Routing.** The Worker is attached by route `https://ahmetesrefkarabulut.com.tr/*`, not a custom domain, so the apex DNS record still points (proxied) at the server.
  - **http is excluded on purpose:** plain-http requests reach the server's nginx, which 301s to https. That keeps certbot's http-01 renewal working.
  - Two Worker-less routes, defined in the Cloudflare dashboard/API and not in `wrangler.jsonc`, send `/jarvis-ses/*` (the iPhone voice-assistant endpoint) and `/.well-known/acme-challenge/*` to the server. **Do not delete them.**
- The `www` host redirects to the apex through a Cloudflare Redirect Rule (dashboard).

Legacy: `Dockerfile`, `nginx.conf` and `docker-compose.yml` are the old self-hosted setup (nginx container on host port 3000). The SSH deploy workflow was removed. The container is kept running briefly as a rollback target; to roll back, delete the `https://ahmetesrefkarabulut.com.tr/*` route.

## OG image regeneration

`public/og-image.svg` is the editable design source. The referenced asset is `public/og-image.png` (1200×630), regenerated from the SVG with `sharp`:

```powershell
npm install --no-save sharp
node -e "const s=require('sharp'),f=require('fs');s(f.readFileSync('public/og-image.svg')).resize(1200,630).png().toFile('public/og-image.png')"
```

`sharp` is intentionally not in `package.json` (not needed at build/deploy time).
