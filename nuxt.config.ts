export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || "/app/",
    head: {
      htmlAttrs: { lang: "fr" },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#07111f" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/app-icon.svg",
        },
      ],
    },
  },

  nitro: {
    prerender: {
      ignore: ["/app"],
    },
  },
});