<script setup lang="ts">
defineProps<{ emoji: string, title: string, lead?: string }>()

const cookie = `polygon(${Array.from({ length: 144 }, (_, i) => {
  const a = (i / 144) * Math.PI * 2
  const r = 46 + 4 * Math.cos(9 * a)
  return `${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`
}).join(', ')})`
</script>

<template>
  <header class="ph below-nav">
    <div class="wrap ph-in">
      <div class="ph-badge enter-pop">
        <span class="ph-shape" :style="{ clipPath: cookie }" aria-hidden="true" />
        <Emoji :code="emoji" class="ph-emoji" />
      </div>
      <h1 class="ph-title enter-rise" style="--i: 1">{{ title }}</h1>
      <p v-if="lead" class="ph-lead enter-rise" style="--i: 2">{{ lead }}</p>
      <div v-if="$slots.default" class="ph-meta enter-rise" style="--i: 3"><slot /></div>
    </div>
  </header>
</template>

<style scoped>
@layer components {
  .ph { padding-bottom: var(--s-12); background: radial-gradient(60% 80% at 50% 0%, color-mix(in srgb, var(--primary-container) 45%, transparent), transparent); }
  .ph-in { display: grid; justify-items: center; gap: var(--s-4); text-align: center; }
  .ph-badge { position: relative; display: grid; place-items: center; width: calc(var(--s-20) + var(--s-12)); aspect-ratio: 1; }
  .ph-shape { position: absolute; inset: 0; background: var(--primary-container); opacity: 0.55; animation: sway 9s var(--ease-effects) infinite alternate; }
  @keyframes sway { from { rotate: -14deg; scale: 0.96; } to { rotate: 16deg; scale: 1.04; } }
  .ph-emoji { --emoji: var(--s-20); position: relative; }
  @media (prefers-reduced-motion: reduce) { .ph-shape { animation: none; } }
  .ph-title { font-size: clamp(2.8rem, 7.5vw, 4.8rem); line-height: 0.98; letter-spacing: -0.045em; }
  .ph-lead { max-width: 38rem; font-size: 1.2rem; line-height: 1.55; color: var(--on-surface-variant); }
  .ph-meta { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--s-2); }
  .ph-meta :deep(.chip) {
    display: inline-flex;
    align-items: center;
    gap: var(--s-2);
    min-height: var(--s-8);
    padding: var(--s-1) var(--s-4) var(--s-1) var(--s-3);
    border-radius: var(--r-full);
    background: var(--surface-container-high);
    color: var(--on-surface-variant);
    font-size: 0.875rem;
  }
  .ph-meta :deep(.chip .icon) { font-size: var(--z-icon-sm); }
}
</style>
