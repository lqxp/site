<script setup lang="ts">
import { NuxtLink } from '#components'
import { links } from '~/utils/brand'
import type { PlatformId } from '~/utils/release'

const tiles: { id: PlatformId | 'web', name: string, what: string, href: string }[] = [
  { id: 'web', name: 'Browser', what: 'Nothing to install', href: links.app },
  { id: 'windows', name: 'Windows', what: 'MSI installer, x64 and ARM64', href: '/download#windows' },
  { id: 'macos', name: 'macOS', what: 'Apple silicon and Intel', href: '/download#macos' },
  { id: 'linux', name: 'Linux', what: 'AppImage, deb, rpm', href: '/download#linux' },
  { id: 'android', name: 'Android', what: 'APK, runs in the background', href: '/download#android' },
  { id: 'ios', name: 'iOS', what: 'IPA to sideload', href: '/download#ios' },
]
const mine = ref<PlatformId | null>(null)
onMounted(() => { mine.value = detectPlatform()?.id ?? null })
</script>

<template>
  <ul class="tiles">
    <li v-for="(t, i) in tiles" :key="t.id" v-reveal="i" class="pop">
      <component
        :is="t.href.startsWith('http') ? 'a' : NuxtLink"
        v-bind="t.href.startsWith('http') ? { href: t.href, target: '_blank', rel: 'noopener' } : { to: t.href }"
        class="tile state"
        :class="{ mine: mine === t.id }"
      >
        <span class="ico"><PlatformIcon :id="t.id" /></span>
        <span class="name t-title-l">{{ t.name }}</span>
        <span class="what t-body-m">{{ t.what }}</span>
        <Transition name="swap">
          <span v-if="mine === t.id" class="badge t-label-m">Your device</span>
        </Transition>
        <span class="go icon" aria-hidden="true">{{ t.href.startsWith('http') ? 'arrow_outward' : 'arrow_forward' }}</span>
      </component>
    </li>
  </ul>
</template>

<style scoped>
@layer components {
  .tiles { list-style: none; padding: 0; display: grid; gap: var(--s-3); grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 840px) { .tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (max-width: 599px) { .tile { padding: var(--s-5); } .badge { display: none; } }
  .tile {
    position: relative;
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    gap: var(--s-1);
    height: 100%;
    padding: var(--s-6);
    border-radius: var(--r-xl);
    background: var(--surface-container-low);
    color: var(--on-surface);
    transition: background-color var(--dur-effects-slow) var(--ease-effects), color var(--dur-effects-slow) var(--ease-effects);
  }
  .tile:not(.mine):hover { background: var(--surface-container); }
  .tile.mine { background: var(--primary-container); color: var(--on-primary-container); }
  .ico {
    display: grid;
    place-items: center;
    width: var(--s-12);
    height: var(--s-12);
    margin-bottom: var(--s-4);
    border-radius: var(--r-lg);
    background: var(--surface-container-highest);
    transition: background-color var(--dur-effects) var(--ease-effects);
  }
  .mine .ico { background: var(--primary); color: var(--on-primary); }
  .what { color: var(--on-surface-variant); }
  .mine .what { color: inherit; }
  .badge {
    position: absolute;
    top: var(--s-6);
    right: var(--s-5);
    padding: var(--s-1) var(--s-3);
    border-radius: var(--r-full);
    background: var(--primary);
    color: var(--on-primary);
  }
  .go { justify-self: end; margin-top: var(--s-2); opacity: 0.6; transition: translate var(--dur-spatial-fast) var(--ease-spatial-fast), opacity var(--dur-effects) var(--ease-effects); }
  .tile:hover .go { translate: var(--s-1) 0; opacity: 1; }
}
</style>
