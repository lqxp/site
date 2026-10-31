<script setup lang="ts">
import { links } from '~/utils/brand'

useSeoMeta({
  title: 'Privacy policy',
  description: 'QxChat privacy policy for the Android, iOS, desktop and web apps and the servers they connect to: data collected, permissions, sharing, retention, deletion and contact.',
  ogTitle: 'QxChat privacy policy',
  ogUrl: 'https://getqxchat.com/privacy',
})
useHead({ link: [{ rel: 'canonical', href: 'https://getqxchat.com/privacy' }] })

const { data } = await useFetch('/api/privacy')

const chapters = [
  { emoji: '1f440', title: 'What we see', line: 'As little as we can.', from: 1, to: 5 },
  { emoji: '2699_fe0f', title: 'What we do with it', line: 'We run the service, and nothing else.', from: 6, to: 9 },
  { emoji: '1f4aa', title: 'What you control', line: 'Your account, your data, your call.', from: 10, to: 16 },
]
const parts = computed(() => chapters.map(c => ({
  ...c,
  sections: (data.value?.sections ?? []).slice(c.from - 1, c.to),
})))

const summary = [
  { icon: 'lock', title: 'We cannot read your messages', body: 'They are encrypted on your device before they leave it. The server only passes them along.' },
  { icon: 'person_off', title: 'No phone, no email', body: 'A username, a password and 12 recovery words. That is the whole account.' },
  { icon: 'block', title: 'Nothing sold, no trackers', body: 'No ads, no analytics, no crash reporting in the app. We never sell data.' },
  { icon: 'delete', title: 'Delete it yourself', body: 'Settings, Profile, Delete account. It takes effect at once (section 10).' },
]

const active = ref('')
onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting)
        active.value = e.target.id
    }
  }, { rootMargin: '-25% 0px -65% 0px' })
  document.querySelectorAll('.policy section[id]').forEach(s => io.observe(s))
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <div class="pv">
    <header class="hero below-nav">
      <div class="glow" aria-hidden="true"><i /><i /><i /></div>
      <div class="hero-in wrap">
        <Emoji code="1f512" class="hero-emoji enter-pop" />
        <h1 class="title enter-rise" style="--i: 3">Privacy policy</h1>
        <p class="lead enter-rise" style="--i: 4">What QxChat knows about you, what it does with it, and how you stay in control. In plain words.</p>
        <ul class="meta enter-rise" style="--i: 5">
          <li class="chip on"><span class="icon" aria-hidden="true">schedule</span>Effective 1 October 2026</li>
          <li class="chip"><span class="icon" aria-hidden="true">groups</span>QxChat team, <a :href="links.mail">contact@qxch.at</a></li>
        </ul>
      </div>
    </header>

    <section class="wrap sum" aria-label="Summary">
      <article v-for="(s, i) in summary" :key="s.title" v-reveal="i" class="card">
        <span class="icon" aria-hidden="true">{{ s.icon }}</span>
        <h2 class="t-title-m">{{ s.title }}</h2>
        <p class="t-body-m">{{ s.body }}</p>
      </article>
    </section>

    <div class="body wrap">
      <nav class="toc" aria-label="Sections" data-lenis-prevent>
        <p class="guide t-body-s">
          <strong>Google Play reviewers:</strong> Data Safety in <a href="#safety">4</a>, permissions in <a href="#permissions">5</a>,
          sharing in <a href="#sharing">8</a>, retention in <a href="#retention">9</a>, deletion in <a href="#deletion">10</a>,
          contact in <a href="#contact">16</a>.
        </p>
        <div v-for="p in parts" :key="p.title" class="toc-part">
          <span class="t-label-l toc-title">{{ p.title }}</span>
          <a v-for="s in p.sections" :key="s.id" :href="`#${s.id}`" class="t-body-m" :class="{ on: active === s.id }">{{ s.title }}</a>
        </div>
      </nav>

      <article class="policy">
        <section v-for="(p, n) in parts" :key="p.title" class="part">
          <header v-reveal class="part-head">
            <span class="halo" aria-hidden="true" />
            <Emoji :code="p.emoji" class="part-emoji" />
            <span class="part-num" aria-hidden="true">{{ n + 1 }}</span>
            <div>
              <h2 class="part-title">{{ p.title }}</h2>
              <p class="t-body-l muted">{{ p.line }}</p>
            </div>
          </header>
          <section v-for="s in p.sections" :id="s.id" :key="s.id" v-reveal class="sec prose">
            <h3>{{ s.title }}</h3>
            <div v-html="s.html" />
          </section>
        </section>
      </article>
    </div>

    <section class="wrap end">
      <div v-reveal class="cta">
        <p class="t-headline-s">You do not have to take our word for it. The code is public.</p>
        <div class="cluster">
          <MButton :href="links.server" trailing="arrow_outward">Server source</MButton>
          <MButton to="/wiki" variant="tonal">Handbook</MButton>
        </div>
      </div>
      <p class="site t-body-m muted">
        Visiting <strong>getqxchat.com</strong> itself: no analytics, no cookies, no accounts, and nothing loaded from other hosts.
        Only a <code>qx-theme</code> preference in your browser's local storage, never sent anywhere.
      </p>
    </section>
  </div>
</template>

