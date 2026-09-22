<template>
  <WikiLayout
    :current="section.id"
    :trail-label="section.label"
    :prev="prevNext.prev"
    :next="prevNext.next"
  >
    <header class="article-header">
      <div class="article-tag">{{ section.group }}</div>
      <h1 class="article-title">{{ pageH1 }}</h1>
      <p class="article-lead">{{ section.seoDescription }}</p>
    </header>

    <WikiSections :section="section.id" />
  </WikiLayout>
</template>

<script setup lang="ts">
import { wikiSectionById, wikiPrevNext } from '~/utils/wiki'

const route = useRoute()
const rawSection = Array.isArray(route.params.section)
  ? route.params.section[0]
  : route.params.section

const section = wikiSectionById(rawSection)
if (!section) {
  throw createError({ statusCode: 404, statusMessage: 'Documentation page not found', fatal: true })
}

// "Why QxChat exists" (label) is already a good h1; strip a trailing period if any.
const pageH1 = section.label
const prevNext = wikiPrevNext(section.id)
const pageUrl = `https://getqxchat.com/wiki/${section.id}`

useSeoMeta({
  title: section.seoTitle,
  description: section.seoDescription,
  ogTitle: `${section.label} — QxChat Handbook`,
  ogDescription: section.seoDescription,
  ogType: 'article',
  ogUrl: pageUrl,
  ogImage: 'https://getqxchat.com/og-cover.jpg',
  twitterCard: 'summary_large_image',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
})

useSchemaOrg([
  {
    '@type': 'TechArticle',
    '@id': `${pageUrl}#article`,
    url: pageUrl,
    headline: `${section.label} — QxChat Handbook`,
    description: section.seoDescription,
    inLanguage: 'en',
    author: { '@id': 'https://getqxchat.com/#organization' },
    publisher: { '@id': 'https://getqxchat.com/#organization' },
    isPartOf: { '@id': 'https://getqxchat.com/#website' },
  },
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getqxchat.com/' },
      { '@type': 'ListItem', position: 2, name: 'Handbook', item: 'https://getqxchat.com/wiki' },
      { '@type': 'ListItem', position: 3, name: section.label, item: pageUrl },
    ],
  },
])
</script>
