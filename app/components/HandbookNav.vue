<script setup lang="ts">
const props = defineProps<{ current?: string }>()
const emit = defineEmits<{ go: [] }>()
const q = ref('')
const field = ref<HTMLInputElement>()

const groups = computed(() => {
  const needle = q.value.trim().toLowerCase()
  if (!needle)
    return handbookGroups
  return handbookGroups
    .map(g => ({ ...g, pages: g.pages.filter(p => `${p.title} ${p.summary}`.toLowerCase().includes(needle)) }))
    .filter(g => g.pages.length)
})

interface Hit { key: string, to: string, page: string, emoji: string, section: string, before: string, match: string, after: string }
type Index = { id: string, title: string, emoji: string, sections: { id: string, title: string, text: string }[] }[]
const index = shallowRef<Index>()
let loading: Promise<void> | undefined
function load() {
  loading ??= $fetch<Index>('/api/handbook-index.json').then((d) => { index.value = d }).catch(() => { loading = undefined })
}
watch(q, v => v.trim().length > 1 && load())

const hits = computed<Hit[]>(() => {
  const needle = q.value.trim().toLowerCase()
  if (needle.length < 2 || !index.value)
    return []
  const out: Hit[] = []
  for (const p of index.value) {
    let n = 0
    for (const s of p.sections) {
      const hay = `${s.title} ${s.text}`
      const at = hay.toLowerCase().indexOf(needle)
      if (at < 0)
        continue
      const from = Math.max(0, hay.lastIndexOf(' ', Math.max(0, at - 40)) + 1)
      const to = Math.min(hay.length, at + needle.length + 70)
      out.push({
        key: `${p.id}#${s.id}`,
        to: `/wiki/${p.id}${s.id ? `#${s.id}` : ''}`,
        page: p.title,
        emoji: p.emoji,
        section: s.title,
        before: (from > 0 ? '…' : '') + hay.slice(from, at),
        match: hay.slice(at, at + needle.length),
        after: hay.slice(at + needle.length, to) + (to < hay.length ? '…' : ''),
      })
      if (++n === 3)
        break
    }
    if (out.length >= 12)
      break
  }
  return out
})

defineExpose({ focus: () => field.value?.focus() })
</script>

<template>
  <nav class="hn" aria-label="Handbook">
    <label class="search">
      <span class="icon" aria-hidden="true">search</span>
      <span class="sr-only">Search the handbook</span>
      <input ref="field" v-model="q" type="search" placeholder="Search the handbook" autocomplete="off">
      <kbd aria-hidden="true">/</kbd>
    </label>
    <section v-for="g in groups" :key="g.title" class="group">
      <h2 class="t-label-l muted">{{ g.title }}</h2>
      <ul>
        <li v-for="p in g.pages" :key="p.id">
          <NuxtLink
            :to="`/wiki/${p.id}`"
            class="item state"
            :class="{ on: props.current === p.id }"
            :aria-current="props.current === p.id ? 'page' : undefined"
            @click="emit('go')"
          >
            {{ p.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>
    <section v-if="hits.length" class="group">
      <h2 class="t-label-l muted">In the text</h2>
      <ul>
        <li v-for="h in hits" :key="h.key">
          <NuxtLink :to="h.to" class="hit state" @click="emit('go')">
            <span class="hit-where t-label-m">{{ h.page }}<template v-if="h.section"> › {{ h.section }}</template></span>
            <span class="hit-text t-body-s">{{ h.before }}<mark>{{ h.match }}</mark>{{ h.after }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
    <p v-if="!groups.length && !hits.length && index" class="t-body-m muted empty">Nothing matches “{{ q }}”.</p>
  </nav>
</template>

<style scoped>
@layer components {
  .hn { display: grid; gap: var(--s-5); }
  .search {
    display: flex;
    align-items: center;
    gap: var(--s-2);
    min-height: var(--z-target);
    padding-inline: var(--s-4) var(--s-2);
    border-radius: var(--r-full);
    background: var(--surface-container-high);
    color: var(--on-surface-variant);
    transition: border-radius var(--dur-spatial-fast) var(--ease-spatial-fast), box-shadow var(--dur-effects) var(--ease-effects);
  }
  .search:focus-within { border-radius: var(--r-lg); box-shadow: inset 0 0 0 calc(var(--z-hairline) * 2) var(--primary); }
  .search .icon { font-size: var(--z-icon-sm); }
  .search input { flex: 1; width: 100%; min-width: 0; border: 0; background: none; outline: none; color: var(--on-surface); }
  .search input::-webkit-search-cancel-button { display: none; }
  kbd { padding: 0 var(--s-2); border-radius: var(--r-xs); background: var(--surface-container-highest); font-size: 0.8rem; }
  .group h2 { padding: 0 var(--s-4) var(--s-2); }
  .group ul { list-style: none; padding: 0; display: grid; gap: 2px; }
  .item {
    display: flex;
    align-items: center;
    min-height: var(--z-target-sm);
    padding-inline: var(--s-4);
    border-radius: var(--r-full);
    color: var(--on-surface-variant);
    font-weight: var(--w-medium);
    transition: background-color var(--dur-effects) var(--ease-effects), color var(--dur-effects) var(--ease-effects), padding var(--dur-spatial-fast) var(--ease-spatial-fast);
  }
  .item:hover { padding-inline-start: var(--s-5); color: var(--on-surface); }
  .item.on { background: var(--secondary-container); color: var(--on-secondary-container); font-weight: var(--w-semibold); }
  .empty { padding-inline: var(--s-4); }
  .hit { display: grid; gap: 2px; padding: var(--s-2) var(--s-4); border-radius: var(--r-lg); color: var(--on-surface-variant); transition: background-color var(--dur-effects) var(--ease-effects); }
  .hit:hover { background: var(--surface-container-high); }
  .hit-where { color: var(--primary); }
  .hit-text { overflow-wrap: anywhere; }
  .hit mark { padding: 0 2px; border-radius: var(--r-xs); background: var(--primary-container); color: var(--on-primary-container); }
}
</style>
