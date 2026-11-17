// Made-up sample data for the coded demos. Hosts are example.com; nothing here is a real name.
export type Level = 'error' | 'warn' | 'info' | 'debug'
export type LogFilter = 'all' | 'error' | 'warn' | 'info' | 'debug'
export interface LogLine { n: number, level: Level, ts: string, src: string, text: string }
export interface Proc { name: string, pid: number, ram: number, cpu: number }
export type ProcKey = 'name' | 'ram' | 'cpu'

/** The app's own rules: Errors is errors only, Warnings+ adds warnings, Info+ drops debug, Debug is debug only. */
export function filterLogs(lines: LogLine[], f: LogFilter): LogLine[] {
  if (f === 'error') return lines.filter(l => l.level === 'error')
  if (f === 'warn') return lines.filter(l => l.level === 'error' || l.level === 'warn')
  if (f === 'info') return lines.filter(l => l.level !== 'debug')
  if (f === 'debug') return lines.filter(l => l.level === 'debug')
  return lines
}

/** Name sorts A to Z by default, the numeric columns highest first, like the app's process table. */
export function sortProcesses(rows: Proc[], key: ProcKey, dir: 'asc' | 'desc' = key === 'name' ? 'asc' : 'desc'): Proc[] {
  const d = dir === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => (key === 'name' ? a.name.localeCompare(b.name) : a[key] - b[key]) * d)
}

const logSamples: [Level, string, string][] = [
  ['info', 'http', 'GET /health 200 1ms'],
  ['info', 'http', 'GET /api/v1/users 200 12ms'],
  ['warn', 'cache', 'slow query on orders (412 ms) table=orders'],
  ['info', 'http', 'POST /api/v1/orders 201 38ms'],
  ['debug', 'db', 'pool size 8, idle 5'],
  ['error', 'db', 'connection reset by peer, retrying (attempt 2/5)'],
  ['info', 'queue', 'job email.send completed in 220ms'],
  ['warn', 'auth', 'token for user 1187 expires in 4m']
]
export function makeLog(n: number): LogLine {
  const [level, src, text] = logSamples[n % logSamples.length]!
  return { n, level, src, text, ts: `2026-11-12T10:28:${String(n % 60).padStart(2, '0')}Z` }
}
export const initialLogs: LogLine[] = Array.from({ length: 24 }, (_, i) => makeLog(i + 1))

export const levelBadge: Record<Level, string> = { error: 'ERR', warn: 'WRN', info: 'INF', debug: 'DBG' }

export const localFiles = [
  ['assets', 'dir', '', 'Nov 12, 01:16 PM'], ['config', 'dir', '', 'Nov 12, 01:43 PM'], ['dist', 'dir', '', 'Nov 12, 01:16 PM'],
  ['docs', 'dir', '', 'Nov 12, 01:16 PM'], ['releases', 'dir', '', 'Nov 12, 01:43 PM'], ['scripts', 'dir', '', 'Nov 12, 01:43 PM'],
  ['src', 'dir', '', 'Nov 12, 01:33 PM'], ['package.json', 'json', '43 B', 'Nov 12, 01:16 PM'], ['README.md', 'file', '10 B', 'Nov 12, 01:16 PM'],
  ['release-notes.pdf', 'file', '349.0 KB', 'Nov 12, 01:16 PM'], ['web-api-2.15.0.tar.gz', 'archive', '19.0 MB', 'Nov 12, 01:16 PM']
] as const
export const remoteFiles = [
  ['config', 'dir', '', 'Nov 12, 01:10 PM', 'Read, Write & Execute'],
  ['current', 'dir', '', 'Nov 16, 08:37 PM', 'Read, Write & Execute', 'releases/2026-11-16'],
  ['logs', 'dir', '', 'Nov 12, 01:11 PM', 'Read, Write & Execute'],
  ['public', 'dir', '', 'Nov 12, 01:10 PM', 'Read, Write & Execute'],
  ['scripts', 'dir', '', 'Nov 12, 01:10 PM', 'Read, Write & Execute'],
  ['src', 'dir', '', 'Nov 12, 01:10 PM', 'Read, Write & Execute'],
  ['package.json', 'json', '43 B', 'Nov 12, 01:10 PM', 'Read & Write'],
  ['README.md', 'file', '24 B', 'Nov 12, 01:10 PM', 'Read & Write']
] as const

export interface PromoScene {
  id: 'connect' | 'transfer' | 'logs' | 'terminal' | 'outro'
  step: string
  title: string
  caption: string
  durationMs: number
  dockTab: 'transfers' | 'tail' | 'terminal' | 'monitor'
  dockPosition: 'bottom' | 'right'
  cursor: { x: number, y: number, label?: string }
  camera: { scale: number, x: number, y: number }
}

