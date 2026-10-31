<script setup lang="ts">
useSeoMeta({
  title: 'How QxChat compares',
  description: 'QxChat next to Element, Signal, WhatsApp, Telegram and Discord: phone number, email, encryption by default, self-hosting, open source and what the server keeps. Facts only, with sources.',
  ogTitle: 'How QxChat compares',
  ogUrl: 'https://getqxchat.com/compare',
})
useHead({ link: [{ rel: 'canonical', href: 'https://getqxchat.com/compare' }] })

type V = 'yes' | 'no' | 'partly'
interface Cell { v: V, note?: string }

const names = ['QxChat', 'Signal', 'WhatsApp', 'Telegram', 'Discord', 'Element']

const data: { q: string, cells: Cell[] }[] = [
  {
    q: 'Sign up without a phone number',
    cells: [
      { v: 'yes' },
      { v: 'no', note: 'Required. Usernames hide it from others.' },
      { v: 'no' },
      { v: 'no' },
      { v: 'yes', note: 'Asks for an email instead.' },
      { v: 'yes', note: 'Depends on the server.' },
    ],
  },
  {
    q: 'Sign up without an email address',
    cells: [
      { v: 'yes' },
      { v: 'yes' },
      { v: 'yes' },
      { v: 'yes' },
      { v: 'no' },
      { v: 'partly', note: 'Depends on the server.' },
    ],
  },
  {
    q: 'Messages end-to-end encrypted by default',
    cells: [
      { v: 'yes', note: 'In private rooms.' },
      { v: 'yes' },
      { v: 'yes' },
      { v: 'no', note: 'Only in "secret chats", one to one, turned on by hand.' },
      { v: 'no', note: 'Text is not end-to-end encrypted. Calls are, since 2026.' },
      { v: 'yes', note: 'In private rooms.' },
    ],
  },
  {
    q: 'Run your own server',
    cells: [
      { v: 'yes' },
      { v: 'no', note: 'The server code is public, but the apps only talk to Signal.' },
      { v: 'no' },
      { v: 'no' },
      { v: 'no' },
      { v: 'yes' },
    ],
  },
  {
    q: 'Server code is open source',
    cells: [
      { v: 'yes', note: 'MIT' },
      { v: 'yes', note: 'AGPL' },
      { v: 'no' },
      { v: 'no', note: 'Telegram chose not to publish it.' },
      { v: 'no' },
      { v: 'yes' },
    ],
  },
  {
    q: 'App code is open source',
    cells: [
      { v: 'yes', note: 'MIT' },
      { v: 'yes', note: 'AGPL' },
      { v: 'no' },
      { v: 'yes', note: 'GPL, with verifiable builds.' },
      { v: 'no' },
      { v: 'yes' },
    ],
  },
  {
    q: 'Server forgets your messages',
    cells: [
      { v: 'partly', note: 'Keeps the last 150 per room, in memory only. Gone on restart.' },
      { v: 'yes', note: 'Holds them encrypted only until delivered.' },
      { v: 'yes', note: 'Holds them encrypted until delivered, at most 30 days.' },
      { v: 'no', note: 'Cloud chats are stored on Telegram\'s servers.' },
      { v: 'no', note: 'Keeps all history, readable by Discord.' },
      { v: 'no', note: 'Keeps all history, encrypted in private rooms.' },
    ],
  },
]

// Columns ordered best to worst: yes = 1, partly = 0.5, no = 0
const points: Record<V, number> = { yes: 1, partly: 0.5, no: 0 }
const order = names.map((_, i) => i)
  .sort((a, b) => data.reduce((n, r) => n + points[r.cells[b]!.v] - points[r.cells[a]!.v], 0))
const apps = order.map(i => names[i]!)
const rows = data.map(r => ({ q: r.q, cells: order.map(i => r.cells[i]!) }))

const icon: Record<V, string> = { 'yes': 'check', 'no': 'close', 'partly': 'remove' }
const label: Record<V, string> = { yes: 'Yes', no: 'No', partly: 'Partly' }

const sources = ([
  { app: 'Signal', text: 'Phone number still required with usernames', url: 'https://signal.org/blog/phone-number-privacy-usernames/' },
  { app: 'Signal', text: 'Server source code (AGPL)', url: 'https://github.com/signalapp/Signal-Server' },
  { app: 'WhatsApp', text: 'Security and end-to-end encryption', url: 'https://www.whatsapp.com/security' },
  { app: 'WhatsApp', text: 'Privacy policy, undelivered messages kept up to 30 days', url: 'https://www.whatsapp.com/legal/privacy-policy?lang=en' },
  { app: 'Telegram', text: 'FAQ: cloud chats and secret chats', url: 'https://telegram.org/faq#secret-chats' },
  { app: 'Telegram', text: 'End-to-end encryption in secret chats', url: 'https://core.telegram.org/api/end-to-end' },
  { app: 'Telegram', text: 'Open-source apps', url: 'https://telegram.org/apps#source-code' },
  { app: 'Telegram', text: 'FAQ: why the server code is not published', url: 'https://telegram.org/faq#q-can-i-get-telegram-39s-server-side-code' },
  { app: 'Discord', text: 'DAVE: end-to-end encryption for audio and video', url: 'https://discord.com/blog/meet-dave-e2ee-for-audio-video' },
  { app: 'Discord', text: 'Every voice and video call is now end-to-end encrypted', url: 'https://discord.com/blog/every-voice-and-video-call-on-discord-is-now-end-to-end-encrypted' },
  { app: 'Element', text: 'End-to-end encryption by default in Matrix (2020)', url: 'https://matrix.org/blog/2020/05/06/cross-signing-and-end-to-end-encryption-by-default-is-here/' },
  { app: 'Element', text: 'Synapse, the server you can host', url: 'https://element-hq.github.io/synapse/latest/' },
  { app: 'QxChat', text: 'Message storage and the encryption envelope', url: '/wiki/message-transport' },
]).sort((a, b) => apps.indexOf(a.app) - apps.indexOf(b.app))
</script>

