<script setup lang="ts">
const props = defineProps<{
  start: string
  end: string
  emoji: { code: string, label: string }[]
}>()

const h1 = ref<HTMLElement>()

const bzh = useBzh()
const start = computed(() => (bzh.value ? bretonHero.start : props.start))
const end = computed(() => (bzh.value ? bretonHero.end : props.end))
watch(bzh, () => nextTick(() => {
  if (h1.value && spans.length)
    spans = [...h1.value.querySelectorAll<HTMLElement>('.ch')]
}))

const MONKEYS = ['1f648', '1f649', '1f64a']
const codes = ref(props.emoji.map(e => e.code))
const { show } = useSnackbar()
const said = ['Sees no message.', 'Hears no call.', 'Tells no one.']
function poke(i: number) {
  const at = MONKEYS.indexOf(codes.value[i]!)
  if (at < 0)
    return
  const next = (at + 1) % MONKEYS.length
  codes.value[i] = MONKEYS[next]!
  show(said[next]!, 'shield')
}
const chars = (s: string) => [...s]
let spans: HTMLElement[] = []
let icons: HTMLElement[] = []
let px = -1e4
let py = -1e4
let active = 0
let target = 0
let raf = 0
const weight = new Map<HTMLElement, number>()

function frame() {
  raf = 0
  active += (target - active) * 0.15
  let moving = Math.abs(target - active) > 0.01
  for (const el of spans) {
    const b = el.getBoundingClientRect()
    const d = Math.exp(-(((px - (b.left + b.width / 2)) / 110) ** 2) - (((py - (b.top + b.height / 2)) / 260) ** 2)) * active
    const cur = weight.get(el) ?? 0
    const next = cur + (d - cur) * 0.2
    if (Math.abs(next - cur) > 0.002)
      moving = true
    weight.set(el, next)
    el.style.fontWeight = String(Math.round(411 + next * 480))
  }
  for (const el of icons) {
    const b = el.getBoundingClientRect()
    const d = Math.exp(-(((px - (b.left + b.width / 2)) / 80) ** 2) - (((py - (b.top + b.height / 2)) / 200) ** 2)) * active
    el.style.scale = String(1 + d * 0.5)
  }
  if (moving)
    raf = requestAnimationFrame(frame)
}
const kick = () => { raf ||= requestAnimationFrame(frame) }

function move(e: PointerEvent) {
  if (e.pointerType !== 'mouse')
    return
  px = e.clientX
  py = e.clientY
  target = 1
  kick()
}
function leave() {
  target = 0
  kick()
}

function copy(e: ClipboardEvent) {
  e.preventDefault()
  e.clipboardData?.setData('text/plain', `${start.value} ${end.value}`)
}

onMounted(() => {
  if (reducedMotion() || !matchMedia('(hover: hover) and (pointer: fine)').matches)
    return
  spans = [...h1.value!.querySelectorAll<HTMLElement>('.ch')]
  icons = [...h1.value!.querySelectorAll<HTMLElement>('.grow')]
  const area = h1.value!.closest('section') ?? h1.value!
  area.addEventListener('pointermove', move as EventListener)
  area.addEventListener('pointerleave', leave)
  onBeforeUnmount(() => {
    area.removeEventListener('pointermove', move as EventListener)
    area.removeEventListener('pointerleave', leave)
    cancelAnimationFrame(raf)
  })
})
</script>

<template>
  <h1 ref="h1" class="title" :aria-label="`${start} ${end}`" @copy="copy">
    <span class="part" aria-hidden="true"><span v-for="(c, i) in chars(start)" :key="i" class="ch">{{ c }}</span></span>
    <span class="icons" aria-hidden="true">
      <span v-for="(e, i) in emoji" :key="e.code" class="ic enter-pop" :style="{ '--i': i + 4 }" :title="e.label" @click="poke(i)">
        <span class="grow"><Emoji :key="codes[i]" :code="codes[i]!" /></span>
      </span>
    </span>
    <span class="part" aria-hidden="true"><span v-for="(c, i) in chars(end)" :key="i" class="ch">{{ c }}</span></span>
  </h1>
</template>

<style scoped>
@layer components {
  .title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    column-gap: var(--s-3);
    row-gap: var(--s-2);
    font-size: clamp(2.6rem, 6.4vw, 5rem);
    line-height: 1;
    font-weight: var(--w-book);
    letter-spacing: -0.035em;
    cursor: default;
  }
  .part { white-space: pre; }
  .ch { display: inline-block; }
  .icons { display: inline-flex; align-items: center; --emoji: 0.95em; }
  .ic { display: inline-flex; margin-inline: -0.04em; }
  .grow { display: inline-flex; }
  @media (max-width: 599px) {
    .title { flex-direction: column; }
  }
}
</style>
