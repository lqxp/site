<script setup lang="ts">
import type { Release } from '~~/server/api/release.get'
import { links } from '~/utils/brand'
import type { Build, Platform, PlatformId } from '~/utils/release'

useSeoMeta({
  title: 'Download',
  description: 'QxChat for Windows, macOS, Linux, Android, iOS and NixOS, or straight in the browser. Free and open source.',
  ogTitle: 'Download QxChat',
  ogUrl: 'https://getqxchat.com/download',
})
useHead({ link: [{ rel: 'canonical', href: 'https://getqxchat.com/download' }] })

const { data: release } = await useFetch<Release | null>('/api/release', { default: () => null })
const list = computed(() => platforms(release.value))
const date = computed(() => release.value ? new Date(release.value.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '')

const mine = ref<{ id: PlatformId, arm: boolean } | null>(null)
onMounted(() => { mine.value = detectPlatform() })

function best(p: Platform | undefined, arm = p?.id === 'macos'): Build | undefined {
  const all = p?.builds ?? []
  return all.find(b => !b.arch || /ARM|silicon/.test(b.arch) === arm) ?? all[0]
}
const minePlatform = computed(() => list.value.find(p => p.id === mine.value?.id))
const mineBuild = computed(() => best(minePlatform.value, mine.value?.arm))

const open = ref(false)
const sheetPlatform = ref<Platform>()
function files(p: Platform) {
  sheetPlatform.value = p
  open.value = true
}

const desc: Record<PlatformId, string> = {
  windows: 'MSI installer, x64 or ARM.',
  macos: 'Apple silicon and Intel Macs.',
  linux: 'AppImage, deb, rpm or an archive.',
  android: 'An APK for 64-bit phones.',
  ios: 'An IPA to sideload.',
  nixos: 'A Nix flake.',
}

const pubkey = 'RWSEIwLtXyxP5TbW3yOlC/XyFDv/2z+1Xjx0V6uQG+OBt6AXYLyK2bS0'
const signed = computed(() => list.value.flatMap(p => p.builds).find(b => b.asset.name.endsWith('.AppImage'))?.asset.name ?? 'QxChat.AppImage')
const decode = computed(() => `base64 -d ${signed.value}.sig > ${signed.value}.minisig`)
const check = computed(() => `minisign -Vm ${signed.value} -P ${pubkey}`)
</script>

<template>
  <div class="dl">
    <section class="hero below-nav">
      <div class="wrap hero-in">
        <Emoji code="1f680" class="rocket enter-pop" />
        <h1 class="title enter-rise" style="--i: 1">Get QxChat</h1>
        <p class="lead enter-rise" style="--i: 2">Free, nothing to sign up for before you download. Your account works on every device.</p>
        <div class="main enter-rise" style="--i: 3">
          <div class="slot">
            <Transition name="swap" mode="out-in">
              <a v-if="mineBuild && minePlatform" :key="minePlatform.id" :href="mineBuild.asset.url" class="big">
                <span class="big-icon"><PlatformIcon :id="minePlatform.id" /></span>
                <span class="big-text">
                  <strong>Download for {{ minePlatform.name }}</strong>
                  <span>{{ mineBuild.label }}<template v-if="mineBuild.arch"> · {{ mineBuild.arch }}</template> · {{ bytes(mineBuild.asset.size) }}</span>
                </span>
                <span class="icon" aria-hidden="true">download</span>
              </a>
              <a v-else key="web" :href="links.app" class="big">
                <span class="big-icon"><PlatformIcon id="web" /></span>
                <span class="big-text">
                  <strong>Open the web app</strong>
                  <span>Nothing to install</span>
                </span>
                <span class="icon" aria-hidden="true">arrow_outward</span>
              </a>
            </Transition>
          </div>
          <p v-if="release" class="t-body-m muted">
            Version {{ release.tag }}, {{ date }} ·
            <a :href="release.page" target="_blank" rel="noopener">release notes</a>
          </p>
        </div>
      </div>
    </section>

    <section class="wrap section">
      <h2 v-reveal class="h2">Every platform</h2>
      <ul class="cards">
        <li v-reveal class="card web">
          <span class="ci"><PlatformIcon id="web" /></span>
          <h3 class="t-title-l">Browser</h3>
          <p class="t-body-m">Any recent browser, any system. Also handy on a computer that is not yours.</p>
          <div class="acts">
            <MButton :href="links.app" trailing="arrow_outward">Open qxch.at/app</MButton>
          </div>
        </li>
        <li v-for="(p, i) in list" :key="p.id" v-reveal="i + 1" class="card" :class="{ mine: mine?.id === p.id }">
          <span v-if="mine?.id === p.id" class="badge t-label-m">Your device</span>
          <span class="ci"><PlatformIcon :id="p.id" /></span>
          <h3 class="t-title-l">{{ p.name }}</h3>
          <p class="t-body-m muted">{{ desc[p.id] }}</p>
          <div v-if="best(p)" class="acts">
            <MButton :href="best(p)!.asset.url" :variant="mine?.id === p.id ? 'filled' : 'tonal'" icon="download">
              {{ best(p)!.label }}<template v-if="best(p)!.arch"> · {{ best(p)!.arch }}</template>
            </MButton>
            <MButton v-if="p.builds.length > 1" variant="text" @click="files(p)">All files</MButton>
          </div>
          <div v-else class="acts">
            <MButton :href="links.releases" variant="outlined" trailing="arrow_outward">Releases on GitHub</MButton>
          </div>
        </li>
      </ul>
    </section>

    <section class="wrap verify">
      <MExpand v-reveal title="Check the signature of a download">
        <template #title>
          <span class="vt"><Emoji code="1f9d0" class="ve" />Check the signature of a download</span>
        </template>
        <p class="t-body-l muted vlead">
          Windows, Linux and update files come with a <code>.sig</code> file next to them. Checking it proves the file came from us, unchanged.
          If the check fails, do not run the file, and tell us.
        </p>
        <ol class="steps">
          <li>
            <span class="num">1</span>
            <div>
              <h4 class="t-title-m">Install minisign</h4>
              <p class="t-body-m muted">From your package manager, or from <a href="https://jedisct1.github.io/minisign/" target="_blank" rel="noopener">its website</a>.</p>
            </div>
          </li>
          <li>
            <span class="num">2</span>
            <div>
              <h4 class="t-title-m">Get the signature and decode it</h4>
              <p class="t-body-m muted">Download the file with the same name plus <code>.sig</code>, into the same folder. It is base64, so decode it first. On Windows, <code>certutil -decode file.sig file.minisig</code> does the same.</p>
              <CodeBlock :code="decode" />
            </div>
          </li>
          <li>
            <span class="num">3</span>
            <div>
              <h4 class="t-title-m">Run the check</h4>
              <CodeBlock :code="check" />
              <p class="t-body-m muted">It should answer <code>Signature and comment signature verified</code>.</p>
            </div>
          </li>
        </ol>
        <p class="t-body-s muted key">Public key, the same one the apps use for updates: <code>{{ pubkey }}</code></p>
      </MExpand>
    </section>

    <MSheet v-model="open" :title="sheetPlatform ? `QxChat for ${sheetPlatform.name}` : 'Files'">
      <ul v-if="sheetPlatform" class="files">
        <li v-for="b in sheetPlatform.builds" :key="b.asset.name">
          <a :href="b.asset.url" class="file state">
            <span class="fname">
              <strong class="t-title-m">{{ b.label }}<template v-if="b.arch"> · {{ b.arch }}</template></strong>
              <span class="t-body-s muted mono">{{ b.asset.name }}</span>
            </span>
            <span class="t-body-s muted size">{{ bytes(b.asset.size) }}</span>
            <span class="icon" aria-hidden="true">download</span>
          </a>
        </li>
      </ul>
    </MSheet>
  </div>
</template>

<style scoped>
@layer components {
  .hero { position: relative; isolation: isolate; overflow: clip; padding-bottom: var(--s-12); background: radial-gradient(60% 70% at 50% 0%, color-mix(in srgb, var(--primary-container) 55%, transparent), transparent); }
  .hero-in { display: grid; justify-items: center; gap: var(--s-4); text-align: center; }
  .rocket { --emoji: var(--s-20); }
  .title { font-size: clamp(3rem, 8vw, 5rem); line-height: 0.95; letter-spacing: -0.045em; }
  .lead { max-width: 32rem; font-size: 1.2rem; color: var(--on-surface-variant); }
  .main { display: grid; justify-items: center; gap: var(--s-4); margin-top: var(--s-4); }

  /* Holds the button's height while the platform-specific one swaps in after hydration (no layout shift). */
  .slot { display: grid; place-items: center; min-height: calc(var(--s-16) + var(--s-6)); }
  .big {
    display: flex;
    align-items: center;
    gap: var(--s-4);
    min-height: var(--z-button-l);
    padding: var(--s-3) var(--s-8) var(--s-3) var(--s-3);
    border-radius: var(--r-full);
    background: var(--primary);
    color: var(--on-primary);
    text-align: start;
    box-shadow: var(--elev-2);
    transition: border-radius var(--dur-spatial-fast) var(--ease-spatial-fast), scale var(--dur-spatial-fast) var(--ease-spatial-fast), box-shadow var(--dur-effects) var(--ease-effects);
  }
  .big:hover { box-shadow: var(--elev-4); }
  .big:active { border-radius: var(--r-xl); scale: 0.98; }
  .big-icon { display: grid; place-items: center; width: var(--s-16); height: var(--s-16); border-radius: var(--r-full); background: var(--on-primary); color: var(--primary); }
  .big-icon :deep(.pi) { width: var(--s-8); height: var(--s-8); font-size: var(--s-8); }
  .big-text { display: grid; }
  .big-text strong { font-size: 1.35rem; font-weight: var(--w-semibold); letter-spacing: -0.01em; }
  .big-text span { font-size: 0.95rem; }
  .big > .icon { margin-inline-start: var(--s-4); font-size: var(--z-icon-lg); transition: translate var(--dur-spatial-fast) var(--ease-spatial-fast); }
  .big:hover > .icon { translate: 0 calc(var(--s-1) / 2); }

  .h2 { margin-bottom: var(--s-6); font-size: clamp(2rem, 4vw, 3rem); line-height: 1.05; letter-spacing: -0.035em; }
  .cards { list-style: none; padding: 0; display: grid; gap: var(--s-3); grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr)); }
  .card {
    position: relative;
    display: grid;
    gap: var(--s-2);
    align-content: start;
    padding: var(--s-6);
    border-radius: var(--r-xl);
    background: var(--surface-container-low);
    transition: background-color var(--dur-effects) var(--ease-effects);
  }
  .card:hover { background: var(--surface-container); }
  .card.web { grid-column: 1 / -1; background: var(--secondary-container); color: var(--on-secondary-container); }
  .card.mine { background: var(--primary-container); color: var(--on-primary-container); }
  .card.mine .muted { color: inherit; }
  .card.mine :deep(.btn.text) { --fg: var(--on-primary-container); }
  .card.web :deep(.btn.text) { --fg: var(--on-secondary-container); }
  .ci { display: grid; place-items: center; width: var(--s-12); height: var(--s-12); margin-bottom: var(--s-2); border-radius: var(--r-full); background: var(--surface-container-highest); color: var(--on-surface); }
  .web .ci, .mine .ci { background: var(--surface); color: var(--primary); }
  .acts { display: flex; flex-wrap: wrap; gap: var(--s-2); margin-top: var(--s-3); }
  .badge { position: absolute; top: var(--s-5); right: var(--s-5); padding: var(--s-1) var(--s-3); border-radius: var(--r-full); background: var(--primary); color: var(--on-primary); }

  .verify { padding-bottom: var(--s-8); }
  .vt { display: inline-flex; align-items: center; gap: var(--s-3); }
  .ve { --emoji: var(--s-10); }
  .vlead { max-width: var(--z-measure); margin-bottom: var(--s-6); }
  .steps { list-style: none; padding: 0; display: grid; gap: var(--s-5); max-width: calc(var(--z-measure) + var(--s-16)); }
  .steps li { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--s-4); }
  .steps li > div { display: grid; gap: var(--s-2); min-width: 0; }
  .num { display: grid; place-items: center; width: var(--s-8); height: var(--s-8); border-radius: var(--r-full); background: var(--primary); color: var(--on-primary); font-weight: var(--w-bold); font-size: 0.9rem; }
  .steps code, .vlead code, .key code { padding: 1px var(--s-1); border-radius: var(--r-xs); background: var(--surface-container-high); overflow-wrap: anywhere; }
  .key { margin-top: var(--s-6); }

  .files { list-style: none; padding: 0; display: grid; gap: 2px; }
  .file { display: flex; align-items: center; gap: var(--s-3); padding: var(--s-3) var(--s-4); border-radius: var(--r-xs); background: var(--surface-container-highest); }
  .files li:first-child .file { border-top-left-radius: var(--r-lg); border-top-right-radius: var(--r-lg); }
  .files li:last-child .file { border-bottom-left-radius: var(--r-lg); border-bottom-right-radius: var(--r-lg); }
  .fname { display: grid; min-width: 0; flex: 1; }
  .fname .mono { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
  .size { font-variant-numeric: tabular-nums; }
  .file .icon { color: var(--primary); }

  @media (max-width: 599px) {
    .big { padding-inline-end: var(--s-5); }
    .big-text strong { font-size: 1.1rem; }
    .big > .icon { display: none; }
  }
}
</style>
