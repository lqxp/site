<div align="center">
  <img src="https://getqxchat.com/app-icon-with-name.svg" alt="QxChat logo" width="320" />

  # getqxchat.com, Website & Wiki

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

`lqxp/site` is the Nuxt 4 source of [getqxchat.com](https://getqxchat.com): the landing page, the per-platform **download hub** (served by the [`/api/download` backend](https://github.com/lqxp/lqxp/blob/main/rust/src/server/download.rs) with live release data, checksums and version history), and the **handbook wiki**, every protocol reference rendered as SEO-friendly `TechArticle` pages with breadcrumbs and canonical URLs.

---

## Features

- **Material 3 Expressive**: colour roles from `@material/material-color-utilities`, M3 shape scale and spring motion, all generated from one token file ([`design/tokens.ts`](./design/tokens.ts)). Design brief in [`design/README.md`](./design/README.md).
- **Alive, not busy**: letters that gain weight near the pointer, Google Noto animated emoji (drawn on canvas, paused off screen), smooth scrolling (Lenis), an oblique app screenshot that straightens as you scroll, M3 fade-through between pages, circular theme switch, a few easter eggs.
- **Phones first**: floating tab bar in the thumb zone, bottom sheets, safe areas, reduced motion respected everywhere.
- **Download hub**: release, contributors and stars fetched from GitHub at build time, so visitors' browsers only talk to this site. Set `GITHUB_TOKEN` when building to avoid GitHub's 60 requests an hour limit; the last good answers are kept in `content/github.json` as a fallback.
- **Handbook**: `/wiki/<page>`, rendered at build time from [`content/handbook`](./content/handbook) and the protocol reference in [`explain/`](./explain) Full-text search uses an index built with the site (`/api/handbook-index.json`), fetched on first keystroke.
- **Other pages**: `/compare` (sourced comparison with other messengers), `/contribute`, `/press` (kit files in `public/brand/`), and `/security`, `/terms`, `/legal` written in Markdown in [`content/pages`](./content/pages).
- **No third parties**: fonts (SN Pro, JetBrains Mono), icons (Material Symbols subset) and emoji are self-hosted. No analytics, no cookies.

---

## Hack on it

```sh
git clone https://github.com/lqxp/site
cd site
bun install
bun run dev        # Nuxt dev server
bun run tokens     # regenerate app/assets/css/tokens.css from design/tokens.ts
bun run icons      # rebuild the Material Symbols subset from the icons the code uses
bun run generate   # static prerender
bun run build      # production build
```

Deploys read the same `explain/` specs as the protocol repo, keep them in sync when documenting protocol changes.

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

## Credits

Animated emoji: [Noto Emoji Animation](https://googlefonts.github.io/noto-emoji-animation/) by Google, CC BY 4.0. Fonts: SN Pro and JetBrains Mono (SIL OFL 1.1). Icons: Material Symbols (Apache-2.0). Brand marks: Simple Icons (CC0).
