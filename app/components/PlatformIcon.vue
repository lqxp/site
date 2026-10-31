<script setup lang="ts">
import { brandPaths } from '~/utils/brands'
import type { PlatformId } from '~/utils/release'

const props = defineProps<{ id: PlatformId | 'web' }>()
const path = computed(() => {
  switch (props.id) {
    case 'macos':
    case 'ios': return brandPaths.apple
    case 'web': return ''
    default: return brandPaths[props.id]
  }
})
</script>

<template>
  <svg v-if="path" class="pi" viewBox="0 0 24 24" aria-hidden="true"><path :d="path" /></svg>
  <span v-else class="icon pi" aria-hidden="true">public</span>
</template>

<style scoped>
@layer components {
  .pi { width: var(--z-icon); height: var(--z-icon); fill: currentColor; flex: none; }
}
</style>
