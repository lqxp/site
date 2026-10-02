<template>
  <div class="page-privacy">
    <section class="privacy-hero">
      <div class="container" style="max-width: 880px; margin: 0 auto; text-align: center;">
        <span class="section-eyebrow">PRIVACY POLICY — QXCHAT</span>
        <h1 class="privacy-title">We can't read<br />your messages.</h1>
        <p class="privacy-desc">
          This policy covers the <strong>QxChat Android app</strong> (including the Google Play
          distribution, package <code>com.getqxchat.app</code>), the iOS, desktop and web clients,
          and the self-hostable <strong>LQXP server</strong> (<code>lqxp/lqxp</code>) they connect to.
        </p>
        <div class="privacy-meta">
          <span class="meta-pill"><span class="pulse-dot"></span>Effective: October 1, 2026</span>
          <span class="meta-pill meta-pill--muted">Developer: QxChat team (lqxp) — <a href="mailto:contact@qxch.at">contact@qxch.at</a></span>
          <span class="meta-pill meta-pill--muted">Applies to: apps + any LQXP server you use</span>
        </div>
      </div>
    </section>

    <section class="privacy-tldr">
      <div class="container" style="max-width: 1120px; margin: 0 auto;">
        <div class="tldr-grid">
          <div class="tldr-card">
            <div class="tldr-icon">∅</div>
            <h3>No sale, no ads, no analytics</h3>
            <p>No data sold. No advertising SDK. No analytics, crash-reporting or attribution SDK in the app.</p>
          </div>
          <div class="tldr-card">
            <div class="tldr-icon">⬢</div>
            <h3>End-to-end encrypted</h3>
            <p>Room content is encrypted on your device (AES-256-GCM, ECDSA P-256). Servers relay ciphertext they cannot decrypt.</p>
          </div>
          <div class="tldr-card">
            <div class="tldr-icon">○</div>
            <h3>Pseudonymous account</h3>
            <p>Username + password + 12 recovery words. No email or phone number is ever requested.</p>
          </div>
          <div class="tldr-card tldr-card--accent">
            <div class="tldr-icon">⌁</div>
            <h3>Deletable</h3>
            <p>In-app deletion: Settings → Profile → Delete account. Local wipe available. Details in §10.</p>
          </div>
        </div>
        <div class="disclosure-box">
          <strong>Reading guide for Google Play reviewers.</strong>
          Data Safety summary is in <a href="#safety">§4</a> · Android permissions with justifications in
          <a href="#permissions">§5</a> · sharing in <a href="#sharing">§8</a> · retention in
          <a href="#retention">§9</a> · account deletion path in <a href="#deletion">§10</a> ·
          contact in <a href="#contact">§16</a>.
        </div>
      </div>
    </section>

    <section class="privacy-body">
      <div class="container privacy-layout">
        <aside class="privacy-toc">
          <span class="toc-label">ON THIS PAGE</span>
          <nav>
            <a href="#controller">1. Developer & scope</a>
            <a href="#principles">2. Principles</a>
            <a href="#collected">3. Data we collect</a>
            <a href="#safety">4. Data Safety summary</a>
            <a href="#permissions">5. Android permissions</a>
            <a href="#use">6. How data is used</a>
            <a href="#e2ee">7. Encryption note</a>
            <a href="#sharing">8. Sharing & third parties</a>
            <a href="#retention">9. Storage & retention</a>
            <a href="#deletion">10. Deletion</a>
            <a href="#security">11. Security</a>
            <a href="#children">12. Children</a>
            <a href="#transfers">13. Transfers</a>
            <a href="#rights">14. Your rights</a>
            <a href="#changes">15. Changes</a>
            <a href="#contact">16. Contact</a>
          </nav>
        </aside>

        <article class="privacy-article">
          <div id="controller" class="policy-section">
            <h2><span class="sec-num">01</span>Developer, scope & who controls your data</h2>
            <ul class="policy-list">
              <li><strong>Developer:</strong> QxChat team (open-source organization <code>lqxp</code>). Website <a href="https://getqxchat.com">getqxchat.com</a>. Contact <a href="mailto:contact@qxch.at">contact@qxch.at</a>. Security contact per <a href="/.well-known/security.txt">/.well-known/security.txt</a>.</li>
              <li><strong>In scope:</strong> QxChat Android app (Google Play + direct APK), iOS, desktop (Tauri) and web clients, and the LQXP reference server (<a href="https://github.com/lqxp/lqxp" target="_blank" rel="noopener">lqxp/lqxp</a>) when operated by us as the <code>qxch.at</code> demo instance.</li>
              <li><strong>Controller model (important for a self-hosted product):</strong> LQXP ships software; the operator of the server you connect to is the data controller for server-side data. Your own server → you are the controller. A friend's or community server → that operator. The <code>qxch.at</code> demo instance → us, under this policy with default settings.</li>
            </ul>
            <p class="muted">A modified or malicious server is technically possible (the code is open). Client-side end-to-end encryption exists precisely so message content stays unreadable even then. The strongest setup is a server you operate yourself.</p>
          </div>

          <div id="principles" class="policy-section">
            <h2><span class="sec-num">02</span>Principles</h2>
            <ul class="policy-list">
              <li><strong>Data minimisation:</strong> no email, no phone number, no real-name field exists anywhere in the protocol.</li>
              <li><strong>Purpose limitation:</strong> every datum below is used only to operate messaging, calls, sync and safety — never advertising.</li>
              <li><strong>No sale:</strong> we do not sell, rent or trade personal data. No advertising, analytics, attribution or crash-reporting SDK is bundled in the app.</li>
              <li><strong>Verifiability:</strong> server (<a href="https://github.com/lqxp/lqxp" target="_blank" rel="noopener">lqxp/lqxp</a>), clients and this site (<a href="https://github.com/lqxp/site" target="_blank" rel="noopener">lqxp/site</a>) are MIT open source. Claims below map to documented protocol behaviour (see <NuxtLink to="/wiki">handbook</NuxtLink>).</li>
            </ul>
          </div>

          <div id="collected" class="policy-section">
            <h2><span class="sec-num">03</span>Data we collect and why</h2>
            <p>“Collect” means transmitted to, or stored on, the server or the app. The table lists Play Data Safety categories in parentheses.</p>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>Category</th><th>What</th><th>Purpose</th></tr></thead>
                <tbody>
                  <tr><td>Account credentials (Personal info)</td><td>Username (lowercased, 2–24 chars); password and 12-word BIP39 recovery phrase <em>as Argon2id hashes only</em>; session tokens (server keeps SHA-256, 7-day sliding TTL)</td><td>Authentication, password reset, session management</td></tr>
                  <tr><td>User content (Messages; Photos & videos; Audio; Files)</td><td>Room text (≤2000 chars enforced), E2EE envelopes, reactions, polls, attachments (≤25 MB), avatars (≤10 MB) / banners (≤15 MB) with image metadata stripped on upload</td><td>Messaging, media sharing, profiles — at your direction, to your chosen server</td></tr>
                  <tr><td>Contacts & social graph (Contacts / Social)</td><td>Room membership, roles, friend/block tags, encrypted roster blob (≤64 KiB, opaque to server)</td><td>Roster, rooms, blocking</td></tr>
                  <tr><td>Call & connection data (App activity)</td><td>Presence, typing, room/call participation, relayed SDP/ICE (rebuilt, never stored), client sync IDs, app settings (TURN choice, mic/cam device ids, notification privacy)</td><td>Delivering messages/calls/sync, preferences</td></tr>
                  <tr><td>Device & diagnostics (Device IDs; App performance)</td><td>Random per-install client ID for sync routing; update-check version metadata; RAM-only abuse counters. <strong>No advertising ID, no IMEI, no crash SDK, no analytics events.</strong></td><td>Sync routing, updates, rate-limiting safety</td></tr>
                </tbody>
              </table>
            </div>
            <p class="muted">Legal bases (EEA/UK): contract (operating your account and messages), legitimate interests (security, anti-abuse, integrity of the service), consent where you opt in (e.g. Tor mode, public STUN, Discord Rich Presence). You may withdraw consent by disabling the feature or deleting the account.</p>
          </div>

          <div id="safety" class="policy-section">
            <h2><span class="sec-num">04</span>Google Play Data Safety summary</h2>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>Play question</th><th>Answer</th></tr></thead>
                <tbody>
                  <tr><td>Is user data collected?</td><td><strong>Yes</strong> — account, user content, social graph and connection data strictly to operate messaging on your chosen server (§3).</td></tr>
                  <tr><td>Is user data shared with third parties?</td><td><strong>No sale, no analytics sharing.</strong> Functional relay only: your chosen server operator, TURN relay for calls, link-preview target (server IP + URL), update host (version check). See §8. Google Play Families / ads SDKs: none.</td></tr>
                  <tr><td>Collected data encrypted in transit?</td><td><strong>Yes</strong> — HTTPS/WSS in production; message content additionally E2EE (§7, §11).</td></tr>
                  <tr><td>Can users request deletion?</td><td><strong>Yes</strong> — in-app deletion + email request (§10).</td></tr>
                  <tr><td>Independent security review?</td><td>No formal third-party audit commissioned to date; code is public and MIT-licensed for review.</td></tr>
                </tbody>
              </table>
            </div>
            <p class="muted">Keep this page's declarations and your Play Console Data Safety form identical. If you change SDKs or data handling, update both before rollout.</p>
          </div>

          <div id="permissions" class="policy-section">
            <h2><span class="sec-num">05</span>Android permissions — what each is for</h2>
            <p>All dangerous permissions are requested <strong>at runtime, in context, revocable anytime</strong> in system Settings. Denying a permission only disables the feature that needs it.</p>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>Permission</th><th>Used for</th></tr></thead>
                <tbody>
                  <tr><td><code>INTERNET</code></td><td>Connecting to your configured LQXP server (WebSocket + HTTPS), uploads/downloads, update check.</td></tr>
                  <tr><td><code>CAMERA</code></td><td>Video calls and photo capture you explicitly initiate. Never accessed in background.</td></tr>
                  <tr><td><code>RECORD_AUDIO</code> + <code>MODIFY_AUDIO_SETTINGS</code></td><td>Voice calls and voice messages you initiate; echo/routing control during calls.</td></tr>
                  <tr><td><code>POST_NOTIFICATIONS</code></td><td><strong>Local</strong> message/call notifications generated on-device. No FCM/APNs push exists.</td></tr>
                  <tr><td><code>FOREGROUND_SERVICE</code> + <code>FOREGROUND_SERVICE_DATA_SYNC</code></td><td>Keeping the encrypted connection alive in background so messages arrive without any push service. Declared as <code>dataSync</code>.</td></tr>
                  <tr><td><code>WAKE_LOCK</code></td><td>Preventing the OS from killing an active call or sync.</td></tr>
                  <tr><td><code>READ_MEDIA_IMAGES / VIDEO / AUDIO</code>, <code>READ_MEDIA_VISUAL_USER_SELECTED</code> (and <code>READ_EXTERNAL_STORAGE</code> ≤ API 32)</td><td>Reading only the photos, videos or audio files <strong>you pick</strong> to attach or set as avatar/banner.</td></tr>
                  <tr><td>Camera / microphone hardware features</td><td>Declared <code>required="false"</code> — text chat works without them.</td></tr>
                </tbody>
              </table>
            </div>
            <p class="muted">Production builds use HTTPS/WSS only. Cleartext HTTP is used solely for local self-hosted development over loopback (e.g. <code>127.0.0.1:4560</code> via adb reverse), never for production traffic. No background location, no contacts import, no SMS/call-log access.</p>
          </div>

          <div id="use" class="policy-section">
            <h2><span class="sec-num">06</span>How data is used — and not used</h2>
            <ul class="policy-list">
              <li>Operate accounts, rooms, DMs, voice/video signaling, file relay, device sync, profiles and blocking.</li>
              <li>Enforce rate limits and anti-abuse challenges (RAM-only windows, no profiling).</li>
              <li>Maintain the service (aggregate load/connection counters, RAM-only).</li>
              <li><strong>Never:</strong> advertising, behavioral profiling, selling data, training ML models on your content, or sharing with data brokers.</li>
            </ul>
          </div>

          <div id="e2ee" class="policy-section">
            <h2><span class="sec-num">07</span>Encryption note (what “we can't read” precisely means)</h2>
            <ul class="policy-list">
              <li>Private room payloads are encrypted <strong>on your device</strong> (AES-256-GCM, per-message keys via HKDF, ECDSA P-256 signatures). Servers check routing labels and size bounds — not plaintext.</li>
              <li>Live message buffers are <strong>RAM-only</strong> (~150/room, FIFO, lost on restart). There is no message-history table.</li>
              <li>Friend-request dead-drop (PHANTOM) and device sync (QxCloudSync) are blind relays: anonymous HTTP slots (24 h TTL) and same-user device envelopes the server cannot decrypt.</li>
              <li><strong>Deliberate exception:</strong> an operator's optional official channel (<code>default_room</code>) requires the server to hold that room's key for redistribution — treat that room as operator-readable.</li>
            </ul>
          </div>

          <div id="sharing" class="policy-section">
            <h2><span class="sec-num">08</span>Sharing & third parties</h2>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>Recipient</th><th>What they receive</th><th>Why</th></tr></thead>
                <tbody>
                  <tr><td>Your chosen LQXP server operator</td><td>Account row, ciphertext envelopes, routing/presence metadata, uploads</td><td>Operating the messaging service you pointed the app at</td></tr>
                  <tr><td>TURN relay (operator-configured; relay-only by default)</td><td>Encrypted media packets + IPs during a call</td><td>NAT traversal when P2P fails</td></tr>
                  <tr><td>Link-preview target site</td><td>Server IP + fetched URL (4 s fetch, cached 5 min)</td><td>Generating the preview card for a posted link</td></tr>
                  <tr><td>Update host (<code>github.com/lqxp/app</code>; Play builds update via Play)</td><td>App version check metadata, minisign-verified</td><td>Secure updates</td></tr>
                  <tr><td>Tor directory authorities (only if you enable Tor, desktop)</td><td>Standard Tor bootstrap traffic</td><td>Optional anonymity transport</td></tr>
                </tbody>
              </table>
            </div>
            <p><strong>No advertising, analytics or attribution recipient exists.</strong> Discord Rich Presence is local IPC only (app version + OS, opt-out). The app opens only <code>qxch.at/*</code>, <code>github.com/*</code>, <code>metrics.torproject.org/*</code>, <code>mailto:</code> and <code>tel:</code> links.</p>
          </div>

          <div id="retention" class="policy-section">
            <h2><span class="sec-num">09</span>Storage & retention</h2>
            <ul class="policy-list">
              <li><strong>On your device:</strong> local vault (<code>qxprotocol-messenger-v7</code>: token, keys, recent rooms/messages ~500/room, settings) + extended history in IndexedDB (~2000 items). Sealed with PBKDF2-250k + AES-GCM when Client Lock is on; live secrets are RAM-only and wiped on lock.</li>
              <li><strong>Ephemeral server-side (lost on restart):</strong> live room buffers, PHANTOM envelopes (24 h), challenge/rate-limit stores, preview cache (5 min), session counters.</li>
              <li><strong>Persistent until deletion:</strong> account row, sessions, prekey bundles, block tags, encrypted roster blob, rooms table, uploaded files (<code>files/uploads/</code>, ~10 GB instance cap). SQLite file or operator's Postgres.</li>
              <li><strong>Sessions</strong> expire after 7 days of inactivity. Poll votes are unlinkable hashes. Operator backups, if any, are the operator's responsibility and rotate on their schedule — ask them directly for third-party servers.</li>
            </ul>
          </div>

          <div id="deletion" class="policy-section">
            <h2><span class="sec-num">10</span>Deletion — how to delete your account and data</h2>
            <ul class="policy-list">
              <li><strong>In the app (any platform, including Android):</strong> <code>Settings → Profile → Delete account → confirm → enter password</code>. The server then removes sessions, prekey bundle, block tags, the account row and your avatar/banner files, and disconnects all live sessions; the app wipes local state.</li>
              <li><strong>Local-only wipe:</strong> <code>Settings → Clear local data</code> removes the on-device vault and history without touching the server account.</li>
              <li><strong>Messages/rooms:</strong> deleting a message writes a tombstone and removes its attachment file; room owners can delete whole rooms; <code>deleteMessagesOnLeave</code> drops messages on leave.</li>
              <li><strong>By email:</strong> <a href="mailto:contact@qxch.at">contact@qxch.at</a> (demo instance <code>qxch.at</code>). State your username and server; we verify via a signed challenge or password-equivalent proof before acting. For third-party servers, contact that operator.</li>
              <li><strong>Timelines:</strong> in-app deletion is immediate on the live server; RAM buffers vanish at latest on restart; backups (if the operator keeps any) expire on their rotation. Recovery words cannot be recovered after deletion — the account is gone.</li>
            </ul>
          </div>

          <div id="security" class="policy-section">
            <h2><span class="sec-num">11</span>Security practices</h2>
            <ul class="policy-list">
              <li><strong>In transit:</strong> TLS (HTTPS/WSS) for production; E2EE content layer on top; TURN credentials never logged or committed.</li>
              <li><strong>At rest:</strong> passwords and recovery phrases as Argon2id hashes; session tokens as SHA-256; no plaintext secrets persisted. Uploaded images stripped of EXIF/metadata chunks.</li>
              <li><strong>Abuse resistance:</strong> fixed-window rate limits, quota tokens, VDF/CAPTCHA, dummy-hash login to block user enumeration, SSRF-hardened link previews.</li>
              <li><strong>Limits:</strong> no software survives a compromised unlocked device or a malicious modified server for metadata. Keep devices locked, enable Client Lock, verify binaries via checksums/signatures, and self-host for maximum assurance.</li>
            </ul>
          </div>

          <div id="children" class="policy-section">
            <h2><span class="sec-num">12</span>Children</h2>
            <p>QxChat is a general-purpose messaging app <strong>not directed at children under 13</strong> (and not at under-16s where local law sets a higher digital-consent age). We do not knowingly collect data from children. If you believe a child provided data, contact <a href="mailto:contact@qxch.at">contact@qxch.at</a> and the relevant server operator for deletion.</p>
          </div>

          <div id="transfers" class="policy-section">
            <h2><span class="sec-num">13</span>International transfers</h2>
            <p>There is no central QxChat cloud: data resides <strong>where your chosen server (and its TURN/file storage) is hosted</strong>. Self-host to choose jurisdiction. Calls may traverse a TURN relay in another region when P2P fails; link previews cause a server-to-site fetch. Transfers rely on encryption, minimisation and, for EEA/UK users, the operator's safeguards (SCCs/adequacy) where applicable.</p>
          </div>

          <div id="rights" class="policy-section">
            <h2><span class="sec-num">14</span>Your rights</h2>
            <ul class="policy-list">
              <li><strong>Access:</strong> <code>GET /api/auth/me</code> returns your stored profile; the app shows the rest.</li>
              <li><strong>Rectification:</strong> edit profile, status, username (max 1/week) in-app.</li>
              <li><strong>Erasure / restriction / objection / portability:</strong> delete account, messages and rooms (§10); ask your operator about restriction; object to optional features by disabling them. No automated export endpoint yet — request a copy via your operator or <a href="mailto:contact@qxch.at">contact@qxch.at</a>.</li>
              <li><strong>Always contact your server operator first</strong> — they hold your account row. You retain the right to complain to your supervisory authority (e.g. EU DPA, UK ICO) or use Play's reporting for the Play-distributed app.</li>
            </ul>
          </div>

          <div id="changes" class="policy-section">
            <h2><span class="sec-num">15</span>Changes to this policy</h2>
            <p>Material changes are committed in the open (<a href="https://github.com/lqxp/lqxp" target="_blank" rel="noopener">lqxp/lqxp</a>, <a href="https://github.com/lqxp/client" target="_blank" rel="noopener">client</a>, <a href="https://github.com/lqxp/site" target="_blank" rel="noopener">site</a>), announced in release notes where appropriate, and the effective date above bumped. Continued use after the effective date constitutes acceptance. Previous versions remain in git history.</p>
          </div>

          <div id="contact" class="policy-section">
            <h2><span class="sec-num">16</span>Contact</h2>
            <ul class="policy-list">
              <li><strong>Privacy & data requests (demo instance):</strong> <a href="mailto:contact@qxch.at">contact@qxch.at</a>.</li>
              <li><strong>Security issues:</strong> <a href="mailto:contact@qxch.at">contact@qxch.at</a>, see <a href="/.well-known/security.txt">/.well-known/security.txt</a>. Do not post secrets or recovery phrases on Discord or GitHub.</li>
              <li><strong>Community (no sensitive data):</strong> <a href="https://discord.wf/qxchat" target="_blank" rel="noopener">Discord</a> · <a href="https://github.com/lqxp" target="_blank" rel="noopener">GitHub</a>.</li>
            </ul>
          </div>

          <div class="policy-footer-cta">
            <p>Don't trust the policy. Read the code.</p>
            <div class="cta-row">
              <a href="https://github.com/lqxp/lqxp" target="_blank" rel="noopener" class="cta-btn cta-btn--primary">Server source</a>
              <NuxtLink to="/wiki" class="cta-btn cta-btn--ghost">Protocol handbook</NuxtLink>
              <NuxtLink to="/download" class="cta-btn cta-btn--ghost">Get QxChat</NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="privacy-site-note">
      <div class="container" style="max-width: 720px; margin: 0 auto;">
        <p>
          Visiting <strong>getqxchat.com</strong> itself: no analytics, no cookies, no accounts.
          Only a <code>qxchat-theme</code> preference in your browser's localStorage, never sent anywhere.
          Download metadata is fetched live from <code>qxch.at/api/download</code>; binaries come from GitHub Releases.
          <NuxtLink to="/wiki/why-qxchat-exists">About QxChat →</NuxtLink>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Privacy Policy — QxChat (Android, iOS, Desktop & Servers)',
  description: 'QxChat Privacy Policy for Google Play and all clients: data collected, Android permissions, sharing, retention, account deletion, E2EE, security, contact.',
  ogTitle: 'QxChat Privacy Policy',
  ogDescription: 'Pseudonymous accounts. E2EE. No ads, no analytics, no sale. Permissions, retention and deletion fully documented.',
  ogType: 'website',
  ogUrl: 'https://getqxchat.com/privacy',
  ogImage: 'https://getqxchat.com/og-cover.jpg',
  twitterCard: 'summary_large_image',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://getqxchat.com/privacy' }],
})

useSchemaOrg([
  {
    '@type': 'WebPage',
    '@id': 'https://getqxchat.com/privacy#webpage',
    url: 'https://getqxchat.com/privacy',
    name: 'Privacy Policy — QxChat',
    isPartOf: { '@id': 'https://getqxchat.com/#website' },
    inLanguage: 'en',
    description: 'QxChat Privacy Policy: developer, scope, data collected, Android permissions, sharing, retention, deletion, security, rights, contact.',
  },
])
</script>

<style scoped>
.page-privacy {
  min-height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
  padding-top: 100px;
  padding-bottom: 5rem;
}

.privacy-hero {
  padding: 3rem 1.5rem 2.5rem;
}

.section-eyebrow {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--accent-color);
  display: block;
  margin-bottom: 1rem;
}

.privacy-title {
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1.05;
  margin-bottom: 1.25rem;
}

.privacy-desc {
  font-size: 1.12rem;
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 680px;
  margin: 0 auto 1.75rem;
}

.privacy-desc code,
.policy-section code,
.privacy-site-note code,
.data-table code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.84em;
  background: var(--surface-raised);
  border: 1px solid var(--border-color);
  padding: 1px 6px;
  border-radius: 6px;
  color: var(--text-color);
  white-space: nowrap;
}

.privacy-meta {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  flex-wrap: wrap;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 7px 15px;
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-color);
}

.meta-pill--muted {
  color: var(--text-secondary);
  font-weight: 500;
}

.meta-pill a {
  color: var(--accent-color);
  font-weight: 700;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.privacy-tldr {
  padding: 1.5rem 1.5rem 3rem;
}

.tldr-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.tldr-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 1.6rem 1.4rem;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.tldr-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.tldr-card--accent {
  background: linear-gradient(135deg, rgba(28, 113, 216, 0.08) 0%, rgba(28, 113, 216, 0.02) 100%);
  border-color: var(--border-strong, var(--border-color));
}

.tldr-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--surface-raised);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.tldr-card h3 {
  font-size: 1.02rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.4rem;
}

.tldr-card p {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--text-secondary);
  margin: 0;
}

.disclosure-box {
  margin-top: 1.25rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.disclosure-box a {
  color: var(--accent-color);
  font-weight: 700;
}

.privacy-body {
  padding: 1rem 1.5rem 2rem;
  border-top: 1px solid var(--border-color);
  padding-top: 3.5rem;
}

.privacy-layout {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 3.5rem;
  align-items: start;
}

.privacy-toc {
  position: sticky;
  top: 100px;
}

.toc-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  display: block;
  margin-bottom: 0.9rem;
}

.privacy-toc nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-left: 1px solid var(--border-color);
  padding-left: 1rem;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
}

.privacy-toc a {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 5px 0;
  transition: color 0.2s ease;
}

.privacy-toc a:hover {
  color: var(--accent-color);
}

.privacy-article {
  min-width: 0;
  max-width: 720px;
}

.policy-section {
  scroll-margin-top: 110px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2rem 2.2rem;
  margin-bottom: 1.5rem;
}

.policy-section h2 {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
}

.sec-num {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-color);
  background: rgba(28, 113, 216, 0.08);
  border: 1px solid var(--border-color);
  padding: 3px 8px;
  border-radius: 8px;
  flex-shrink: 0;
}

.policy-section p {
  font-size: 0.96rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.policy-section p:last-child {
  margin-bottom: 0;
}

.policy-section strong {
  color: var(--text-color);
}

.policy-section a {
  color: var(--accent-color);
  font-weight: 600;
}

.policy-section a:hover {
  text-decoration: underline;
}

.policy-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin: 0 0 1rem;
  padding: 0;
}

.policy-list li {
  position: relative;
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--text-secondary);
  padding-left: 1.4rem;
}

.policy-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent-color);
  font-weight: 700;
}

.policy-list strong {
  color: var(--text-color);
}

.muted {
  opacity: 0.85;
  font-size: 0.88rem !important;
}

.table-wrap {
  overflow-x: auto;
  margin: 0 0 1rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  line-height: 1.55;
  min-width: 560px;
}

.data-table thead th {
  text-align: left;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
  background: var(--surface-raised);
  padding: 0.7rem 0.9rem;
  border-bottom: 1px solid var(--border-color);
  white-space: nowrap;
}

.data-table tbody td {
  padding: 0.75rem 0.9rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-secondary);
  vertical-align: top;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.data-table tbody td:first-child {
  color: var(--text-color);
  font-weight: 600;
}

.policy-footer-cta {
  text-align: center;
  padding: 2.5rem 1rem 1rem;
}

.policy-footer-cta p {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1.25rem;
}

.cta-row {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 0 1.8rem;
  border-radius: 50px;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
}

.cta-btn--primary {
  background: var(--accent-color);
  color: #fff;
}

.cta-btn--primary:hover {
  background: var(--text-color);
  color: var(--bg-secondary);
}

.cta-btn--ghost {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.cta-btn--ghost:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.privacy-site-note {
  padding: 1rem 1.5rem 0;
}

.privacy-site-note p {
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px dashed var(--border-strong, var(--border-color));
  border-radius: 16px;
  padding: 1.2rem 1.4rem;
  margin: 0;
}

.privacy-site-note a {
  color: var(--accent-color);
  font-weight: 700;
}

@media (max-width: 960px) {
  .tldr-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .privacy-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .privacy-toc {
    display: none;
  }
}

@media (max-width: 640px) {
  .tldr-grid {
    grid-template-columns: 1fr;
  }
  .policy-section {
    padding: 1.5rem 1.4rem;
  }
}
</style>
