<script setup lang="ts">
import type { HandbookPage } from '~/utils/handbook'

const props = defineProps<{
  current?: string
  toc?: { id: string, text: string, depth: number }[]
  prev?: HandbookPage | null
  next?: HandbookPage | null
}>()

const sheet = ref(false)
const side = ref<{ focus: () => void }>()
const sheetNav = ref<{ focus: () => void }>()
const active = ref('')

function onKey(e: KeyboardEvent) {
  if ((e.target as HTMLElement).closest('input, textarea, [contenteditable]') || e.metaKey || e.ctrlKey || e.altKey)
    return
  if (e.key === '/') {
    e.preventDefault()
    if (matchMedia('(min-width: 1200px)').matches)
      side.value?.focus()
    else {
      sheet.value = true
      nextTick(() => sheetNav.value?.focus())
    }
  }
  else if (e.key === '[' && props.prev) {
    navigateTo(`/wiki/${props.prev.id}`)
  }
  else if (e.key === ']' && props.next) {
    navigateTo(`/wiki/${props.next.id}`)
  }
}

let io: IntersectionObserver | undefined
function watchHeadings() {
  io?.disconnect()
  if (!props.toc?.length)
    return
  io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting)
        active.value = e.target.id
    }
  }, { rootMargin: '-20% 0px -70% 0px' })
  for (const h of props.toc) {
    const el = document.getElementById(h.id)
    if (el)
      io.observe(el)
  }
}

watch(() => props.toc, () => nextTick(watchHeadings))
onMounted(() => {
  addEventListener('keydown', onKey)
  watchHeadings()
})
onBeforeUnmount(() => {
  removeEventListener('keydown', onKey)
  io?.disconnect()
})
</script>

<template>
  <div class="hb wrap wide below-nav">
    <aside class="drawer" data-lenis-prevent>
      <HandbookNav ref="side" :current="current" />
    </aside>

    <div class="center">
      <div class="pages-btn">
        <MButton variant="tonal" icon="menu_book" @click="sheet = true">Pages</MButton>
      </div>
      <slot />
      <nav v-if="prev || next" class="pager" aria-label="Pages">
        <NuxtLink v-if="prev" :to="`/wiki/${prev.id}`" class="page state" rel="prev">
          <span class="t-label-m muted"><span class="icon" aria-hidden="true">arrow_back</span>Previous</span>
          <span class="t-title-m">{{ prev.title }}</span>
        </NuxtLink>
        <span v-else />
        <NuxtLink v-if="next" :to="`/wiki/${next.id}`" class="page next state" rel="next">
          <span class="t-label-m muted">Next<span class="icon" aria-hidden="true">arrow_forward</span></span>
          <span class="t-title-m">{{ next.title }}</span>
        </NuxtLink>
      </nav>
    </div>

    <aside v-if="toc?.length" class="toc" aria-label="On this page">
      <h2 class="t-label-l muted">On this page</h2>
      <ul>
        <li v-for="h in toc" :key="h.id" :class="`d${h.depth}`">
          <a :href="`#${h.id}`" class="toc-link t-body-m" :class="{ on: active === h.id }">{{ h.text }}</a>
        </li>
      </ul>
    </aside>

    <MSheet v-model="sheet" title="Handbook">
      <HandbookNav ref="sheetNav" :current="current" @go="sheet = false" />
    </MSheet>
  </div>
</template>

<style scoped>
@layer components {
  .hb { display: grid; gap: var(--s-10); align-items: start; }
  .drawer, .toc { display: none; }
  .center { min-width: 0; }
  .pages-btn { margin-bottom: var(--s-6); }

  .drawer {
    position: sticky;
    top: calc(var(--s-24) + var(--s-2));
    max-height: calc(100dvh - var(--s-24) - var(--s-8));
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--s-3);
    border-radius: var(--r-xl);
    background: var(--surface-container-low);
  }
  .toc { position: sticky; top: calc(var(--s-24) + var(--s-2)); }
  .toc ul { list-style: none; padding: 0; display: grid; gap: 2px; margin-top: var(--s-3); border-inline-start: var(--z-hairline) solid var(--outline-variant); }
  .toc .d3 { padding-inline-start: var(--s-3); }
  .toc-link {
    display: block;
    padding: var(--s-1) var(--s-3);
    margin-inline-start: calc(var(--z-hairline) * -1);
    border-inline-start: 3px solid transparent;
    color: var(--on-surface-variant);
    transition: color var(--dur-effects) var(--ease-effects), border-color var(--dur-effects) var(--ease-effects), padding var(--dur-spatial-fast) var(--ease-spatial-fast);
  }
  .toc-link:hover { color: var(--on-surface); }
  .toc-link.on { color: var(--primary); border-color: var(--primary); padding-inline-start: var(--s-4); font-weight: var(--w-semibold); }

  .pager { display: grid; gap: var(--s-3); margin-top: var(--s-16); }
  .page {
    display: grid;
    gap: var(--s-1);
    padding: var(--s-5) var(--s-6);
    border-radius: var(--r-xl);
    background: var(--surface-container-low);
    transition: background-color var(--dur-effects) var(--ease-effects);
  }
  .page:hover { background: var(--surface-container); }
  .page > span:first-child { display: inline-flex; align-items: center; gap: var(--s-1); }
  .page .icon { font-size: var(--z-icon-sm); }
  .next { text-align: end; justify-items: end; }

  @media (min-width: 840px) { .pager { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 1200px) {
    .hb { grid-template-columns: 16rem minmax(0, 1fr) 13rem; }
    .hb:not(:has(.toc)) { grid-template-columns: 16rem minmax(0, 1fr); }
    .drawer, .toc { display: block; }
    .pages-btn { display: none; }
  }
}
</style>
