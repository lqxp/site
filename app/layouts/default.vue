<template>
  <div class="app-shell">
    <AppHeader />
    <main class="app-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style>
@import '~/assets/css/fonts.css';

:root {
  --blue-700: #1c71d8;
  --blue-600: #2581ea;
  --blue-500: #358ff8;
  --blue-400: #4898f7;
  --blue-300: #7eb3f9;
  --blue-50: #edf4fe;
  
  --cream: #f0e0d9;
  --cream-soft: #fcf8f6;
  --slate: #4e658d;
  --slate-light: #7b8ea9;
  
  --bg-color: #f6f8fb;
  --bg-secondary: #ffffff;
  --surface: #ffffff;
  --surface-raised: #f0f4f9;
  --surface-hover: #eaf1fa;
  --border-color: rgba(28, 113, 216, 0.12);
  --border-strong: rgba(28, 113, 216, 0.22);
  
  --text-color: #0f1c2e;
  --text-secondary: #4e658d;
  --text-muted: #8496b0;
  
  --accent-color: #1c71d8;
  --accent-gradient: linear-gradient(135deg, #1c71d8 0%, #4898f7 100%);
  --accent-glow: 0 10px 30px -5px rgba(28, 113, 216, 0.35);
  --card-shadow: 0 10px 30px rgba(15, 28, 46, 0.05);
  --card-shadow-hover: 0 20px 40px rgba(28, 113, 216, 0.12);
  
  --font-family: var(--font-main);
  --font-display: var(--font-main);
  --font-body: var(--font-main);

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 32px;
  --radius-pill: 9999px;

  color-scheme: light;
}

[data-theme="dark"] {
  --bg-color: #090e15;
  --bg-secondary: #101824;
  --surface: #141e2d;
  --surface-raised: #1c283c;
  --surface-hover: #23324b;
  --border-color: rgba(72, 152, 247, 0.16);
  --border-strong: rgba(72, 152, 247, 0.3);
  
  --text-color: #f1f5f9;
  --text-secondary: #94a7c2;
  --text-muted: #627794;
  
  --blue-700: #4898f7;
  --blue-600: #358ff8;
  --blue-500: #2581ea;
  --blue-400: #6cb0f9;
  --blue-50: rgba(72, 152, 247, 0.12);
  
  --cream: #28211c;
  --cream-soft: #1d1916;
  --slate: #94a7c2;
  
  --accent-color: #4898f7;
  --accent-gradient: linear-gradient(135deg, #1c71d8 0%, #4898f7 100%);
  --accent-glow: 0 10px 30px -5px rgba(72, 152, 247, 0.35);
  --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  --card-shadow-hover: 0 20px 40px rgba(72, 152, 247, 0.18);

  color-scheme: dark;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-family);
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
