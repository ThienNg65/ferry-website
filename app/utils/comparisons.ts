export type CompetitorSlug = 'winscp' | 'termius' | 'mobaxterm' | 'filezilla'

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
  migrationSteps: string[]
  rows: [string, string, string][]
}

export const faqItems: [string, string][] = [
  ['Which Windows versions does Ferry run on?', 'Windows 10 and Windows 11, 64-bit. Ferry uses Windows’ built-in WebView2 runtime, so the installer stays around 23 MB.'],
  ['Which protocols does Ferry support?', 'Ferry connects over SSH and transfers files with SFTP. It supports passwords, private keys, SSH agents, jump hosts (bastions), SOCKS and HTTP proxies, host-key checks, and 2FA prompts. It does not offer FTP, FTPS, SCP, S3, RDP, VNC, or X11.'],
  ['Where are my passwords and SSH passphrases stored?', 'Saved passwords and passphrases stay on your Windows machine, encrypted with Windows DPAPI (CryptProtectData), and are only decrypted locally when you connect. Ferry has no accounts, cookies, or usage tracking.'],
  ['Is Ferry free?', 'Yes. Ferry is free to download and use on Windows via the Microsoft Store or GitHub Releases, with no subscription or account required. See LICENSE in the release repository for historical source terms.'],
  ['How do I update Ferry?', 'Microsoft Store installs update automatically through Windows. Standalone installs check GitHub Releases for updates, and you can turn off automatic checks anytime in Settings.']
]

export const comparisons: Record<CompetitorSlug, ComparisonSpec> = {
  winscp: {
    slug: 'winscp',
    competitor: 'WinSCP',
    metaTitle: 'Ferry vs. WinSCP - SFTP, SSH Terminal & Logs for Windows',
    metaDescription: 'Looking for a modern WinSCP alternative on Windows 11? Ferry keeps dual-pane SFTP speed, imports WinSCP sites in 1 click, and adds SSH terminal, live logs, and server monitor.',
    h1: 'WinSCP vs. Ferry: Keep the dual-pane speed, drop the separate PuTTY window',
    subtitle: 'Same side-by-side local and remote panes plus WinSCP site import, now with a built-in SSH terminal, live tail -F logs, and server monitor in one window.',
    angle: 'WinSCP is great when you need FTP, FTPS, WebDAV, S3, or .NET scripts. For daily Linux server work over SSH and SFTP, Ferry saves you from jumping to PuTTY and separate log windows.',
    stickWithTitle: 'When to stick with WinSCP',
    stickWithText: 'Stick with WinSCP if you need FTP/FTPS, WebDAV, Amazon S3, SCP, or automated .NET assembly and CLI transfer scripts.',
    ctaLabel: 'Import from WinSCP & Install via Microsoft Store',
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
    metaDescription: 'Free Termius alternative for Windows 10/11. Dual-pane SFTP, folder sync, SSH terminal, live tail -F logs, and server monitor with Windows DPAPI encryption and no account.',
    h1: 'Termius vs. Ferry: Full SFTP, logs & monitoring without the $120/yr subscription',
    subtitle: 'Encrypted on your PC with Windows DPAPI, no cloud account needed, dual-pane SFTP with folder sync, and live tail -F logs and server monitor included free.',
    angle: 'Termius focuses on cloud-synced cross-device terminals and charges ~$10/mo (~$120/yr) for Pro features. Ferry gives Windows developers dual-pane SFTP, terminal, live logs, and server health free with everything stored on your PC.',
    stickWithTitle: 'When to stick with Termius',
    stickWithText: 'Stick with Termius if you need iOS, Android, macOS, and Linux cross-device cloud sync, team vaults, or Mosh support.',
    ctaLabel: 'Get Ferry Free on Microsoft Store',
    migrationSteps: [
      'Install Ferry (~23 MB) from the Microsoft Store or GitHub Releases.',
      'Import existing ~/.ssh/config hosts in one click or add hosts with SSH agent, key, or jump host auth.',
      'Your credentials stay encrypted locally with Windows DPAPI with no sign-up required.'
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
    metaDescription: 'Lightweight MobaXterm alternative for Windows. Unlimited saved sessions, dual-pane SFTP, folder sync, SSH terminal, tail -F logs, and server monitor in ~23 MB.',
    h1: 'MobaXterm vs. Ferry: Focused SSH & SFTP without legacy clutter or session caps',
    subtitle: 'Unlimited saved sites and server tabs (no 12-session Home cap), dual-pane SFTP with folder sync, and a clean interface in ~23 MB.',
    angle: 'MobaXterm bundles an X11 server, Cygwin tools, RDP, VNC, and serial consoles, and caps its free Home edition at 12 saved sessions. Ferry sticks to SSH and SFTP so the app stays fast, clean, and uncapped.',
    stickWithTitle: 'When to stick with MobaXterm',
    stickWithText: 'Stick with MobaXterm if you need a built-in X11 server, RDP, VNC, serial console, or local SSH port-forwarding tunnels.',
    ctaLabel: 'Install Ferry (~23 MB) on Windows',
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
    metaDescription: 'Clean FileZilla alternative for Linux servers on Windows. No bundled installer offers, built-in SSH terminal, live tail -F logs, file editor, and server monitor.',
    h1: 'FileZilla alternative for Linux servers: clean SFTP, built-in terminal & live logs',
    subtitle: 'Built for SSH and SFTP, with an in-app config editor, SSH terminal, and live tail -F log viewer with no bundled adware.',
    angle: 'FileZilla was built first for FTP/FTPS hosting. When managing Linux servers over SSH, Ferry replaces separate FileZilla and PuTTY windows with one clean app that edits configs, restarts services, and watches logs in place.',
    stickWithTitle: 'When to stick with FileZilla',
    stickWithText: 'Stick with FileZilla if you primarily manage plain FTP or FTPS servers rather than Linux hosts over SSH and SFTP.',
    ctaLabel: 'Try Ferry Free via Microsoft Store',
    migrationSteps: [
      'Install Ferry cleanly from the Microsoft Store or GitHub Releases with zero third-party offers.',
      'Connect with SSH keys, SSH agent, jump hosts, or import ~/.ssh/config, WinSCP, or PuTTY profiles.',
      'Edit nginx or app configs inside Ferry and restart services in the same tab.'
    ],
    rows: [
      ['Installer cleanliness', 'Microsoft Store MSIX, clean NSIS & Portable ZIP', 'Standard SourceForge installer may bundle optional offers'],
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
