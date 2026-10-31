<script setup lang="ts">
useSeoMeta({
  title: 'Contribute',
  description: 'Help build QxChat: code for the Rust server and the Vue client, translations, testing, bug reports and documentation. Everything is MIT and on GitHub.',
  ogTitle: 'Contribute to QxChat',
  ogUrl: 'https://getqxchat.com/contribute',
})
useHead({ link: [{ rel: 'canonical', href: 'https://getqxchat.com/contribute' }] })

const ways = [
  {
    emoji: '1f6e0_fe0f',
    title: 'Write code',
    body: 'The server is Rust, the client is Vue and TypeScript, the native apps are Tauri. Pick an open issue or fix something that annoys you, then open a pull request.',
    action: { label: 'Open issues', href: links.issues },
  },
  {
    emoji: '1f30d',
    title: 'Translate',
    body: 'The app speaks English, French, Russian and Spanish. Each language is one JSON file in the client. Fix a string or add your language.',
    action: { label: 'Language files', href: `${links.client}/tree/main/src/i18n` },
  },
  {
    emoji: '1f50e',
    title: 'Test and report bugs',
    body: 'Try the app on your devices and tell us what breaks. A good report says what you did, what you expected, what happened, and on which platform and version.',
    action: { label: 'Report a bug', href: links.issues },
  },
  {
    emoji: '270f_fe0f',
    title: 'Improve the docs',
    body: 'The handbook and this website are Markdown and Vue in one repository. If something was hard to understand, it can be written better.',
    action: { label: 'Website source', href: links.site },
  },
]

const repos = [
  { name: 'lqxp/lqxp', what: 'The server', lang: 'Rust', href: links.server },
  { name: 'lqxp/client', what: 'The web client', lang: 'Vue, TypeScript', href: links.client },
  { name: 'lqxp/app', what: 'Desktop and mobile apps', lang: 'Tauri, Rust', href: links.appRepo },
  { name: 'lqxp/site', what: 'This website and the handbook', lang: 'Nuxt', href: links.site },
]

const github = 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3'

const start = `git clone https://github.com/lqxp/client
cd client
bun install
bun run dev`
</script>

<template>
  <div>
    <PageHero
      emoji="1f973"
      title="Build it with us"
      lead="QxChat is made by volunteers, in the open. You do not need to be a cryptographer to help."
    >
      <span class="chip"><span class="icon" aria-hidden="true">code</span>MIT licence</span>
    </PageHero>

    <section class="wrap">
      <div class="ways">
        <article v-for="(w, i) in ways" :key="w.title" v-reveal="i" class="way">
          <Emoji :code="w.emoji" class="way-emoji" />
          <h2 class="t-title-l">{{ w.title }}</h2>
          <p class="t-body-m muted">{{ w.body }}</p>
          <MButton :href="w.action.href" variant="text" trailing="arrow_outward" class="way-btn">{{ w.action.label }}</MButton>
        </article>
      </div>
    </section>

    <section class="wrap section">
      <h2 v-reveal class="h2">Where the code lives</h2>
      <ul class="repos">
        <li v-for="(r, i) in repos" :key="r.name" v-reveal="i">
          <a :href="r.href" target="_blank" rel="noopener" class="repo">
            <svg class="repo-icon" viewBox="0 0 24 24" aria-hidden="true"><path :d="github" /></svg>
            <span class="repo-text">
              <span class="t-title-m mono">{{ r.name }}</span>
              <span class="t-body-m muted">{{ r.what }}, {{ r.lang }}</span>
            </span>
            <span class="icon" aria-hidden="true">arrow_outward</span>
          </a>
        </li>
      </ul>
    </section>

    <section class="wrap section split-2">
      <div v-reveal>
        <h2 class="h2">Run the client in a minute</h2>
        <p class="t-body-l muted">You need Bun 1.3 or newer. The dev server connects to a QxChat server you choose; to run your own, see <NuxtLink to="/wiki/self-hosting" class="text-link">Run your own server</NuxtLink>.</p>
      </div>
      <CodeBlock v-reveal :code="start" label="Terminal" />
    </section>

    <section class="wrap section">
      <div v-reveal class="cta">
        <Emoji code="1f44b" class="cta-emoji" />
        <div>
          <p class="t-headline-s">Not sure where to start?</p>
          <p class="t-body-l muted">Say hi on Discord and tell us what you like doing. Security problems go to the <NuxtLink to="/security" class="text-link">security page</NuxtLink> instead.</p>
        </div>
        <MButton :href="links.discord" trailing="arrow_outward">Join the Discord</MButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
@layer components {
  .ways { display: grid; gap: var(--s-3); grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); }
  .way { display: grid; grid-template-rows: auto auto 1fr auto; gap: var(--s-2); padding: var(--s-6) var(--s-6) var(--s-4); border-radius: var(--r-2xl); background: var(--surface-container-low); }
  .way-emoji { --emoji: var(--s-12); margin-bottom: var(--s-2); }
  .way-btn { justify-self: start; margin-inline-start: calc(var(--s-3) * -1); margin-top: var(--s-2); }

  .h2 { margin-bottom: var(--s-6); font-size: clamp(1.8rem, 3.5vw, 2.6rem); letter-spacing: -0.03em; line-height: 1.1; }
  .repos { list-style: none; padding: 0; display: grid; gap: var(--s-2); grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr)); }
  .repo { display: flex; align-items: center; gap: var(--s-4); padding: var(--s-4) var(--s-5); border-radius: var(--r-xl); background: var(--surface-container-low); color: var(--on-surface); transition: background-color var(--dur-effects) var(--ease-effects), border-radius var(--dur-spatial) var(--ease-spatial); }
  .repo:hover { background: var(--surface-container-high); border-radius: var(--r-2xl); }
  .repo-icon { width: var(--s-8); height: var(--s-8); flex: none; fill: currentColor; }
  .repo-text { display: grid; flex: 1; min-width: 0; }
  .repo > .icon { color: var(--on-surface-variant); }

  .split-2 { display: grid; gap: var(--s-6); align-items: center; }
  .split-2 .h2 { margin-bottom: var(--s-3); }
  @media (min-width: 900px) { .split-2 { grid-template-columns: 1fr 1fr; } }

  .cta { display: grid; gap: var(--s-5); align-items: center; padding: var(--s-8); border-radius: var(--r-2xl); background: var(--primary-container); color: var(--on-primary-container); }
  .cta .muted { color: var(--on-primary-container); }
  .cta .text-link { color: inherit; text-decoration: underline; }
  .cta-emoji { --emoji: var(--s-16); }
  @media (min-width: 900px) { .cta { grid-template-columns: auto 1fr auto; } }
}
</style>
