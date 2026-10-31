interface Snack {
  id: number
  text: string
  icon?: string
}

let next = 0
let timer: ReturnType<typeof setTimeout> | undefined

export function useSnackbar() {
  const current = useState<Snack | null>('snack', () => null)
  function hide() {
    clearTimeout(timer)
    current.value = null
  }
  function show(text: string, icon?: string, ms = 4000) {
    current.value = { id: ++next, text, icon }
    clearTimeout(timer)
    timer = setTimeout(hide, ms)
  }
  return { current, show, hide }
}
