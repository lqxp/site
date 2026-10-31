<script setup lang="ts">
import { links } from '~/utils/brand'

const tabs = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/download', label: 'Download', icon: 'download' },
  { to: '/wiki', label: 'Handbook', icon: 'menu_book' },
]
const route = useRoute()
const { y, down, night } = useScrollState()
const { theme, read, toggle } = useTheme()
const more = ref(false)
const row = ref<HTMLElement>()
const themeRow = ref<HTMLButtonElement>()

const current = computed(() => (more.value ? 'more' : tabs.find(t => (t.to === '/' ? route.path === '/' : route.path.startsWith(t.to)))?.to ?? 'more'))
useLens(row, current)
const compact = computed(() => down.value && y.value > 200)

watch(() => route.fullPath, () => { more.value = false })

const toTop = useScrollTop()
function home(e: MouseEvent) {
  if (route.path === '/') {
    e.preventDefault()
    toTop()
  }
}
onMounted(read)
</script>

<template>
  <div class="top" :class="{ night: night && y < 8, away: compact }">
    <NuxtLink to="/" class="brand" aria-label="QxChat home" @click="home">
      <img src="/app-icon-with-name.svg" alt="QxChat" class="logo" width="387" height="78">
    </NuxtLink>
    <a :href="links.app" class="open">Open the app</a>
  </div>

  <nav class="tabbar" :class="{ compact }" aria-label="Main">
    <div ref="row" class="tabs lens">
      <span class="lens-active" aria-hidden="true" />
      <NuxtLink
        v-for="t in tabs"
        :key="t.to"
        :to="t.to"
        data-lens
        class="tab"
        :class="{ on: current === t.to }"
        :aria-current="current === t.to ? 'page' : undefined"
      >
        <span class="icon" aria-hidden="true">{{ t.icon }}</span>
        <span class="label">{{ t.label }}</span>
      </NuxtLink>
      <button type="button" data-lens class="tab" :class="{ on: current === 'more' }" :aria-expanded="more" @click="more = true">
        <span class="icon" aria-hidden="true">menu</span>
        <span class="label">More</span>
      </button>
    </div>
  </nav>

  <MSheet v-model="more" title="More">
    <ul class="rows">
      <li>
        <button ref="themeRow" type="button" class="row state" @click="toggle(themeRow)">
          <span class="tile"><span class="icon" aria-hidden="true">{{ theme === 'dark' ? 'light_mode' : 'dark_mode' }}</span></span>
          <span class="t-title-m">{{ theme === 'dark' ? 'Light theme' : 'Dark theme' }}</span>
        </button>
      </li>
      <li>
        <NuxtLink to="/privacy" class="row state">
          <span class="tile"><span class="icon" aria-hidden="true">shield</span></span>
          <span class="t-title-m">Privacy policy</span>
          <span class="icon end" aria-hidden="true">chevron_right</span>
        </NuxtLink>
      </li>
      <li>
        <a :href="links.github" target="_blank" rel="noopener" class="row state">
          <span class="tile"><span class="icon" aria-hidden="true">code</span></span>
          <span class="t-title-m">Source code</span>
          <span class="icon end" aria-hidden="true">arrow_outward</span>
        </a>
      </li>
      <li>
        <a :href="links.discord" target="_blank" rel="noopener" class="row state">
          <span class="tile"><span class="icon" aria-hidden="true">forum</span></span>
          <span class="t-title-m">Discord</span>
          <span class="icon end" aria-hidden="true">arrow_outward</span>
        </a>
      </li>
      <li>
        <a :href="links.issues" target="_blank" rel="noopener" class="row state">
          <span class="tile"><span class="icon" aria-hidden="true">bug_report</span></span>
          <span class="t-title-m">Report a bug</span>
          <span class="icon end" aria-hidden="true">arrow_outward</span>
        </a>
      </li>
    </ul>
  </MSheet>
</template>

<style scoped>
@layer components {
  .top {
    position: absolute;
    inset: 0 0 auto;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-3);
    padding: max(var(--s-3), env(safe-area-inset-top)) var(--s-4) var(--s-3);
    color: var(--on-surface);
  }
  .top.night { color: var(--on-night); }
  .brand { display: inline-flex; align-items: center; }
  .logo { height: 1.8rem; width: auto; }
  .open {
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    min-height: var(--z-target-sm);
    padding-inline: var(--s-4);
    border-radius: var(--r-full);
    background: var(--primary);
    color: var(--on-primary);
    font-weight: var(--w-semibold);
    font-size: 0.9rem;
  }
  .night .open { background: var(--on-night); color: var(--night); }

  .tabbar {
    position: fixed;
    inset: auto var(--s-3) max(var(--s-3), env(safe-area-inset-bottom));
    z-index: 50;
    display: flex;
    justify-content: center;
    pointer-events: none;
    view-transition-name: tabbar;
    animation: rise var(--dur-reveal) var(--ease-spatial) both;
  }
  .tabs {
    --lens-bg: color-mix(in srgb, var(--primary) 16%, transparent);
    pointer-events: auto;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    width: 100%;
    max-width: 26rem;
    height: calc(var(--s-16) + var(--s-1));
    padding: var(--s-1);
    border-radius: var(--r-full);
    background: color-mix(in srgb, var(--surface-container) 95%, transparent);
    backdrop-filter: blur(var(--s-5)) saturate(1.5);
    box-shadow:
      inset 0 0 0 var(--z-hairline) color-mix(in srgb, var(--on-surface) 9%, transparent),
      inset 0 var(--z-hairline) 0 color-mix(in srgb, white 12%, transparent),
      var(--elev-3);
    transition: height var(--dur-spatial) var(--ease-spatial), max-width var(--dur-spatial) var(--ease-spatial);
  }
  .compact .tabs { height: var(--s-12); max-width: 15rem; }
  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: calc(var(--s-1) / 2);
    min-width: var(--z-target);
    border-radius: var(--r-full);
    color: var(--on-surface-variant);
    transition: color var(--dur-effects) var(--ease-effects), scale var(--dur-spatial-fast) var(--ease-spatial-fast);
    -webkit-tap-highlight-color: transparent;
  }
  .tab:active { scale: 0.92; }
  .tab.on { color: var(--primary); --fill: 1; }
  .label { font-size: 0.7rem; font-weight: var(--w-semibold); line-height: 1; transition: opacity var(--dur-effects) var(--ease-effects), height var(--dur-spatial) var(--ease-spatial); height: 1em; overflow: hidden; }
  .compact .label { opacity: 0; height: 0; }

  .rows { list-style: none; padding: 0; display: grid; gap: calc(var(--s-1) / 2); }
  .row {
    display: flex;
    align-items: center;
    gap: var(--s-4);
    width: 100%;
    min-height: var(--z-button-m);
    padding-inline: var(--s-3) var(--s-4);
    border-radius: var(--r-xs);
    background: var(--surface-container-high);
    text-align: start;
  }
  .rows li:first-child .row { border-top-left-radius: var(--r-xl); border-top-right-radius: var(--r-xl); }
  .rows li:last-child .row { border-bottom-left-radius: var(--r-xl); border-bottom-right-radius: var(--r-xl); }
  .tile { display: grid; place-items: center; width: var(--s-10); height: var(--s-10); border-radius: var(--r-md); background: var(--primary-container); color: var(--on-primary-container); --fill: 1; }
  .end { margin-inline-start: auto; color: var(--on-surface-variant); }

  @media (min-width: 840px) {
    .top, .tabbar { display: none; }
  }
}
</style>
