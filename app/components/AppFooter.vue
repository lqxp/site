<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <span class="brand__name">QxChat</span>
        <p>A private messaging service built on lqxp.</p>
      </div>

      <nav class="site-footer__links" aria-label="Footer links">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/features">Features</NuxtLink>
        <NuxtLink to="/download">Download</NuxtLink>
        <a href="https://github.com/lqxp/app" target="_blank" rel="noreferrer">Source code</a>
      </nav>
    </div>

    <p class="site-footer__meta container">© {{ year }} QxChat — self-hosted, as it should be.</p>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 80px;
  padding: 48px 0 28px;
  background: var(--ink);
  color: rgba(255, 255, 255, 0.82);
}

.site-footer__inner {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.site-footer__brand .brand__name {
  font-family: var(--font-display);
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
}

.site-footer__brand p {
  color: var(--cream);
  margin-top: 6px;
  font-size: 0.9rem;
  max-width: 280px;
}

.site-footer__links {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  font-size: 0.9rem;
}

.site-footer__links a:hover {
  color: var(--blue-400);
}

.site-footer__meta {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 18px;
}
</style>
