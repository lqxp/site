<script setup lang="ts">
type AnimationItem = {
  play: () => void
  pause: () => void
  stop: () => void
  goToAndStop: (f: number, isFrame: boolean) => void
  destroy: () => void
  addEventListener: (e: string, f: () => void) => void
}
type Player = { loadAnimation: (o: object) => AnimationItem }

const props = withDefaults(defineProps<{
  code: string
  label?: string
  play?: 'view' | 'once'
}>(), { play: 'view' })
const emit = defineEmits<{ complete: [] }>()

const box = ref<HTMLElement>()
const ready = ref(false)
let anim: AnimationItem | undefined
let visible = false
let io: IntersectionObserver | undefined

let player: Promise<Player> | undefined
// The player is heavy: wait for the first sign of a person (scroll, pointer, key) before fetching it.
// Until then the still image stays on screen, so first paint and boot never pay for it.
let woke: Promise<void> | undefined
const wake = () => (woke ??= new Promise<void>((resolve) => {
  const events = ['pointermove', 'pointerdown', 'scroll', 'keydown', 'touchstart', 'wheel']
  const go = () => {
    events.forEach(e => removeEventListener(e, go))
    resolve()
  }
  events.forEach(e => addEventListener(e, go, { once: true, passive: true }))
}))
const getPlayer = () => (player ??= wake().then(() => import('lottie-web/build/player/lottie_light_canvas')).then(m => (m as unknown as { default: Player }).default))

async function load() {
  if (anim || !box.value)
    return
  const lottie = await getPlayer()
  if (anim || !box.value)
    return
  anim = lottie.loadAnimation({
    container: box.value,
    renderer: 'canvas',
    loop: props.play === 'view',
    autoplay: false,
    path: `/emoji/${props.code}.json`,
    rendererSettings: { clearCanvas: true, preserveAspectRatio: 'xMidYMid meet' },
  })
  anim.addEventListener('DOMLoaded', () => {
    ready.value = true
    if (visible)
      anim?.play()
  })
  anim.addEventListener('complete', () => emit('complete'))
}

function replay() {
  if (!anim || !ready.value)
    return
  anim.stop()
  anim.play()
}

let near: IntersectionObserver | undefined
onMounted(() => {
  if (reducedMotion())
    return
  near = new IntersectionObserver(([e]) => {
    if (!e?.isIntersecting)
      return
    near?.disconnect()
    const go = () => load()
    'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 800 }) : setTimeout(go, 50)
  }, { rootMargin: '600px 0px' })
  io = new IntersectionObserver(([e]) => {
    visible = !!e?.isIntersecting
    if (visible && ready.value)
      anim?.play()
    else if (!visible)
      anim?.pause()
  })
  near.observe(box.value!)
  io.observe(box.value!)
})
onBeforeUnmount(() => {
  near?.disconnect()
  io?.disconnect()
  anim?.destroy()
})

defineExpose({ replay })
</script>

<template>
  <span
    class="emoji"
    :class="{ ready }"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <img :src="`/emoji/${code}.webp`" alt="" class="still" draggable="false" width="128" height="128" loading="lazy" decoding="async">
    <span ref="box" class="anim" />
  </span>
</template>

<style scoped>
@layer components {
  .emoji {
    position: relative;
    display: inline-block;
    width: var(--emoji, 1em);
    height: var(--emoji, 1em);
    flex: none;
    vertical-align: middle;
    user-select: none;
  }
  .still, .anim { position: absolute; inset: 0; width: 100%; height: 100%; }
  .anim :deep(canvas) { display: block; }
  .still { transition: opacity var(--dur-effects) var(--ease-effects); }
  .ready .still { opacity: 0; }
}
</style>
