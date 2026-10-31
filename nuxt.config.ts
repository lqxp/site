import { fileURLToPath } from 'node:url'
import { handbook } from './app/utils/handbook'

const description = 'QxChat is an end-to-end encrypted messenger that works in real time. No phone number, no email, no IP logs. Use the public server at qxch.at or run your own.'

const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('qx-theme');if(t==='dark'||t==='light')d.dataset.theme=t}catch(e){}})()`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  features: { inlineStyles: true },
  vite: { build: { cssCodeSplit: false } },
  hooks: {
    // Lighthouse: nothing competes with the hero image and fonts on first load.
    // No modulepreload for split chunks (the entry imports them one hop later) and
    // no prefetch of lazy chunks (the Breton dictionary, the Lottie player).
    'build:manifest'(manifest) {
      for (const chunk of Object.values(manifest)) {
        chunk.prefetch = false
        if (!chunk.isEntry)
          chunk.preload = false
      }
    },
  },
  ssr: true,
  modules: ['@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', pathPrefix: false }],

  site: {
    url: 'https://getqxchat.com',
    name: 'QxChat',
    description,
    defaultLocale: 'en',
  },
  sitemap: {
    exclude: ['/api/**', '/_nuxt/**'],
    urls: [
      { loc: '/', changefreq: 'weekly', priority: 1.0 },
      { loc: '/download', changefreq: 'weekly', priority: 0.9 },
      { loc: '/wiki', changefreq: 'weekly', priority: 0.8 },
      { loc: '/compare', changefreq: 'monthly', priority: 0.6 },
      { loc: '/contribute', changefreq: 'monthly', priority: 0.5 },
      { loc: '/press', changefreq: 'yearly', priority: 0.4 },
      { loc: '/security', changefreq: 'yearly', priority: 0.4 },
      { loc: '/privacy', changefreq: 'monthly', priority: 0.4 },
      { loc: '/terms', changefreq: 'yearly', priority: 0.3 },
      { loc: '/legal', changefreq: 'yearly', priority: 0.3 },
      ...handbook.map(p => ({ loc: `/wiki/${p.id}`, changefreq: 'monthly' as const, priority: 0.7 as const })),
    ],
  },
  robots: {
    allow: ['/'],
    sitemap: ['/sitemap.xml'],
    credits: false,
  },
  ogImage: { enabled: false },

  experimental: {
    viewTransition: true,
  },

  app: {
    baseURL: '/',
    head: {
      title: 'QxChat',
      titleTemplate: '%s · QxChat',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#00132f' },
        { name: 'color-scheme', content: 'light dark' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:image', content: 'https://getqxchat.com/og-cover.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'QxChat' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://getqxchat.com/og-cover.jpg' },
      ],
      style: [{ innerHTML: '@layer tokens, base, primitives, components, overrides;', tagPriority: 'critical' }],
      script: [{ innerHTML: boot, tagPosition: 'head' }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/app-icon.svg' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/128x128.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', href: '/fonts/sn-pro-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        { rel: 'preload', href: '/fonts/material-symbols-4ab2eaf981.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
      ],
    },
  },

  nitro: {
    serverAssets: [
      { baseName: 'content', dir: fileURLToPath(new URL('./content', import.meta.url)) },
      { baseName: 'explain', dir: fileURLToPath(new URL('./explain', import.meta.url)) },
    ],
    prerender: {
      crawlLinks: true,
      routes: ['/', '/404.html', '/api/handbook-index.json'],
      ignore: ['/app'],
    },
  },

  routeRules: {
    '/about': { redirect: '/wiki/what-is-qxchat' },
    '/wiki/why-qxchat-exists': { redirect: '/wiki/what-is-qxchat' },
    '/wiki/how-it-works': { redirect: '/wiki/architecture' },
    '/wiki/the-technology': { redirect: '/wiki/crypto-primitives' },
    '/wiki/open-source': { redirect: '/wiki/what-is-qxchat' },
    '/wiki/join-community': { redirect: '/wiki/what-is-qxchat' },
  },
})
