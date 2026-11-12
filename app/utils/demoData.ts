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
  ['config', 'dir', '', 'Nov 12, 01:10 PM', 'Read, Write & Execute'], ['logs', 'dir', '', 'Nov 12, 01:11 PM', 'Read, Write & Execute'],
  ['public', 'dir', '', 'Nov 12, 01:10 PM', 'Read, Write & Execute'], ['scripts', 'dir', '', 'Nov 12, 01:10 PM', 'Read, Write & Execute'],
  ['src', 'dir', '', 'Nov 12, 01:10 PM', 'Read, Write & Execute'], ['package.json', 'json', '43 B', 'Nov 12, 01:10 PM', 'Read & Write'],
  ['README.md', 'file', '24 B', 'Nov 12, 01:10 PM', 'Read & Write']
] as const

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