export const promoScenes: readonly PromoScene[] = [
  {
    id: 'connect',
    step: 'Connect',
    title: 'One SSH connection. Every server tool in one window.',
    caption: 'Import existing sites from WinSCP, PuTTY or ~/.ssh/config, or connect with password, key, agent or jump host.',
    durationMs: 4000,
    dockTab: 'transfers',
    dockPosition: 'bottom',
    cursor: { x: 26, y: 52, label: 'Connect api-prod-01' },
    camera: { scale: 1.03, x: 0, y: 0 }
  },
  {
    id: 'transfer',
    step: 'Move files',
    title: 'Dual-pane SFTP with inline symlinks and a live transfer queue.',
    caption: 'Send whole folders across panes while the dock tracks transfer speed and progress.',
    durationMs: 8000,
    dockTab: 'transfers',
    dockPosition: 'bottom',
    cursor: { x: 22, y: 38, label: 'Upload releases/' },
    camera: { scale: 1.04, x: 1, y: -1 }
  },
  {
    id: 'logs',
    step: 'Tail logs',
    title: 'Follow live server logs with an error overview rail.',
    caption: 'Stream tail -F output as it is written, spot spikes on the rail, and filter to Errors in one click.',
    durationMs: 8500,
    dockTab: 'tail',
    dockPosition: 'bottom',
    cursor: { x: 35, y: 66, label: 'Filter: Errors' },
    camera: { scale: 1.05, x: 0, y: -3 }
  },
  {
    id: 'terminal',
    step: 'Split dock',
    title: 'Right-split SSH terminal and live CPU & memory monitor.',
    caption: 'Dock the terminal to the right (Ctrl+`), restart the service, and watch CPU and 10-core load settle.',
    durationMs: 8500,
    dockTab: 'terminal',
    dockPosition: 'right',
    cursor: { x: 74, y: 34, label: 'Ctrl+` · systemctl restart web-api' },
    camera: { scale: 1.04, x: -2, y: 0 }
  },
  {
    id: 'outro',
    step: 'Ferry for Windows',
    title: 'Files, terminal, logs and monitor. One window.',
    caption: 'Free and MIT licensed for Windows 10 and 11 · github.com/ThienNg65/ferry-release',
    durationMs: 6000,
    dockTab: 'monitor',
    dockPosition: 'right',
    cursor: { x: 82, y: 78 },
    camera: { scale: 1, x: 0, y: 0 }
  }
]

export const promoTotalMs = promoScenes.reduce((acc, s) => acc + s.durationMs, 0)

export function promoSceneAt(elapsedMs: number) {
  const clamped = Math.max(0, Math.min(promoTotalMs, elapsedMs))
  let acc = 0
  for (let i = 0; i < promoScenes.length; i++) {
    const s = promoScenes[i]!
    if (clamped < acc + s.durationMs || i === promoScenes.length - 1) {
      const local = Math.min(s.durationMs, Math.max(0, clamped - acc))
      return {
        index: i,
        scene: s,
        sceneProgress: s.durationMs > 0 ? local / s.durationMs : 1,
        totalProgress: promoTotalMs > 0 ? clamped / promoTotalMs : 1
      }
    }
    acc += s.durationMs
  }
  const last = promoScenes[promoScenes.length - 1]!
  return { index: promoScenes.length - 1, scene: last, sceneProgress: 1, totalProgress: 1 }
}

export const processes: Proc[] = [
  { name: 'bzip2', pid: 5806, ram: 7.9, cpu: 10.1 }, { name: 'gzip', pid: 5800, ram: 1.1, cpu: 10.1 },
  { name: 'node', pid: 1204, ram: 212.4, cpu: 6.3 }, { name: 'postgres', pid: 884, ram: 148.2, cpu: 3.8 },
  { name: 'nginx', pid: 611, ram: 12.6, cpu: 1.2 }, { name: 'web-api', pid: 1377, ram: 96.5, cpu: 4.7 },
  { name: 'sshd', pid: 402, ram: 5.3, cpu: 0.1 }, { name: 'redis-server', pid: 733, ram: 24.8, cpu: 0.6 }
]

export const sites = [
  { group: 'Development', name: 'dev-sandbox', addr: 'dev@dev.example.com:22', env: 'var(--ok)' },
  { group: 'Development', name: 'analytics-db', addr: 'dba@db.internal.example.com:22', env: 'var(--ok)' },
  { group: 'Production', name: 'api-prod-01', addr: 'deploy@api-01.example.com:22', env: 'var(--err)' },
  { group: 'Production', name: 'api-prod-02', addr: 'deploy@api-02.example.com:22', env: 'var(--err)' },
  { group: 'Production', name: 'web-prod', addr: 'deploy@www.example.com:22', env: 'var(--err)' },
  { group: 'Staging', name: 'web-staging', addr: 'deploy@staging.example.com:22', env: 'var(--warn)' }
]


export type Hist = { kind: 'up' | 'down', label: string, meta: string, status: 'done' | 'error' | 'cancelled' }
export const historyRows: Hist[] = [
  { kind: 'up', label: 'Upload release-notes.pdf', meta: 'web-api, Nov 12, 2026, 1:57 PM, 349.0 KB, 0s', status: 'done' },
  { kind: 'up', label: 'Upload web-api-2.15.0.tar.gz', meta: 'web-api, Nov 12, 2026, 1:57 PM, 19.0 MB, 1s', status: 'done' },
  { kind: 'down', label: 'Download big-update.bin', meta: 'web-api, Nov 12, 2026, 1:44 PM, 195.3 MB, 1m 24s', status: 'error' },
  { kind: 'down', label: 'Download releases', meta: 'web-api, Nov 12, 2026, 1:43 PM, 59.1 MB, 25s', status: 'done' },
  { kind: 'up', label: 'Upload big-update.bin', meta: 'web-api, Nov 12, 2026, 1:19 PM, 195.3 MB, 48s', status: 'cancelled' }
]
