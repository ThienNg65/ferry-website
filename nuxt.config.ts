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
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/privacy', '/terms', '/vs/winscp', '/vs/termius', '/vs/mobaxterm', '/vs/filezilla']
    }
  },
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
      title: 'Ferry — Modern Windows SFTP & SSH Client',
      meta: [
        { name: 'color-scheme', content: 'dark light' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'description', content: 'Move files, run SSH commands, follow live tail -F logs, and check server health in one ~23 MB Windows app. Import WinSCP and PuTTY sites in seconds.' },
        { property: 'og:site_name', content: 'Ferry' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Ferry — Modern Windows SFTP & SSH Client' },
        { property: 'og:description', content: 'Stop switching between WinSCP, PuTTY, and tail windows. Dual-pane SFTP, SSH terminal, live logs, and server health in one Windows app.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://www.ferryssh.com/og.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Ferry for Windows — dual-pane SFTP, SSH terminal, live logs, and server monitor in one window' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Ferry — Modern Windows SFTP & SSH Client' },
        { name: 'twitter:description', content: 'Stop switching between WinSCP, PuTTY, and tail windows. Dual-pane SFTP, SSH terminal, live logs, and server monitor in one ~23 MB Windows app.' },
        { name: 'twitter:image', content: 'https://www.ferryssh.com/og.jpg' },
        { name: 'theme-color', content: '#030816', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#fafbfd', media: '(prefers-color-scheme: light)' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/ferry-glass.svg' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Cascadia Code', provider: 'google', weights: [400] }
    ]
  }
})
