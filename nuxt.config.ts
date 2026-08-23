import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/main.css'],
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
      htmlAttrs: { lang: "en" },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#1c71d8" },
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
      ],
    },
  },

  nitro: {
    prerender: {
      ignore: ["/app"],
    },
  },
});
