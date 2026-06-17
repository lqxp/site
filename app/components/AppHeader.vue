<script setup lang="ts">
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <NuxtLink to="/" class="brand" @click="closeMenu">
        <img src="/app-icon.svg" alt="" class="brand__mark" />
        <span class="brand__name">QxChat</span>
      </NuxtLink>
      <nav class="site-nav" :class="{ 'is-open': menuOpen }" aria-label="Main navigation">
        <NuxtLink to="/" exact-active-class="is-active" @click="closeMenu">Home</NuxtLink>
        <NuxtLink to="/features" active-class="is-active" @click="closeMenu">Features</NuxtLink>
        <NuxtLink to="/download" active-class="is-active" @click="closeMenu">Download</NuxtLink>
        <a href="/app" class="btn btn--primary btn--sm site-nav__cta">
          Open QxChat
        </a>
      </nav>
      <a href="/app" class="btn btn--primary site-header__cta"></a>
      <button class="nav-toggle" type="button" :aria-expanded="menuOpen" aria-label="Open navigation"
        @click="menuOpen = !menuOpen">
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(251, 250, 248, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 72px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand__mark {
  width: 28px;
  height: 28px;
}

.brand__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 28px;
  font-size: 0.93rem;
  font-weight: 500;
  color: var(--slate);
}

.site-nav a {
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  transition: color 150ms ease, border-color 150ms ease;
}

.site-nav a:hover {
  color: var(--ink);
}

.site-nav a.is-active {
  color: var(--ink);
  border-bottom-color: var(--blue-700);
}

.site-nav__cta {
  display: none;
}

.site-header__cta {
  font-size: 1rem;
  padding: 10px 22px;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: #fff;
}

.nav-toggle span {
  display: block;
  height: 1.5px;
  margin-inline: 8px;
  background: var(--ink);
}

@media (max-width: 760px) {
  .site-header__cta {
    display: none;
  }

  .nav-toggle {
    display: flex;
  }

  .site-nav {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    padding: 22px 24px 28px;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
  }

  .site-nav.is-open {
    display: flex;
  }

  .site-nav__cta {
    display: inline-flex;
    margin-top: 6px;
  }
}
</style>