<template>
  <footer class="site-footer">
    <div class="scroll-top-wrapper" @click="scrollToTop" title="Back to top">
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </div>
    
    <div class="footer-container">
      <div class="col-logo">
        <div class="footer-logo">
          <img src="https://qxch.at/app-icon-with-name.svg" alt="QxChat Logo" class="footer-brand-logo-img" />
        </div>
        <div class="footer-copyright">
          QxChat © {{ new Date().getFullYear() }}<br />
          All Rights Reserved · MIT License
        </div>
      </div>

      <div class="footer-col col-about">
        <h4 class="footer-title">About</h4>
        <p>QxChat is an open-source, end-to-end encrypted messaging platform designed for self-hosting. Your keys, your server, your freedom.</p>
      </div>

      <div class="footer-col">
        <h4 class="footer-title">Navigation</h4>
        <ul class="footer-list">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/download">Downloads</NuxtLink></li>
          <li><NuxtLink to="/wiki">Docs</NuxtLink></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-title">Ecosystem</h4>
        <ul class="footer-list">
          <li><a href="https://qxch.at/app" target="_blank" rel="noopener">Web Client</a></li>
          <li><a href="https://github.com/lqxp/app" target="_blank" rel="noopener">Desktop App</a></li>
          <li><a href="https://github.com/lqxp/lqxp" target="_blank" rel="noopener">Server Core</a></li>
        </ul>
      </div>

      <div class="footer-col col-contact">
        <h4 class="footer-title">Community</h4>
        <p style="margin-bottom: 0.2rem; font-size: 0.85rem;">Questions or discussions?</p>
        <p style="font-size: 0.85rem;">Join our community channels</p>
        <div class="footer-socials">
          <a href="https://discord.wf/qxchat" target="_blank" rel="noopener" aria-label="Discord">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>
          <a href="https://github.com/lqxp" target="_blank" rel="noopener" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    const lenis = (window as any).lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.site-footer {
  position: relative;
  background: var(--bg-color);
  border-top: 1px solid var(--border-color);
  padding: 5rem 5vw 4rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  z-index: 20;
}

.scroll-top-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 40px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-top: none;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: var(--text-secondary);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

.scroll-top-wrapper:hover {
  color: var(--accent-color);
  padding-top: 4px;
}

.scroll-top-wrapper:active {
  transform: translateX(-50%) scale(0.92);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 2fr 1.2fr 1.2fr 1.5fr;
  gap: 3rem;
  align-items: flex-start;
}

.col-logo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer-brand-logo-img {
  height: 56px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  display: block;
}

.footer-logo {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-color);
  letter-spacing: -0.04em;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
}

.footer-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 3px 10px;
  border-radius: 50px;
  margin-bottom: 1rem;
  width: fit-content;
}

@keyframes livePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }
  50% {
    transform: scale(1.15);
    opacity: 0.8;
    box-shadow: 0 0 0 5px rgba(16, 185, 129, 0);
  }
}

.status-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  animation: livePulse 2.5s ease-in-out infinite;
}

.footer-copyright {
  font-size: 0.75rem;
  color: var(--text-secondary);
  opacity: 0.75;
  line-height: 1.5;
}

.footer-col .footer-title {
  color: var(--text-color);
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
}

.footer-col p {
  color: var(--text-secondary);
  line-height: 1.65;
  font-size: 0.92rem;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-list a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.92rem;
}

.footer-list a:hover {
  color: var(--accent-color);
}

.footer-socials {
  display: flex;
  gap: 12px;
  margin-top: 1rem;
}

.footer-socials a {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--surface-raised, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-socials a:hover {
  background: var(--accent-color);
  color: #ffffff;
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(28, 113, 216, 0.3);
}

.footer-socials a:active {
  transform: scale(0.92);
}

@media (max-width: 1024px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
}
</style>