export type CompetitorSlug = 'winscp' | 'termius' | 'mobaxterm' | 'filezilla'

export interface ComparisonShot {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export interface ComparisonSpec {
  slug: CompetitorSlug
  competitor: string
  metaTitle: string
  metaDescription: string
  h1: string
  subtitle: string
  angle: string
  stickWithTitle: string
  stickWithText: string
  ctaLabel: string
  shot: ComparisonShot
  migrationSteps: string[]
  rows: [string, string, string][]
}

export const faqItems: [string, string][] = [
  ['Which Windows versions does Ferry run on?', 'Windows 10 and Windows 11, 64-bit. Ferry uses Windows’ built-in WebView2 runtime, so the installer stays around 23 MB.'],
  ['Which protocols does Ferry support?', 'Ferry connects over SSH and transfers files with SFTP. It supports passwords, private keys, SSH agents, jump hosts (bastions), SOCKS and HTTP proxies, host-key checks, and 2FA prompts. It does not offer FTP, FTPS, SCP, S3, RDP, VNC, or X11.'],
  ['Where are my passwords and SSH passphrases stored?', 'Saved passwords and passphrases stay on your Windows machine, encrypted with Windows DPAPI (CryptProtectData), and are only decrypted locally when you connect. The Ferry app has no accounts and sends no usage data.'],
  ['Is Ferry free?', 'Yes. Ferry is free to download and use on Windows via the Microsoft Store or GitHub Releases, with no subscription or account required. See LICENSE in the release repository for historical source terms.'],
  ['How do I update Ferry?', 'Microsoft Store installs update automatically through Windows. Standalone installs check GitHub Releases for updates, and you can turn off automatic checks anytime in Settings.']
]

export const comparisons: Record<CompetitorSlug, ComparisonSpec> = {
  winscp: {
    slug: 'winscp',
    competitor: 'WinSCP',
    metaTitle: 'Ferry vs. WinSCP - SFTP, SSH Terminal & Logs for Windows',
    metaDescription: 'A WinSCP alternative for Windows 10/11: dual-pane SFTP, one-click WinSCP site import, built-in SSH terminal, live tail -F logs and server monitor.',
    h1: 'Ferry vs. WinSCP: dual-pane SFTP with a built-in SSH terminal',
    subtitle: 'Ferry has the same side-by-side local and remote panes and imports your WinSCP sites. It adds an SSH terminal, live tail -F logs and a server monitor in the same window.',
    angle: 'WinSCP is the better choice when you need FTP, FTPS, WebDAV, S3 or .NET scripts. For daily Linux server work over SSH and SFTP, Ferry removes the hop to PuTTY and to separate log windows.',
    stickWithTitle: 'When to stick with WinSCP',
    stickWithText: 'Stick with WinSCP if you need FTP/FTPS, WebDAV, Amazon S3, SCP, or automated .NET assembly and CLI transfer scripts.',
    ctaLabel: 'Import from WinSCP & Install via Microsoft Store',
    shot: {
      src: '/media/import-sessions.webp',
      alt: 'Ferry Import sites dialog scanning saved WinSCP, PuTTY, and ~/.ssh/config sessions',
      caption: 'Import saved WinSCP, PuTTY, and ~/.ssh/config sites in one click.',
      width: 1600,
      height: 1000
    },
    migrationSteps: [
      'Install Ferry from the Microsoft Store or download the standalone installer.',
      'On the Connections screen, click Import / Export and choose WinSCP sessions.',
      'Your saved hosts, ports, usernames, and key paths import into colour-coded tabs (passwords are never imported).'
    ],
    rows: [
      ['Dual-pane local & remote browser', 'Yes, side-by-side panes', 'Yes (Commander UI)'],
      ['Interactive SSH terminal in the same tab', 'Yes, per server tab', 'No (launches external PuTTY)'],
      ['Live tail -F log viewer with level filters', 'Yes, dedicated Log Tail tab & overview rail', 'No'],
      ['Built-in CPU, memory, disk & process monitor', 'Yes, live over SSH with nothing to install on servers', 'No'],
      ['One-way folder sync with preview & compare', 'Yes', 'Yes (multiple sync modes)'],
      ['Remote archive extract & compress', 'Yes, built into file context menu', 'No built-in action'],
      ['Edit remote files in place', 'Yes, built-in syntax editor', 'External or plain internal text editor'],
      ['Protocols & scripting', 'SSH & SFTP only', 'SFTP, SCP, FTP/FTPS, WebDAV, S3, .NET/CLI']
    ]
  },
  termius: {
    slug: 'termius',
    competitor: 'Termius',
    metaTitle: 'Ferry vs. Termius - Free Windows SFTP, SSH & Log Viewer',
    metaDescription: 'Free Termius alternative for Windows. Dual-pane SFTP, folder sync, SSH terminal, live tail -F logs and server monitor. No account, no subscription.',
    h1: 'Ferry vs. Termius: Windows SFTP, live logs and monitoring without a $120/yr subscription',
    subtitle: 'Credentials stay encrypted on your PC with Windows DPAPI and nothing needs a cloud account. Dual-pane SFTP with folder sync, live tail -F logs and a server monitor are all free.',
    angle: 'Termius is built around cloud-synced terminals across devices, and Pro costs about $10/mo (about $120/yr). Ferry is Windows-only: dual-pane SFTP, terminal, live logs and server health are free, and everything is stored on your PC.',
    stickWithTitle: 'When to stick with Termius',
    stickWithText: 'Stick with Termius if you need iOS, Android, macOS, and Linux cross-device cloud sync, team vaults, or Mosh support.',
    ctaLabel: 'Get Ferry Free on Microsoft Store',
    shot: {
      src: '/media/log-tail.webp',
      alt: 'Ferry live log tail showing error and warning filters with the right-hand overview rail',
      caption: 'Live tail -F log viewer with Error and Warning filters, included free.',
      width: 1920,
      height: 1080
    },
    migrationSteps: [
      'Install Ferry (~23 MB) from the Microsoft Store or GitHub Releases.',
      'Import existing ~/.ssh/config hosts in one click or add hosts with SSH agent, key, or jump host auth.',
      'Credentials stay encrypted locally with Windows DPAPI. No sign-up needed.'
    ],
    rows: [
      ['Price & subscription', 'Free (no Pro tier or subscription)', 'Free limited tier; Pro ~$10/mo (~$120/yr)'],
      ['Account & cloud requirement', 'None - stored on your PC with Windows DPAPI', 'Account required for Pro cloud vault & sync'],
      ['Dual-pane SFTP, folder sync & compare', 'Yes, dual-pane + one-way sync + filters', 'Split view in SFTP tab (no sync/compare)'],
      ['Live tail -F log viewer with Error/Warn rail', 'Yes, dedicated tab', 'Only manual tail in terminal'],
      ['Server resource & process monitor', 'Yes, live CPU, RAM, disk & top processes', 'No'],
      ['Edit remote files in place', 'Yes, built-in syntax editor', 'Basic snippet/terminal workflow'],
      ['Platform coverage', 'Windows 10 & 11 (64-bit)', 'Windows, macOS, Linux, iOS, Android']
    ]
  },
  mobaxterm: {
    slug: 'mobaxterm',
    competitor: 'MobaXterm',
    metaTitle: 'Ferry vs. MobaXterm - Unlimited Windows SSH & SFTP Client',
    metaDescription: 'A lightweight MobaXterm alternative for Windows: unlimited saved sessions, dual-pane SFTP, folder sync, SSH terminal and live tail -F logs in ~23 MB.',
    h1: 'Ferry vs. MobaXterm: focused Windows SSH and SFTP with no session cap',
    subtitle: 'Unlimited saved sites and server tabs instead of the 12-session Home cap, plus dual-pane SFTP with folder sync, in a ~23 MB app.',
    angle: 'MobaXterm bundles an X11 server, Cygwin tools, RDP, VNC and serial consoles, and caps its free Home edition at 12 saved sessions. Ferry only does SSH and SFTP, stays small and has no session cap.',
    stickWithTitle: 'When to stick with MobaXterm',
    stickWithText: 'Stick with MobaXterm if you need a built-in X11 server, RDP, VNC, serial console, or local SSH port-forwarding tunnels.',
    ctaLabel: 'Install Ferry (~23 MB) on Windows',
    shot: {
      src: '/media/connections-import.webp',
      alt: 'Ferry Connections screen grouping Development, Production, and Staging hosts beside Quick Connect',
      caption: 'Unlimited saved sites grouped by Production, Staging, and Development environments.',
      width: 1600,
      height: 1000
    },
    migrationSteps: [
      'Install Ferry via Microsoft Store or download the standalone installer.',
      'Import saved sessions from PuTTY, WinSCP, or ~/.ssh/config with no 12-session limit.',
      'Separate Production, Staging, and Development hosts with colour-coded tabs and file filters.'
    ],
    rows: [
      ['Saved session limit', 'Unlimited saved sites & tabs', 'Home edition capped at 12 saved sessions'],
      ['File browser layout', 'True dual-pane local + remote SFTP', 'Sidebar SFTP browser beside terminal'],
      ['Folder sync & folder compare', 'Yes, with transfer preview', 'No built-in GUI sync (use rsync in terminal)'],
      ['Live tail -F log viewer', 'Yes, dedicated filterable Log Tail tab', 'Only manual tail in terminal'],
      ['Server resource monitor', 'Yes, full CPU/RAM/disk/process panel', 'Experimental status bar (off by default)'],
      ['X11, RDP, VNC & port forwarding', 'No (SSH & SFTP focused)', 'Yes (X11, RDP, VNC, SSH tunnels)'],
      ['Price', 'Free', 'Home free (with limits); Professional $69/user']
    ]
  },
  filezilla: {
    slug: 'filezilla',
    competitor: 'FileZilla',
    metaTitle: 'Ferry vs. FileZilla - Clean Windows SFTP & SSH Client',
    metaDescription: 'A FileZilla alternative for Linux servers on Windows. SFTP with a built-in SSH terminal, live tail -F logs, remote file editor and no bundled offers.',
    h1: 'Ferry vs. FileZilla: Windows SFTP for Linux servers with a built-in terminal and live logs',
    subtitle: 'Built for SSH and SFTP, with an in-app config editor, SSH terminal and live tail -F log viewer. No bundled adware.',
    angle: 'FileZilla was built first for FTP/FTPS hosting. For Linux servers over SSH, Ferry replaces the separate FileZilla and PuTTY windows with one app where you edit configs, restart services and watch logs.',
    stickWithTitle: 'When to stick with FileZilla',
    stickWithText: 'Stick with FileZilla if you primarily manage plain FTP or FTPS servers rather than Linux hosts over SSH and SFTP.',
    ctaLabel: 'Try Ferry Free via Microsoft Store',
    shot: {
      src: '/media/code-editor.webp',
      alt: 'Ferry remote file editor modifying package.json on a Linux server with syntax highlighting',
      caption: 'In-place remote file editor with syntax highlighting.',
      width: 1600,
      height: 1000
    },
    migrationSteps: [
      'Install Ferry from the Microsoft Store or GitHub Releases. Neither bundles third-party offers.',
      'Connect with SSH keys, SSH agent, jump hosts, or import ~/.ssh/config, WinSCP, or PuTTY profiles.',
      'Edit nginx or app configs inside Ferry and restart services in the same tab.'
    ],
    rows: [
      ['Bundled third-party offers', 'None in the Microsoft Store MSIX, NSIS installer or Portable ZIP', 'Standard SourceForge installer may bundle optional offers'],
      ['Integrated SSH terminal', 'Yes, interactive PTY per tab', 'No terminal'],
      ['Live tail -F log viewer', 'Yes, dedicated Log Tail tab', 'No'],
      ['Server CPU / RAM / process monitor', 'Yes, built-in', 'No'],
      ['Edit remote files in place', 'Yes, built-in syntax editor', 'Downloads to external editor'],
      ['Credential encryption on Windows', 'Windows DPAPI (CryptProtectData)', 'Plaintext XML by default unless master password set'],
      ['Protocols', 'SSH & SFTP only', 'FTP, FTPS, SFTP']
    ]
  }
}

export const competitorSlugs: CompetitorSlug[] = ['winscp', 'termius', 'mobaxterm', 'filezilla']
