<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const missing = computed(() => props.error.statusCode === 404)
useSeoMeta({ title: missing.value ? 'Not found' : 'Error', robots: 'noindex' })

const cookie = ref<HTMLElement>()
const pos = reactive({ x: 0, y: 0, r: 0 })
let v = { x: 0, y: 0, r: 0 }
let grab: { dx: number, dy: number, sx: number, sy: number, st: number, trail: [number, number, number][] } | null = null
let raf = 0
let last = 0
let since = 0
const GRAVITY = 2600

function step(now: number) {
  const dt = Math.min(0.032, last ? (now - last) / 1000 : 0.016)
  last = now
  const box = cookie.value!.getBoundingClientRect()
  const left = box.left - pos.x
  const top = box.top - pos.y
  const free = now - since < 2200
  if (free) {
    v.y += GRAVITY * dt
    pos.x += v.x * dt
    pos.y += v.y * dt
    pos.r += v.r * dt
    const minX = -left
    const maxX = innerWidth - left - box.width
    const maxY = innerHeight - top - box.height
    if (pos.x < minX || pos.x > maxX) {
      pos.x = Math.min(maxX, Math.max(minX, pos.x))
      v.x *= -0.6
      v.r *= -0.7
    }
    if (pos.y > maxY) {
      pos.y = maxY
      v.y = -Math.abs(v.y) * 0.55
      v.x *= 0.85
      v.r = v.x * 0.5
    }
    if (pos.y < -top) {
      pos.y = -top
      v.y = Math.abs(v.y) * 0.5
    }
  }
  else {
    v.x += (-36 * pos.x - 11 * v.x) * dt
    v.y += (-36 * pos.y - 11 * v.y) * dt
    v.r += (-30 * pos.r - 8 * v.r) * dt
    pos.x += v.x * dt
    pos.y += v.y * dt
    pos.r += v.r * dt
    if (Math.hypot(pos.x, pos.y, v.x, v.y) < 2 && Math.abs(pos.r) < 1) {
      Object.assign(pos, { x: 0, y: 0, r: 0 })
      raf = 0
      last = 0
      return
    }
  }
  raf = requestAnimationFrame(step)
}

function down(e: PointerEvent) {
  if (reducedMotion())
    return
  cancelAnimationFrame(raf)
  raf = 0
  last = 0
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  grab = { dx: e.clientX - pos.x, dy: e.clientY - pos.y, sx: e.clientX, sy: e.clientY, st: e.timeStamp, trail: [[e.clientX, e.clientY, e.timeStamp]] }
}
function move(e: PointerEvent) {
  if (!grab)
    return
  const px = pos.x
  pos.x = e.clientX - grab.dx
  pos.y = e.clientY - grab.dy
  pos.r += ((pos.x - px) * 1.2 - pos.r) * 0.2
  grab.trail = [...grab.trail.slice(-5), [e.clientX, e.clientY, e.timeStamp]]
}
function up(e: PointerEvent) {
  if (!grab)
    return
  const [fx, fy, ft] = grab.trail[0]!
  if (Math.hypot(e.clientX - grab.sx, e.clientY - grab.sy) < 6 && e.timeStamp - grab.st < 350) {
    grab = null
    eat()
    if (pos.x || pos.y || pos.r) {
      v = { x: 0, y: 0, r: 0 }
      since = 0
      raf = requestAnimationFrame(step)
    }
    return
  }
  const span = Math.max(16, e.timeStamp - ft) / 1000
  v = { x: (e.clientX - fx) / span, y: (e.clientY - fy) / span, r: 0 }
  v.r = v.x * 0.35
  grab = null
  since = performance.now()
  raf = requestAnimationFrame(step)
}
onBeforeUnmount(() => cancelAnimationFrame(raf))

const { show } = useSnackbar()
const eating = ref(false)
let eaten = 0
const lines = [
  'Crunch. The only cookie on this whole site.',
  'Another one? We do not track how many you eat. Except right now: two.',
  'Three cookies. Still no tracking cookies.',
]
function eat() {
  if (eating.value || reducedMotion())
    return
  eating.value = true
  const line = lines[Math.min(eaten, lines.length - 1)]!
  show(line, 'cookie')
  eaten++
}
function doneEating() {
  setTimeout(() => { eating.value = false }, 500)
}
</script>

<template>
  <NuxtLayout>
    <section class="err wrap below-nav">
      <h1 class="code" :aria-label="String(error.statusCode)">
        <template v-if="missing">
          <span class="digit enter-rise">4</span>
          <span
            ref="cookie"
            class="cookie enter-pop"
            :style="{ transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.r}deg)` }"
            title="Tap to take a bite, drag to throw"
            @pointerdown="down"
            @pointermove="move"
            @pointerup="up"
            @pointercancel="up"
          >
            <Emoji v-if="eating" code="1f36a" play="once" class="cookie-img" @complete="doneEating" />
            <img v-else src="/emoji/1f36a-whole.webp" alt="" class="cookie-img" draggable="false" width="320" height="320">
          </span>
          <span class="digit enter-rise">4</span>
        </template>
        <span v-else class="digit enter-rise">{{ error.statusCode }}</span>
      </h1>
      <p class="t-headline-s enter-rise" style="--i: 3">
        {{ missing ? "This page doesn't exist. Or it did, and we forgot it." : 'Something broke on our side.' }}
      </p>
      <p class="t-body-l muted enter-rise" style="--i: 4">
        {{ missing ? 'Forgetting things is kind of our job.' : error.statusMessage || 'Try again in a moment.' }}
      </p>
      <div class="cluster enter-rise" style="--i: 5">
        <MButton to="/" size="m" icon="home">Home</MButton>
        <MButton to="/wiki" variant="tonal" size="m" icon="menu_book">Handbook</MButton>
      </div>
    </section>
  </NuxtLayout>
  <MSnackbar />
</template>

<style scoped>
@layer components {
  .err { display: grid; justify-items: center; text-align: center; gap: var(--s-4); padding-block: var(--s-16) var(--s-8); }
  .code {
    display: flex;
    align-items: center;
    gap: var(--s-2);
    font-size: clamp(7rem, 26vw, 15rem);
    line-height: 1;
    font-weight: var(--w-bold);
    letter-spacing: -0.05em;
    color: var(--primary);
  }
  .cookie {
    position: relative;
    z-index: 30;
    display: grid;
    place-items: center;
    width: 0.85em;
    aspect-ratio: 1;
    cursor: grab;
    touch-action: none;
    user-select: none;
    will-change: transform;
  }
  .cookie:active { cursor: grabbing; }
  .cookie-img { width: 100%; height: 100%; pointer-events: none; user-select: none; --emoji: 100%; }
}
</style>
