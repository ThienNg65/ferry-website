import { describe, expect, it } from 'vitest'
import { filterLogs, initialLogs, sortProcesses } from './demoData'
import type { LogLine, Proc } from './demoData'

const L = (level: LogLine['level']): LogLine => ({ n: 1, level, ts: '', src: '', text: '' })
const lines = [L('error'), L('warn'), L('info'), L('debug')]

describe('filterLogs', () => {
  it('All keeps every line', () => expect(filterLogs(lines, 'all')).toHaveLength(4))
  it('Errors keeps only errors', () => expect(filterLogs(lines, 'error').map(l => l.level)).toEqual(['error']))
  it('Warnings+ includes errors', () => expect(filterLogs(lines, 'warn').map(l => l.level)).toEqual(['error', 'warn']))
  it('Info+ excludes debug', () => expect(filterLogs(lines, 'info').map(l => l.level)).toEqual(['error', 'warn', 'info']))
  it('Debug keeps only debug', () => expect(filterLogs(lines, 'debug').map(l => l.level)).toEqual(['debug']))
  it('the sample data has every level', () => expect(new Set(initialLogs.map(l => l.level)).size).toBe(4))
})

describe('sortProcesses', () => {
  const rows: Proc[] = [
    { name: 'b', pid: 1, ram: 5, cpu: 1 }, { name: 'a', pid: 2, ram: 9, cpu: 3 }, { name: 'c', pid: 3, ram: 1, cpu: 2 }
  ]
  it('sorts name A to Z by default', () => expect(sortProcesses(rows, 'name').map(r => r.name)).toEqual(['a', 'b', 'c']))
  it('sorts numbers highest first by default', () => expect(sortProcesses(rows, 'cpu').map(r => r.name)).toEqual(['a', 'c', 'b']))
  it('honours ascending order', () => expect(sortProcesses(rows, 'ram', 'asc').map(r => r.name)).toEqual(['c', 'b', 'a']))
  it('does not mutate its input', () => { sortProcesses(rows, 'ram'); expect(rows[0]!.name).toBe('b') })
})
