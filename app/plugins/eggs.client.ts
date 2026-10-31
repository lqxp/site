import { bubbleBack, bubbleFront } from '~/utils/brand'

export default defineNuxtPlugin(() => {
  console.log(
    '%cQxChat%c\n\nLooking under the hood? Everything this page does is in the open:\nhttps://github.com/lqxp/site\n\nFound a bug or a security hole? Write to contact@qxch.at\nor open an issue at https://github.com/lqxp/app/issues',
    'background:#1c71d8;color:#fff;padding:6px 14px;border-radius:16px 16px 4px 16px;font:800 18px "JetBrains Mono",monospace',
    'font:13px/1.7 "SN Pro",system-ui,sans-serif',
  )

  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]')
  document.querySelectorAll('link[rel="icon"]').forEach(l => l !== link && l.remove())
  link?.setAttribute('type', 'image/png')
  const canvas = Object.assign(document.createElement('canvas'), { width: 64, height: 64 })
  const ctx = canvas.getContext('2d')
  const bubbles = [new Path2D(bubbleBack), new Path2D(bubbleFront)]
  function favicon(turn: number) {
    if (!ctx || !link)
      return
    ctx.clearRect(0, 0, 64, 64)
    ctx.beginPath()
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * Math.PI * 2
      const r = 28.5 + (2.4 + 1.2 * Math.sin(turn * 2.2)) * Math.sin(9 * (t - turn)) + 0.9 * Math.sin(4 * t + turn * 3)
      ctx.lineTo(32 + r * Math.cos(t), 32 + r * Math.sin(t))
    }
    ctx.closePath()
    ctx.fillStyle = '#1c71d8'
    ctx.fill()
    ctx.save()
    ctx.translate(47.2, 18.7)
    ctx.scale(-1.9, 1.9)
    ctx.translate(0, 1)
    ctx.fillStyle = '#fff'
    bubbles.forEach(b => ctx.fill(b))
    ctx.restore()
    link.href = canvas.toDataURL('image/png')
  }
  let turn = 0
  favicon(0)
  setInterval(() => {
    if (reducedMotion())
      return
    turn += 0.03
    favicon(turn)
  }, 120)
})
