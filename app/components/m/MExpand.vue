<script setup lang="ts">
const props = defineProps<{ title: string, group?: string }>()
const item = ref<HTMLDetailsElement>()
const body = ref<HTMLElement>()
let running: Animation | undefined
let closing = false

function token(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function animate(open: boolean) {
  const el = item.value!
  const b = body.value!
  running?.cancel()
  if (reducedMotion()) {
    el.open = open
    return
  }
  if (open) {
    el.open = true
    closing = false
  }
  else closing = true
  const h = b.scrollHeight
  const frames = [
    { height: '0px', opacity: 0, transform: 'translateY(-8px)' },
    { height: `${h}px`, opacity: 1, transform: 'none' },
  ]
  running = b.animate(open ? frames : frames.reverse(), {
    duration: Number.parseFloat(token(open ? '--dur-spatial' : '--dur-effects-slow')) || 300,
    easing: token(open ? '--ease-spatial' : '--ease-out') || 'ease-out',
  })
  running.onfinish = () => {
    running = undefined
    if (!open) {
      el.open = false
      closing = false
    }
  }
}

function toggle(e: MouseEvent) {
  e.preventDefault()
  const opening = !item.value!.open || closing
  if (opening && props.group) {
    document.querySelectorAll<HTMLDetailsElement>(`details[data-group="${props.group}"][open]`).forEach((d) => {
      if (d !== item.value)
        d.dispatchEvent(new CustomEvent('qx-close'))
    })
  }
  animate(opening)
}

onMounted(() => item.value!.addEventListener('qx-close', () => animate(false)))
</script>

<template>
  <details ref="item" class="x" :data-group="group">
    <summary class="q" @click="toggle">
      <span class="t-title-l"><slot name="title">{{ title }}</slot></span>
      <span class="chev" aria-hidden="true"><span class="icon">expand_more</span></span>
    </summary>
    <div ref="body" class="a">
      <div class="in"><slot /></div>
    </div>
  </details>
</template>

<style scoped>
@layer components {
  .x { border-radius: var(--r-xl); background: var(--surface-container-low); transition: background-color var(--dur-effects) var(--ease-effects); }
  .x:hover, .x[open] { background: var(--surface-container); }
  .q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
    min-height: var(--z-button-m);
    padding: var(--s-4) var(--s-4) var(--s-4) var(--s-6);
    border-radius: inherit;
    cursor: pointer;
    list-style: none;
  }
  .q::-webkit-details-marker { display: none; }
  .q:focus-visible { outline-offset: calc(var(--s-1) * -1); }
  .chev {
    display: grid;
    place-items: center;
    flex: none;
    width: var(--z-target-sm);
    height: var(--z-target-sm);
    border-radius: var(--r-full);
    background: var(--surface-container-high);
    color: var(--primary);
    transition: rotate var(--dur-spatial) var(--ease-spatial-fast), background-color var(--dur-effects) var(--ease-effects), color var(--dur-effects) var(--ease-effects);
  }
  [open] > .q .chev { rotate: 180deg; background: var(--primary); color: var(--on-primary); }
  .a { overflow: hidden; }
  .in { padding: 0 var(--s-6) var(--s-6); }
}
</style>
