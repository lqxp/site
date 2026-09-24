import svgLoader from 'vite-svg-loader'
import { wikiSections } from './app/utils/wiki'

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://getqxchat.com',
    name: 'QxChat',
    description: 'QxChat is an open-source, end-to-end encrypted messaging platform you host on your own server. Native apps for Windows, macOS, Linux, Android and iOS.',
    defaultLocale: 'en',
  },
  sitemap: {
    exclude: ['/api/**', '/_nuxt/**'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
    },
    urls: [
      { loc: '/', changefreq: 'daily', priority: 1.0 },
      { loc: '/download', changefreq: 'weekly', priority: 0.9 },
      { loc: '/wiki', changefreq: 'weekly', priority: 0.8 },
      // One indexable URL per handbook section (routed pagination).
      ...wikiSections.map(s => ({
        loc: `/wiki/${s.id}`,
        changefreq: 'weekly' as const,
        priority: 0.7,
      })),
    ],
  },
  robots: {
    allow: ['/'],
    // Note: /_nuxt/ (JS/CSS/fonts) stays crawlable so Google can render pages.
    disallow: ['/api/'],
    sitemap: ['/sitemap.xml'],
    credits: false,
    groups: [
      {
        // Explicit allow-list for search + AI crawlers (training & live retrieval).
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'GoogleOther',
          'DuckAssistBot',
          'Applebot-Extended',
          'anthropic-ai',
          'Meta-ExternalAgent',
        ],
        allow: ['/'],
      },
    ],
  },
  schemaOrg: {
    host: 'https://getqxchat.com',
    inLanguage: 'en',
  },
  // Disabled: dynamic OG rendering needs a renderer dep (@takumi-rs/core)
  // and is unnecessary — we serve a static /og-cover.jpg instead.
  ogImage: {
    enabled: false,
  },
  vite: {
    plugins: [svgLoader()],
  },
  experimental: {
    viewTransition: true,
  },
  app: {
    baseURL: "/",
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'QxChat | Private, Self-Hosted & Multi-Platform Messaging',
      titleTemplate: '%s | QxChat',
      htmlAttrs: { lang: "en" },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "QxChat is an open-source, end-to-end encrypted messaging platform you host on your own server. Native apps for Windows, macOS, Linux, Android and iOS." },
        { name: "theme-color", content: "#1c71d8" },
        // Note: <meta name="robots"> is injected by @nuxtjs/robots — do not set it here.
        // Open Graph / Twitter defaults (overridden per page)
        { property: "og:site_name", content: "QxChat" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_US" },
        { property: "og:url", content: "https://getqxchat.com/" },
        { property: "og:image", content: "https://getqxchat.com/og-cover.jpg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "QxChat — Your server. Your rules." },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "https://getqxchat.com/og-cover.jpg" },
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('qxchat-theme');if(!t||(t!=='dark'&&t!=='light')){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          type: "text/javascript",
        },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/svg+xml", href: "/app-icon.svg" },
        { rel: "icon", type: "image/png", sizes: "128x128", href: "/128x128.png" },
        { rel: "apple-touch-icon", sizes: "128x128", href: "/128x128.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },

  nitro: {
    prerender: {
      ignore: ["/app"],
    },
  },
});
