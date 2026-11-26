const assetCacheHeaders = { 'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400' }

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@nuxt/ui', '@vercel/analytics/nuxt', '@vercel/speed-insights'],
  css: ['lenis/dist/lenis.css', '~/assets/css/main.css'],
  ssr: true,
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'ms-store-badge'
    }
  },
  colorMode: { preference: 'dark', fallback: 'dark' },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'remove'
      }
    }
  },
  runtimeConfig: {
    public: {
      releaseRepo: 'ThienNg65/ferry-release',
      siteUrl: 'https://www.ferryssh.com'
    }
  },
  routeRules: {
    '/go/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/media/**': { headers: assetCacheHeaders },
    '/favicon.ico': { headers: assetCacheHeaders },
    '/favicon-48x48.png': { headers: assetCacheHeaders },
    '/icon-192.png': { headers: assetCacheHeaders },
    '/icon-512.png': { headers: assetCacheHeaders },
    '/apple-touch-icon.png': { headers: assetCacheHeaders },
    '/ferry-glass.svg': { headers: assetCacheHeaders },
    '/og.jpg': { headers: assetCacheHeaders }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/tour', '/privacy', '/terms', '/vs/winscp', '/vs/termius', '/vs/mobaxterm', '/vs/filezilla']
    },
    vercel: {
      config: {
        routes: [
          { src: '^/index\\.html$', headers: { Location: '/' }, status: 308 },
          { src: '^/(.+)/index\\.html$', headers: { Location: '/$1' }, status: 308 },
          { src: '^/(.+)/$', headers: { Location: '/$1' }, status: 308 }
        ]
      }
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
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=AW-18597036336',
          async: true,
          tagPosition: 'head'
        },
        {
          innerHTML: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18597036336');",
          tagPosition: 'head'
        }
      ],
      title: 'Ferry - Modern Windows SFTP & SSH Client',
      meta: [
        { name: 'color-scheme', content: 'dark light' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { property: 'og:site_name', content: 'Ferry' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://www.ferryssh.com/og.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Ferry for Windows - dual-pane SFTP, SSH terminal, live logs, and server monitor in one window' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://www.ferryssh.com/og.jpg' },
        { name: 'theme-color', content: '#030816', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#fafbfd', media: '(prefers-color-scheme: light)' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48 32x32 16x16' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/ferry-glass.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
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
