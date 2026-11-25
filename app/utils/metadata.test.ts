import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('production domain and preview robots metadata (#2)', () => {
  it('configures https://www.ferryssh.com across nuxt.config.ts, robots.txt, and sitemap.xml', () => {
    const nuxtConfig = readFileSync(resolve(process.cwd(), 'nuxt.config.ts'), 'utf8')
    const robotsTxt = readFileSync(resolve(process.cwd(), 'public/robots.txt'), 'utf8')
    const sitemapXml = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8')

    expect(nuxtConfig).toContain("siteUrl: 'https://www.ferryssh.com'")
    expect(nuxtConfig).not.toContain('ferry-website.vercel.app')
    expect(robotsTxt).toContain('Sitemap: https://www.ferryssh.com/sitemap.xml')
    expect(sitemapXml).toContain('<loc>https://www.ferryssh.com/</loc>')
  })

  it('emits noindex, nofollow on Vercel preview deployments', () => {
    const nuxtConfig = readFileSync(resolve(process.cwd(), 'nuxt.config.ts'), 'utf8')
    expect(nuxtConfig).toMatch(/VERCEL_ENV\s*===\s*'preview'/)
    expect(nuxtConfig).toContain("'noindex, nofollow'")
  })
})
