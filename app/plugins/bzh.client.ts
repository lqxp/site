import { bretonPatterns } from '~/utils/breton'

export default defineNuxtPlugin((nuxt) => {
  const on = useBzh()
  const original = new WeakMap<Node, string>()
  const attrs = ['placeholder', 'aria-label', 'title', 'alt']
  let words: Record<string, string> = {}
  let observer: MutationObserver | undefined

  const norm = (s: string) => s.replace(/\s+/g, ' ').trim()

  function translate(text: string) {
    const key = norm(text)
    if (!key)
      return
    if (words[key])
      return words[key]
    for (const [re, fn] of bretonPatterns) {
      const m = key.match(re)
      if (m)
        return fn(...m)
    }
  }

  function textNode(n: Text) {
    const v = n.nodeValue ?? ''
    const t = translate(v)
    if (!t || t === norm(v))
      return
    original.set(n, v)
    n.nodeValue = `${v.match(/^\s*/)![0]}${t}${v.match(/\s*$/)![0]}`
  }

  function element(el: Element) {
    for (const a of attrs) {
      const v = el.getAttribute(a)
      const t = v && translate(v)
      if (t && t !== v) {
        el.setAttribute(`data-en-${a}`, v)
        el.setAttribute(a, t)
      }
    }
  }

  function walk(root: Node) {
    if (root.nodeType === Node.TEXT_NODE)
      return textNode(root as Text)
    if (!(root instanceof Element) || root.closest('script, style, code, pre'))
      return
    element(root)
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (n.nodeType === Node.TEXT_NODE) {
        if (!n.parentElement?.closest('code, pre'))
          textNode(n as Text)
      }
      else {
        element(n as Element)
      }
    }
  }

  async function start() {
    words = (await import('~/utils/breton.json')).default as Record<string, string>
    document.documentElement.lang = 'br'
    walk(document.body)
    observer = new MutationObserver((list) => {
      for (const m of list) {
        if (m.type === 'characterData')
          textNode(m.target as Text)
        else if (m.type === 'attributes')
          element(m.target as Element)
        else
          m.addedNodes.forEach(walk)
      }
    })
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attrs })
  }

  function stop() {
    observer?.disconnect()
    document.documentElement.lang = 'en'
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      const o = original.get(n)
      if (o !== undefined)
        n.nodeValue = o
      if (n instanceof Element) {
        for (const a of attrs) {
          const v = n.getAttribute(`data-en-${a}`)
          if (v !== null) {
            n.setAttribute(a, v)
            n.removeAttribute(`data-en-${a}`)
          }
        }
      }
    }
  }

  nuxt.hook('page:finish', () => {
    if (on.value)
      requestAnimationFrame(() => { document.documentElement.lang = 'br' })
  })

  nuxt.hook('app:mounted', () => {
    try {
      on.value = sessionStorage.getItem('qx-bzh') === '1'
    }
    catch {}
    if (on.value)
      start()
    watch(on, (v) => {
      try {
        sessionStorage.setItem('qx-bzh', v ? '1' : '0')
      }
      catch {}
      if (v)
        start()
      else
        stop()
    })
  })
})
