import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { hideRevealTargets, showRevealTargets } from './useScrollMotion'
import type { RevealTarget } from './useScrollMotion'

function makeTarget(initialClasses: string[] = ['reveal-pre']): RevealTarget & {
  attrs: Record<string, string>
  classes: Set<string>
} {
  const attrs: Record<string, string> = {}
  const classes = new Set(initialClasses)
  return {
    inert: false,
    attrs,
    classes,
    setAttribute(name: string, value: string) {
      attrs[name] = value
    },
    removeAttribute(name: string) {
      delete attrs[name]
    },
    classList: {
      remove(token: string) {
        classes.delete(token)
      }
    }
  }
}

describe('scroll-reveal focus accessibility (#28)', () => {
  it('hides .reveal-pre with visibility: hidden alongside opacity: 0 in main.css', () => {
    const css = readFileSync(resolve(process.cwd(), 'app/assets/css/main.css'), 'utf8')
    expect(css).toMatch(/html\.motion-ready\s+\.reveal-pre\s*\{[^}]*opacity:\s*0;[^}]*visibility:\s*hidden;/s)
  })

  it('marks hidden reveal targets inert before reveal and restores focusability on reveal', () => {
    const workspaceTablist = makeTarget()
    const workspacePanel = makeTarget()

    hideRevealTargets([workspaceTablist, workspacePanel])
    expect(workspaceTablist.inert).toBe(true)
    expect(workspaceTablist.attrs.inert).toBe('')
    expect(workspacePanel.inert).toBe(true)
    expect(workspacePanel.attrs.inert).toBe('')

    showRevealTargets([workspaceTablist])
    expect(workspaceTablist.inert).toBe(false)
    expect('inert' in workspaceTablist.attrs).toBe(false)
    expect(workspaceTablist.classes.has('reveal-pre')).toBe(false)
    expect(workspacePanel.inert).toBe(true)

    showRevealTargets([workspacePanel])
    expect(workspacePanel.inert).toBe(false)
    expect('inert' in workspacePanel.attrs).toBe(false)
  })
})
