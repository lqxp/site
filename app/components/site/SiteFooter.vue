<script setup lang="ts">
import { links } from '~/utils/brand'

const columns = [
  { title: 'QxChat', items: [
    { label: 'Web app', href: links.app },
    { label: 'Download', to: '/download' },
    { label: 'How it compares', to: '/compare' },
    { label: 'Press kit', to: '/press' },
  ] },
  { title: 'Develop', items: [
    { label: 'Handbook', to: '/wiki' },
    { label: 'Run your own server', to: '/wiki/self-hosting' },
    { label: 'Contribute', to: '/contribute' },
    { label: 'Report a bug', href: links.issues },
  ] },
  { title: 'Legal', items: [
    { label: 'Privacy policy', to: '/privacy' },
    { label: 'Terms of use', to: '/terms' },
    { label: 'Legal notice', to: '/legal' },
    { label: 'Security', to: '/security' },
  ] },
  { title: 'Find us', items: [
    { label: 'GitHub', href: links.github },
    { label: 'Discord', href: links.discord },
    { label: 'Email', href: links.mail },
  ] },
]
const year = new Date().getFullYear()
const toTop = useScrollTop()

const cols = ref<HTMLElement>()
useLens(cols, ref(null))

const { show } = useSnackbar()
const bzh = useBzh()
const breton = ['Degemer mat! (Welcome!)', 'Trugarez! (Thank you!)', 'Kenavo! (Goodbye!)']
let said = 0
let taps: number[] = []
function hello() {
  const now = performance.now()
  taps = [...taps.filter(t => now - t < 2000), now]
  if (taps.length >= 5) {
    taps = []
    bzh.value = !bzh.value
    show(bzh.value ? 'Brezhoneg! Klikit pemp gwech c\'hoazh evit distreiñ.' : 'Back to English. Kenavo!', 'translate')
    return
  }
  show(breton[said++ % breton.length]!, 'favorite')
}
</script>

<template>
  <footer class="foot" data-night>
    <div class="wrap">
      <div class="top">
        <div class="id">
          <a href="#main" class="brand" aria-label="Back to top" @click.prevent="toTop()">
            <img src="/img/logo-white.svg" alt="QxChat" class="logo" width="387" height="78">
          </a>
          <button type="button" class="bzh" @click="hello">
            <svg viewBox="0 0 27 18" aria-hidden="true">
              <rect width="27" height="18" fill="#fff" />
              <path d="M0 0h27v2H0zM0 4h27v2H0zM0 8h27v2H0zM0 12h27v2H0zM0 16h27v2H0z" fill="#000" />
              <rect width="12" height="10" fill="#fff" />
              <path d="M2 1.6h1v1.6l.5 1h-2l.5-1zM6 1.6h1v1.6l.5 1h-2l.5-1zM10 1.6h1v1.6l.5 1h-2l.5-1zM4 5.6h1v1.6l.5 1h-2l.5-1zM8 5.6h1v1.6l.5 1h-2l.5-1z" fill="#000" />
            </svg>
            Made with love in Brittany
          </button>
          <div class="who">
            <strong>QxChat</strong>
            <p>© {{ year }} QxChat contributors. Free software under the MIT licence.</p>
          </div>
        </div>
        <nav ref="cols" class="cols lens" aria-label="Footer">
          <span class="lens-hover" aria-hidden="true" />
          <div v-for="c in columns" :key="c.title">
            <h2 class="col-title">{{ c.title }}</h2>
            <ul>
              <li v-for="i in c.items" :key="i.label">
                <NuxtLink v-if="i.to" :to="i.to" class="fl" data-lens>{{ i.label }}</NuxtLink>
                <a v-else :href="i.href" class="fl" data-lens v-bind="i.href?.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}">{{ i.label }}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div v-reveal class="mark" aria-hidden="true" />
    </div>
  </footer>
</template>

<style scoped>
@layer components {
  .foot {
    margin-top: var(--s-16);
    padding-top: var(--s-16);
    border-radius: var(--r-2xl) var(--r-2xl) 0 0;
    overflow: clip;
    background: var(--night);
    color: var(--on-night);
  }
  .top { display: grid; gap: var(--s-12); }
  .id { display: grid; gap: var(--s-4); align-content: start; justify-items: start; }
  .brand { display: inline-flex; margin-bottom: var(--s-3); transition: scale var(--dur-spatial-fast) var(--ease-spatial-fast); }
  .brand:hover { scale: 1.03; }
  .brand:active { scale: 0.97; }
  .logo { height: 2.75rem; width: auto; }
  .bzh {
    display: inline-flex;
    align-items: center;
    gap: var(--s-2);
    min-height: var(--s-8);
    padding: var(--s-1) var(--s-3);
    border: 0;
    border-radius: var(--r-full);
    background: var(--night-2);
    color: var(--on-night);
    font: inherit;
    font-size: 0.875rem;
    font-weight: var(--w-semibold);
    cursor: pointer;
    transition: background-color var(--dur-effects) var(--ease-effects), border-radius var(--dur-spatial-fast) var(--ease-spatial-fast);
  }
  .bzh { transition: background-color var(--dur-effects) var(--ease-effects), border-radius var(--dur-spatial-fast) var(--ease-spatial-fast), scale var(--dur-spatial-fast) var(--ease-spatial-fast); }
  .bzh:hover { background: var(--night-3); scale: 1.04; }
  .bzh:active { border-radius: var(--r-sm); scale: 0.97; }
  .bzh svg { width: 1.3rem; height: auto; border-radius: 2px; box-shadow: 0 0 0 1px var(--night-3); }
  .who { display: grid; gap: var(--s-1); max-width: 20rem; }
  .who strong { font-weight: var(--w-semibold); }
  .who p { color: var(--on-night-2); line-height: 1.5; }

  .cols { --lens-hover: color-mix(in srgb, var(--on-night) 10%, transparent); display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--s-10) var(--s-4); }
  .col-title { font-size: 1rem; font-weight: var(--w-semibold); color: var(--on-night); }
  .cols ul { list-style: none; padding: 0; display: grid; justify-items: start; gap: 2px; margin: var(--s-3) 0 0 calc(var(--s-3) * -1); }
  .fl { display: inline-flex; padding: var(--s-1) var(--s-3); border-radius: var(--r-full); color: var(--on-night-2); transition: color var(--dur-effects) var(--ease-effects); }
  .fl:hover { color: var(--on-night); }

  .mark {
    width: 100%;
    aspect-ratio: 387 / 48;
    margin-top: var(--s-16);
    background: color-mix(in srgb, var(--primary-container) 55%, var(--night));
    -webkit-mask: url('/img/logo-white.svg') 50% 0 / 100% auto no-repeat;
    mask: url('/img/logo-white.svg') 50% 0 / 100% auto no-repeat;
  }

  .mark.reveal.in { animation: mark-up var(--dur-spatial-slow) var(--ease-spatial-slow) backwards; animation-duration: 1100ms; }
  @keyframes mark-up { from { translate: 0 60%; rotate: 2deg; } }

  @media (max-width: 839px) {
    .foot { padding-bottom: calc(var(--s-24) + env(safe-area-inset-bottom)); }
    .mark { aspect-ratio: 387 / 78; }
  }
  @media (min-width: 840px) {
    .top { grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr); }
    .cols { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
}
</style>
