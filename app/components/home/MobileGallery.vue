<script setup lang="ts">
const items = [
  { kind: 'video', src: '/video/mobile-demo', poster: '/img/mobile/demo-poster-480.webp', caption: 'Scrolling a conversation' },
  { kind: 'img', src: '/img/mobile/texting.webp', caption: 'Replies and reactions' },
  { kind: 'img', src: '/img/mobile/stream.webp', caption: 'A call with screen sharing' },
  { kind: 'img', src: '/img/mobile/writing.webp', caption: 'Dark theme' },
] as const

const strip = ref<HTMLElement>()
const video = ref<HTMLVideoElement[]>()
const current = ref(0)

function go(i: number) {
  const el = strip.value
  const item = el?.children[i] as HTMLElement | undefined
  if (!el || !item)
    return
  el.scrollTo({ left: item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2, behavior: reducedMotion() ? 'auto' : 'smooth' })
}

function track() {
  const el = strip.value
  if (!el)
    return
  const mid = el.scrollLeft + el.clientWidth / 2
  let best = 0
  let gap = Infinity
  ;[...el.children].forEach((c, i) => {
    const li = c as HTMLElement
    const d = Math.abs(li.offsetLeft + li.offsetWidth / 2 - mid)
    if (d < gap) {
      gap = d
      best = i
    }
  })
  current.value = best
}

let frame = 0
const onScroll = () => { frame ||= requestAnimationFrame(() => { frame = 0; track() }) }

onMounted(() => {
  const v = video.value?.[0]
  let vio: IntersectionObserver | undefined
  if (v && !reducedMotion()) {
    vio = new IntersectionObserver(([e]) => (e?.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.5 })
    vio.observe(v)
  }
  onBeforeUnmount(() => {
    vio?.disconnect()
    cancelAnimationFrame(frame)
  })
})
</script>

<template>
  <div class="gallery">
    <ul ref="strip" class="strip" aria-label="Screenshots" @scroll.passive="onScroll">
      <li v-for="(it, i) in items" :key="it.caption" class="item">
        <figure>
          <div class="phone">
            <video v-if="it.kind === 'video'" ref="video" muted loop playsinline preload="none" :poster="it.poster" :aria-label="it.caption">
              <source :src="`${it.src}.webm`" type="video/webm">
              <source :src="`${it.src}.mp4`" type="video/mp4">
            </video>
            <img v-else :src="it.src" :srcset="`${it.src.replace('.webp', '-480.webp')} 480w, ${it.src} 600w`" sizes="(min-width: 1000px) 15rem, 66vw" :alt="`QxChat on Android: ${it.caption.toLowerCase()}`" width="600" height="1319" loading="lazy" decoding="async">
          </div>
          <figcaption class="t-title-s">{{ it.caption }}</figcaption>
        </figure>
      </li>
    </ul>
    <div class="dots" role="group" aria-label="Choose a screenshot">
      <button
        v-for="(it, i) in items"
        :key="it.caption"
        type="button"
        class="dot"
        :class="{ on: current === i }"
        :aria-label="it.caption"
        :aria-current="current === i ? 'true' : undefined"
        @click="go(i)"
      >
        <i />
      </button>
    </div>
  </div>
</template>

<style scoped>
@layer components {
  .gallery { display: grid; gap: var(--s-2); }
  .strip {
    position: relative;
    list-style: none;
    margin: 0;
    padding: var(--s-4) calc((100% - min(66vw, 15rem)) / 2) var(--s-6);
    display: flex;
    gap: var(--s-4);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
  }
  .strip::-webkit-scrollbar { display: none; }
  .item {
    flex: none;
    width: min(66vw, 15rem);
    scroll-snap-align: center;
  }
  @supports (animation-timeline: view(inline)) {
    .item {
      animation: tilt linear both;
      animation-timeline: view(inline);
    }
    @keyframes tilt {
      0% { scale: 0.84; rotate: -7deg; animation-timing-function: cubic-bezier(0.2, 0, 0, 1); }
      50% { scale: 1; rotate: 0deg; animation-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15); }
      100% { scale: 0.84; rotate: 7deg; }
    }
  }
  figure { margin: 0; display: grid; gap: var(--s-3); justify-items: center; }
  .phone {
    width: 100%;
    aspect-ratio: 600 / 1319;
    padding: var(--s-2);
    border-radius: calc(var(--r-2xl) + var(--s-2));
    background: var(--night-2);
    box-shadow: inset 0 0 0 var(--z-hairline) var(--night-3), var(--elev-3);
  }
  .phone img, .phone video { width: 100%; height: 100%; object-fit: cover; border-radius: var(--r-2xl); background: var(--night); }
  figcaption { color: var(--on-surface-variant); text-align: center; }

  .dots { display: flex; justify-content: center; }
  .dot { display: grid; place-items: center; width: var(--s-8); height: var(--z-target); padding: 0; border: 0; background: none; cursor: pointer; }
  .dot i {
    display: block;
    width: var(--s-2);
    height: var(--s-2);
    border-radius: var(--r-full);
    background: var(--outline-variant);
    transition: width var(--dur-spatial) var(--ease-spatial), background-color var(--dur-effects) var(--ease-effects);
  }
  .dot.on i { width: var(--s-6); background: var(--primary); }
  .dot:focus-visible { outline-offset: calc(var(--s-2) * -1); }

  @media (min-width: 1000px) {
    .strip {
      overflow: visible;
      justify-content: center;
      gap: var(--s-6);
      padding: var(--s-2) 0 var(--s-10);
      scroll-snap-type: none;
    }
    .item { width: 15rem; animation: none; scale: 1; }
    .item:nth-child(4n + 1) { rotate: -4deg; }
    .item:nth-child(4n + 2) { rotate: 3deg; translate: 0 var(--s-10); }
    .item:nth-child(4n + 3) { rotate: -2.5deg; }
    .item:nth-child(4n + 4) { rotate: 4deg; translate: 0 var(--s-10); }
    .dots { display: none; }
  }
  @media (prefers-reduced-motion: reduce) { .item { animation: none; } }
}
</style>
