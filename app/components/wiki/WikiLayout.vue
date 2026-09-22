<template>
  <div class="page-wiki-gitbook">
    <div class="gitbook-layout container-fluid">

      <aside class="gitbook-sidebar" :class="{ 'sidebar-open': isMobileSidebarOpen }">
        <div class="sidebar-header">
          <button class="close-sidebar-btn" @click="isMobileSidebarOpen = false" aria-label="Close Sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="sidebar-search">
          <div class="search-input-wrap">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Filter topics..."
              class="search-input"
            />
            <span class="search-kbd">{{ isMac ? '⌘K' : 'Ctrl K' }}</span>
          </div>
        </div>

        <!-- Nav Tree : real route links so crawlers can follow the pagination -->
        <nav class="sidebar-nav" data-lenis-prevent aria-label="Documentation sections">
          <div v-for="group in filteredNavGroups" :key="group.title" class="nav-group">
            <div class="group-title">{{ group.title }}</div>
            <ul class="group-list">
              <li v-for="item in group.items" :key="item.id">
                <NuxtLink
                  :to="`/wiki/${item.id}`"
                  class="nav-link"
                  :class="{ active: current === item.id }"
                  @click="isMobileSidebarOpen = false"
                >
                  <span class="nav-link-text">{{ item.label }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <a href="https://github.com/lqxp/" target="_blank" rel="noopener" class="sidebar-footer-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
            <span>GitHub Organization</span>
          </a>
          <a href="https://discord.wf/qxchat" target="_blank" rel="noopener" class="sidebar-footer-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Discord Community</span>
          </a>
        </div>
      </aside>

      <!-- Mobile Sidebar Toggle Bar -->
      <div class="mobile-top-subnav">
        <button class="mobile-menu-trigger" @click="isMobileSidebarOpen = true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span>Topics Index</span>
        </button>
        <span class="active-topic-badge">{{ trailLabel }}</span>
      </div>

      <main class="gitbook-main">
        <div class="article-inner">

          <!-- Breadcrumbs -->
          <nav class="gitbook-breadcrumbs" aria-label="Breadcrumb">
            <NuxtLink to="/" class="crumb-link">Home</NuxtLink>
            <span class="crumb-sep">/</span>
            <NuxtLink to="/wiki" class="crumb-link">Handbook</NuxtLink>
            <span class="crumb-sep">/</span>
            <span class="crumb-current">{{ trailLabel }}</span>
          </nav>

          <slot />

          <!-- Previous / Next : real links, crawlable pagination -->
          <div v-if="prev || next" class="gitbook-page-nav">
            <NuxtLink
              v-if="prev"
              :to="`/wiki/${prev.id}`"
              class="page-nav-card page-nav-prev"
              rel="prev"
              :aria-label="`Previous: ${prev.label}`"
            >
              <span class="nav-direction">← Previous</span>
              <span class="nav-title">{{ prev.label }}</span>
            </NuxtLink>
            <div v-else></div>

            <NuxtLink
              v-if="next"
              :to="`/wiki/${next.id}`"
              class="page-nav-card page-nav-next"
              rel="next"
              :aria-label="`Next: ${next.label}`"
            >
              <span class="nav-direction">Next →</span>
              <span class="nav-title">{{ next.label }}</span>
            </NuxtLink>
          </div>

        </div>
      </main>

      <aside class="gitbook-toc">
        <div class="toc-inner">
          <div class="toc-title">ON THIS PAGE</div>
          <ul class="toc-list">
            <li v-for="item in allSections" :key="item.id">
              <NuxtLink
                :to="`/wiki/${item.id}`"
                class="toc-link"
                :class="{ active: current === item.id }"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>

          <hr class="toc-divider" />

          <div class="toc-actions">
            <a href="https://discord.wf/qxchat" target="_blank" rel="noopener" class="toc-action-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Ask community on Discord</span>
            </a>
          </div>
        </div>
      </aside>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { wikiGroups, wikiSections, type WikiSection } from '~/utils/wiki'
import '~/assets/css/wiki.css'

defineProps<{
  /** Current section id, or '' on the hub page. */
  current: string
  /** Current crumb label shown in breadcrumbs + mobile badge. */
  trailLabel: string
  prev?: WikiSection | null
  next?: WikiSection | null
}>()

const searchQuery = ref('')
const isMobileSidebarOpen = ref(false)
const isMac = ref(false)

const allSections = wikiSections

const filteredNavGroups = computed(() => {
  if (!searchQuery.value.trim())
    return wikiGroups
  const q = searchQuery.value.toLowerCase()
  return wikiGroups
    .map(g => ({
      title: g.title,
      items: g.items.filter(i => i.label.toLowerCase().includes(q)),
    }))
    .filter(g => g.items.length > 0)
})

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    const input = document.querySelector('.search-input') as HTMLInputElement
    if (input)
      input.focus()
  }
}

onMounted(() => {
  isMac.value = navigator.platform.toUpperCase().includes('MAC')
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
