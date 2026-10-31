<script setup lang="ts">
const props = defineProps<{ code: string, label?: string }>()
const { show } = useSnackbar()
const done = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    done.value = true
    show('Copied to the clipboard.', 'content_copy')
    setTimeout(() => { done.value = false }, 1600)
  }
  catch {
    show('Copy failed. Select the text instead.', 'error')
  }
}
</script>

<template>
  <figure class="code">
    <figcaption v-if="label" class="t-label-l">{{ label }}</figcaption>
    <pre class="t-body-m"><code>{{ code }}</code></pre>
    <MIconButton :icon="done ? 'check' : 'content_copy'" label="Copy" class="copy" @click="copy" />
  </figure>
</template>

<style scoped>
@layer components {
  .code {
    position: relative;
    margin: 0;
    border-radius: var(--r-lg);
    background: var(--surface-container-highest);
    color: var(--on-surface);
  }
  figcaption { padding: var(--s-3) var(--s-5) 0; color: var(--on-surface-variant); }
  pre { overflow-x: auto; padding: var(--s-4) var(--s-12) var(--s-4) var(--s-5); line-height: 1.7; white-space: pre-wrap; overflow-wrap: anywhere; }
  .copy { position: absolute; top: var(--s-1); right: var(--s-1); }
}
</style>
