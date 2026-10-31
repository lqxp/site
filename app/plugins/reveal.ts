import type { Directive } from 'vue'

export default defineNuxtPlugin((nuxt) => {
  let io: IntersectionObserver | undefined
  const observer = () => (io ??= new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        io!.unobserve(e.target)
      }
    }
  }, { rootMargin: '0px 0px -8% 0px' }))

  const reveal: Directive<HTMLElement, number | undefined> = {
    getSSRProps: ({ value }) => ({ 'class': 'reveal', 'style': value ? `--i:${value}` : undefined, 'data-allow-mismatch': 'class,style' }),
    mounted(el, { value }) {
      el.classList.add('reveal')
      if (value)
        el.style.setProperty('--i', String(value))
      observer().observe(el)
    },
    unmounted(el) {
      io?.unobserve(el)
    },
  }
  nuxt.vueApp.directive('reveal', reveal)
})
