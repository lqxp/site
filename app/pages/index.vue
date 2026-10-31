<script setup lang="ts">
import { links } from '~/utils/brand'

useSeoMeta({
  title: 'Encrypted chat you can host yourself',
  description: 'QxChat is an end-to-end encrypted messenger with rooms, calls and file sharing. No phone number, no email. Use the public server at qxch.at or run your own. Free and open source.',
  ogTitle: 'QxChat: encrypted chat you can host yourself',
  ogDescription: 'Rooms, calls and files, encrypted on your device. No phone number, no email. Free, open source, self-hostable.',
  ogUrl: 'https://getqxchat.com/',
})
useHead({
  link: [
    { rel: 'canonical', href: 'https://getqxchat.com/' },
    // The hero screenshot is the LCP: fetch it before the JS chunks.
    { rel: 'preload', as: 'image', href: '/img/overview_black-800.webp', imagesrcset: '/img/overview_black-800.webp 800w, /img/overview_black.webp 1600w', imagesizes: '(min-width: 90rem) 87rem, calc(100vw - 2rem)', fetchpriority: 'high', tagPriority: 'critical' },
  ],
})
useSchemaOrg([{
  '@type': 'SoftwareApplication',
  'name': 'QxChat',
  'url': 'https://getqxchat.com/',
  'applicationCategory': 'CommunicationApplication',
  'operatingSystem': ['Web', 'Windows', 'macOS', 'Linux', 'Android', 'iOS'],
  'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR' },
  'license': 'https://opensource.org/licenses/MIT',
}])

const heroEmoji = [
  { code: '1f92b', label: 'Private' },
  { code: '1f512', label: 'Encrypted' },
  { code: '1f648', label: 'Unseen by the server' },
  { code: '1f427', label: 'Self-hosted' },
]

const privacy = [
  { code: '1f512', title: 'Sealed before it leaves your device', body: 'Room messages are encrypted with AES-256-GCM on your phone or computer, using a key only the room members hold. The server passes along ciphertext it cannot open.' },
  { code: '1f92b', title: 'No phone number. No email.', body: 'An account is a username and a password. You also get 12 recovery words to write down. Nothing else is asked, so nothing else can leak.' },
  { code: '1f47b', title: 'Friends the server cannot map', body: 'Friend requests go through blind mailboxes (QXP-PHANTOM). The server stores sealed envelopes for 24 hours and never holds a list of who knows whom.' },
  { code: '1fae7', title: 'Messages that do not pile up', body: 'The server keeps the last 150 messages of each room in memory and never writes them to disk. A restart wipes them. Your history lives on your devices.' },
]

const { data: stats } = await useFetch<{ stars: number, repos: number } | null>('/api/stats', { default: () => null })

const hostFacts = [
  { icon: 'dns', title: 'One Rust program', body: 'Configured by a single TOML file. Run it with Cargo, Docker or PM2.' },
  { icon: 'database', title: 'SQLite or PostgreSQL', body: 'SQLite out of the box, PostgreSQL when your server grows.' },
  { icon: 'public', title: 'The web app included', body: 'The server hands out the web client, so people only need your address.' },
  { icon: 'call', title: 'Calls on any network', body: 'List your own TURN servers in the config so calls get through strict networks.' },
]

const heroPlatforms = [
  { id: 'windows' as const, name: 'Windows' },
  { id: 'macos' as const, name: 'macOS' },
  { id: 'linux' as const, name: 'Linux' },
  { id: 'android' as const, name: 'Android' },
  { id: 'ios' as const, name: 'iOS' },
  { id: 'web' as const, name: 'Browser' },
]

