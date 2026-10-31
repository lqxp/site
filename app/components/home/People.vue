<script setup lang="ts">
import type { Contributor } from '~~/server/api/contributors.get'

const { data } = await useFetch<Contributor[]>('/api/contributors', { default: () => [] })
const people = computed(() => (data.value ?? []).slice(0, 18))
prerenderRoutes(people.value.map(p => p.avatar).filter(a => a.startsWith('/avatars/')))
</script>

<template>
  <div v-if="people.length" class="people">
    <ul class="avatars" aria-label="Contributors">
      <li v-for="(p, i) in people" :key="p.login" class="person" :style="{ zIndex: people.length - i }">
        <a :href="`https://github.com/${p.login}`" target="_blank" rel="noopener" class="face" :aria-label="`${p.login}, ${p.total.toLocaleString('en')} ${p.total === 1 ? 'commit' : 'commits'}, on GitHub`">
          <img v-if="p.avatar" :src="p.avatar" alt="" width="64" height="64" loading="lazy">
          <span v-else class="ini" aria-hidden="true">{{ p.login.slice(0, 2).toUpperCase() }}</span>
        </a>
        <span class="tag" aria-hidden="true"><strong>{{ p.login }}</strong> {{ p.total.toLocaleString('en') }} {{ p.total === 1 ? 'commit' : 'commits' }}</span>
      </li>
    </ul>
    <a :href="links.github" target="_blank" rel="noopener" class="count">
      {{ people.length }} {{ people.length === 1 ? 'contributor' : 'contributors' }} on GitHub
      <span class="icon" aria-hidden="true">arrow_outward</span>
    </a>
  </div>
</template>

<style scoped>
@layer components {
  .people { display: flex; flex-wrap: wrap; align-items: center; gap: var(--s-3) var(--s-5); }
  .avatars { list-style: none; padding: 0 0 0 var(--s-3); display: flex; }
  .person { position: relative; margin-inline-start: calc(var(--s-3) * -1); }
  .person:is(:hover, :focus-within) { z-index: 99 !important; }
  .face {
    display: grid;
    place-items: center;
    width: var(--s-12);
    height: var(--s-12);
    overflow: hidden;
    border-radius: var(--r-full);
    background: var(--primary-container);
    color: var(--on-primary-container);
    box-shadow: 0 0 0 calc(var(--s-1) * 0.75) var(--surface-container-low);
    transition: translate var(--dur-spatial-fast) var(--ease-spatial-fast);
  }
  .face img { width: 100%; height: 100%; object-fit: cover; }
  .ini { font-family: var(--font-mono); font-weight: 800; font-size: 0.85rem; }
  .person:is(:hover, :focus-within) .face { translate: 0 calc(var(--s-1) * -1.5); }
  .face:focus-visible { outline-offset: var(--s-1); }

  .tag {
    position: absolute;
    bottom: calc(100% + var(--s-2));
    left: 50%;
    padding: var(--s-1) var(--s-3);
    border-radius: var(--r-full);
    background: var(--inverse-surface);
    color: var(--inverse-on-surface);
    font-size: 0.8rem;
    white-space: nowrap;
    translate: -50% var(--s-1);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--dur-effects) var(--ease-effects), translate var(--dur-spatial-fast) var(--ease-spatial-fast);
  }
  .tag strong { font-weight: var(--w-semibold); margin-inline-end: var(--s-1); }
  .person:first-child .tag { left: 0; translate: 0 var(--s-1); }
  .person:is(:hover, :focus-within) .tag { opacity: 1; translate: -50% 0; }
  .person:first-child:is(:hover, :focus-within) .tag { translate: 0 0; }

  .count { display: inline-flex; align-items: center; gap: var(--s-1); font-weight: var(--w-semibold); color: var(--on-surface); }
  .count .icon { font-size: var(--z-icon-sm); color: var(--primary); transition: translate var(--dur-spatial-fast) var(--ease-spatial-fast); }
  .count:hover .icon { translate: 2px -2px; }
}
</style>
