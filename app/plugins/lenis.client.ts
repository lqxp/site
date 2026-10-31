import Lenis from 'lenis'

export default defineNuxtPlugin((nuxt) => {
  if (reducedMotion())
    return { provide: { lenis: null as Lenis | null } }
  const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)), anchors: { offset: -96 } })
  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  nuxt.hook('page:finish', () => { if (!location.hash) lenis.scrollTo(0, { immediate: true }) })
  const obs = new MutationObserver(() => (document.querySelector('dialog[open]') ? lenis.stop() : lenis.start()))
  obs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] })
  return { provide: { lenis: lenis as Lenis | null } }
})
