<script setup lang="ts">
const route = useRoute()
const page = handbookPage(route.params.id)
if (!page)
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

const { data } = await useFetch(`/api/handbook/${page.id}`)
const { prev, next } = handbookNeighbours(page.id)

const url = `https://getqxchat.com/wiki/${page.id}`

useSeoMeta({
  title: page.title,
  description: page.summary,
  ogTitle: `${page.title} · QxChat handbook`,
  ogDescription: page.summary,
  ogType: 'article',
  ogUrl: url,
})
useHead({ link: [{ rel: 'canonical', href: url }] })

const body = ref<HTMLElement>()
onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        io.unobserve(e.target)
      }
    }
  }, { threshold: 0.25 })
  body.value?.querySelectorAll('.dg').forEach(d => io.observe(d))
  onBeforeUnmount(() => io.disconnect())
})
useSchemaOrg([
  { '@type': 'TechArticle', 'headline': page.title, 'description': page.summary, 'url': url, 'inLanguage': 'en', 'publisher': { '@id': 'https://getqxchat.com/#organization' } },
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://getqxchat.com/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Handbook', 'item': 'https://getqxchat.com/wiki' },
      { '@type': 'ListItem', 'position': 3, 'name': page.title, 'item': url },
    ],
  },
])
</script>

<template>
  <HandbookShell :current="page!.id" :toc="data?.toc" :prev="prev" :next="next">
    <article>
      <header class="head">
        <span class="glow" aria-hidden="true"><i /><i /></span>
        <NuxtLink to="/wiki" class="crumb t-label-l"><span class="icon" aria-hidden="true">arrow_back</span>{{ page!.group }}</NuxtLink>
        <div class="title-row enter-rise">
          <Emoji :code="page!.emoji" class="pi" />
          <h1 class="title">{{ page!.title }}</h1>
        </div>
        <p class="lead enter-rise" style="--i: 1">{{ page!.summary }}</p>
        <ul class="facts enter-rise" style="--i: 2">
          <li><span class="icon" aria-hidden="true">schedule</span>{{ data?.minutes ?? 1 }} min read</li>
          <li v-if="data?.toc?.length"><span class="icon" aria-hidden="true">menu_book</span>{{ data.toc.filter(t => t.depth === 2).length }} sections</li>
        </ul>
      </header>
      <div ref="body" class="prose enter-rise" style="--i: 2" v-html="data?.html" />
    </article>
  </HandbookShell>
</template>

<style scoped>
@layer components {
  .head {
    position: relative;
    isolation: isolate;
    display: grid;
    gap: var(--s-4);
    margin-bottom: var(--s-12);
    padding: var(--s-8);
    border-radius: var(--r-2xl);
    overflow: hidden;
    background: color-mix(in srgb, var(--surface-container-low) 75%, transparent);
  }
  .glow { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
  .glow i { position: absolute; border-radius: 50%; background: radial-gradient(closest-side, var(--c), transparent); opacity: 0.7; }
  .glow i:nth-child(1) { width: 60%; height: 120%; left: -15%; top: -40%; --c: var(--primary-container); }
  .glow i:nth-child(2) { width: 45%; height: 90%; right: -10%; bottom: -50%; --c: var(--tertiary-container); }
  .title-row { display: flex; align-items: center; gap: var(--s-4); }
  .pi { --emoji: var(--s-16); flex: none; }
  .facts { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: var(--s-2); }
  .facts li { display: inline-flex; align-items: center; gap: var(--s-1); padding: var(--s-1) var(--s-3); border-radius: var(--r-full); background: color-mix(in srgb, var(--surface) 70%, transparent); color: var(--on-surface-variant); font-size: 0.875rem; }
  .facts .icon { font-size: var(--s-4); }
  .crumb { display: inline-flex; align-items: center; gap: var(--s-1); width: fit-content; padding: var(--s-1) var(--s-3) var(--s-1) var(--s-2); border-radius: var(--r-full); background: var(--surface-container-high); color: var(--on-surface-variant); transition: background-color var(--dur-effects) var(--ease-effects); }
  .crumb:hover { background: var(--secondary-container); color: var(--on-secondary-container); }
  .crumb .icon { font-size: var(--z-icon-sm); }
  .title { font-size: clamp(2.4rem, 5.5vw, 3.8rem); line-height: 1.02; letter-spacing: -0.04em; }
  .lead { max-width: var(--z-measure); font-size: 1.2rem; line-height: 1.55; color: var(--on-surface-variant); }
}
</style>
