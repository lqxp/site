<script setup lang="ts">
const props = defineProps<{ title: string }>()
const open = defineModel<boolean>({ default: false })

const dlg = ref<HTMLDialogElement>()
const panel = ref<HTMLElement>()
const shown = ref(false)
const drag = ref(0)
let start: { y: number, t: number } | null = null
let closing: ReturnType<typeof setTimeout> | undefined

const duration = () => (reducedMotion() ? 0 : 260)

watch(open, async (v) => {
  const d = dlg.value
  if (!d)
    return
  clearTimeout(closing)
  if (v) {
    if (!d.open)
      d.showModal()
    await nextTick()
    panel.value?.getBoundingClientRect()
    requestAnimationFrame(() => requestAnimationFrame(() => { shown.value = true }))
  }
  else {
    shown.value = false
    drag.value = 0
    closing = setTimeout(() => d.open && d.close(), duration())
  }
})

function onCancel(e: Event) {
  e.preventDefault()
  open.value = false
}

function down(e: PointerEvent) {
  if (matchMedia('(min-width: 600px)').matches)
    return
  start = { y: e.clientY, t: e.timeStamp }
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}
function move(e: PointerEvent) {
  if (start)
    drag.value = Math.max(0, e.clientY - start.y)
}
function up(e: PointerEvent) {
  if (!start)
    return
  const h = panel.value?.offsetHeight ?? 1
  const v = drag.value / Math.max(1, e.timeStamp - start.t)
  start = null
  if (drag.value > h * 0.3 || v > 0.8)
    open.value = false
  else drag.value = 0
}

onBeforeUnmount(() => clearTimeout(closing))
</script>

<template>
  <dialog
    ref="dlg"
    class="sheet"
    :class="{ shown, dragging: drag > 0 && open }"
    :aria-label="props.title"
    @cancel="onCancel"
  >
    <div class="scrim" @click="open = false" />
    <div ref="panel" class="panel" :style="drag ? { '--drag': `${drag}px` } : undefined">
      <div class="grab" @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up">
        <span class="handle" aria-hidden="true" />
      </div>
      <header class="head">
        <h2 class="t-headline-s">{{ props.title }}</h2>
        <MIconButton icon="close" label="Close" @click="open = false" />
      </header>
      <div class="body">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<style scoped>
@layer components {
  .sheet {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100dvh;
    max-width: none;
    max-height: none;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--on-surface);
    overflow: clip;
  }
  .sheet::backdrop { background: transparent; }

  .scrim {
    position: absolute;
    inset: 0;
    background: var(--scrim);
    opacity: 0;
    transition: opacity 250ms cubic-bezier(0.3, 0, 0.8, 0.15);
  }
  .shown .scrim { opacity: 0.32; transition: opacity 400ms cubic-bezier(0.05, 0.7, 0.1, 1); }

  .panel {
    position: absolute;
    inset: auto 0 0;
    max-height: 88dvh;
    display: flex;
    flex-direction: column;
    background: var(--surface-container-low);
    border-radius: var(--r-xl) var(--r-xl) 0 0;
    padding-bottom: env(safe-area-inset-bottom);
    box-shadow: var(--elev-1);
    translate: 0 calc(100% + var(--s-8));
    transition: translate 250ms cubic-bezier(0.3, 0, 0.8, 0.15);
  }
  .panel::after {
    content: '';
    position: absolute;
    top: calc(100% - 1px);
    left: 0;
    right: 0;
    height: 100vh;
    background: inherit;
    pointer-events: none;
  }
  .shown .panel { translate: 0 var(--drag, 0px); transition: translate 520ms cubic-bezier(0.05, 0.7, 0.1, 1); }
  .shown .head, .shown .body { animation: sheet-in 460ms cubic-bezier(0.05, 0.7, 0.1, 1) backwards; }
  .shown .head { animation-delay: 60ms; }
  .shown .body { animation-delay: 120ms; }
  @keyframes sheet-in { from { opacity: 0; translate: 0 var(--s-4); } }
  .dragging .panel { transition: none; }

  .grab { display: grid; place-items: center; height: var(--s-6); touch-action: none; cursor: grab; }
  .handle { width: var(--s-8); height: var(--s-1); border-radius: var(--r-full); background: var(--on-surface-variant); opacity: 0.4; }
  .head { display: flex; align-items: center; justify-content: space-between; gap: var(--s-4); padding: 0 var(--s-2) var(--s-2) var(--s-6); }
  .body { overflow: auto; padding: 0 var(--s-6) var(--s-6); overscroll-behavior: contain; }

  @media (prefers-reduced-motion: reduce) {
    .panel, .shown .panel, .scrim, .shown .scrim { transition: none; }
    .shown .head, .shown .body { animation: none; }
  }

  @media (min-width: 600px) {
    .panel {
      inset: 50% auto auto 50%;
      width: min(560px, calc(100% - var(--s-12)));
      max-height: min(80dvh, 720px);
      border-radius: var(--r-xl);
      background: var(--surface-container-high);
      box-shadow: var(--elev-3);
      translate: -50% -50%;
      scale: 0.9;
      opacity: 0;
      transition:
        scale 200ms cubic-bezier(0.3, 0, 0.8, 0.15),
        opacity 200ms cubic-bezier(0.3, 0, 0.8, 0.15);
    }
    .shown .panel {
      translate: -50% -50%;
      scale: 1;
      opacity: 1;
      transition:
        scale var(--dur-spatial) var(--ease-spatial),
        opacity var(--dur-effects) var(--ease-effects);
    }
    .panel::after { display: none; }
    .grab { display: none; }
    .head { padding-top: var(--s-4); }
  }
}
</style>