<template>
  <div>
    <PageHero
      emoji="1f9d0"
      title="How QxChat compares"
      lead="Six messengers, seven questions that matter for privacy. Each answer comes from the service's own documentation, linked at the bottom."
    >
      <span class="chip"><span class="icon" aria-hidden="true">schedule</span>Checked in October 2026</span>
    </PageHero>

    <section class="wrap">
      <div v-reveal class="scroller" tabindex="0" role="region" aria-label="Comparison table">
        <table class="cmp">
          <thead>
            <tr>
              <th scope="col"><span class="sr-only">Question</span></th>
              <th v-for="(a, i) in apps" :key="a" scope="col" :class="{ us: i === 0 }">{{ a }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in rows" :key="r.q">
              <th scope="row">{{ r.q }}</th>
              <td v-for="(c, i) in r.cells" :key="i" :class="{ us: i === 0 }">
                <span class="mark" :class="c.v">
                  <span class="icon" aria-hidden="true">{{ icon[c.v] }}</span>
                  <span class="sr-only">{{ label[c.v] }}</span>
                </span>
                <span v-if="c.note" class="note">{{ c.note }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-reveal class="t-body-m muted fine">
        Services change. If something here is out of date, tell us at
        <a href="mailto:contact@qxch.at">contact@qxch.at</a> and we will fix it.
      </p>
    </section>

    <section class="wrap section">
      <h2 v-reveal class="h2">Sources</h2>
      <ul class="src">
        <li v-for="s in sources" :key="s.url" v-reveal>
          <span class="app t-label-l">{{ s.app }}</span>
          <a :href="s.url" v-bind="s.url.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}" class="text-link">{{ s.text }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
@layer components {
  /* contain: paint keeps the wide table from stretching the mobile layout viewport (layout shift on load). */
  .scroller { overflow-x: auto; contain: paint; border-radius: var(--r-xl); background: var(--surface-container-low); }
  .cmp { width: 100%; min-width: 56rem; border-collapse: separate; border-spacing: 0; font-size: 0.95rem; }
  .cmp th, .cmp td { padding: var(--s-4); text-align: start; vertical-align: top; }
  .cmp thead th { position: sticky; top: 0; background: var(--surface-container); font-weight: var(--w-semibold); font-size: 1rem; }
  .cmp thead th:first-child { border-top-left-radius: var(--r-xl); }
  .cmp thead th:last-child { border-top-right-radius: var(--r-xl); }
  .cmp tbody th { position: sticky; left: 0; z-index: 1; min-width: 13rem; background: var(--surface-container-low); font-weight: var(--w-medium); color: var(--on-surface); }
  .cmp tbody tr + tr :is(th, td) { border-top: var(--z-hairline) solid var(--outline-variant); }
  .cmp .us { background: color-mix(in srgb, var(--primary) 9%, var(--surface-container-low)); }
  .cmp thead .us { background: var(--primary-container); color: var(--on-primary-container); }
  .mark { display: inline-grid; place-items: center; width: var(--s-8); height: var(--s-8); border-radius: var(--r-full); }
  .mark .icon { font-size: var(--z-icon-sm); --fill: 1; }
  .mark.yes { background: var(--primary); color: var(--on-primary); }
  .mark.no { background: var(--surface-container-highest); color: var(--on-surface-variant); }
  .mark.partly { background: var(--secondary-container); color: var(--on-secondary-container); }
  .note { display: block; margin-top: var(--s-2); color: var(--on-surface-variant); font-size: 0.85rem; line-height: 1.4; }
  .fine { margin-top: var(--s-4); }
  .fine a { color: var(--primary); }

  .h2 { margin-bottom: var(--s-6); font-size: clamp(1.8rem, 3.5vw, 2.6rem); letter-spacing: -0.03em; }
  .src { list-style: none; padding: 0; display: grid; gap: var(--s-2); max-width: var(--z-measure); }
  .src li { display: flex; align-items: baseline; gap: var(--s-3); padding: var(--s-3) var(--s-4); border-radius: var(--r-md); background: var(--surface-container-low); }
  .app { flex: none; width: 5.5rem; color: var(--on-surface-variant); }
}
</style>
