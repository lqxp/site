<div align="center">
  <img src="https://getqxchat.com/app-icon-with-name.svg" alt="QxChat logo" width="320" />

  # getqxchat.com — Website & Wiki

  **The public face of QxChat: landing, download hub, and full protocol handbook. Zero tracking, SEO-first.**

  [![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
  [![Nuxt 4](https://img.shields.io/badge/Nuxt-4-00dc82?style=flat-square&logo=nuxt)](./nuxt.config.ts)
  [![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&logo=vue.js)](./app)
  [![Bun](https://img.shields.io/badge/Bun-1.4-f9f1e1?style=flat-square&logo=bun)](./package.json)
  [![Live](https://img.shields.io/badge/live-getqxchat.com-purple?style=flat-square)](https://getqxchat.com)

  <a href="https://getqxchat.com"><strong>Visit the site</strong></a>
  ·
  <a href="https://getqxchat.com/download">Download</a>
  ·
  <a href="https://getqxchat.com/wiki">Wiki</a>
  ·
  <a href="https://qxch.at/app">Web app</a>
  ·
  <a href="https://discord.wf/qxchat">Discord</a>
  ·
  <a href="https://github.com/lqxp">GitHub</a>
</div>

---

## What is this?

`lqxp/site` is the Nuxt 4 source of [getqxchat.com](https://getqxchat.com): the landing page, the per-platform **download hub** (served by the [`/api/download` backend](https://github.com/lqxp/lqxp/blob/main/rust/src/server/download.rs) with live release data, checksums and version history), and the **handbook wiki** — every protocol reference rendered as SEO-friendly `TechArticle` pages with breadcrumbs and canonical URLs.

---

## Features

- ★ **Landing** — animated hero (GSAP + Lenis smooth scroll), philosophy, stack, calls-to-action.
- ★ **Download hub** — live GitHub release aggregation: binaries, checksums, version history per OS.
- ★ **Handbook wiki** — `/wiki/<section>` articles (architecture, PHANTOM, QxCloudSync, anti-abuse…), schema.org markup, legacy anchor redirects.
- ★ **SEO-first** — `@nuxtjs/seo`, sitemap, robots, OG cover, canonical URLs, `index,follow` throughout.
- ★ **Protocol mirror** — [`explain/`](./explain) tracks the canonical specs from [`lqxp/lqxp`](https://github.com/lqxp/lqxp).

---

## Hack on it

```sh
git clone https://github.com/lqxp/site
cd site
bun install
bun run dev        # Nuxt dev server
bun run generate   # static prerender
bun run build      # production build
```

Deploys read the same `explain/` specs as the protocol repo — keep them in sync when documenting protocol changes.

---

<div align="center">
  <sub>Built on Internet · Open source · No tracking</sub>
  <br />
  <a href="https://qxch.at/app">qxch.at/app</a>
  |
  <a href="https://getqxchat.com/download">download</a>
  |
  <a href="https://getqxchat.com/wiki">wiki</a>
  |
  <a href="https://discord.wf/qxchat">discord.wf/qxchat</a>
  |
  <a href="https://github.com/lqxp">github.com/lqxp</a>
</div>
