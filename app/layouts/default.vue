<script setup lang="ts">
useSchemaOrg([
  {
    '@type': 'Organization',
    '@id': 'https://getqxchat.com/#organization',
    'name': 'QxChat',
    'url': 'https://getqxchat.com/',
    'logo': 'https://getqxchat.com/app-icon.svg',
    'sameAs': ['https://github.com/lqxp', 'https://discord.wf/qxchat'],
  },
  {
    '@type': 'WebSite',
    '@id': 'https://getqxchat.com/#website',
    'url': 'https://getqxchat.com/',
    'name': 'QxChat',
    'inLanguage': 'en',
    'publisher': { '@id': 'https://getqxchat.com/#organization' },
  },
])
</script>

<template>
  <div class="shell">
    <SiteNav />
    <SiteTabBar />
    <main id="main" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style>
@layer components {
  .shell { min-height: 100dvh; display: flex; flex-direction: column; }
  .shell > main { flex: 1; outline: none; }
}
</style>
