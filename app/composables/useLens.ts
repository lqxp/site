import type { Ref } from 'vue'

interface Box { x: number, y: number, w: number, h: number }

export function useLens(root: Ref<HTMLElement | undefined>, active: Ref<unknown>, selector = '[data-lens]') {
  let last: Box | null = null

  const box = (el: HTMLElement): Box => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight })
  const set = (prefix: string, b: Box | null) => {
    const r = root.value
    if (!r)
      return
    r.style.setProperty(`--${prefix}-o`, b ? '1' : '0')
    if (!b)
      return
    r.style.setProperty(`--${prefix}-x`, `${b.x}px`)
    r.style.setProperty(`--${prefix}-y`, `${b.y}px`)
    r.style.setProperty(`--${prefix}-w`, `${b.w}px`)
    r.style.setProperty(`--${prefix}-h`, `${b.h}px`)
  }

  function place() {
    const r = root.value
    const el = r?.querySelector<HTMLElement>(`${selector}.on`)
    const next = el ? box(el) : null
    set('a', next)
    const pill = r?.querySelector<HTMLElement>('.lens-active')
    if (pill && last && next && last.x !== next.x && !reducedMotion()) {
      const dist = Math.abs(next.x - last.x)
      const k = 1 + Math.min(dist / 240, 0.6)
      pill.animate(
        [{ scale: '1 1' }, { scale: `${k} 0.82`, offset: 0.45 }, { scale: '1 1' }],
        { duration: 560, easing: getComputedStyle(document.documentElement).getPropertyValue('--ease-spatial').trim() || 'ease-out' },
      )
    }
    last = next
  }

  let lastHover: Box | null = null
  function hover(e: PointerEvent) {
    if (e.pointerType !== 'mouse')
      return
    const el = (e.target as HTMLElement).closest<HTMLElement>(selector)
    const next = el && root.value?.contains(el) ? box(el) : null
    if (next && lastHover && (next.x !== lastHover.x || next.y !== lastHover.y) && !reducedMotion()) {
      const dx = Math.abs(next.x - lastHover.x)
      const dy = Math.abs(next.y - lastHover.y)
      const k = 1 + Math.min(Math.max(dx, dy) / 260, 0.45)
      root.value?.querySelector<HTMLElement>('.lens-hover')?.animate(
        [{ scale: '1 1' }, { scale: dx >= dy ? `${k} 0.85` : `0.92 ${k}`, offset: 0.4 }, { scale: '1 1' }],
        { duration: 520, easing: getComputedStyle(document.documentElement).getPropertyValue('--ease-spatial').trim() || 'ease-out' },
      )
    }
    if (next)
      lastHover = next
    set('h', next)
  }
  const leave = () => {
    lastHover = null
    set('h', null)
  }

  let ro: ResizeObserver | undefined
  onMounted(() => {
    place()
    requestAnimationFrame(() => root.value?.setAttribute('data-ready', ''))
    root.value?.addEventListener('pointerover', hover)
    root.value?.addEventListener('pointerleave', leave)
    ro = new ResizeObserver(() => { last = null; place() })
    if (root.value)
      ro.observe(root.value)
  })
  watch(active, () => nextTick(place))
  onBeforeUnmount(() => {
    ro?.disconnect()
    root.value?.removeEventListener('pointerover', hover)
    root.value?.removeEventListener('pointerleave', leave)
  })
}
