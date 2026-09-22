<template>
  <WikiLayout current="" trail-label="Handbook">
    <header class="article-header">
      <div class="article-tag">DOCUMENTATION</div>
      <h1 class="article-title">QxChat Handbook.</h1>
      <p class="article-lead">
        QxChat is built on the core belief that communication tools should be transparent, self-hosted, and free from centralized control. Pick a topic below.
      </p>
    </header>

    <div class="wiki-hub-groups">
      <section v-for="group in wikiGroups" :key="group.title" aria-label="group.title">
        <h2 class="wiki-hub-group-title">{{ group.title }}</h2>
        <div class="wiki-hub-grid">
          <NuxtLink
            v-for="item in group.items"
            :key="item.id"
            :to="`/wiki/${item.id}`"
            class="wiki-hub-card"
          >
            <h3>{{ item.label }}</h3>
            <p>{{ item.teaser }}</p>
            <span class="hub-card-cta">Read the guide →</span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </WikiLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { wikiGroups, wikiSections, wikiSectionById } from '~/utils/wiki'

useSeoMeta({
  title: 'Handbook & Documentation',
  description: 'Explore the QxChat philosophy, zero-logs E2EE architecture, self-hosting model, QXP-PHANTOM protocol, and open-source stack (Rust, Vue 3, Tauri v2).',
  ogTitle: 'QxChat Handbook & Documentation',
  ogDescription: 'Zero-logs E2EE architecture, self-hosting model, client-side encryption, and the full open-source stack explained.',
  ogType: 'website',
  ogUrl: 'https://getqxchat.com/wiki',
  ogImage: 'https://getqxchat.com/og-cover.jpg',
  twitterCard: 'summary_large_image',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://getqxchat.com/wiki' }],
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    '@id': 'https://getqxchat.com/wiki#webpage',
    url: 'https://getqxchat.com/wiki',
    name: 'QxChat Handbook & Documentation',
    isPartOf: { '@id': 'https://getqxchat.com/#website' },
    inLanguage: 'en',
    description: 'Index of all QxChat handbook guides: philosophy, architecture, and full protocol reference.',
  },
  {
    '@type': 'ItemList',
    name: 'QxChat Handbook guides',
    itemListElement: wikiSections.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.label,
      url: `https://getqxchat.com/wiki/${s.id}`,
    })),
  },
])

// Legacy support: /wiki#<section> (old single-page anchors) → /wiki/<section>
onMounted(() => {
  if (typeof window === 'undefined')
    return
  const hash = window.location.hash.replace(/^#/, '')
  if (hash && wikiSectionById(hash)) {
    window.location.replace(`/wiki/${hash}`)
  }
})
</script>
