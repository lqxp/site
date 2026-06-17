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
        <a
          href="https://github.com/lqxp/"
          target="_blank"
          rel="noreferrer"
          class="github-btn"
          aria-label="Source code on GitHub"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
              2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
              0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
              0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09
              2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08
              2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65
              3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01
              2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
        </a>
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
  align-items: center;
  gap: 22px;
  flex-wrap: wrap;
  font-size: 0.9rem;
}

.site-footer__links a:not(.github-btn):hover {
  color: var(--blue-400);
}

.github-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 6px;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.82);
  transition: border-color 0.18s, color 0.18s, background 0.18s;
  white-space: nowrap;
}

.github-btn:hover {
  border-color: var(--blue-400);
  color: var(--blue-400);
  background: rgba(255, 255, 255, 0.04);
}

.site-footer__meta {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 18px;
}
</style>