const faq = [
  { q: 'Is QxChat free?', a: 'Yes. The apps, the server and the public instance at qxch.at cost nothing, and every line is MIT licensed on GitHub.' },
  { q: 'Can the server read my messages?', a: 'Not the content of encrypted rooms: it only relays ciphertext. It does see some metadata while you are connected, such as which rooms you join and when you are online. The handbook lists exactly what.' },
  { q: 'What happens if I forget my password?', a: 'Use your 12 recovery words to set a new one. Without them nobody can get the account back, us included.' },
  { q: 'Where are my messages stored?', a: 'On your devices. The server only keeps the last 150 messages of a room in memory so people can catch up, and loses them when it restarts.' },
  { q: 'Can I run my own server?', a: 'Yes. It is one Rust program with a TOML config, SQLite by default and PostgreSQL when you need it. Point the apps at your domain and invite your people.' },
  { q: 'Do I need to install anything?', a: 'No. qxch.at/app runs in any recent browser. The apps put QxChat on your desktop or home screen, and on Android they keep messages coming while the app is in the background.' },
]
</script>

<template>
  <div class="home">
    <section class="hero" data-night>
      <div class="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div class="hero-in wrap">
        <HeroTitle start="Chat in private," end="host it yourself." :emoji="heroEmoji" />
        <p class="lead enter-rise" style="--i: 8">
          QxChat is an end-to-end encrypted messenger with rooms, calls, files and friends.
          No phone number, no email. Use our server at qxch.at or run your own.
        </p>
        <div class="ctas enter-rise" style="--i: 9">
          <a :href="links.app" class="btn-night primary">
            Open the web app<span class="icon" aria-hidden="true">arrow_outward</span>
          </a>
          <NuxtLink to="/download" class="btn-night ghost">
            <span class="icon" aria-hidden="true">download</span>Download
          </NuxtLink>
        </div>
        <ul class="facts enter-rise" style="--i: 10">
          <li>Free and open source</li>
          <li aria-hidden="true" class="sep" />
          <li class="plats" aria-label="Windows, macOS and iOS, Linux, Android, web">
            <PlatformIcon v-for="p in heroPlatforms.filter(x => x.id !== 'ios')" :id="p.id" :key="p.id" />
          </li>
        </ul>
      </div>
      <div class="shot-wrap wrap">
        <div class="shot">
          <img src="/img/overview_black.webp" srcset="/img/overview_black-800.webp 800w, /img/overview_black.webp 1600w" sizes="(min-width: 90rem) 87rem, calc(100vw - 2rem)" alt="QxChat on a Windows desktop: a conversation in the desktop app" width="1600" height="900" fetchpriority="high">
        </div>
      </div>
    </section>

    <section class="section wrap">
      <header class="head center">
        <Emoji v-reveal code="1f929" class="sec-emoji" />
        <h2 v-reveal class="h2">Everything in one window</h2>
        <p v-reveal="1" class="t-body-l muted">The same app on your desktop, your phone and in a browser tab.</p>
      </header>
      <FeatureTabs v-reveal="2" />
    </section>

    <section class="band" data-night>
      <div class="band-in wrap">
        <header class="band-head">
          <h2 v-reveal class="h2">What the server keeps about you</h2>
          <p v-reveal="1" class="t-body-l">As little as we could manage. Here is what that means in practice.</p>
          <NuxtLink v-reveal="2" to="/wiki/architecture" class="band-link">
            How it works, in detail<span class="icon" aria-hidden="true">arrow_forward</span>
          </NuxtLink>
        </header>
        <ul class="points">
          <li v-for="(p, i) in privacy" :key="p.title" v-reveal="i" class="point">
            <Emoji :code="p.code" class="pe" />
            <div>
              <h3 class="t-title-l">{{ p.title }}</h3>
              <p class="t-body-l">{{ p.body }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <header class="head center wrap">
        <Emoji v-reveal code="1f919" class="sec-emoji" />
        <h2 v-reveal class="h2">In your pocket</h2>
        <p v-reveal="1" class="t-body-l muted">The Android app as it is today, in real screenshots.</p>
      </header>
      <MobileGallery v-reveal="2" />
    </section>

    <section class="section wrap">
      <header class="head">
        <Emoji v-reveal code="1f30d" class="sec-emoji" />
        <h2 v-reveal class="h2">On every screen you own</h2>
        <p v-reveal="1" class="t-body-l muted">
          One account everywhere. On Android the app keeps the connection open in the background,
          so messages arrive without going through Google's or Apple's push servers.
        </p>
      </header>
      <Platforms />
    </section>

    <section class="section wrap">
      <div class="host">
        <div class="host-copy">
          <Emoji v-reveal code="1f427" class="peng" />
          <h2 v-reveal="1" class="h2">Run your own server</h2>
          <p v-reveal="2" class="t-body-l muted">
            Want your group on a machine you control? The server is open source and runs on your own computer or VPS.
            The guide walks you through it, step by step.
          </p>
          <div v-reveal="3" class="cluster">
            <MButton to="/wiki/self-hosting" size="m" icon="menu_book">Self-hosting guide</MButton>
            <MButton :href="links.server" variant="text" trailing="arrow_outward">Source</MButton>
          </div>
        </div>
        <ul class="gets">
          <li v-for="(g, i) in hostFacts" :key="g.title" v-reveal="i" class="get">
            <span class="gi"><span class="icon" aria-hidden="true">{{ g.icon }}</span></span>
            <div>
              <h3 class="t-title-m">{{ g.title }}</h3>
              <p class="t-body-m muted">{{ g.body }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="section wrap people-sec">
      <div v-reveal class="people-card surface low">
        <Emoji code="1f91d" class="hand" />
        <div class="people-copy">
          <h2 class="h2">Made in the open</h2>
          <p class="t-body-l muted">
            The server, the apps and this website are on GitHub. Read the code, report a bug,
            or come talk to the people who write it.
          </p>
          <div class="cluster">
            <MButton :href="links.github" variant="filled" icon="code">GitHub</MButton>
            <MButton :href="links.discord" variant="outlined" icon="forum">Discord</MButton>
          </div>
        </div>
        <dl v-if="stats?.stars" class="numbers">
          <div><Emoji code="2b50" class="ne" /><dt class="t-body-m muted">Stars on GitHub</dt><dd>{{ stats.stars.toLocaleString('en') }}</dd></div>
          <div><Emoji code="1f4e6" class="ne" /><dt class="t-body-m muted">Open repositories</dt><dd>{{ stats.repos }}</dd></div>
        </dl>
        <People class="faces" />
      </div>
    </section>

    <section class="section wrap narrow">
      <header class="head center">
        <Emoji v-reveal code="1f914" class="sec-emoji" />
        <h2 v-reveal class="h2">Questions people ask</h2>
      </header>
      <Faq :items="faq" />
    </section>

    <section class="section wrap">
      <div v-reveal class="end pop">
        <img src="/img/wp_light.webp" srcset="/img/wp_light-800.webp 800w, /img/wp_light.webp 1600w" sizes="100vw" alt="" class="wp only-light" loading="lazy" decoding="async">
        <img src="/img/wp_dark.webp" srcset="/img/wp_dark-800.webp 800w, /img/wp_dark.webp 1600w" sizes="100vw" alt="" class="wp only-dark" loading="lazy" decoding="async">
        <Emoji code="1f44b" class="wave" label="Waving hand" />
        <h2 class="end-title">Come say hi</h2>
        <p class="t-body-l">Pick a username and you are in. It takes less than a minute.</p>
        <div class="cluster center">
          <MButton :href="links.app" size="m" trailing="arrow_outward">Open the web app</MButton>
          <MButton to="/download" size="m" variant="tonal" icon="download">Download</MButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@layer components {
  .h2 { font-size: clamp(2.1rem, 4.6vw, 3.4rem); line-height: 1.04; letter-spacing: -0.035em; }
  .head { display: grid; gap: var(--s-4); max-width: var(--z-measure); margin-bottom: var(--s-10); }
  .head.center { margin-inline: auto; text-align: center; justify-items: center; }
  .sec-emoji { --emoji: var(--s-16); }

  .hero {
    position: relative;
    isolation: isolate;
    overflow: clip;
    padding-top: calc(var(--s-24) + var(--s-12));
    background: var(--night);
    color: var(--on-night);
    border-radius: 0 0 var(--r-2xl) var(--r-2xl);
  }
  .hero-in {
    display: grid;
    justify-items: center;
    gap: var(--s-6);
    text-align: center;
  }
  .lead { max-width: 36rem; color: var(--on-night-2); font-size: 1.125rem; line-height: 1.6; }
  .ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--s-3); margin-top: var(--s-2); }
  .btn-night {
    display: inline-flex;
    align-items: center;
    gap: var(--s-2);
    min-height: var(--z-button-m);
    padding-inline: var(--s-6);
    border-radius: var(--r-full);
    font-weight: var(--w-semibold);
    font-size: 1.05rem;
    transition: border-radius var(--dur-spatial-fast) var(--ease-spatial-fast), scale var(--dur-spatial-fast) var(--ease-spatial-fast), background-color var(--dur-effects) var(--ease-effects);
  }
  .btn-night:active { border-radius: var(--r-lg); scale: 0.97; }
  .btn-night .icon { font-size: var(--z-icon-sm); transition: translate var(--dur-spatial-fast) var(--ease-spatial-fast); }
  .btn-night:hover .icon { translate: calc(var(--s-1) / 2) calc(var(--s-1) / -2); }
  .primary { background: var(--on-night); color: var(--night); }
  .ghost { color: var(--on-night); box-shadow: inset 0 0 0 var(--z-hairline) color-mix(in srgb, var(--on-night) 35%, transparent); }
  .ghost:hover { background: color-mix(in srgb, var(--on-night) 8%, transparent); }
  .facts { list-style: none; padding: 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--s-3) var(--s-5); color: var(--on-night-2); font-size: 0.95rem; }
  .sep { width: var(--z-hairline); height: var(--s-4); background: color-mix(in srgb, var(--on-night) 30%, transparent); }
  .plats { display: flex; gap: var(--s-3); }
  .plats :deep(.pi) { width: var(--z-icon-sm); height: var(--z-icon-sm); font-size: var(--z-icon-sm); opacity: 0.8; }

  .shot-wrap { position: relative; margin-top: var(--s-12); padding-bottom: var(--s-16); perspective: 1200px; perspective-origin: 50% 0%; }

  .shot {
    overflow: hidden;
    border-radius: var(--r-xl);
    box-shadow:
      inset 0 0 0 var(--z-hairline) color-mix(in srgb, var(--on-night) 14%, transparent),
      0 var(--s-16) var(--s-24) calc(var(--s-6) * -1) color-mix(in srgb, black 70%, transparent),
      0 0 var(--s-24) color-mix(in srgb, var(--night-accent) 25%, transparent);
    transform-origin: 50% 100%;
    transform: rotateX(26deg);
    animation: lean linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 55%;
  }
  .shot img { width: 100%; }
  @keyframes lean { from { transform: rotateX(34deg) scale(0.92); } to { transform: rotateX(14deg) scale(1); } }

  .aurora { position: absolute; inset: 0 0 auto; z-index: -1; height: 110%; pointer-events: none; mask-image: linear-gradient(#000 40%, transparent); animation: fade 2.4s var(--ease-out) both; }
  .aurora i { position: absolute; border-radius: 50%; background: radial-gradient(closest-side, var(--c), transparent); will-change: transform; }
  .aurora i:nth-child(1) { top: -15rem; left: 50%; width: 60rem; height: 40rem; margin-left: -40rem; --c: var(--primary-container); opacity: 0.55; animation: drift-a 26s ease-in-out infinite alternate; }
  .aurora i:nth-child(2) { top: -12rem; left: 50%; width: 52rem; height: 34rem; margin-left: -8rem; --c: var(--night-accent); opacity: 0.25; animation: drift-b 34s ease-in-out infinite alternate; }
  .aurora i:nth-child(3) { top: 22rem; left: 50%; width: 44rem; height: 28rem; margin-left: -24rem; --c: var(--night-3); opacity: 0.9; animation: drift-c 22s ease-in-out infinite alternate; }
  @keyframes drift-a { to { transform: translate(11rem, 4rem) scale(1.15) rotate(8deg); } }
  @keyframes drift-b { to { transform: translate(-14rem, 6rem) scale(0.9) rotate(-10deg); } }
  @keyframes drift-c { to { transform: translate(10rem, -3rem) scale(1.2); } }

  .band {
    margin-block: var(--s-8);
    padding-block: var(--s-24);
    background: var(--night);
    color: var(--on-night);
    border-radius: var(--r-2xl);
  }
  .band-in { display: grid; gap: var(--s-12); }
  .band-head { display: grid; gap: var(--s-4); align-content: start; }
  .band-head p { color: var(--on-night-2); max-width: 26rem; }
  .band-link { display: inline-flex; align-items: center; gap: var(--s-2); width: fit-content; color: var(--night-accent); font-weight: var(--w-semibold); }
  .band-link .icon { transition: translate var(--dur-spatial-fast) var(--ease-spatial-fast); }
  .band-link:hover .icon { translate: var(--s-1) 0; }
  .points { list-style: none; padding: 0; display: grid; gap: var(--s-10); }
  .point { display: grid; grid-template-columns: auto 1fr; gap: var(--s-5); align-items: start; }
  .pe { --emoji: var(--s-16); }
  .point h3 { margin-bottom: var(--s-2); }
  .point p { color: var(--on-night-2); }
  @media (min-width: 840px) {
    .band { margin-inline: var(--s-4); }
    .band-in { grid-template-columns: 1fr 1.3fr; }
    .band-head { position: sticky; top: calc(var(--s-24) + var(--s-4)); }
  }

  .host { display: grid; gap: var(--s-10); align-items: center; padding: var(--s-8) var(--s-6); border-radius: var(--r-2xl); background: var(--surface-container-low); }
  .host-copy { display: grid; gap: var(--s-4); justify-items: start; }
  .peng { --emoji: var(--s-16); }
  .gets { list-style: none; padding: 0; display: grid; gap: var(--s-3); }
  .get { display: flex; gap: var(--s-4); align-items: flex-start; padding: var(--s-4) var(--s-5); border-radius: var(--r-lg); background: var(--surface-container); }
  .gi { display: grid; place-items: center; flex: none; width: var(--s-10); height: var(--s-10); border-radius: var(--r-full); background: var(--tertiary-container); color: var(--on-tertiary-container); --fill: 1; }
  .gi .icon { font-size: var(--z-icon-sm); }
  @media (min-width: 840px) { .host { grid-template-columns: 1fr 1.1fr; padding: var(--s-12); } }

  .people-card { --radius: var(--r-2xl); display: grid; gap: var(--s-6); padding: var(--s-8) var(--s-6); position: relative; }
  .hand { --emoji: var(--s-20); }
  .people-copy { display: grid; gap: var(--s-4); max-width: 34rem; }
  .faces { grid-column: 1 / -1; margin-top: var(--s-8); }
  .numbers { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: var(--s-3); }
  .ne { --emoji: var(--s-8); margin-bottom: var(--s-2); }
  .numbers div { display: grid; gap: var(--s-1); min-width: 9rem; padding: var(--s-4) var(--s-5); border-radius: var(--r-lg); background: var(--surface-container); }
  .numbers dd { font-size: 2.2rem; line-height: 1; font-weight: var(--w-semibold); letter-spacing: -0.03em; color: var(--primary); font-variant-numeric: tabular-nums; }
  @media (min-width: 840px) {
    .people-card { grid-template-columns: auto 1fr; padding: var(--s-12); column-gap: var(--s-10); }
    .hand { grid-row: span 2; --emoji: calc(var(--s-24) + var(--s-8)); }
  }

  .end {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: grid;
    justify-items: center;
    gap: var(--s-4);
    padding: var(--s-20) var(--s-6);
    border-radius: var(--r-2xl);
    background: var(--surface-container);
    color: var(--on-surface);
    text-align: center;
  }
  .end .wp { position: absolute; inset: 0; z-index: -1; width: 100%; height: 100%; object-fit: cover; }
  .end p { color: var(--on-surface-variant); }
  .wave { --emoji: var(--s-24); }
  .end-title { font-size: clamp(2.5rem, 7vw, 5rem); line-height: 1; letter-spacing: -0.04em; }
  .cluster.center { justify-content: center; margin-top: var(--s-2); }

  @media (prefers-reduced-motion: reduce) {
    .shot, .aurora, .aurora i { animation: none; }
    .shot { transform: rotateX(18deg); }
  }
}
</style>
