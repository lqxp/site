<template>
  <nav class="navbar" :class="{ 'nav-hidden': isHidden }">
    <div class="nav-content">
      <NuxtLink to="/" class="logo">
        <img src="https://qxch.at/app-icon-with-name.svg" alt="QxChat Logo" class="brand-logo-img" />
      </NuxtLink>

      <div class="nav-links" :class="{ active: isMobileMenuOpen }">
        <NuxtLink to="/" @click="closeMobileNav">Home</NuxtLink>
        <NuxtLink to="/download" @click="closeMobileNav">Download</NuxtLink>
        <NuxtLink to="/wiki" @click="closeMobileNav">Docs</NuxtLink>
      </div>

      <div class="nav-actions">
        <button
          class="theme-toggle-btn"
          id="theme-toggle"
          @click="toggleTheme"
          aria-label="Toggle Theme"
          title="Toggle Theme"
        >
          <ClientOnly>
            <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </ClientOnly>
        </button>

        <a href="https://qxch.at/app" target="_blank" rel="noopener" class="nav-login" id="nav-login-link">
          <span>Open App</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>

        <button
          class="nav-toggle"
          :class="{ active: isMobileMenuOpen }"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Nav Overlay -->
    <div
      class="mobile-nav-overlay"
      :class="{ active: isMobileMenuOpen }"
      @click="closeMobileNav"
    ></div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isHidden = ref(false)
const isMobileMenuOpen = ref(false)
const isDark = ref(false)

const closeMobileNav = () => {
  isMobileMenuOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('qxchat-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('qxchat-theme', 'light')
  }
}

let lastScrollY = 0
const handleScroll = () => {
  if (typeof window === 'undefined') return
  const scrollY = window.scrollY
  if (scrollY > lastScrollY && scrollY > 100) {
    isHidden.value = true
  } else {
    isHidden.value = false
  }
  lastScrollY = scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  const theme = document.documentElement.getAttribute('data-theme')
  isDark.value = theme === 'dark'
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.brand-logo-img {
  height: 52px;
  width: auto;
  max-width: 205px;
  object-fit: contain;
  display: block;
}

.logo-title {
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: -0.03em;
  color: var(--text-color);
}

.theme-toggle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.theme-toggle-btn:active {
  transform: scale(0.92);
}

.theme-toggle-btn svg {
  width: 19px;
  height: 19px;
}

.nav-login {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-color);
  color: #ffffff !important;
  font-weight: 700;
  padding: 0.65rem 1.4rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 0.95rem;
  border: 1px solid var(--accent-color);
  transition: background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-login:hover {
  background: #1765c4;
}
</style>
