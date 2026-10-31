export function useScrollTop() {
  const { $lenis } = useNuxtApp()
  return () => {
    const lenis = $lenis as { scrollTo: (t: number, o?: object) => void } | null | undefined
    if (lenis)
      lenis.scrollTo(0, { duration: 1.4, easing: (t: number) => 1 - (1 - t) ** 4 })
    else
      window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }
}