<style scoped>
@layer components {
  .hero { position: relative; isolation: isolate; overflow: clip; padding-bottom: var(--s-16); text-align: center; }
  .glow { position: absolute; inset: 0; z-index: -1; pointer-events: none; mask-image: linear-gradient(#000 55%, transparent); }
  .glow i { position: absolute; border-radius: 50%; background: radial-gradient(closest-side, var(--c), transparent); opacity: 0.55; }
  .glow i:nth-child(1) { top: 2rem; left: 12%; width: 26rem; height: 18rem; --c: var(--primary-container); }
  .glow i:nth-child(2) { top: 6rem; right: 10%; width: 24rem; height: 16rem; --c: var(--tertiary-container); animation-duration: 30s; animation-direction: alternate-reverse; }
  .glow i:nth-child(3) { top: 14rem; left: 38%; width: 22rem; height: 14rem; --c: var(--secondary-container); animation-duration: 20s; }
  @keyframes drift { to { transform: translate(4rem, 2rem) scale(1.15); } }
  .hero-in { display: grid; justify-items: center; gap: var(--s-4); }
  .hero-emoji { --emoji: var(--s-20); }
  .title { font-size: clamp(3rem, 8vw, 5rem); line-height: 0.95; letter-spacing: -0.045em; }
  .lead { max-width: 34rem; font-size: 1.25rem; line-height: 1.5; color: var(--on-surface-variant); }
  .meta { list-style: none; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: var(--s-2); margin-top: var(--s-2); }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: var(--s-2);
    min-height: var(--s-8);
    padding: var(--s-1) var(--s-4) var(--s-1) var(--s-2);
    text-align: start;
    border-radius: var(--r-full);
    background: color-mix(in srgb, var(--surface) 70%, transparent);
    box-shadow: inset 0 0 0 var(--z-hairline) var(--outline-variant);
    backdrop-filter: blur(var(--s-3));
    font-size: 0.875rem;
    color: var(--on-surface-variant);
  }
  .chip.on { background: var(--secondary-container); color: var(--on-secondary-container); box-shadow: none; }
  .chip .icon { font-size: var(--z-icon-sm); }

  .sum { display: grid; gap: var(--s-3); grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); }
  .card { display: grid; gap: var(--s-2); align-content: start; padding: var(--s-6); border-radius: var(--r-xl); background: var(--surface-container-low); }
  .card .icon { display: grid; place-items: center; width: var(--s-10); height: var(--s-10); margin-bottom: var(--s-2); border-radius: var(--r-full); background: var(--primary-container); color: var(--on-primary-container); --fill: 1; font-size: var(--z-icon-sm); }
  .card p { color: var(--on-surface-variant); }

  .body { display: grid; gap: var(--s-10); padding-block: var(--s-16); }
  .toc { display: none; }
  .guide { padding: var(--s-4); border-radius: var(--r-lg); background: var(--surface-container-low); color: var(--on-surface-variant); }
  .toc-part { display: grid; gap: 2px; margin-top: var(--s-6); }
  .toc-title { padding: 0 var(--s-3) var(--s-2); color: var(--on-surface-variant); }
  .toc-part a { display: block; padding: var(--s-1) var(--s-3); border-radius: var(--r-full); color: var(--on-surface-variant); transition: background-color var(--dur-effects) var(--ease-effects), color var(--dur-effects) var(--ease-effects); }
  .toc-part a:hover { background: var(--surface-container); color: var(--on-surface); }
  .toc-part a.on { background: var(--secondary-container); color: var(--on-secondary-container); font-weight: var(--w-semibold); }

  .policy { min-width: 0; display: grid; gap: var(--s-16); }
  .part { display: grid; gap: var(--s-8); }
  .part-head {
    position: relative;
    isolation: isolate;
    display: flex;
    align-items: center;
    gap: var(--s-5);
    padding: var(--s-6);
    border-radius: var(--r-2xl);
    overflow: hidden;
    background: color-mix(in srgb, var(--surface-container-low) 70%, transparent);
  }
  .halo {
    position: absolute;
    inset: -40% auto auto -10%;
    z-index: -1;
    width: 70%;
    aspect-ratio: 2;
    border-radius: 50%;
    background: radial-gradient(closest-side, var(--primary-container), transparent);
    opacity: 0.7;
  }
  .part-emoji { --emoji: var(--s-16); flex: none; }
  .part-num { position: absolute; right: var(--s-6); bottom: calc(var(--s-6) * -1); font-size: 7rem; line-height: 1; font-weight: var(--w-bold); color: var(--on-surface); opacity: 0.06; pointer-events: none; }
  .part-title { font-size: clamp(1.9rem, 4vw, 2.6rem); line-height: 1.05; letter-spacing: -0.03em; }

  .sec { scroll-margin-top: calc(var(--s-24) + var(--s-4)); }
  .sec h3 { margin-top: 0; font-size: 1.45rem; font-weight: var(--w-semibold); }
  .sec > div > :deep(* + *) { margin-top: var(--s-4); }
  .sec :deep(.note) { color: var(--on-surface-variant); font-size: 0.9375rem; }

  @media (min-width: 1200px) {
    .body { grid-template-columns: 17rem minmax(0, 1fr); }
    .toc { display: block; position: sticky; top: calc(var(--s-24) + var(--s-2)); align-self: start; max-height: calc(100dvh - var(--s-24) - var(--s-6)); overflow: auto; overscroll-behavior: contain; }
  }

  .end { display: grid; gap: var(--s-6); }
  .cta { display: grid; gap: var(--s-5); justify-items: start; padding: var(--s-8); border-radius: var(--r-2xl); background: var(--surface-container-high); }
  .site { max-width: var(--z-measure); }

  @media (prefers-reduced-motion: reduce) {
    .glow i { animation: none; }
  }
}
</style>
