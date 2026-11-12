export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ssr: true,
  colorMode: { preference: 'light', fallback: 'light' },
  runtimeConfig: {
    public: {
      releaseRepo: 'ThienNg65/ferry-release',
      siteUrl: 'https://ferry-website.vercel.app'
    }
  },
  nitro: { prerender: { routes: ['/'] } },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Ferry: a better way to work with remote servers',
      meta: [
        { name: 'description', content: 'Ferry is a Windows app for moving files to Linux servers, running commands, following logs and watching resources, all in one window.' },
        { property: 'og:title', content: 'Ferry: a better way to work with remote servers' },
        { property: 'og:description', content: 'Transfer files, run commands, follow logs and watch your servers from one Windows app.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#EFF8FF' }
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }]
    }
  },
  fonts: {
    families: [
      { name: 'Bricolage Grotesque', provider: 'google', weights: [600, 700] },
      { name: 'Instrument Sans', provider: 'google', weights: [400, 500, 600] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400] }
    ]
  }
})
