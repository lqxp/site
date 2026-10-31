type Theme = 'light' | 'dark'
const KEY = 'qx-theme'

function systemDark() {
  return matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')

  function read() {
    const set = document.documentElement.dataset.theme
    theme.value = set === 'dark' || set === 'light' ? set : systemDark() ? 'dark' : 'light'
  }

  if (import.meta.client && !useState('theme-bound', () => false).value) {
    useState('theme-bound').value = true
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', read)
  }

  function apply(next: Theme) {
    document.documentElement.dataset.theme = next
    theme.value = next
    try { localStorage.setItem(KEY, next) }
    catch {}
  }

  function toggle(from?: HTMLElement | null) {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    if (!document.startViewTransition || reducedMotion()) {
      apply(next)
      return
    }
    const box = from?.getBoundingClientRect()
    if (box) {
      root.style.setProperty('--vt-x', `${box.left + box.width / 2}px`)
      root.style.setProperty('--vt-y', `${box.top + box.height / 2}px`)
    }
    root.classList.add('theme-swap')
    const vt = document.startViewTransition(() => apply(next))
    vt.finished.finally(() => root.classList.remove('theme-swap'))
  }

  return { theme, read, toggle }
}
