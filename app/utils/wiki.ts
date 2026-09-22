export interface WikiSection {
  id: string
  label: string
  group: string
  /** <title> without the global " | QxChat" suffix (added by titleTemplate). */
  seoTitle: string
  seoDescription: string
  /** Short teaser shown on the /wiki hub cards. */
  teaser: string
}

export interface WikiGroup {
  title: string
  items: WikiSection[]
}

export const wikiGroups: WikiGroup[] = [
  {
    title: 'OVERVIEW',
    items: [
      {
        id: 'why-qxchat-exists',
        label: 'Why QxChat exists',
        group: 'OVERVIEW',
        seoTitle: 'Why QxChat Exists — Handbook',
        seoDescription: 'Why we built QxChat: dead platforms, opt-in encryption, metadata leaks — and zero-logs E2EE by architectural design.',
        teaser: 'Dead platforms, broken privacy promises, and zero-logs E2EE by design.',
      },
    ],
  },
  {
    title: 'ARCHITECTURE',
    items: [
      {
        id: 'how-it-works',
        label: 'How it works',
        group: 'ARCHITECTURE',
        seoTitle: 'How QxChat Works — Handbook',
        seoDescription: 'Room keys generated on your device, a zero-knowledge relay server, direct P2P WebRTC media, and zero telemetry.',
        teaser: 'On-device room keys, zero-knowledge relay, P2P media. How the pieces fit.',
      },
    ],
  },
  {
    title: 'ENGINEERING',
    items: [
      {
        id: 'the-technology',
        label: 'The technology',
        group: 'ENGINEERING',
        seoTitle: 'QxChat Technology Stack — Handbook',
        seoDescription: 'Vue 3 and TypeScript frontend, Tauri v2 native apps, Rust WebSocket core, and WebRTC P2P media. No Electron.',
        teaser: 'Vue 3, Tauri v2, Rust and WebRTC. One clean stack, no Electron.',
      },
    ],
  },
  {
    title: 'OPEN SOURCE & COMMUNITY',
    items: [
      {
        id: 'open-source',
        label: 'Open source, always',
        group: 'OPEN SOURCE & COMMUNITY',
        seoTitle: 'Open Source, Always (MIT) — Handbook',
        seoDescription: 'QxChat is fully MIT licensed — client, server, everything. Every claim verifiable in a text editor.',
        teaser: 'Fully MIT licensed. Every line auditable, forkable, self-hostable.',
      },
      {
        id: 'join-community',
        label: 'Join the community',
        group: 'OPEN SOURCE & COMMUNITY',
        seoTitle: 'Join the QxChat Community — Handbook',
        seoDescription: 'Download QxChat, get help on Discord, report issues or contribute on GitHub. No invite codes, no waitlist.',
        teaser: 'Download, get help, contribute. No invite codes, no waitlist.',
      },
    ],
  },
  {
    title: 'TECHNICAL REFERENCE',
    items: [
      {
        id: 'architecture',
        label: 'Architecture',
        group: 'TECHNICAL REFERENCE',
        seoTitle: 'QxChat Architecture — Technical Reference',
        seoDescription: 'System overview of the qxprotocol Rust server and Vue client: modules, transports, state model, storage and configuration.',
        teaser: 'Server modules, transports, state model, storage and configuration.',
      },
      {
        id: 'authentication',
        label: 'Account Authentication',
        group: 'TECHNICAL REFERENCE',
        seoTitle: 'Account Authentication — Technical Reference',
        seoDescription: 'Passwords plus 12-word BIP39 recovery phrases, Argon2id hashing, 7-day session tokens, and the WebSocket identify flow.',
        teaser: 'Passwords, BIP39 recovery, Argon2id hashing and session tokens.',
      },
      {
        id: 'signature-protocol',
        label: 'Client Signature Protocol',
        group: 'TECHNICAL REFERENCE',
        seoTitle: 'Client Signature Protocol — Technical Reference',
        seoDescription: 'Device keys, room-scoped contextual keys, hybrid ECDSA P-256 plus ML-DSA-65 signatures, and canonical JSON.',
        teaser: 'Device keys, hybrid ECDSA + ML-DSA signatures, canonical JSON.',
      },
      {
        id: 'message-transport',
        label: 'Message Transport',
        group: 'TECHNICAL REFERENCE',
        seoTitle: 'Message Transport & Opcodes — Technical Reference',
        seoDescription: 'WebSocket opcode dispatch table, room identity and lifecycle, message validation, and the AES-256-GCM E2EE envelope.',
        teaser: 'WebSocket opcodes, room lifecycle, and the E2EE message envelope.',
      },
      {
        id: 'phantom-protocol',
        label: 'QXP-PHANTOM Protocol',
        group: 'TECHNICAL REFERENCE',
        seoTitle: 'QXP-PHANTOM Friend Protocol — Technical Reference',
        seoDescription: 'Add-only friend requests with blind mailbox slots, ML-KEM sealed envelopes, opaque blocking, and an encrypted roster.',
        teaser: 'Add-only friend requests, blind slots, sealed envelopes.',
      },
      {
        id: 'crypto-primitives',
        label: 'Cryptographic Primitives',
        group: 'TECHNICAL REFERENCE',
        seoTitle: 'Cryptographic Primitives — Technical Reference',
        seoDescription: 'Exact primitives reference: hashes, KDFs, Argon2id, BIP39, ECDSA, ML-DSA-65, ML-KEM-768, VDF, CAPTCHA and Privacy Pass.',
        teaser: 'Exact primitives, sizes, KDFs, VDF, CAPTCHA and Privacy Pass formats.',
      },
      {
        id: 'anti-abuse',
        label: 'Anti-Abuse',
        group: 'TECHNICAL REFERENCE',
        seoTitle: 'Anti-Abuse System — Technical Reference',
        seoDescription: 'Fixed-window rate limits, anonymous HMAC quota tokens, Wesolowski VDF challenges, CAPTCHA flow, and storage bounds.',
        teaser: 'Rate limits, quota tokens, VDF challenges and storage bounds.',
      },
      {
        id: 'protocol-changes',
        label: 'Changelog & Gap Report',
        group: 'TECHNICAL REFERENCE',
        seoTitle: 'Protocol Changelog & Gap Report — Technical Reference',
        seoDescription: 'What shipped versus the spec: new opcodes, renumbering, PQC migration, default room, social blob, and audit items.',
        teaser: 'Spec vs shipped: opcode changes, migrations and gap report.',
      },
    ],
  },
]

export const wikiSections: WikiSection[] = wikiGroups.flatMap(g => g.items)

export const wikiSectionById = (id: string | string[] | undefined): WikiSection | undefined => {
  if (typeof id !== 'string')
    return undefined
  return wikiSections.find(s => s.id === id)
}

export interface WikiPrevNext {
  prev: WikiSection | null
  next: WikiSection | null
}

export const wikiPrevNext = (id: string): WikiPrevNext => {
  const i = wikiSections.findIndex(s => s.id === id)
  if (i < 0)
    return { prev: null, next: null }
  return {
    prev: i > 0 ? wikiSections[i - 1] : null,
    next: i < wikiSections.length - 1 ? wikiSections[i + 1] : null,
  }
}
