<script setup lang="ts">
import { links } from '~/utils/brand'

const items = [
  { to: '/', label: 'Home' },
  { to: '/download', label: 'Download' },
  { to: '/wiki', label: 'Handbook' },
  { to: '/privacy', label: 'Privacy' },
]
const route = useRoute()
const { y, down, night } = useScrollState()
const { theme, read, toggle } = useTheme()
const { show } = useSnackbar()
const row = ref<HTMLElement>()
const themeBtn = ref<HTMLButtonElement>()
const wiggle = ref(false)

const current = computed(() => items.find(i => (i.to === '/' ? route.path === '/' : route.path.startsWith(i.to)))?.to)
useLens(row, current)

const floating = computed(() => y.value > 8)
const hidden = computed(() => down.value && y.value > 400)

let taps: number[] = []
const toTop = useScrollTop()
function tap(e: MouseEvent) {
  if (route.path === '/') {
    e.preventDefault()
    toTop()
  }
  const now = performance.now()
  taps = [...taps.filter(t => now - t < 1500), now]
  if (taps.length >= 5) {
    taps = []
    wiggle.value = false
    requestAnimationFrame(() => { wiggle.value = true })
    show('Hey, that tickles.', 'forum')
  }
}

onMounted(read)
</script>

<template>
  <header class="nav" :class="{ floating, hidden, night: night && !floating }">
    <div class="bar">
      <NuxtLink to="/" class="brand" :class="{ wiggle }" aria-label="QxChat home" @click="tap">
        <img src="/app-icon-with-name.svg" alt="QxChat" class="logo" width="387" height="78">
      </NuxtLink>

      <nav ref="row" class="links lens" aria-label="Main">
        <span class="lens-active" aria-hidden="true" />
        <span class="lens-hover" aria-hidden="true" />
        <NuxtLink
          v-for="i in items"
          :key="i.to"
          :to="i.to"
          data-lens
          class="link"
          :class="{ on: current === i.to }"
          :aria-current="current === i.to ? 'page' : undefined"
        >
          {{ i.label }}
        </NuxtLink>
      </nav>

      <div class="end">
        <a :href="links.github" target="_blank" rel="noopener" class="round state" aria-label="QxChat on GitHub" title="GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" /></svg>
        </a>
        <button
          ref="themeBtn"
          type="button"
          class="round state"
          :aria-label="theme === 'dark' ? 'Use light theme' : 'Use dark theme'"
          :title="theme === 'dark' ? 'Light theme' : 'Dark theme'"
          @click="toggle(themeBtn)"
        >
          <Transition name="swap">
            <span :key="theme" class="icon" aria-hidden="true">{{ theme === 'dark' ? 'light_mode' : 'dark_mode' }}</span>
          </Transition>
        </button>
        <a :href="links.app" class="cta">
          <span>Open the app</span>
          <span class="icon" aria-hidden="true">arrow_outward</span>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
