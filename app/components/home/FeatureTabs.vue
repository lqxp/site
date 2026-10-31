<script setup lang="ts">
const tabs = [
  { id: 'rooms', label: 'Rooms', icon: 'forum', emoji: '1f917', title: 'Rooms and direct messages', body: 'Rooms with roles, pins, threads and polls, plus one-to-one conversations. Each room has its own key, kept by its members.', light: 'overview_white', dark: 'overview_black' },
  { id: 'calls', label: 'Calls', icon: 'call', emoji: '1f919', title: 'Voice, video and screen sharing', body: 'Calls run peer to peer over WebRTC, with a TURN relay when your network needs one. Share a window with sound while you talk.', light: 'stream_white', dark: 'stream_black' },
  { id: 'write', label: 'Writing', icon: 'code', emoji: '270f_fe0f', title: 'Markdown, code and files', body: 'Headings, lists, code blocks with a copy button, images, audio and any file you drop in. Everything is encrypted like a message.', light: 'markdown_dark', dark: 'markdown_dark' },
  { id: 'lock', label: 'Lock', icon: 'lock', emoji: '1f512', title: 'A PIN on the app itself', body: 'Client Lock seals what the app keeps on your device. Lock it when you step away; your PIN opens it again.', light: 'lock_white', dark: 'lock_black' },
]
const current = ref('rooms')
const tab = computed(() => tabs.find(t => t.id === current.value)!)
const row = ref<HTMLElement>()
useLens(row, current)

function key(e: KeyboardEvent) {
  const i = tabs.findIndex(t => t.id === current.value)
  const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!d)
    return
  e.preventDefault()
  current.value = tabs[(i + d + tabs.length) % tabs.length]!.id
  nextTick(() => row.value?.querySelector<HTMLElement>('.on')?.focus())
}
</script>

<template>
  <div class="ft">
    <div ref="row" class="tabs lens" role="tablist" aria-label="Features" @keydown="key">
      <span class="lens-active" aria-hidden="true" />
      <span class="lens-hover" aria-hidden="true" />
      <button
        v-for="t in tabs"
        :id="`tab-${t.id}`"
        :key="t.id"
        type="button"
        role="tab"
        data-lens
        class="tab"
        :class="{ on: current === t.id }"
        :aria-selected="current === t.id"
        :aria-controls="`panel-${t.id}`"
        :tabindex="current === t.id ? 0 : -1"
        @click="current = t.id"
      >
        <span class="icon" aria-hidden="true">{{ t.icon }}</span>{{ t.label }}
      </button>
    </div>

    <div :id="`panel-${tab.id}`" class="panel" role="tabpanel" :aria-labelledby="`tab-${tab.id}`">
      <div class="copy">
        <Transition name="text" mode="out-in">
          <div :key="tab.id">
            <Emoji :code="tab.emoji" class="tab-emoji" />
            <h3 class="t-headline-m">{{ tab.title }}</h3>
            <p class="t-body-l muted">{{ tab.body }}</p>
          </div>
        </Transition>
      </div>
      <div class="screen">
        <Transition name="shot">
          <picture :key="tab.id" class="shot">
            <img :src="`/img/${tab.light}.webp`" :srcset="`/img/${tab.light}-800.webp 800w, /img/${tab.light}.webp 1600w`" sizes="(min-width: 840px) 60vw, 100vw" :alt="tab.title" class="only-light" width="1600" height="900" loading="lazy" decoding="async">
            <img :src="`/img/${tab.dark}.webp`" :srcset="`/img/${tab.dark}-800.webp 800w, /img/${tab.dark}.webp 1600w`" sizes="(min-width: 840px) 60vw, 100vw" :alt="tab.title" class="only-dark" width="1600" height="900" loading="lazy" decoding="async">
          </picture>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
@layer components {
  .ft { display: grid; gap: var(--s-8); }
  .tabs {
    --lens-bg: var(--primary);
    display: flex;
    gap: var(--s-1);
    width: fit-content;
    max-width: 100%;
    margin-inline: auto;
    padding: var(--s-1);
    overflow-x: auto;
    scrollbar-width: none;
    border-radius: var(--r-full);
    background: var(--surface-container);
  }
  .tab {
    display: inline-flex;
    align-items: center;
    gap: var(--s-2);
    min-height: var(--z-target);
    padding-inline: var(--s-4) var(--s-5);
    border-radius: var(--r-full);
    color: var(--on-surface-variant);
    font-weight: var(--w-medium);
    white-space: nowrap;
    transition: color var(--dur-effects) var(--ease-effects);
  }
  .tab .icon { font-size: var(--z-icon-sm); }
  @media (max-width: 599px) {
    .tab { padding-inline: var(--s-4); }
    .tab .icon { display: none; }
  }
  .tab.on { color: var(--on-primary); --fill: 1; }

  .panel { display: grid; gap: var(--s-6); align-items: center; }
  .copy { display: grid; min-height: calc(var(--s-24) + var(--s-8)); max-width: 28rem; }
  .copy h3 { margin-bottom: var(--s-3); }
  .tab-emoji { --emoji: var(--s-12); margin-bottom: var(--s-3); }
  .screen { display: grid; }
  .shot {
    grid-area: 1 / 1;
    overflow: hidden;
    border-radius: var(--r-xl);
    box-shadow: var(--elev-3), 0 var(--s-8) var(--s-16) calc(var(--s-6) * -1) color-mix(in srgb, var(--primary) 35%, transparent);
    background: var(--surface-container-high);
  }
  .shot img { width: 100%; height: auto; }

  .text-enter-active { transition: opacity var(--dur-effects-slow) var(--ease-out), translate var(--dur-spatial) var(--ease-spatial); }
  .text-leave-active { transition: opacity var(--dur-effects-fast) var(--ease-effects-fast); }
  .text-enter-from { opacity: 0; translate: 0 var(--s-3); }
  .text-leave-to { opacity: 0; }

  .shot-enter-active { transition: opacity var(--dur-reveal) var(--ease-out), scale var(--dur-spatial-slow) var(--ease-spatial); }
  .shot-leave-active { transition: opacity var(--dur-effects-slow) var(--ease-out), scale var(--dur-effects-slow) var(--ease-out); }
  .shot-enter-from { opacity: 0; scale: 1.04; }
  .shot-leave-to { opacity: 0; scale: 0.98; }

  @media (min-width: 840px) {
    .panel { grid-template-columns: 1fr 2.2fr; gap: var(--s-12); }
  }
}
</style>
