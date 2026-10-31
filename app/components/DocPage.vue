<script setup lang="ts">
const props = defineProps<{ id: 'security' | 'legal' | 'terms', emoji: string, title: string, lead: string }>()

const { data } = await useFetch(`/api/page/${props.id}`)

const active = ref('')
onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting)
        active.value = e.target.id
    }
  }, { rootMargin: '-25% 0px -65% 0px' })
  document.querySelectorAll('.doc-body section[id]').forEach(s => io.observe(s))
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <div>
    <PageHero :emoji="emoji" :title="title" :lead="lead">
      <slot name="meta" />
    </PageHero>

    <div class="doc wrap">
      <nav class="toc" aria-label="Sections" data-lenis-prevent>
        <span class="t-label-l toc-title">On this page</span>
        <a v-for="s in data?.sections" :key="s.id" :href="`#${s.id}`" class="t-body-m" :class="{ on: active === s.id }">{{ s.title }}</a>
      </nav>

      <article class="doc-body">
        <div v-if="data?.intro" class="intro prose enter-rise" style="--i: 3" v-html="data.intro" />
        <section v-for="s in data?.sections" :id="s.id" :key="s.id" v-reveal class="sec prose">
          <h2>{{ s.title }}</h2>
          <div v-html="s.html" />
        </section>
        <slot />
      </article>
    </div>
  </div>
</template>

<style scoped>
@layer components {
  .doc { display: grid; gap: var(--s-10); padding-bottom: var(--s-16); }
  .toc { display: none; }
  .toc-title { display: block; padding: 0 var(--s-3) var(--s-2); color: var(--on-surface-variant); }
  .toc a { display: block; padding: var(--s-1) var(--s-3); border-radius: var(--r-full); color: var(--on-surface-variant); transition: background-color var(--dur-effects) var(--ease-effects), color var(--dur-effects) var(--ease-effects); }
  .toc a:hover { background: var(--surface-container); color: var(--on-surface); }
  .toc a.on { background: var(--secondary-container); color: var(--on-secondary-container); font-weight: var(--w-semibold); }

  .doc-body { min-width: 0; display: grid; gap: var(--s-4); }
  .intro { padding: var(--s-6); border-radius: var(--r-2xl); background: var(--surface-container-low); font-size: 1.15rem; }
  .sec { padding: var(--s-6) var(--s-6) var(--s-8); border-radius: var(--r-xl); scroll-margin-top: calc(var(--s-24) + var(--s-4)); transition: background-color var(--dur-effects) var(--ease-effects); }
  .sec:target { background: var(--surface-container-low); }
  .sec h2 { margin-top: 0; font-size: clamp(1.5rem, 3vw, 1.9rem); }
  .sec > div > :deep(* + *) { margin-top: var(--s-4); }
  .sec :deep(a), .intro :deep(a) { color: var(--primary); text-decoration: underline; text-underline-offset: 0.2em; text-decoration-thickness: 1px; }
  .sec :deep(ol) { padding-inline-start: var(--s-6); }
  .sec :deep(em) { color: var(--on-surface-variant); }

  @media (min-width: 1100px) {
    .doc { grid-template-columns: 15rem minmax(0, 1fr); }
    .toc { display: grid; gap: 2px; position: sticky; top: calc(var(--s-24) + var(--s-2)); align-self: start; max-height: calc(100dvh - var(--s-24) - var(--s-6)); overflow: auto; overscroll-behavior: contain; }
  }
}
</style>