@layer components {
  .nav {
    --fg: var(--on-surface);
    --fg-2: var(--on-surface-variant);
    position: fixed;
    inset: 0 0 auto;
    z-index: 50;
    display: none;
    justify-content: center;
    padding: max(var(--s-3), env(safe-area-inset-top)) var(--s-4) 0;
    pointer-events: none;
    view-transition-name: nav;
    transition: translate var(--dur-spatial) var(--ease-spatial);
  }
  .nav.hidden { translate: 0 calc(-100% - var(--s-4)); }
  .nav:focus-within { translate: 0 0; }
  .nav.night { --fg: var(--on-night); --fg-2: var(--on-night-2); }

  .bar {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: var(--s-4);
    width: 100%;
    max-width: var(--z-measure-wide);
    min-height: var(--s-16);
    padding: var(--s-2) var(--s-2) var(--s-2) var(--s-5);
    border-radius: var(--r-full);
    color: var(--fg);
    background: color-mix(in srgb, var(--surface-container) 0%, transparent);
    box-shadow: inset 0 0 0 var(--z-hairline) transparent;
    transition:
      max-width var(--dur-spatial-slow) var(--ease-spatial),
      min-height var(--dur-spatial) var(--ease-spatial),
      background-color var(--dur-effects-slow) var(--ease-effects),
      box-shadow var(--dur-effects-slow) var(--ease-effects),
      color var(--dur-effects-slow) var(--ease-effects),
      backdrop-filter var(--dur-effects-slow) var(--ease-effects);
  }
  .floating .bar {
    max-width: calc(var(--z-measure-wide) - var(--s-32) * 2);
    min-height: var(--z-button-m);
    background: color-mix(in srgb, var(--surface-container) 94%, transparent);
    backdrop-filter: blur(var(--s-5)) saturate(1.4);
    box-shadow: inset 0 0 0 var(--z-hairline) color-mix(in srgb, var(--on-surface) 8%, transparent), var(--elev-2);
  }

  .brand { display: inline-flex; align-items: center; }
  .logo { height: 2.1rem; width: auto; }
  .wiggle .logo { animation: wiggle 600ms var(--ease-spatial-fast); }
  @keyframes wiggle { 20% { rotate: -8deg; } 45% { rotate: 7deg; } 70% { rotate: -4deg; } }

  .links {
    --lens-bg: color-mix(in srgb, var(--fg) 12%, transparent);
    display: flex;
    gap: var(--s-1);
    margin-inline: auto;
  }
  .link {
    display: inline-flex;
    align-items: center;
    min-height: var(--z-target-sm);
    padding-inline: var(--s-4);
    border-radius: var(--r-full);
    color: var(--fg-2);
    font-weight: var(--w-medium);
    font-size: 0.95rem;
    white-space: nowrap;
    transition: color var(--dur-effects) var(--ease-effects);
  }
  .link:hover, .link.on { color: var(--fg); }

  .end { display: flex; align-items: center; gap: var(--s-1); }
  .round {
    display: grid;
    place-items: center;
    width: var(--z-target-sm);
    height: var(--z-target-sm);
    border-radius: var(--r-full);
    color: var(--fg-2);
    transition: color var(--dur-effects) var(--ease-effects), scale var(--dur-spatial-fast) var(--ease-spatial-fast), border-radius var(--dur-spatial-fast) var(--ease-spatial-fast);
  }
  .round:hover { color: var(--fg); }
  .round:active { scale: 0.9; border-radius: var(--r-md); }
  .round svg { width: var(--z-icon-sm); height: var(--z-icon-sm); fill: currentColor; }
  .round .icon { grid-area: 1 / 1; font-size: var(--z-icon-sm); }

  .cta {
    display: inline-flex;
    align-items: center;
    gap: var(--s-1);
    min-height: var(--z-target-sm);
    margin-inline-start: var(--s-2);
    padding-inline: var(--s-5) var(--s-4);
    border-radius: var(--r-full);
    background: var(--primary);
    color: var(--on-primary);
    font-weight: var(--w-semibold);
    font-size: 0.95rem;
    white-space: nowrap;
    transition: background-color var(--dur-effects) var(--ease-effects), color var(--dur-effects) var(--ease-effects), border-radius var(--dur-spatial-fast) var(--ease-spatial-fast), scale var(--dur-spatial-fast) var(--ease-spatial-fast);
  }
  .night .cta { background: var(--on-night); color: var(--night); }
  .cta .icon { font-size: var(--z-icon-sm); transition: translate var(--dur-spatial-fast) var(--ease-spatial-fast), rotate var(--dur-spatial-fast) var(--ease-spatial-fast); }
  .cta:hover .icon { translate: calc(var(--s-1) / 2) calc(var(--s-1) / -2); }
  .cta:active { border-radius: var(--r-md); scale: 0.97; }

  @media (min-width: 840px) { .nav { display: flex; } }
}
</style>
