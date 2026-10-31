<script setup lang="ts">
defineProps<{ items: { q: string, a: string }[] }>()
</script>

<template>
  <div class="faq">
    <MExpand v-for="(it, i) in items" :key="it.q" v-reveal="i" :title="it.q" group="faq">
      <p class="t-body-l muted">{{ it.a }}</p>
    </MExpand>
  </div>
</template>

<style scoped>
@layer components {
  .faq { display: grid; gap: var(--s-2); }
  .faq p { max-width: var(--z-measure); }
}
</style>
