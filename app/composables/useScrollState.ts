export function useScrollState() {
  const y = useState('scroll-y', () => 0)
  const down = useState('scroll-down', () => false)
  const night = useState('scroll-night', () => false)

  if (import.meta.client && !useState('scroll-bound', () => false).value) {
    useState('scroll-bound').value = true
    let last = 0
    let raf = 0
    const tick = () => {
      raf = 0
      const now = scrollY
      const delta = now - last
      if (now < 120 || delta < -6)
        down.value = false
      else if (delta > 6)
        down.value = true
      if (Math.abs(delta) > 6)
        last = now
      y.value = now
      night.value = [...document.querySelectorAll<HTMLElement>('[data-night]')].some((s) => {
        const r = s.getBoundingClientRect()
        return r.top <= 32 && r.bottom > 32
      })
    }
    const on = () => { raf ||= requestAnimationFrame(tick) }
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    useRouter().afterEach(() => { down.value = false; setTimeout(on, 50) })
    on()
  }
  if (import.meta.client)
    onMounted(() => requestAnimationFrame(() => dispatchEvent(new Event('scroll'))))
  return { y, down, night }
}
