<script setup lang="ts">
import { NuxtLink } from '#components'

const props = withDefaults(defineProps<{
  icon: string
  label: string
  variant?: 'standard' | 'filled' | 'tonal' | 'outlined'
  selected?: boolean
  to?: string
  href?: string
}>(), { variant: 'standard', selected: undefined })

const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))
const attrs = computed(() => {
  if (props.to)
    return { to: props.to }
  if (props.href)
    return /^https?:/.test(props.href) ? { href: props.href, target: '_blank', rel: 'noopener' } : { href: props.href }
  return { 'type': 'button', 'aria-pressed': props.selected }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="attrs"
    class="ib state"
    :class="[variant, { on: selected }]"
    :aria-label="label"
    :title="label"
  >
    <slot><span class="icon" aria-hidden="true">{{ icon }}</span></slot>
  </component>
</template>

<style scoped>
@layer components {
  .ib {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: var(--z-target);
    height: var(--z-target);
    border-radius: var(--r-full);
    background: var(--bg, transparent);
    color: var(--fg, var(--on-surface-variant));
    box-shadow: var(--ring, none);
    transition:
      border-radius var(--dur-spatial-fast) var(--ease-spatial-fast),
      background-color var(--dur-effects) var(--ease-effects),
      color var(--dur-effects) var(--ease-effects);
  }
  .ib:active, .ib.on { border-radius: var(--r-lg); }
  .ib:hover { --fill: 1; }
  .ib.on { --fill: 1; }
  .standard.on { --fg: var(--primary); }
  .filled { --bg: var(--primary); --fg: var(--on-primary); }
  .tonal { --bg: var(--secondary-container); --fg: var(--on-secondary-container); }
  .outlined { --ring: inset 0 0 0 var(--z-hairline) var(--outline-variant); }
  .ib :deep(svg) { width: var(--z-icon-sm); height: var(--z-icon-sm); fill: currentColor; }
}
</style>
