import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const MEASUREMENT_MODULES: Array<[moduleName: string, expectedDisclosure: RegExp]> = [
  ['@vercel/analytics', /Vercel Web Analytics/],
  ['@vercel/speed-insights', /Vercel Speed Insights/]
]

describe('website privacy policy disclosures (#31)', () => {
  it('discloses every @vercel measurement module configured in nuxt.config.ts', () => {
    const nuxtConfig = readFileSync(resolve(process.cwd(), 'nuxt.config.ts'), 'utf8')
    const privacyVue = readFileSync(resolve(process.cwd(), 'app/pages/privacy.vue'), 'utf8')

    const configuredVercelModules = [...nuxtConfig.matchAll(/['"](@vercel\/[^'"]+)['"]/g)].map(m => m[1])
    expect(configuredVercelModules.length).toBeGreaterThan(0)

    for (const mod of configuredVercelModules) {
      const mapping = MEASUREMENT_MODULES.find(([prefix]) => mod.startsWith(prefix))
      expect(mapping, `Missing privacy disclosure mapping for configured module: ${mod}`).toBeDefined()
      expect(privacyVue).toMatch(mapping![1])
    }

    expect(privacyVue).toMatch(/Web Vitals/)
    expect(privacyVue).toMatch(/not associated with an individual visitor or IP address/)
  })
})
