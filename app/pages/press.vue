<script setup lang="ts">
useSeoMeta({
  title: 'Press kit',
  description: 'QxChat logos in SVG and PNG, brand colours, fonts and real screenshots of the desktop and Android apps, in one download.',
  ogTitle: 'QxChat press kit',
  ogUrl: 'https://getqxchat.com/press',
})
useHead({ link: [{ rel: 'canonical', href: 'https://getqxchat.com/press' }] })

const { show } = useSnackbar()

const logos = [
  { name: 'Icon', file: 'qxchat-icon', bg: 'plain', png: 'qxchat-icon-1024.png', note: 'SVG, PNG 512 and 1024' },
  { name: 'Logo, blue', file: 'qxchat-logo-blue', bg: 'light', png: 'qxchat-logo-blue.png', note: 'For light backgrounds' },
  { name: 'Logo, white', file: 'qxchat-logo-white', bg: 'brand', png: 'qxchat-logo-white.png', note: 'For dark or blue backgrounds' },
  { name: 'Logo, black', file: 'qxchat-logo-black', bg: 'paper', png: 'qxchat-logo-black.png', note: 'For one-colour printing' },
]

const colours = [
  { name: 'QxChat blue', hex: '#1c71d8', ink: '#ffffff' },
  { name: 'Deep blue', hex: '#0058b2', ink: '#ffffff' },
  { name: 'Night', hex: '#00132f', ink: '#f0f3ff' },
  { name: 'Sky', hex: '#aac7ff', ink: '#00132f' },
  { name: 'Paper', hex: '#f9f9ff', ink: '#10131a' },
]

const shots = [
  { src: '/img/overview_white.webp', alt: 'QxChat on desktop, light theme, a room with messages' },
  { src: '/img/overview_black.webp', alt: 'QxChat on desktop, dark theme, a room with messages' },
  { src: '/img/stream_white.webp', alt: 'QxChat on desktop, a call with screen sharing' },
  { src: '/img/lock_black.webp', alt: 'QxChat on desktop, the lock screen' },
]

async function copy(hex: string) {
  try {
    await navigator.clipboard.writeText(hex)
    show(`${hex} copied`)
  }
  catch {
    show(hex)
  }
}
</script>

<template>
  <div>
    <PageHero
      emoji="1f4e3"
      title="Press kit"
      lead="Writing about QxChat? Here is everything you need: logos, colours, fonts and real screenshots."
    >
      <MButton href="/brand/qxchat-press-kit.zip" icon="download" size="m" download>Download everything (ZIP, 6.5 MB)</MButton>
    </PageHero>

    <section class="wrap">
      <h2 v-reveal class="h2">Logos</h2>
      <div class="logos">
        <article v-for="(l, i) in logos" :key="l.file" v-reveal="i" class="logo-card">
          <div class="logo-stage" :class="l.bg">
            <img :src="`/brand/${l.file}.svg`" :alt="l.name" loading="lazy" :class="{ icon: l.file === 'qxchat-icon' }">
          </div>
          <div class="logo-foot">
            <div>
              <h3 class="t-title-m">{{ l.name }}</h3>
              <p class="t-body-s muted">{{ l.note }}</p>
            </div>
            <div class="cluster">
              <MButton :href="`/brand/${l.file}.svg`" variant="tonal" size="s" download>SVG</MButton>
              <MButton :href="`/brand/${l.png}`" variant="tonal" size="s" download>PNG</MButton>
            </div>
          </div>
        </article>
      </div>
      <p v-reveal class="t-body-m muted rules">
        Keep some space around the logo, and please do not stretch it, recolour it, rotate it or add effects.
        You can use the name and logo to talk about QxChat, not to present another service as the official one.
      </p>
    </section>

    <section class="wrap section">
      <h2 v-reveal class="h2">Colours</h2>
      <ul class="swatches">
        <li v-for="(c, i) in colours" :key="c.hex" v-reveal="i">
          <button type="button" class="swatch" :style="{ background: c.hex, color: c.ink }" :aria-label="`Copy ${c.name}, ${c.hex}`" @click="copy(c.hex)">
            <span class="t-title-m">{{ c.name }}</span>
            <span class="mono">{{ c.hex }}</span>
            <span class="icon copy" aria-hidden="true">content_copy</span>
          </button>
        </li>
      </ul>
    </section>

    <section class="wrap section">
      <h2 v-reveal class="h2">Fonts</h2>
      <div class="fonts">
        <article v-reveal class="font">
          <p class="sample">Aa</p>
          <h3 class="t-title-l">SN Pro</h3>
          <p class="t-body-m muted">The logo and all text on the website and in the app. SIL Open Font License.</p>
        </article>
        <article v-reveal="1" class="font">
          <p class="sample mono">{}</p>
          <h3 class="t-title-l">JetBrains Mono</h3>
          <p class="t-body-m muted">Code and technical details. SIL Open Font License.</p>
        </article>
      </div>
    </section>

    <section class="wrap section">
      <h2 v-reveal class="h2">Screenshots</h2>
      <p v-reveal class="t-body-l muted lead">Previews below. The ZIP has the full-size PNG files, desktop and Android.</p>
      <div class="shots">
        <img v-for="(s, i) in shots" :key="s.src" v-reveal="i" :src="s.src" :alt="s.alt" width="1536" height="864" loading="lazy" decoding="async">
      </div>
    </section>

    <section class="wrap section">
      <div v-reveal class="cta">
        <p class="t-headline-s">Need something else, or want to ask a question?</p>
        <MButton href="mailto:contact@qxch.at" icon="mail">contact@qxch.at</MButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
