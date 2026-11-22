export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@nuxt/ui'],
  css: ['lenis/dist/lenis.css', '~/assets/css/main.css'],
  ssr: true,
  colorMode: { preference: 'dark', fallback: 'dark' },
  runtimeConfig: {
    public: {
      releaseRepo: 'ThienNg65/ferry-release',
      siteUrl: 'https://www.ferryssh.com'
    }
  },
  nitro: { prerender: { routes: ['/'] } },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      script: [
        {
          // Mark motion-ready before first paint only when reduced motion is off, preventing SSR hydration FOUC on below-the-fold reveals.
          innerHTML: "if(!window.matchMedia('(prefers-reduced-motion:reduce)').matches){document.documentElement.classList.add('motion-ready')}",
          tagPosition: 'head'
        }
      ],
      title: 'Ferry: files, terminal, logs and monitoring for your servers in one Windows app',
      meta: [
        { name: 'description', content: 'Ferry is a Windows app for moving files to Linux servers, running commands, following logs and watching resources, all in one window.' },
        { property: 'og:title', content: 'Ferry: files, terminal, logs and monitoring for your servers in one Windows app' },
        { property: 'og:description', content: 'Transfer files, run commands, follow logs and watch your servers from one Windows app.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#07111f', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#eff8ff', media: '(prefers-color-scheme: light)' }
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }]
    }
  },
  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Cascadia Code', provider: 'google', weights: [400] }
    ]
  }
})
