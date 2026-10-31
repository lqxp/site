<script setup lang="ts">
useSeoMeta({
  title: 'Handbook',
  description: 'How QxChat works: accounts, rooms, encryption, QXP-PHANTOM friends, device sync, anti-abuse, and how to run your own server.',
  ogTitle: 'The QxChat handbook',
  ogUrl: 'https://getqxchat.com/wiki',
})
useHead({ link: [{ rel: 'canonical', href: 'https://getqxchat.com/wiki' }] })

onMounted(() => {
  const id = location.hash.slice(1)
  if (handbookPage(id))
    navigateTo(`/wiki/${id}`, { replace: true })
})
</script>

<template>
  <HandbookShell>
    <header class="head">
      <Emoji code="1f913" class="head-emoji enter-pop" />
      <h1 class="title enter-rise">Handbook</h1>
      <p class="lead enter-rise" style="--i: 1">
        How QxChat works, written down for people who want to check. Start with the first two pages;
        the rest is the protocol reference, byte for byte.
      </p>
    </header>

    <section v-for="g in handbookGroups" :key="g.title" class="group">
      <h2 v-reveal class="t-title-l">{{ g.title }}</h2>
      <div class="cards" :class="{ big: g.title === 'Start here' }">
        <NuxtLink v-for="(p, i) in g.pages" :key="p.id" v-reveal="i" :to="`/wiki/${p.id}`" class="card state">
          <Emoji :code="p.emoji" class="em" />
          <h3 class="t-title-l">{{ p.title }}</h3>
          <p class="t-body-m muted">{{ p.summary }}</p>
          <span class="go icon" aria-hidden="true">arrow_forward</span>
        </NuxtLink>
      </div>
    </section>
  </HandbookShell>
</template>

<style scoped>
@layer components {
  .head { display: grid; gap: var(--s-4); margin-bottom: var(--s-12); max-width: var(--z-measure); }
  .title { font-size: clamp(3rem, 8vw, 5rem); line-height: 0.95; letter-spacing: -0.045em; }
  .lead { font-size: 1.2rem; line-height: 1.55; color: var(--on-surface-variant); }
  .group { margin-bottom: var(--s-12); }
  .group > h2 { margin-bottom: var(--s-4); }
  .cards { display: grid; gap: var(--s-3); grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr)); }
  .cards.big { grid-template-columns: repeat(auto-fill, minmax(min(100%, 22rem), 1fr)); }
  .card {
    position: relative;
    display: grid;
    gap: var(--s-2);
    align-content: start;
    padding: var(--s-6) var(--s-6) var(--s-12);
    border-radius: var(--r-xl);
    background: var(--surface-container-low);
    transition: background-color var(--dur-effects) var(--ease-effects);
  }
  .big .card { background: var(--primary-container); color: var(--on-primary-container); }
  .big .card .muted { color: inherit; }
  .card:hover { background: var(--surface-container); }
  .big .card:hover { background: color-mix(in srgb, var(--primary-container) 88%, var(--on-primary-container)); }
  .em { --emoji: var(--s-12); margin-bottom: var(--s-2); }
  .head-emoji { --emoji: var(--s-16); }
  .go { position: absolute; right: var(--s-5); bottom: var(--s-5); color: var(--primary); transition: translate var(--dur-spatial-fast) var(--ease-spatial-fast); }
  .big .go { color: inherit; }
  .card:hover .go { translate: var(--s-1) 0; --fill: 1; }
}
</style>