@layer components {
  .h2 { margin-bottom: var(--s-6); font-size: clamp(1.8rem, 3.5vw, 2.6rem); letter-spacing: -0.03em; }
  .lead { margin: calc(var(--s-3) * -1) 0 var(--s-6); }

  .logos { display: grid; gap: var(--s-3); grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); }
  .logo-card { display: grid; overflow: hidden; border-radius: var(--r-2xl); background: var(--surface-container-low); }
  .logo-stage { display: grid; place-items: center; aspect-ratio: 16 / 9; padding: var(--s-8); }
  .logo-stage img { width: 80%; height: auto; }
  .logo-stage img.icon { width: auto; height: 60%; }
  .logo-stage.plain { background: var(--surface-container); }
  .logo-stage.light { background: #ffffff; }
  .logo-stage.brand { background: #1c71d8; }
  .logo-stage.paper { background: #ffffff; box-shadow: inset 0 0 0 var(--z-hairline) var(--outline-variant); }
  .logo-card:has(.paper) { background: var(--surface-container); }
  .logo-foot { display: flex; align-items: center; justify-content: space-between; gap: var(--s-3); padding: var(--s-4) var(--s-5); }
  .rules { max-width: var(--z-measure); margin-top: var(--s-5); }

  .swatches { list-style: none; padding: 0; display: grid; gap: var(--s-3); grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr)); }
  .swatch {
    position: relative;
    display: grid;
    align-content: end;
    gap: var(--s-1);
    width: 100%;
    min-height: 9rem;
    padding: var(--s-5);
    border: 0;
    border-radius: var(--r-xl);
    box-shadow: inset 0 0 0 var(--z-hairline) var(--outline-variant);
    text-align: start;
    cursor: pointer;
    transition: border-radius var(--dur-spatial) var(--ease-spatial);
  }
  .swatch:hover { border-radius: var(--r-2xl); }
  .swatch:active { border-radius: var(--r-md); }
  .copy { position: absolute; top: var(--s-4); right: var(--s-4); font-size: var(--z-icon-sm); opacity: 0; transition: opacity var(--dur-effects) var(--ease-effects); }
  .swatch:is(:hover, :focus-visible) .copy { opacity: 1; }

  .fonts { display: grid; gap: var(--s-3); grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); }
  .font { display: grid; gap: var(--s-2); padding: var(--s-6); border-radius: var(--r-2xl); background: var(--surface-container-low); }
  .sample { font-size: 5rem; line-height: 1; font-weight: var(--w-bold); color: var(--primary); letter-spacing: -0.04em; }
  .sample.mono { font-weight: 800; letter-spacing: -0.02em; }

  .shots { display: grid; gap: var(--s-3); grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr)); }
  .shots { padding: var(--s-4); }
  .shots img {
    width: 100%;
    height: auto;
    padding: var(--s-2);
    border-radius: var(--r-lg);
    background: var(--surface-container-lowest, #fff);
    box-shadow: var(--elev-2);
    rotate: var(--tilt);
    transition: rotate var(--dur-spatial) var(--ease-spatial), scale var(--dur-spatial) var(--ease-spatial);
  }
  .shots img:nth-child(4n + 1) { --tilt: -1.5deg; }
  .shots img:nth-child(4n + 2) { --tilt: 1.2deg; }
  .shots img:nth-child(4n + 3) { --tilt: 0.8deg; }
  .shots img:nth-child(4n + 4) { --tilt: -1deg; }
  .shots img:hover { rotate: 0deg; scale: 1.02; }

  .cta { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--s-5); padding: var(--s-8); border-radius: var(--r-2xl); background: var(--surface-container-high); }
}
</style>
