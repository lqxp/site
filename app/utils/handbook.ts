
export interface HandbookPage {
  id: string
  title: string
  group: string
  summary: string
  emoji: string
  source: string
}

export const handbook: HandbookPage[] = [
  { id: 'what-is-qxchat', emoji: '1f44b', title: 'What QxChat is', group: 'Start here', summary: 'Accounts, rooms, friends and devices: what QxChat does and what the server can see.', source: 'content/handbook/what-is-qxchat.md' },
  { id: 'self-hosting', emoji: '1f427', title: 'Run your own server', group: 'Start here', summary: 'One Rust program, one TOML file, SQLite or PostgreSQL. Install, configure and update.', source: 'content/handbook/self-hosting.md' },
  { id: 'architecture', emoji: '1f6e0_fe0f', title: 'Architecture', group: 'How it works', summary: 'Server modules, the two transports, what lives in memory and what is stored.', source: 'explain/01-architecture.md' },
  { id: 'authentication', emoji: '1f9e0', title: 'Accounts and sign-in', group: 'How it works', summary: 'Passwords, 12 recovery words, Argon2id hashing and session tokens.', source: 'explain/02-account-authentication.md' },
  { id: 'message-transport', emoji: '1f48c', title: 'Messages and rooms', group: 'How it works', summary: 'WebSocket operations, room lifecycle and the AES-256-GCM message envelope.', source: 'explain/04-message-transport.md' },
  { id: 'phantom-protocol', emoji: '1f47b', title: 'QXP-PHANTOM friends', group: 'How it works', summary: 'Add-only friend requests through blind mailboxes the server cannot link.', source: 'explain/05-phantom-protocol.md' },
  { id: 'qxcloudsync', emoji: '2601_fe0f', title: 'QxCloudSync', group: 'How it works', summary: 'Syncing your devices through a relay that stores and reads nothing.', source: 'explain/09-qxcloudsync.md' },
  { id: 'signature-protocol', emoji: '270f_fe0f', title: 'Client signatures', group: 'Reference', summary: 'Device keys, room-scoped keys and hybrid ECDSA P-256 + ML-DSA-65 signatures.', source: 'explain/03-client-signature-protocol.md' },
  { id: 'crypto-primitives', emoji: '1f512', title: 'Cryptographic primitives', group: 'Reference', summary: 'Every hash, KDF, key size and wire format, byte for byte.', source: 'explain/06-cryptographic-primitives.md' },
  { id: 'anti-abuse', emoji: '1f6a8', title: 'Anti-abuse', group: 'Reference', summary: 'Rate limits, anonymous quota tokens, the proof-of-time challenge and CAPTCHA.', source: 'explain/07-anti-abuse.md' },
  { id: 'protocol-changes', emoji: '1f4e6', title: 'Changelog and gaps', group: 'Reference', summary: 'What shipped compared with the original design, listed openly.', source: 'explain/08-protocol-changes.md' },
]

export const handbookGroups = handbook.reduce<{ title: string, pages: HandbookPage[] }[]>((groups, page) => {
  const g = groups.find(x => x.title === page.group)
  if (g)
    g.pages.push(page)
  else groups.push({ title: page.group, pages: [page] })
  return groups
}, [])

export const handbookPage = (id: unknown) => handbook.find(p => p.id === id)

export function handbookNeighbours(id: string) {
  const i = handbook.findIndex(p => p.id === id)
  return { prev: handbook[i - 1] ?? null, next: handbook[i + 1] ?? null }
}
