<script setup lang="ts">
const { current, hide } = useSnackbar()
</script>

<template>
  <div class="host" role="status" aria-live="polite">
    <Transition name="snack">
      <div v-if="current" :key="current.id" class="snack t-body-m">
        <span v-if="current.icon" class="icon" aria-hidden="true">{{ current.icon }}</span>
        <span class="text">{{ current.text }}</span>
        <MIconButton icon="close" label="Dismiss" class="x" @click="hide" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@layer components {
  .host {
    position: fixed;
    inset: auto 0 max(var(--s-4), env(safe-area-inset-bottom));
    z-index: 60;
    display: grid;
    justify-items: center;
    padding-inline: var(--s-4);
    pointer-events: none;
  }
  .snack {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: var(--s-3);
    min-height: var(--z-target);
    max-width: var(--z-measure);
    padding: var(--s-1) var(--s-1) var(--s-1) var(--s-4);
    border-radius: var(--r-lg);
    background: var(--inverse-surface);
    color: var(--inverse-on-surface);
    box-shadow: var(--elev-3);
  }
  .snack .icon { color: var(--inverse-primary); --fill: 1; }
  .text { flex: 1; padding-block: var(--s-3); }
  .x { --fg: var(--inverse-on-surface); }

  .snack-enter-active { transition: translate var(--dur-spatial-fast) var(--ease-spatial-fast), opacity var(--dur-effects) var(--ease-effects), scale var(--dur-spatial-fast) var(--ease-spatial-fast); }
  .snack-leave-active { position: absolute; transition: opacity var(--dur-effects) var(--ease-effects), scale var(--dur-effects) var(--ease-effects); }
  .snack-enter-from { translate: 0 var(--s-12); opacity: 0; scale: 0.9; }
  .snack-leave-to { opacity: 0; scale: 0.96; }
}
</style>
