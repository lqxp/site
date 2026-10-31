<script setup lang="ts">
import { NuxtLink } from '#components'

type Variant = 'filled' | 'tonal' | 'outlined' | 'text' | 'elevated'
type Size = 's' | 'm' | 'l'

const props = withDefaults(defineProps<{
  variant?: Variant
  size?: Size
  icon?: string
  trailing?: string
  to?: string
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}>(), { variant: 'filled', size: 's', type: 'button' })

const external = computed(() => !!props.href && /^https?:/.test(props.href))
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))
const attrs = computed(() => {
  if (props.to)
    return { to: props.to }
  if (props.href)
    return { href: props.href, ...(external.value ? { target: '_blank', rel: 'noopener' } : {}) }
  return { type: props.type, disabled: props.disabled }
})
</script>

<template>
  <component :is="tag" v-bind="attrs" class="btn state" :class="[variant, `size-${size}`]">
    <span v-if="icon" class="icon lead" aria-hidden="true">{{ icon }}</span>
    <span class="label"><slot /></span>
    <span v-if="trailing" class="icon trail" aria-hidden="true">{{ trailing }}</span>
  </component>
</template>

<style scoped>
@layer components {
  .btn {
    --h: var(--z-button-s);
    --px: var(--s-4);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--s-2);
    min-height: var(--h);
    min-width: var(--z-target);
    padding-inline: var(--px);
    border-radius: calc(var(--h) / 2);
    background: var(--bg, transparent);
    color: var(--fg, var(--primary));
    box-shadow: var(--ring, 0 0 0 0 transparent), var(--lift, 0 0 0 0 transparent);
    font-weight: 550;
    letter-spacing: 0.006rem;
    white-space: nowrap;
    user-select: none;
    transition:
      border-radius var(--dur-spatial-fast) var(--ease-spatial-fast),
      background-color var(--dur-effects) var(--ease-effects),
      color var(--dur-effects) var(--ease-effects),
      box-shadow var(--dur-effects) var(--ease-effects);
  }
  .btn:active { border-radius: var(--press, var(--r-sm)); }
  .btn:disabled { opacity: var(--state-disabled); pointer-events: none; }

  .size-s { font-size: 0.875rem; }
  .size-m { --h: var(--z-button-m); --px: var(--s-6); --press: var(--r-lg); font-size: 1rem; }
  .size-l { --h: var(--z-button-l); --px: var(--s-12); --press: var(--r-xl); gap: var(--s-3); font-size: 1.5rem; }
  .size-l .icon { font-size: var(--z-icon-lg); }

  .filled { --bg: var(--primary); --fg: var(--on-primary); }
  .tonal { --bg: var(--secondary-container); --fg: var(--on-secondary-container); }
  .outlined { --ring: inset 0 0 0 var(--z-hairline) var(--outline-variant); --fg: var(--on-surface-variant); }
  .elevated { --bg: var(--surface-container-low); --lift: var(--elev-1); }
  .elevated:hover { --lift: var(--elev-2); }
  .text { --px: var(--s-3); }

  .icon { transition: translate var(--dur-spatial-fast) var(--ease-spatial-fast), font-variation-settings var(--dur-effects) var(--ease-effects); }
  .btn:hover .icon { --fill: 1; }
  .btn:hover .trail { translate: var(--s-1) 0; }
}
</style>
