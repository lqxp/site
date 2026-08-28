<template>
  <div class="page-wiki-gitbook">
    <div class="gitbook-layout container-fluid">
      
      <aside class="gitbook-sidebar" :class="{ 'sidebar-open': isMobileSidebarOpen }">
        <div class="sidebar-header">
          <button class="close-sidebar-btn" @click="isMobileSidebarOpen = false" aria-label="Close Sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="sidebar-search">
          <div class="search-input-wrap">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Filter topics..." 
              class="search-input"
            />
            <span class="search-kbd">{{ isMac ? '⌘K' : 'Ctrl K' }}</span>
          </div>
        </div>

        <!-- Nav Tree -->
        <nav class="sidebar-nav">
          <div v-for="group in filteredNavGroups" :key="group.title" class="nav-group">
            <div class="group-title">{{ group.title }}</div>
            <ul class="group-list">
              <li v-for="item in group.items" :key="item.id">
                <a 
                  :href="'#' + item.id" 
                  class="nav-link" 
                  :class="{ active: activeSection === item.id }"
                  @click.prevent="onNavClick(item.id)"
                >
                  <span class="nav-link-text">{{ item.label }}</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <a href="https://github.com/lqxp/" target="_blank" rel="noopener" class="sidebar-footer-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
            <span>GitHub Organization</span>
          </a>
          <a href="https://discord.wf/qxchat" target="_blank" rel="noopener" class="sidebar-footer-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Discord Community</span>
          </a>
        </div>
      </aside>

      <!-- Mobile Sidebar Toggle Bar -->
      <div class="mobile-top-subnav">
        <button class="mobile-menu-trigger" @click="isMobileSidebarOpen = true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span>Topics Index</span>
        </button>
        <span class="active-topic-badge">{{ currentSectionLabel }}</span>
      </div>

      <main class="gitbook-main">
        <div class="article-inner">
          
          <!-- Breadcrumbs -->
          <div class="gitbook-breadcrumbs">
            <NuxtLink to="/" class="crumb-link">Home</NuxtLink>
            <span class="crumb-sep">/</span>
            <span class="crumb-link">Handbook</span>
            <span class="crumb-sep">/</span>
            <span class="crumb-current">{{ currentSectionLabel }}</span>
          </div>

          <!-- Page Header -->
          <header class="article-header">
            <div class="article-tag">PHILOSOPHY & ARCHITECTURE</div>
            <h1 class="article-title">A messaging platform you can trust.</h1>
            <p class="article-lead">
              QxChat is built on the core belief that communication tools should be transparent, self-hosted, and free from centralized control.
            </p>
          </header>

          <article id="why-qxchat-exists" class="doc-chapter">
            <div class="chapter-header">
              <h2>Why QxChat exists</h2>
              <a href="#why-qxchat-exists" class="heading-anchor" aria-label="Permalink to Why QxChat exists" @click.prevent="onNavClick('why-qxchat-exists')">#</a>
            </div>

            <p>You have seen what happened to Session. And do not get us started on Telegram, we would be here all day.</p>

            <p>
              Session shut down. Telegram became a running joke for privacy: encryption you have to manually turn on (seriously?), metadata leaking out of every seam, and a CEO who cannot decide if he is running a messenger or a crypto casino. Every single platform that promised you anonymity is either dead, compromised, or slowly selling you out to advertisers.
            </p>

            <p>Nothing reliable came along. Nothing that actually respected the people using it. So we stopped waiting and built it ourselves.</p>

            <!-- GitBook Callout: Emphasized Note -->
            <div class="gitbook-callout gitbook-callout--highlight">
              <div class="callout-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div class="callout-body">
                <strong>No logs. No backdoors. No excuses.</strong>
                <p>
                  QxChat is zero-logs by architectural design. E2EE is not buried behind a hidden toggle in settings that you will never find. It is on by default, handled entirely on your device. Not on "our" servers, not in "the cloud". On <em>your</em> hardware.
                </p>
              </div>
            </div>

            <p>
              And because the entire project is open source (not "open core", not "source available", genuinely open source), you can read every single line of code. Audit it, fork it, host it, break it. That is the kind of transparency Discord and Telegram will never give you.
            </p>

            <!-- Feature Card Comparison Grid -->
            <div class="comparison-grid">
              <div class="comp-card comp-card--bad">
                <div class="comp-title">
                  <span class="comp-cross">✕</span>
                  <span>What the others do</span>
                </div>
                <ul>
                  <li>Store your metadata on servers you cannot inspect: Yes</li>
                  <li>Make encryption opt-in so 99% of people never use it: Yes</li>
                  <li>Keep the backend code closed because "trust us bro": Yes</li>
                  <li>Change their privacy policy whenever advertisers ask: Absolutely</li>
                  <li>Ship a 200 MB Electron app that eats a gigabyte of RAM: Every single time</li>
                </ul>
              </div>

              <div class="comp-card comp-card--good">
                <div class="comp-title">
                  <span class="comp-check">✓</span>
                  <span>What QxChat does</span>
                </div>
                <ul>
                  <li>Store metadata: No. Zero. None.</li>
                  <li>Telemetry or trackers: No, never.</li>
                  <li>Client-side E2EE on by default: Yes, always.</li>
                  <li>Fully open source (Rust + Vue 3): Every single line.</li>
                  <li>You host it, you own everything: Yes, that is the entire point.</li>
                  <li>45 MB RAM, 6 MB installer: Yes, seriously.</li>
                </ul>
              </div>
            </div>
          </article>

          <article id="how-it-works" class="doc-chapter">
            <div class="chapter-header">
              <h2>How it works</h2>
              <a href="#how-it-works" class="heading-anchor" aria-label="Permalink to How it works" @click.prevent="onNavClick('how-it-works')">#</a>
            </div>

            <!-- GitBook Callout: Architecture Key Principle -->
            <div class="gitbook-callout gitbook-callout--info">
              <div class="callout-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div class="callout-body">
                <strong>Core Architecture Principle</strong>
                <p>QxChat is built around a simple idea: <strong>you host the server, you own the keys.</strong></p>
              </div>
            </div>

            <p>
              Every room you create generates its own encryption key directly on your device. Messages are encrypted before they leave your client and only decrypted by the recipient. The server? It just routes ciphertext packets. It does not read your chats because mathematically, it literally cannot.
            </p>

            <p>
              Voice and video calls stream through your own TURN server. Not Google infrastructure, not AWS relays, yours. Your profiles, your room memberships, your message history: it all stays on your machine and your server. There is no third party standing in the middle.
            </p>

            <p>
              No analytics. No telemetry. No "anonymous diagnostic telemetry" that turns out to be uniquely identifying. Just a clean WebSocket connection between you and a server you control.
            </p>

            <!-- Key Process Steps Diagram -->
            <div class="steps-container">
              <div class="step-row">
                <div class="step-num">1</div>
                <div class="step-info">
                  <h4>Ephemeral Key Generation</h4>
                  <p>Clients generate cryptographic identity and room keys locally via browser SubtleCrypto and Rust crypto primitives.</p>
                </div>
              </div>
              <div class="step-row">
                <div class="step-num">2</div>
                <div class="step-info">
                  <h4>Zero-Knowledge Relay</h4>
                  <p>The Rust server acts purely as a WebSocket routing hub, forwarding encrypted payloads without inspectable headers.</p>
                </div>
              </div>
              <div class="step-row">
                <div class="step-num">3</div>
                <div class="step-info">
                  <h4>Direct P2P WebRTC Media</h4>
                  <p>Voice, video, and screen sharing stream directly between participants with zero intermediary recording.</p>
                </div>
              </div>
            </div>
          </article>

          <article id="the-technology" class="doc-chapter">
            <div class="chapter-header">
              <h2>The technology</h2>
              <a href="#the-technology" class="heading-anchor" aria-label="Permalink to The technology" @click.prevent="onNavClick('the-technology')">#</a>
            </div>

            <p>
              QxChat is built on <strong>lqxp</strong>, an open Vue-based framework engineered for real-time messaging. No magic tricks, no proprietary nonsense, just clean and solid tech:
            </p>

            <div class="tech-stack-cards">
              <div class="tech-card">
                <div class="tech-card-header">
                  <span class="tech-pill tech-pill--vue">Frontend</span>
                  <h4>Vue 3 & TypeScript</h4>
                </div>
                <p>One codebase for web, desktop, and mobile. Not three separate apps stitched together with duct tape, but one clean, responsive interface everywhere.</p>
              </div>

              <div class="tech-card">
                <div class="tech-card-header">
                  <span class="tech-pill tech-pill--tauri">Desktop</span>
                  <h4>Tauri v2</h4>
                </div>
                <p>Native binaries for Windows, macOS, and Linux. No Electron, no bundled Chromium, no 600 MB RAM usage for a chat window. Just the system WebView doing what it was built to do.</p>
              </div>

              <div class="tech-card">
                <div class="tech-card-header">
                  <span class="tech-pill tech-pill--rust">Backend</span>
                  <h4>Rust WebSocket Core</h4>
                </div>
                <p>Async, memory-safe, and effortlessly handles thousands of concurrent rooms on a $5 VPS. The kind of resource efficiency Electron developers can only dream of.</p>
              </div>

              <div class="tech-card">
                <div class="tech-card-header">
                  <span class="tech-pill tech-pill--webrtc">Media</span>
                  <h4>WebRTC P2P</h4>
                </div>
                <p>Voice, video, and screen sharing go directly between participants. No intermediary server recording anything. No "pay $9.99/month for 1080p stream quality".</p>
              </div>
            </div>

            <p style="margin-top: 1.5rem;">
              Every single piece is self-hostable. The API, the WebSocket layer, the TURN server. You decide where it runs. There is no vendor lock-in, no SaaS dependency, and no paywalled features.
            </p>
          </article>

          <article id="open-source" class="doc-chapter">
            <div class="chapter-header">
              <h2>Open source, always</h2>
              <a href="#open-source" class="heading-anchor" aria-label="Permalink to Open source, always" @click.prevent="onNavClick('open-source')">#</a>
            </div>

            <p>
              Let us be clear: QxChat is not "open core" where all the useful features are locked behind an enterprise paywall. It is not "source available" with a license written by corporate lawyers to prevent you from doing anything real. It is fully, genuinely open source (client, server, everything) under MIT.
            </p>

            <p>
              Why does this matter? Because trust is not built on slick landing pages. It is built on code you can inspect. Every single claim we make can be verified by anyone with a text editor in five minutes. No NDAs, no sealed binaries, no hand-waving.
            </p>

            <div class="gitbook-callout gitbook-callout--quote">
              <div class="callout-body">
                <p>
                  <em>"If we disappear tomorrow, the community forks the repo and keeps going. Your conversations do not die with a company. That is the entire point."</em>
                </p>
              </div>
            </div>
          </article>

          <article id="join-community" class="doc-chapter">
            <div class="chapter-header">
              <h2>Join the community</h2>
              <a href="#join-community" class="heading-anchor" aria-label="Permalink to Join the community" @click.prevent="onNavClick('join-community')">#</a>
            </div>

            <p>
              QxChat is not just another chat app. It is a bet that communication tools can be built without treating users as data to be mined. Privacy is not a checkbox you find in sub-settings. Self-hosting is not an afterthought. You are in control.
            </p>

            <p>
              Whether you want to set up a private server for your team, contribute code, report edge-case bugs, or just use a messenger that does not spy on you: you are welcome here.
            </p>

            <p class="highlight-p">
              <strong>No invite codes. No waitlist. Just download and run.</strong>
            </p>

            <div class="cta-actions-box">
              <NuxtLink to="/download" class="bento-pill-btn">
                <span>Download QxChat</span>
                <div class="pill-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
              </NuxtLink>

              <a href="https://discord.wf/qxchat" target="_blank" rel="noopener" class="hero-secondary-btn discord-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Join Discord Community</span>
              </a>

              <a href="https://github.com/lqxp/" target="_blank" rel="noopener" class="hero-secondary-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
                <span>GitHub Organization</span>
              </a>
            </div>
          </article>

          <!-- ======================================================= -->
          <!-- TECHNICAL REFERENCE                                       -->
          <!-- ======================================================= -->

          <article id="architecture" class="doc-chapter">
            <div class="chapter-header">
              <h2>Architecture</h2>
              <a href="#architecture" class="heading-anchor" aria-label="Permalink to Architecture" @click.prevent="onNavClick('architecture')">#</a>
            </div>

            <h3>System overview</h3>
            <p>
              QxChat is a centralized, single-server real-time messaging platform with two cooperating subsystems:
              <strong>QxChat core</strong> (rooms, real-time messages, presence, profiles, calls, and moderation — the existing
              chat infrastructure) and <strong>QXP-PHANTOM</strong> (an add-only friend request protocol that runs on top of the
              core without ever materializing the social graph on the server).
            </p>
            <p>
              The server is a single Rust binary (<code>qxprotocol</code>) exposing an HTTP API and a WebSocket endpoint.
              The reference client is a Vue application that runs in the browser.
            </p>

            <div class="doc-code-block"><pre><code>+---------------------------+       HTTP (axum)        +---------------------------+
|  Web client (Vue / TS)    | -----------------------> |  Rust server (qxprotocol) |
|                           |                          |                           |
|  - WebSocket socket       | <----------------------> |  - /ws upgrade handler     |
|  - crypto (WebCrypto,     |       WebSocket          |  - account DB (sqlx)       |
|    noble, ml-kem, ml-dsa) |                          |  - room DB (sqlx)          |
|  - localStorage           |                          |  - RAM message store       |
|                           |                          |  - RAM phantom dead-drop   |
+---------------------------+                          +---------------------------+</code></pre></div>

            <h3>Server modules</h3>
            <p>The Rust source is split into four areas:</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Directory</th><th>Responsibility</th></tr></thead>
                <tbody>
                  <tr><td><code>core/</code></td><td>Configuration, database, models, presence state, and the crypto gates: <code>rln</code>, <code>vdf</code>, <code>cap</code>, <code>pqc</code>, <code>security</code>.</td></tr>
                  <tr><td><code>services/</code></td><td>Business logic: <code>auth</code>, <code>messaging</code>, <code>room</code>, <code>user</code>, <code>admin</code>, <code>phantom</code>, <code>phantom_crypto</code>, <code>privacy_pass</code>.</td></tr>
                  <tr><td><code>server/</code></td><td>HTTP routing (<code>routes.rs</code>).</td></tr>
                  <tr><td><code>websocket/</code></td><td>WebSocket connection handling and opcode dispatch (<code>protocol.rs</code>).</td></tr>
                </tbody>
              </table>
            </div>
            <p>The client source is under <code>web/src/</code>:</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Directory</th><th>Responsibility</th></tr></thead>
                <tbody>
                  <tr><td><code>composables/</code></td><td><code>useMessenger.ts</code> (session and messaging), <code>usePhantom.ts</code> (friend protocol).</td></tr>
                  <tr><td><code>crypto/</code></td><td><code>e2ee.ts</code>, <code>phantom.ts</code>, <code>mldsa.ts</code>, <code>pqc.ts</code>, <code>rln.ts</code>, <code>vdf.ts</code>.</td></tr>
                  <tr><td><code>components/</code>, <code>views/</code>, <code>i18n/</code>, <code>router/</code></td><td>UI, pages, localization, routing.</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Transport</h3>
            <p>The client uses two independent transports:</p>
            <ul class="doc-bullets">
              <li><strong>Authenticated WebSocket</strong> at <code>/ws</code> for chat, rooms, presence, calls, and the authenticated QXP-PHANTOM operations (prekey publish/fetch and block updates).</li>
              <li><strong>Anonymous HTTP</strong> for the QXP-PHANTOM dead-drop operations (<code>deposit</code> and <code>poll</code>) and for the anti-abuse challenge endpoints. These requests never carry an authorization header, so the server cannot bind a deposit or a poll to an account or to the same session that performed it.</li>
            </ul>

            <div class="gitbook-callout gitbook-callout--info">
              <div class="callout-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <div class="callout-body">
                <strong>Why anonymous HTTP for dead-drops</strong>
                <p>Splitting dead-drop traffic onto anonymous HTTP is a deliberate privacy requirement: it prevents the server from observing the account that deposits into a slot and the account that later reads the same slot — which would reveal the social edge.</p>
              </div>
            </div>

            <h3>State model</h3>
            <p>The server keeps live state in <code>core/presence.rs::AppState</code>.</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Field</th><th>Type</th><th>Lifetime</th></tr></thead>
                <tbody>
                  <tr><td><code>players</code></td><td><code>HashMap&lt;session_id, PlayerSession&gt;</code></td><td>RAM, per connection.</td></tr>
                  <tr><td><code>room_messages</code></td><td><code>HashMap&lt;room_id, Vec&lt;ChatMessageRecord&gt;&gt;</code></td><td>RAM, capped at 150 messages per room, lost on restart.</td></tr>
                  <tr><td><code>database</code></td><td><code>RoomDatabase</code></td><td>Persisted room metadata (title, icon, roles, bans).</td></tr>
                  <tr><td><code>accounts</code></td><td><code>AccountDatabase</code></td><td>Persisted users, sessions, prekeys, blocks, default room, social blobs.</td></tr>
                  <tr><td><code>rate_limits</code></td><td><code>HashMap&lt;key, RateLimitBucket&gt;</code></td><td>RAM, fixed windows.</td></tr>
                  <tr><td><code>public_profile_cache</code></td><td><code>HashMap&lt;key, CachedPublicProfile&gt;</code></td><td>RAM, 5 minute TTL.</td></tr>
                  <tr><td><code>call_access_overrides</code></td><td><code>HashSet&lt;String&gt;</code></td><td>RAM.</td></tr>
                </tbody>
              </table>
            </div>
            <p><code>PlayerSession</code> tracks the authenticated identity, joined rooms, presence, call state, and the outbound channel for a single WebSocket connection.</p>

            <h3>Storage model</h3>
            <p><strong>RAM only, never persisted:</strong></p>
            <ul class="doc-bullets">
              <li>Room messages. Capped at 150 per room (<code>MAX_ROOM_MESSAGES</code>), destroyed on restart.</li>
              <li>The QXP-PHANTOM dead-drop. Capped at 100 000 envelopes, 24 hour TTL, destroyed on restart.</li>
              <li>Rate limit buckets, the public profile cache, and all ephemeral crypto key registries (VDF consumed set, PQC ephemeral keys, quota nullifiers, and CAPTCHA tokens).</li>
            </ul>
            <p><strong>Persisted in SQLite or PostgreSQL through <code>sqlx</code>:</strong></p>
            <ul class="doc-bullets">
              <li><code>users</code> (account, password hash, recovery hash, profile, social blob).</li>
              <li><code>sessions</code> (hashed session tokens).</li>
              <li><code>feature_flags</code>.</li>
              <li><code>prekeys</code> (public prekey bundles).</li>
              <li><code>blocks</code> (opaque block tags).</li>
              <li><code>default_room</code> (the single default room record).</li>
              <li>Room metadata in the <code>RoomDatabase</code> backend.</li>
            </ul>
            <p>The choice between SQLite and PostgreSQL is driven by <code>database.kind</code> and <code>database.url</code> in the configuration file.</p>

            <h3>Configuration</h3>
            <p>
              Configuration is read from <code>files/config.{dev,prod}.toml</code>, or <code>files/config.custom.toml</code> when it exists.
              The <code>PRODUCTION</code> environment variable selects the <code>prod</code> profile. Configuration covers the API address and port,
              the network paths, TURN servers, the database backend, and security flags such as the admin id list and whether registration is enabled.
            </p>
            <p>
              Logging is initialized by <code>core/config.rs::init_tracing</code> with <code>tracing_subscriber</code> in compact form, filtered by
              <code>RUST_LOG</code>. No IP address or User-Agent extraction is configured in the tracing layer.
            </p>

            <h3>Authentication flow at a glance</h3>
            <p>
              Account authentication uses a password for the account and a separate BIP39 recovery phrase for password reset. The client additionally
              maintains a cryptographic identity that the server does not store: a device signing key, an ML-DSA-65 key, an ML-KEM-768 key, and a master
              secret derived from the recovery words.
            </p>
          </article>

          <article id="authentication" class="doc-chapter">
            <div class="chapter-header">
              <h2>Account Authentication</h2>
              <a href="#authentication" class="heading-anchor" aria-label="Permalink to Account Authentication" @click.prevent="onNavClick('authentication')">#</a>
            </div>

            <h3>Credentials</h3>
            <p>An account has two independent secrets:</p>
            <ul class="doc-bullets">
              <li>A <strong>password</strong> used for login and for destructive account actions.</li>
              <li>A <strong>recovery phrase</strong> of 12 BIP39 words used only to reset the password.</li>
            </ul>
            <p>Both secrets are stored as Argon2id hashes. The plaintext is never persisted by the server.</p>
            <div class="doc-code-block"><pre><code>password         -> Argon2id -> users.password_hash
recovery phrase  -> Argon2id -> users.recovery_hash</code></pre></div>

            <h3>Password and recovery hashing</h3>
            <p>The <code>core/security.rs</code> module owns secret handling.</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Function</th><th>Behavior</th></tr></thead>
                <tbody>
                  <tr><td><code>hash_secret</code></td><td>Argon2id (<code>Argon2::default()</code>) with a random salt.</td></tr>
                  <tr><td><code>verify_secret</code></td><td>Argon2id verification against a stored hash.</td></tr>
                  <tr><td><code>verify_secret_constant_time</code></td><td>Verifies against a fixed dummy hash when no real hash exists, then returns the same generic failure. Lifts the timing signal that would otherwise reveal whether a username exists.</td></tr>
                  <tr><td><code>token_hash</code></td><td><code>SHA256(session token)</code> as lowercase hex.</td></tr>
                  <tr><td><code>generate_session_token</code></td><td>64 alphanumeric characters from the OS CSPRNG.</td></tr>
                  <tr><td><code>generate_recovery_words</code></td><td>A BIP39 mnemonic from 16 bytes of entropy, which produces 12 words.</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Username validation normalizes to lowercase and trimmed form, enforces a length of 2 to 24 characters at registration, rejects a
              reserved <code>system</code> name, and allows only a fixed whitelist of characters. Passwords must be 8 to 128 characters.
            </p>

            <h3>Registration</h3>
            <p>The <code>POST /api/auth/register</code> endpoint and the <code>services/auth.rs::register</code> function create an account.</p>
            <p>Steps:</p>
            <ul class="doc-bullets">
              <li>Verify that registration is enabled in the feature flags.</li>
              <li>Reject usernames that hit the operator blocklist.</li>
              <li>Validate the username and password.</li>
              <li>If the username is taken, burn a constant-time dummy hash and return a generic error.</li>
              <li>Generate a random snowflake account id.</li>
              <li>Generate 12 recovery words and hash them.</li>
              <li>Hash the password.</li>
              <li>Insert the user row.</li>
              <li>Create a session token.</li>
            </ul>
            <p>The response is:</p>
            <div class="doc-code-block"><pre><code>{
  "ok": true,
  "token": "&lt;session token&gt;",
  "user": { "...": "..." },
  "recoveryWords": ["word1", "word2", "..."]
}</code></pre></div>
            <p>The recovery words are returned exactly once, at registration. They are also available for download from the client after a successful registration.</p>

            <h3>Login</h3>
            <p>The <code>POST /api/auth/login</code> endpoint and <code>services/auth.rs::login</code> function authenticate a password.</p>
            <p>Steps:</p>
            <ul class="doc-bullets">
              <li>Normalize the username.</li>
              <li>Look up the user.</li>
              <li>Verify the password with Argon2id.</li>
              <li>Reject banned or disabled accounts.</li>
              <li>On a missing user, burn the constant-time dummy hash.</li>
              <li>Create a session token.</li>
            </ul>
            <p>The response is <code>{ "ok": true, "token": "...", "user": { ... } }</code>.</p>

            <h3>Session tokens</h3>
            <p>A session token is a 64 character alphanumeric string. The server stores only <code>SHA256(token)</code> in the <code>sessions</code> table.</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Column</th><th>Meaning</th></tr></thead>
                <tbody>
                  <tr><td><code>token_hash</code></td><td>Primary key, the SHA-256 hex of the token.</td></tr>
                  <tr><td><code>user_id</code></td><td>The owning account.</td></tr>
                  <tr><td><code>created_at</code></td><td>Creation time in milliseconds.</td></tr>
                  <tr><td><code>expires_at</code></td><td>Expiry time in milliseconds.</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              The session TTL is 7 days (<code>SESSION_TTL_MS</code>). <code>authenticate_token</code> resolves a token to the user, rejecting expired
              tokens and disabled or banned accounts. <code>touch_session</code> extends the TTL. <code>logout</code> deletes the session row. Recovery and
              password changes invalidate all sessions for the account.
            </p>

            <h3>Recovery</h3>
            <p>The <code>POST /api/auth/recover</code> endpoint resets a password using the recovery phrase.</p>
            <p>Steps:</p>
            <ul class="doc-bullets">
              <li>Normalize and validate the new password.</li>
              <li>Look up the user.</li>
              <li>Verify the normalized recovery phrase against <code>recovery_hash</code>.</li>
              <li>Reject banned accounts.</li>
              <li>Hash the new password and write it.</li>
              <li>Delete all existing sessions for the account.</li>
              <li>Create a fresh session token.</li>
            </ul>
            <p>The recovery phrase is normalized the same way as at creation: split on whitespace, lowercased, joined with single spaces.</p>

            <h3>WebSocket identification</h3>
            <p>
              The WebSocket protocol identifies a connection with opcode 2. The client sends a token in either the <code>token</code> or
              <code>authToken</code> field. The server calls <code>authenticate_token</code> and, on success, binds the session to a player record with the
              account username, id, admin flag, badges, profile, and presence status.
            </p>
            <p>The identification response includes the optional default room record:</p>
            <div class="doc-code-block"><pre><code>{
  "op": 2,
  "d": {
    "userId": "...",
    "username": "...",
    "admin": false,
    "profile": { "...": "..." },
    "status": "online",
    "badges": [],
    "defaultRoom": { "roomId": "...", "roomKey": "...", "title": "..." }
  }
}</code></pre></div>

            <h3>HTTP bearer authentication</h3>
            <p>
              Authenticated HTTP endpoints use the <code>Authorization: Bearer &lt;token&gt;</code> header. <code>authenticated_user</code> resolves the token
              through <code>authenticate_token</code>. The endpoints that require a bearer token include the social blob, profile image upload, username
              change, and the admin endpoints.
            </p>

            <h3>Account deletion</h3>
            <p>Deletion requires the current password. On success the server removes:</p>
            <ul class="doc-bullets">
              <li>All sessions for the account.</li>
              <li>The prekey bundle.</li>
              <li>The block tags.</li>
              <li>The user row.</li>
            </ul>
            <p>It then disconnects all live sessions for the account, invalidates the public profile cache, and removes any uploaded avatar and banner files.</p>
          </article>

          <article id="signature-protocol" class="doc-chapter">
            <div class="chapter-header">
              <h2>Client Signature Protocol</h2>
              <a href="#signature-protocol" class="heading-anchor" aria-label="Permalink to Client Signature Protocol" @click.prevent="onNavClick('signature-protocol')">#</a>
            </div>

            <p>
              This layer proves to other clients, in a cryptographically verifiable way, that a payload was produced by the holder of a specific
              device key and recovery-word derived identity. The server relays these signatures and public keys but never possesses the private key material.
            </p>

            <h3>Identity key material</h3>
            <p>The client maintains the following key material:</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Key</th><th>Algorithm</th><th>Purpose</th><th>Where it appears</th></tr></thead>
                <tbody>
                  <tr><td>Device signing key</td><td>ECDSA P-256</td><td>Signs each end-to-end encrypted message.</td><td>Public key attached to every message envelope.</td></tr>
                  <tr><td>ML-DSA-65 key</td><td>ML-DSA-65 (FIPS 204)</td><td>Post-quantum component of hybrid signatures.</td><td>Public key in the prekey bundle.</td></tr>
                  <tr><td>ML-KEM-768 key</td><td>ML-KEM-768 (FIPS 203)</td><td>Encapsulation key for sealing friend envelopes and the anti-abuse challenge.</td><td>Public key in the prekey bundle.</td></tr>
                  <tr><td>Master secret</td><td>32 bytes, derived</td><td>Root for contextual signing keys and the roster key.</td><td>Never leaves the client.</td></tr>
                  <tr><td>Contextual keypair</td><td>ECDSA P-256, derived per room</td><td>Signs the inner friend envelope in a room-specific domain.</td><td>Public key appears only inside sealed envelopes.</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              The device signing key and ML-DSA-65 key are generated by the client and exported as JWK (for P-256) and hex (for ML-DSA).
              The ML-KEM-768 key is generated by the audited <code>ml-kem</code> / <code>@noble/post-quantum</code> library.
            </p>

            <h3>Master secret derivation</h3>
            <p>
              The master secret is derived from the 12 recovery words. It is never stored; it is recomputed on demand whenever a friend
              envelope must be sealed or the roster must be decrypted.
            </p>
            <div class="doc-code-block"><pre><code>phrase      = join(recovery_words, " ")
seed        = PBKDF2-SHA256(password = phrase,
                            salt     = "qxphantom:master",
                            iterations = 100000,
                            dkLen    = 256 bits)
masterSecret = HKDF-SHA256(ikm  = seed,
                           salt = empty,
                           info = "qxp-master",
                           len  = 32 bytes)</code></pre></div>
            <p>If the recovery words are not present in the client state, the master secret cannot be derived and the QXP-PHANTOM signing and roster operations are unavailable.</p>

            <h3>Contextual keypair derivation</h3>
            <p>
              A room-scoped ECDSA P-256 keypair is derived from the master secret and a room id. This separates signing identities across rooms
              so that a public key used in one room cannot be linked to the public key used in another room.
            </p>
            <div class="doc-code-block"><pre><code>salt          = SHA256(UTF-8(roomId))
seed          = HKDF-SHA256(ikm  = masterSecret,
                            salt = salt,
                            info = "qxphantom:ctx:v1",
                            len  = 32 bytes)
d             = (bigint(seed) mod (order(P-256) - 1)) + 1
publicKey     = P-256 point from scalar d</code></pre></div>
            <p>The scalar <code>d</code> and the public point are used to build a P-256 JWK. Only the public key is ever serialized into an envelope.</p>

            <h3>Hybrid signatures</h3>
            <p>QXP-PHANTOM requires both signatures to validate. An adversary must break both schemes to forge a payload. The two schemes are:</p>
            <ul class="doc-bullets">
              <li><strong>ECDSA P-256</strong> over the canonical byte string, using either the device key (prekey bundle) or a contextual key (inner envelope).</li>
              <li><strong>ML-DSA-65</strong> over the same canonical byte string, using the device key.</li>
            </ul>
            <p>
              The ECDSA signature is the raw <code>r || s</code> form (64 bytes, IEEE P1363) encoded as <code>b64url</code>.
              The ML-DSA-65 signature is 3309 bytes encoded as hex.
            </p>
            <h4>Prekey bundle signature</h4>
            <p>
              The canonical bytes are the sorted, compact JSON of the bundle with the two signature fields removed. The ECDSA component is produced by
              the device ECDSA P-256 key, and the ML-DSA component by the device ML-DSA-65 key.
            </p>
            <h4>Inner envelope signature</h4>
            <p>
              The canonical bytes are the sorted, compact JSON of the inner envelope with the <code>hybridSig</code> field removed. The ECDSA component is
              produced by the contextual key derived for the room, and the ML-DSA component by the device ML-DSA-65 key.
            </p>

            <h3>Canonical serialization</h3>
            <p>
              All signed payloads use the same canonicalization contract, implemented identically in <code>services/phantom_crypto.rs</code> (Rust)
              and <code>crypto/phantom.ts</code> (TypeScript):
            </p>
            <ul class="doc-bullets">
              <li>Object keys are sorted recursively.</li>
              <li>Arrays keep their order.</li>
              <li>Scalars are serialized with JSON rules.</li>
              <li>No whitespace is inserted.</li>
            </ul>
            <p>
              The <code>canonicalDeviceSigningKey</code> helper in <code>crypto/e2ee.ts</code> is a separate, narrower canonicalization used only to
              compare the public key inside an encrypted message envelope.
            </p>

            <h3>Trust model</h3>
            <ul class="doc-bullets">
              <li>The master secret, the ML-DSA secret key, the ML-KEM secret key, and the contextual private keys never leave the client.</li>
              <li>The device ECDSA public key, the ML-DSA public key, and the ML-KEM public key are shared through the published prekey bundle.</li>
              <li>The contextual public key is revealed only inside an envelope that has already been sealed to the recipient's ML-KEM key. The server cannot read it.</li>
              <li>The server relays and validates the hybrid signatures on the prekey bundle during publication, but it does not possess the private keys and cannot forge an envelope.</li>
            </ul>
            <p>The endpoint device is the security boundary. If the device is compromised, all of this key material is exposed.</p>
          </article>

          <article id="message-transport" class="doc-chapter">
            <div class="chapter-header">
              <h2>Message Transport</h2>
              <a href="#message-transport" class="heading-anchor" aria-label="Permalink to Message Transport" @click.prevent="onNavClick('message-transport')">#</a>
            </div>

            <p>
              Messages on the WebSocket are JSON objects with an <code>op</code> field and a <code>d</code> data field. The client sends operations;
              the server responds with the same opcode where a reply is expected, or pushes events asynchronously.
            </p>
            <div class="doc-code-block"><pre><code>{ "op": 7, "d": { "text": "hello", "gameId": "&lt;room id&gt;" } }</code></pre></div>
            <p>The dispatch table from <code>websocket/protocol.rs::process_message</code> is:</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Opcode</th><th>Name</th><th>Direction</th></tr></thead>
                <tbody>
                  <tr><td>0</td><td>Ping or error</td><td>Both</td></tr>
                  <tr><td>1</td><td>Heartbeat</td><td>Both</td></tr>
                  <tr><td>2</td><td>Identify (authenticate session)</td><td>Client to server</td></tr>
                  <tr><td>3</td><td>Join room</td><td>Both</td></tr>
                  <tr><td>4</td><td>Leave room</td><td>Client to server</td></tr>
                  <tr><td>5</td><td>Report kill</td><td>Client to server</td></tr>
                  <tr><td>6</td><td>Version query</td><td>Client to server</td></tr>
                  <tr><td>7</td><td>Send chat message</td><td>Both</td></tr>
                  <tr><td>8</td><td>Update client settings</td><td>Client to server</td></tr>
                  <tr><td>18</td><td>Request room history</td><td>Client to server</td></tr>
                  <tr><td>19</td><td>Toggle message reaction</td><td>Client to server</td></tr>
                  <tr><td>21</td><td>Delete message</td><td>Client to server</td></tr>
                  <tr><td>28</td><td>Request link preview</td><td>Client to server</td></tr>
                  <tr><td>29</td><td>Edit message</td><td>Client to server</td></tr>
                  <tr><td>31</td><td>Update typing state</td><td>Client to server</td></tr>
                  <tr><td>32</td><td>Upload room icon</td><td>Client to server</td></tr>
                  <tr><td>33</td><td>Update room title</td><td>Client to server</td></tr>
                  <tr><td>35</td><td>Request public profiles</td><td>Client to server</td></tr>
                  <tr><td>36</td><td>Publish prekey (PHANTOM)</td><td>Client to server</td></tr>
                  <tr><td>37</td><td>Fetch prekeys (PHANTOM)</td><td>Client to server</td></tr>
                  <tr><td>39</td><td>Update block list (PHANTOM)</td><td>Client to server</td></tr>
                  <tr><td>40</td><td>Create room</td><td>Client to server</td></tr>
                  <tr><td>41</td><td>Update room description</td><td>Client to server</td></tr>
                  <tr><td>42</td><td>Set member role</td><td>Client to server</td></tr>
                  <tr><td>43</td><td>Ban member</td><td>Client to server</td></tr>
                  <tr><td>44</td><td>Unban member</td><td>Client to server</td></tr>
                  <tr><td>45</td><td>Kick member</td><td>Client to server</td></tr>
                  <tr><td>46</td><td>Timeout member</td><td>Client to server</td></tr>
                  <tr><td>47</td><td>Transfer ownership</td><td>Client to server</td></tr>
                  <tr><td>48</td><td>Set chat lock</td><td>Client to server</td></tr>
                  <tr><td>49</td><td>Set moderator permissions</td><td>Client to server</td></tr>
                  <tr><td>50</td><td>Set calls enabled</td><td>Client to server</td></tr>
                  <tr><td>51</td><td>Set call access</td><td>Client to server</td></tr>
                  <tr><td>52</td><td>Unmute member</td><td>Client to server</td></tr>
                  <tr><td>98</td><td>Update voice chat state</td><td>Both</td></tr>
                  <tr><td>100</td><td>Update mute state</td><td>Client to server</td></tr>
                  <tr><td>101</td><td>Admin status</td><td>Client to server</td></tr>
                  <tr><td>104</td><td>Admin broadcast</td><td>Client to server</td></tr>
                  <tr><td>105</td><td>Stats query</td><td>Client to server</td></tr>
                  <tr><td>110</td><td>Update call media state</td><td>Both</td></tr>
                  <tr><td>111</td><td>Relay call signal</td><td>Both</td></tr>
                  <tr><td>112</td><td>Update call deafened state</td><td>Both</td></tr>
                  <tr><td>23</td><td>Link preview patch</td><td>Server to client</td></tr>
                  <tr><td>999</td><td>Session eviction</td><td>Server to client</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Room identity and access token</h3>
            <p>A room has two identifiers:</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Field</th><th>Bytes</th><th>Encoding</th></tr></thead>
                <tbody>
                  <tr><td><code>roomId</code></td><td>16</td><td>lowercase hex, 32 characters</td></tr>
                  <tr><td><code>roomKey</code></td><td>32</td><td>lowercase hex, 64 characters</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              A room access token is the concatenation <code>roomId || roomKey</code>, 96 hex characters. The <code>roomId</code> is a routing label
              visible to the server; the <code>roomKey</code> is the symmetric encryption secret shared by room members. The server stores room metadata
              keyed by <code>roomId</code> but does not require the <code>roomKey</code> to route or store messages.
            </p>

            <h3>Room lifecycle</h3>
            <p>Joining is opcode 3. The server:</p>
            <ul class="doc-bullets">
              <li>Rate limits the join.</li>
              <li>Validates the room id length and character set.</li>
              <li>Requires an identified session.</li>
              <li>Enforces a maximum of 100 rooms per player.</li>
              <li>Rejects joins to a community room if the user is banned.</li>
              <li>Persists the room record if it is new.</li>
              <li>Broadcasts the updated roster, unless the join is silent or the user is invisible.</li>
              <li>Returns the roster, profiles, presence, role, icon, and room record to the joining client.</li>
              <li>Dispatches the buffered room history.</li>
            </ul>
            <p>
              Room membership lives in <code>PlayerSession.rooms</code>. Room metadata such as title, icon, description, roles, bans, and timeouts is
              persisted in the <code>RoomDatabase</code> backend. Leaving is opcode 4; the server can also evict a session with opcode 999 when an
              account is deleted or disabled.
            </p>

            <h3>Message sending</h3>
            <p>Messages are sent with opcode 7. A message is either plaintext or an encrypted envelope, never both.</p>
            <p>Validation performed by the server:</p>
            <ul class="doc-bullets">
              <li>The room id must be valid.</li>
              <li>If an encrypted envelope is present, its <code>roomId</code> must match the target room.</li>
              <li>An encrypted message must not include a plaintext <code>text</code> or <code>attachment</code>.</li>
              <li>The message must be non-empty.</li>
              <li>The sender must be identified and a member of the room.</li>
              <li>A minimum 400 millisecond interval applies between messages per session.</li>
              <li>A community room can restrict who may speak.</li>
              <li>Plaintext is truncated to 2000 characters.</li>
            </ul>
            <p>The server constructs a <code>ChatMessageRecord</code>, stores it in the RAM message store, and broadcasts it to all room members. The sender receives a separate acknowledgment with the assigned message id.</p>

            <h3>Message storage</h3>
            <p>
              Room messages live in <code>AppState.room_messages</code>, a <code>HashMap&lt;room_id, Vec&lt;ChatMessageRecord&gt;&gt;</code>.
              The store is capped at 150 messages per room; the oldest are dropped when the cap is exceeded. The store is RAM only and is lost on restart.
              Room history is served on request with opcode 18.
            </p>

            <h3>End-to-end encrypted message envelope</h3>
            <p>
              Encrypted messages use a shared room key and a per-message derived AES-256-GCM key. The format is version 2 with algorithm identifier
              <code>QXDR-A256GCM-HKDFSHA256</code>.
            </p>
            <div class="doc-code-block"><pre><code>{
  "v": 2,
  "alg": "QXDR-A256GCM-HKDFSHA256",
  "n": 1,
  "salt": "&lt;b64url 32 bytes&gt;",
  "iv": "&lt;b64url 12 bytes&gt;",
  "ciphertext": "&lt;b64url&gt;",
  "roomId": "&lt;hex&gt;",
  "senderDeviceId": "&lt;hex 16 bytes&gt;",
  "senderSigningKey": { "kty": "EC", "crv": "P-256", "x": "...", "y": "..." },
  "signature": "&lt;b64url raw r||s&gt;"
}</code></pre></div>
            <h4>Key derivation</h4>
            <div class="doc-code-block"><pre><code>messageKey = HKDF-SHA256(ikm  = roomKey bytes,
                         salt = salt,
                         info = "qxchat:e2ee:v2:" + roomId + ":" + n)
             -> AES-256-GCM key

aad = roomId + ":" + n + ":" + b64url(salt) + ":" + senderDeviceId</code></pre></div>
            <p>The plaintext JSON is encrypted with AES-256-GCM using the derived key, the random 12 byte IV, and the AAD above.</p>
            <h4>Authentication</h4>
            <p>The envelope is signed with the sender device ECDSA P-256 key. The signed bytes are the compact JSON of:</p>
            <div class="doc-code-block"><pre><code>{ v, alg, roomId, n, salt, iv, ciphertext, senderDeviceId, senderSigningKey }</code></pre></div>
            <p>
              The signature is the raw <code>r || s</code> form encoded as <code>b64url</code>. On receipt, the client verifies the signature, optionally
              checks that the sender key matches a trusted key, then derives the message key and decrypts. The server parses and bounds-checks the envelope
              but cannot decrypt it because it does not possess the room key.
            </p>
          </article>

          <article id="phantom-protocol" class="doc-chapter">
            <div class="chapter-header">
              <h2>QXP-PHANTOM Protocol</h2>
              <a href="#phantom-protocol" class="heading-anchor" aria-label="Permalink to QXP-PHANTOM Protocol" @click.prevent="onNavClick('phantom-protocol')">#</a>
            </div>

            <p>
              QXP-PHANTOM is an add-only friend request protocol. Its central property is that the social graph never exists on the server.
              A request is delivered only into a blind mailbox slot derived from a secret shared by the two parties, and there is no negative response:
              ignoring a request simply lets it expire.
            </p>

            <h3>Privacy goals</h3>
            <ul class="doc-bullets">
              <li>The server cannot reconstruct a social edge from its own state.</li>
              <li>A deposit and a poll are not bound to an account or a session.</li>
              <li>The server cannot compute any slot because it does not know room keys or prekeys until they are published.</li>
              <li>A one-sided deposit has no effect and produces no signal to the recipient.</li>
              <li>Envelopes are opaque to the server and expire after 24 hours.</li>
            </ul>

            <h3>Prekey bundle</h3>
            <p>Each user publishes a public prekey bundle that lets others seal envelopes to them. It is stored server side and served by username.</p>
            <div class="doc-code-block"><pre><code>{
  "version": 1,
  "mlkem768Pk": "&lt;hex 1184 bytes&gt;",
  "ecdsaP256Pk": { "kty": "EC", "crv": "P-256", "x": "...", "y": "..." },
  "mldsa65Pk": "&lt;hex 1952 bytes&gt;",
  "sigEcdsa": "&lt;b64url&gt;",
  "sigMldsa": "&lt;hex 3309 bytes&gt;",
  "blockFilter": ["&lt;hex64&gt;"],
  "updatedAt": 1730000000000
}</code></pre></div>
            <p>
              The bundle is signed with both device keys over its canonical form, excluding the two signature fields. Publication is idempotent; the server
              verifies both signatures before storing. Rotation republishes the bundle with a new version and new keys.
            </p>
            <p>The fingerprint used throughout the protocol is:</p>
            <div class="doc-code-block"><pre><code>fp(pk) = SHA256(raw bytes of the ML-KEM-768 public key), lowercase hex 64 chars</code></pre></div>

            <h3>Slots</h3>
            <p>A slot is a 32 byte opaque label computed only by clients. The epoch day binds a slot to a 24 hour window.</p>
            <div class="doc-code-block"><pre><code>epochDay   = floor(now_ms / 86400000)

slotGlobal(recipientFp, day) =
    SHA256(UTF-8(recipientFp) || UTF-8(day))

slotContextual(recipientFp, roomKey, day) =
    SHA256(UTF-8(recipientFp) || UTF-8(SHA256(raw roomKey bytes)) || UTF-8(day))</code></pre></div>
            <p>
              The contextual slot proves the depositor knows both the target prekey fingerprint and the shared room key. The global slot proves only
              knowledge of the prekey fingerprint. The server cannot compute either because it does not know room keys and treats slots as opaque labels.
            </p>

            <h3>Envelope</h3>
            <p>An envelope has an outer layer visible to the server and an inner payload sealed to the recipient.</p>
            <h4>Outer layer</h4>
            <div class="doc-code-block"><pre><code>{
  "pv": 1,
  "slotId": "&lt;hex64&gt;",
  "recipientFp": "&lt;hex64&gt;",
  "senderHint": "&lt;hex64&gt;",
  "bucket": 16384,
  "ct": "&lt;b64url&gt;"
}</code></pre></div>
            <p>
              The server validates that <code>pv</code> is 1, that the three identifiers are exactly 64 hex characters, that the bucket is one of
              <code>4096</code>, <code>16384</code>, <code>65536</code>, and that <code>ct</code> is non-empty and at most 96 KiB.
            </p>
            <h4>Inner layer</h4>
            <p>The <code>ct</code> field is <code>b64url(ML-KEM ciphertext || IV || AES-GCM ciphertext)</code>. After decapsulation the recipient recovers this signed JSON:</p>
            <div class="doc-code-block"><pre><code>{
  "kind": "intro",
  "epochBucket": 19700,
  "sender": {
    "contextualPub": { "kty": "EC", "crv": "P-256", "x": "...", "y": "..." },
    "prekeyFp": "&lt;hex64&gt;",
    "mlkem768Pk": "&lt;hex 1184 bytes&gt;",
    "displayName": "alice"
  },
  "hybridSig": { "ecdsa": "&lt;b64url&gt;", "mldsa": "&lt;hex 3309 bytes&gt;" },
  "intro": "&lt;text up to 2048 UTF-8 bytes&gt;"
}</code></pre></div>
            <p>A <code>welcome</code> payload replaces <code>intro</code> with:</p>
            <div class="doc-code-block"><pre><code>{ "welcome": { "roomId": "&lt;hex&gt;", "roomKey": "&lt;hex&gt;" } }</code></pre></div>
            <h4>Sealing</h4>
            <div class="doc-code-block"><pre><code>innerPadded = pad(JSON(inner), bucket)          // 4 byte BE length prefix + JSON
sharedSecret, cipherText = ML-KEM-768.encapsulate(recipientMlkemPk)
aesKey = HKDF-SHA256(sharedSecret, empty, "qxphantom:v1") -> AES-256-GCM
iv = random 12 bytes
aead = AES-256-GCM(aesKey, iv, innerPadded)
ct = b64url(cipherText || iv || aead)</code></pre></div>
            <p>The inner JSON is signed with the hybrid signature before sealing. The padding makes the outer size constant per bucket.</p>
            <h4>Opening</h4>
            <p>
              The recipient decapsulates with its ML-KEM secret key, derives the AES key, decrypts, verifies the hybrid signature, verifies
              <code>epochBucket</code> against the current day, and checks the sender against the local block list. Any failure is silent.
            </p>

            <h3>Deposit and poll</h3>
            <p>Deposits and polls use anonymous HTTP and never carry an authorization header.</p>
            <h4>Deposit</h4>
            <p><code>POST /api/phantom/deposit</code> accepts an envelope and a gate. The gate is:</p>
            <div class="doc-code-block"><pre><code>{
  "mode": "cap",
  "token": "&lt;cap token or deposit token&gt;",
  "nullifier": "&lt;hex64&gt;",
  "quotaToken": { "epoch": 0, "ticket": "...", "signature": "..." }
}</code></pre></div>
            <p>The server applies, in order:</p>
            <ul class="doc-bullets">
              <li>A global rate limit.</li>
              <li>Envelope and gate validation.</li>
              <li>The opaque block check.</li>
              <li>The anonymous quota nullifier check.</li>
              <li>The mode-specific gate: <code>cap</code> verifies a CAPTCHA token, or <code>pass</code> consumes a Privacy Pass deposit token.</li>
            </ul>
            <p>On success the envelope is stored in the RAM dead-drop. On any failure the response is the same generic <code>{ "ok": false, "reason": "gate" }</code>.</p>
            <h4>Poll</h4>
            <p>
              <code>POST /api/phantom/poll</code> accepts up to 64 slots and a <code>want</code> value capped at 8. The server claims at most one
              envelope per slot, FIFO, and pads the result to <code>want</code> frames. Null frames are returned for missing envelopes.
            </p>
            <h4>Dead-drop store</h4>
            <p>The store is a RAM <code>HashMap&lt;slotId, VecDeque&lt;envelope&gt;&gt;</code> with these bounds:</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Limit</th><th>Value</th></tr></thead>
                <tbody>
                  <tr><td>Envelopes per slot</td><td>16</td></tr>
                  <tr><td>Total envelopes</td><td>100 000</td></tr>
                  <tr><td>Envelope TTL</td><td>24 hours</td></tr>
                  <tr><td>Sweep interval</td><td>60 seconds</td></tr>
                </tbody>
              </table>
            </div>
            <p>The store is never written to disk and is lost on restart.</p>

            <h3>Blocking</h3>
            <p>Blocking is two layered barriers.</p>
            <p>
              <strong>Server barrier (cost):</strong> the server stores opaque tags only. For a block update it computes
              <code>SHA256(fp(owner prekey) || hint)</code>; at deposit time it computes <code>SHA256(recipientFp || senderHint)</code> and rejects if
              the tag exists. The server learns that a pair is blocked but not which account blocks which. The <code>blocks.user_id</code> column is used
              only for the per-account quota of 512 and is never joined or exposed.
            </p>
            <p>
              <strong>Client barrier (guarantee):</strong> the client keeps a local block list of sender fingerprints and silently destroys any incoming
              envelope whose sender is in the list, before any UI rendering.
            </p>

            <h3>Encrypted roster</h3>
            <p>The friend list is synchronized across devices through an opaque encrypted blob. The blob key is:</p>
            <div class="doc-code-block"><pre><code>rosterKey = HKDF-SHA256(masterSecret, empty, "qxphantom:roster") -> AES-256-GCM</code></pre></div>
            <p>
              The blob is <code>b64(iv || ciphertext)</code>, at most 64 KiB. <code>PUT /api/social/blob</code> enforces strict last-write-wins: the
              version must be strictly greater than the current version, otherwise the server returns <code>409</code> with the current version.
            </p>
            <p>The decrypted content is:</p>
            <div class="doc-code-block"><pre><code>{
  "friends": [],
  "pendingOut": [],
  "blocks": [],
  "settings": { "acceptUnknown": "off" }
}</code></pre></div>

            <h3>Rendezvous state machine</h3>
            <div class="doc-code-block"><pre><code>Shared-room path
A1 Alice computes slotContextual(Bob) using the shared room key
A2 Alice seals an intro and deposits it (cap gate)
A3 Alice polls her own slots on a jittered schedule
A4 Bob polls his rooms and global slots
A5 Bob opens the intro and decides
     ignore -> silence, envelope expires in 24 hours
     accept -> create room, seal a welcome, deposit it in Alice's global slot
A6 Alice receives the welcome and joins the room
A7 both store the friend locally and sync the roster

Username path
B1 Alice fetches Bob's prekey bundle
B2 Alice seals an intro and deposits it in slotGlobal(Bob)
B3 Bob, if acceptUnknown is enabled, opens and decides, then proceeds as A4 onward</code></pre></div>
            <p>Reciprocity is required for completion. There is no friendship without a second deposit, the <code>welcome</code>, from the recipient.</p>
          </article>

          <article id="crypto-primitives" class="doc-chapter">
            <div class="chapter-header">
              <h2>Cryptographic Primitives</h2>
              <a href="#crypto-primitives" class="heading-anchor" aria-label="Permalink to Cryptographic Primitives" @click.prevent="onNavClick('crypto-primitives')">#</a>
            </div>

            <p>Reference for the exact primitives, derivations, constants, and wire formats used by the server and the client.</p>

            <h3>Hash and KDF conventions</h3>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Name</th><th>Definition</th></tr></thead>
                <tbody>
                  <tr><td><code>SHA256(x)</code></td><td>Raw SHA-256 digest of bytes <code>x</code>.</td></tr>
                  <tr><td><code>HKDF(m, salt, info, len)</code></td><td>HKDF-SHA256 (RFC 5869).</td></tr>
                  <tr><td><code>fp(pk)</code></td><td><code>SHA256(raw pk bytes)</code>, lowercase hex, 64 characters.</td></tr>
                  <tr><td><code>hex</code></td><td>Lowercase hexadecimal, no prefix.</td></tr>
                  <tr><td><code>b64url</code></td><td>Base64url without padding.</td></tr>
                  <tr><td><code>||</code></td><td>Byte concatenation.</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Canonical JSON</h3>
            <p>Signed payloads are serialized deterministically:</p>
            <ul class="doc-bullets">
              <li>Object keys sorted recursively.</li>
              <li>Arrays preserved in order.</li>
              <li>Scalars serialized with JSON rules.</li>
              <li>No whitespace.</li>
            </ul>
            <p>
              This contract is implemented in <code>services/phantom_crypto.rs::canonical_json</code> and <code>crypto/phantom.ts::canonicalJson</code>.
              The two implementations are verified against each other with a cross-language test vector.
            </p>

            <h3>Argon2id</h3>
            <p>
              Passwords and recovery phrases are hashed with Argon2id using the default <code>argon2</code> crate parameters. Verification uses the same
              parameters. A fixed dummy hash is used for constant-time failure when a username or recovery phrase does not exist.
            </p>

            <h3>BIP39 recovery words</h3>
            <p>
              Recovery words are generated with <code>bip39</code>, 16 bytes of entropy, English wordlist, which yields 12 words. The phrase is normalized
              by splitting on whitespace, lowercasing, and rejoining with single spaces.
            </p>

            <h3>HMAC-SHA256</h3>
            <p>
              Several subsystems use HMAC-SHA256 with a per-subsystem 32 byte secret generated once per process by the OS CSPRNG. The HMAC output is
              lowercase hex. These secrets are never persisted, so signed tickets and challenges become invalid after a restart.
            </p>
            <p>The subsystems with their own secret are:</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Subsystem</th><th>Secret holder</th></tr></thead>
                <tbody>
                  <tr><td>Anonymous quota (<code>rln</code>)</td><td><code>core/rln.rs</code></td></tr>
                  <tr><td>VDF challenge</td><td><code>core/vdf.rs</code></td></tr>
                  <tr><td>CAPTCHA (<code>cap</code>)</td><td><code>core/cap.rs</code></td></tr>
                  <tr><td>Privacy Pass deposit tokens</td><td><code>services/privacy_pass.rs</code></td></tr>
                </tbody>
              </table>
            </div>

            <h3>ECDSA P-256</h3>
            <p>ECDSA P-256 is used for:</p>
            <ul class="doc-bullets">
              <li>Device message signing (Web Crypto).</li>
              <li>Contextual friend signing (Web Crypto).</li>
              <li>The ECDSA half of the hybrid signatures.</li>
            </ul>
            <p>
              The signature is the raw <code>r || s</code> form (64 bytes, IEEE P1363), not DER. It is encoded as <code>b64url</code>.
              Verification parses the two 32 byte scalars and verifies over SHA-256.
            </p>

            <h3>ML-DSA-65</h3>
            <p>
              ML-DSA-65 (FIPS 204) is the post-quantum half of the hybrid signatures. The Rust <code>ml-dsa</code> crate and the
              <code>@noble/post-quantum</code> <code>ml-dsa.js</code> library implement it.
            </p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Size</th><th>Bytes</th></tr></thead>
                <tbody>
                  <tr><td>Public key</td><td>1952</td></tr>
                  <tr><td>Signature</td><td>3309</td></tr>
                </tbody>
              </table>
            </div>

            <h3>ML-KEM-768</h3>
            <p>
              ML-KEM-768 (FIPS 203) is used for envelope sealing and the anti-abuse PQC challenge. The Rust <code>ml-kem</code> crate and the
              <code>@noble/post-quantum</code> <code>ml-kem.js</code> library implement it.
            </p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Size</th><th>Bytes</th></tr></thead>
                <tbody>
                  <tr><td>Encapsulation key</td><td>1184</td></tr>
                  <tr><td>Decapsulation key</td><td>2400</td></tr>
                  <tr><td>Ciphertext</td><td>1088</td></tr>
                  <tr><td>Shared secret</td><td>32</td></tr>
                </tbody>
              </table>
            </div>

            <h3>AES-256-GCM</h3>
            <p>
              AES-256-GCM is used for message payloads, the inner envelope, and the roster blob. The IV is 12 random bytes and the authentication tag is 16 bytes.
            </p>

            <h3>Anonymous quota tokens</h3>
            <p>The <code>rln</code> module implements an anonymous, HMAC-based quota token rather than a zero-knowledge rate-limiting nullifier. The token is:</p>
            <div class="doc-code-block"><pre><code>{ "epoch": 0, "ticket": "&lt;hex&gt;", "signature": "&lt;hex&gt;" }</code></pre></div>
            <div class="doc-code-block"><pre><code>epoch        = floor(now_ms / 15000)
ticket       = HMAC(secret, epoch || ":" || nonce_hex)
signature    = HMAC(secret, epoch || ":" || ticket)</code></pre></div>
            <p>The nullifier binds a ticket to an action:</p>
            <div class="doc-code-block"><pre><code>nullifier = SHA256("qxprotocol_rln_nullifier:" || ticket || ":" || epoch_be64 || ":" || action)</code></pre></div>
            <p>
              The server verifies the signature, checks the epoch is within a small window, compares the nullifier in constant time, and stores it with a
              3 minute TTL so the same ticket cannot be spent twice for the same action.
            </p>

            <h3>Wesolowski Verifiable Delay Function</h3>
            <p>
              The VDF is a sequential squaring proof over a fixed 1024 bit RSA modulus, a hardcoded composite of two 512 bit primes.
              The default iteration count is 30 000 and the challenge TTL is 3 minutes.
            </p>
            <div class="doc-code-block"><pre><code>x = HashToElement(target, salt, modulus)
challenge = { modulus, x, t, targetHash, salt, signature, issuedAt, expiresAt }</code></pre></div>
            <p>
              The challenge signature covers <code>issuedAt:t:targetHash:salt:x:expiresAt</code>. The target hash is the first 16 hex characters of
              <code>SHA256(target)</code>. The proof is verified with the Wesolowski relation:
            </p>
            <div class="doc-code-block"><pre><code>l = HashToPrime(x, y)         // 128 bit Fiat-Shamir prime
r = 2^t mod l
check: (pi^l * x^r) mod N == y mod N</code></pre></div>

            <h3>Post-quantum challenge</h3>
            <p>
              The anti-abuse challenge also includes an ML-KEM-768 encapsulation step. The server generates an ephemeral keypair, returns the
              encapsulation key, and later decapsulates the client ciphertext. The shared secret is discarded after decapsulation; the step currently
              acts as a capability gate rather than a key agreement.
            </p>
            <div class="doc-code-block"><pre><code>{ "keyId": "&lt;hex&gt;", "ekHex": "&lt;hex 1184 bytes&gt;" }
{ "keyId": "&lt;hex&gt;", "ctHex": "&lt;hex 1088 bytes&gt;" }</code></pre></div>
            <p>The ephemeral key has a 3 minute TTL and is consumed once.</p>

            <h3>CAPTCHA token format</h3>
            <p>A CAPTCHA challenge is signed with the <code>cap</code> HMAC secret. Redeeming it yields a one-time <code>cap</code> token.</p>
            <div class="doc-code-block"><pre><code>capToken = "cap." + tokenId + "." + expiresAt + "." + signature
signature = HMAC(secret, tokenId || ":" || scope || ":" || expiresAt)</code></pre></div>
            <p>The token TTL is 5 minutes and it is consumed exactly once.</p>

            <h3>Privacy Pass deposit token format</h3>
            <p>The deposit token used by the <code>pass</code> gate follows the same structure:</p>
            <div class="doc-code-block"><pre><code>depositToken = "pass." + tokenId + "." + expiresAt + "." + signature
signature = HMAC(secret, tokenId || ":" || expiresAt)</code></pre></div>
            <p>The token TTL is 5 minutes.</p>
          </article>

          <article id="anti-abuse" class="doc-chapter">
            <div class="chapter-header">
              <h2>Anti-Abuse</h2>
              <a href="#anti-abuse" class="heading-anchor" aria-label="Permalink to Anti-Abuse" @click.prevent="onNavClick('anti-abuse')">#</a>
            </div>

            <p>
              The anti-abuse layer combines fixed-window rate limits, an anonymous quota token, a Verifiable Delay Function, an ML-KEM
              post-quantum challenge, and an optional CAPTCHA token. Its purpose is to make mass account creation and mass deposits expensive
              without linking the work to a user account.
            </p>

            <h3>Rate limiting</h3>
            <p>
              <code>core/security.rs::rate_limit_hit</code> implements a keyed fixed-window counter. A bucket holds a window start, a window length,
              and a count. Buckets are evicted when the store exceeds 5000 entries.
            </p>
            <p>Representative limits:</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Key</th><th>Limit</th><th>Window</th></tr></thead>
                <tbody>
                  <tr><td><code>phantom:deposit:global</code></td><td>20</td><td>1 second</td></tr>
                  <tr><td><code>phantom:poll:global</code></td><td>20</td><td>1 second</td></tr>
                  <tr><td><code>phantom:prekey:global</code></td><td>60</td><td>60 seconds</td></tr>
                  <tr><td><code>prekey-fetch:user:&lt;id&gt;</code></td><td>4</td><td>15 seconds</td></tr>
                  <tr><td><code>register:global</code></td><td>10</td><td>15 seconds</td></tr>
                  <tr><td><code>register:user:&lt;name&gt;</code></td><td>3</td><td>30 seconds</td></tr>
                  <tr><td><code>recover:user:&lt;name&gt;</code></td><td>3</td><td>30 seconds</td></tr>
                  <tr><td><code>auth:cap:challenge:global</code></td><td>60</td><td>10 seconds</td></tr>
                  <tr><td><code>auth:challenge:global</code></td><td>60</td><td>10 seconds</td></tr>
                  <tr><td><code>pass:redeem:global</code></td><td>60</td><td>60 seconds</td></tr>
                  <tr><td><code>chat:session:&lt;id&gt;</code></td><td>30</td><td>60 seconds</td></tr>
                </tbody>
              </table>
            </div>
            <p>In addition, chat messages enforce a 400 millisecond minimum interval per session.</p>

            <h3>Anonymous quota token</h3>
            <p>
              Before any gated action, the client requests an anonymous quota token from <code>GET /api/auth/challenge</code>. The token is an
              HMAC-signed epoch ticket. The client computes an action-scoped nullifier and the server consumes it, preventing reuse of the same ticket
              for the same action. The nullifier store is RAM-only, capped at 10 000 entries, with a 3 minute TTL, and the comparison is constant time.
            </p>

            <h3>Verifiable Delay Function</h3>
            <p>
              The VDF forces a sequential squaring computation before a gated action. The client must compute <code>y = x^(2^t) mod N</code> and produce
              the Wesolowski proof <code>pi</code>. The server verifies the proof in logarithmic time. The default iteration count is 30 000 and the
              challenge expires after 3 minutes.
            </p>

            <h3>Post-quantum challenge</h3>
            <p>
              The challenge also carries an ephemeral ML-KEM-768 encapsulation key. The client encapsulates and returns the ciphertext; the server
              decapsulates to confirm the client performed the KEM step. The key is one-time and expires after 3 minutes.
            </p>

            <h3>CAPTCHA flow</h3>
            <p>The full CAPTCHA flow returns a one-time <code>cap</code> token that can gate a registration, login, recovery, or deposit.</p>
            <div class="doc-code-block"><pre><code>client                          server
  |  GET /api/auth/cap/challenge  |
  |----------------------------->|
  |  { challengeId, scope,        |
  |    issuedAt, expiresAt,       |
  |    vdf, quotaToken, pqcKey,   |
  |    signature }                |
  |<-----------------------------|
  |  solve VDF                    |
  |  compute nullifier            |
  |  encapsulate ML-KEM           |
  |  POST /api/auth/cap/redeem    |
  |  { challenge, vdfProof,       |
  |    nullifier, pqcCiphertext } |
  |----------------------------->|
  |  { success, capToken }        |
  |<-----------------------------|</code></pre></div>
            <p>
              The redeem handler verifies the challenge signature, consumes the quota nullifier, verifies the VDF proof, and decapsulates the ML-KEM
              ciphertext. It also checks optional instrumentation: an automated browser flag and a minimum interaction time of 250 milliseconds.
              The <code>cap</code> token is HMAC-signed, expires after 5 minutes, and is consumed once.
            </p>

            <h3>Privacy Pass redemption</h3>
            <p>
              <code>POST /api/pass/redeem</code> is wired and implements the nonce store with a reserve, verify, commit, release cycle. The store is
              capped at 100 000 entries with FIFO eviction. The deposit token issuance and consumption are implemented.
            </p>
            <div class="gitbook-callout gitbook-callout--info">
              <div class="callout-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <div class="callout-body">
                <strong>Not yet wired</strong>
                <p>The VOPRF verification of the <code>AmortizedBatchTokenResponse</code> against a public issuer keyset is not yet wired. The <code>verify_amortized_batch_response</code> function currently returns an error unconditionally. As a result, the <code>pass</code> deposit gate cannot currently be satisfied. The <code>cap</code> gate is the working path.</p>
              </div>
            </div>

            <h3>Storage bounds and TTLs</h3>
            <p>The ephemeral stores are bounded to prevent unbounded growth.</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Store</th><th>Cap</th><th>TTL</th></tr></thead>
                <tbody>
                  <tr><td>Room messages</td><td>150 per room</td><td>n/a, lost on restart</td></tr>
                  <tr><td>Phantom dead-drop</td><td>16 per slot, 100 000 total</td><td>24 hours</td></tr>
                  <tr><td>Anonymous nullifiers</td><td>10 000</td><td>3 minutes</td></tr>
                  <tr><td>VDF consumed challenges</td><td>10 000</td><td>challenge expiry</td></tr>
                  <tr><td>PQC ephemeral keys</td><td>10 000</td><td>3 minutes</td></tr>
                  <tr><td>CAPTCHA tokens</td><td>pruned by expiry</td><td>5 minutes</td></tr>
                  <tr><td>Privacy Pass nonce store</td><td>100 000</td><td>n/a, FIFO eviction</td></tr>
                </tbody>
              </table>
            </div>
          </article>

          <article id="protocol-changes" class="doc-chapter">
            <div class="chapter-header">
              <h2>Changelog &amp; Gap Report</h2>
              <a href="#protocol-changes" class="heading-anchor" aria-label="Permalink to Changelog & Gap Report" @click.prevent="onNavClick('protocol-changes')">#</a>
            </div>

            <h3>Added WebSocket operations</h3>
            <p>Three authenticated WebSocket operations were added for QXP-PHANTOM:</p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Opcode</th><th>Name</th><th>Request</th><th>Response</th></tr></thead>
                <tbody>
                  <tr><td>36</td><td>Publish prekey</td><td>a prekey bundle</td><td><code>{ "ok": true, "version": 1 }</code></td></tr>
                  <tr><td>37</td><td>Fetch prekeys</td><td><code>{ "usernames": ["..."] }</code></td><td><code>{ "bundles": { "user": bundle } }</code></td></tr>
                  <tr><td>39</td><td>Update blocks</td><td><code>{ "add": ["&lt;hex64&gt;"], "remove": ["&lt;hex64&gt;"] }</code></td><td><code>{ "filter": ["&lt;hex64&gt;"] }</code></td></tr>
                </tbody>
              </table>
            </div>
            <p>
              All three require an identified session and follow the existing <code>respond_error(state, sid, op, message, request_id)</code> error
              pattern with static messages.
            </p>

            <h3>Opcode renumbering versus the specification</h3>
            <p>
              The design specification assigned PHANTOM the opcodes 36, 37, and 45. In the shipped code, opcode 45 was already occupied by moderation
              (kick), so block updates use 39. Prekey publish and fetch keep their specification opcodes.
            </p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Concept</th><th>Specification opcode</th><th>Shipped opcode</th></tr></thead>
                <tbody>
                  <tr><td>Publish prekey</td><td>36</td><td>36</td></tr>
                  <tr><td>Fetch prekeys</td><td>37</td><td>37</td></tr>
                  <tr><td>Update blocks</td><td>45</td><td>39</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Default room</h3>
            <p>
              A single default room record was added so the server can offer an onboarding or announcement room. The record is stored in the
              <code>default_room</code> table with a fixed row id of 1 and contains <code>roomId</code>, <code>roomKey</code>, and <code>title</code>.
            </p>
            <ul class="doc-bullets">
              <li>Admin endpoint: <code>POST /api/admin/default-room</code> with <code>{ roomId, roomKey, title }</code> or <code>{ clear: true }</code>.</li>
              <li>The identification response (opcode 2) includes the record as <code>defaultRoom</code>.</li>
              <li>The client persists an <code>allowServerDefaultRoom</code> toggle and a per-room <code>defaultRoomLeavedRoomId</code> flag. The client auto-joins on identification unless the user disabled the behavior or already left that specific room.</li>
            </ul>

            <h3>Social blob</h3>
            <p>
              The encrypted roster sync was added as <code>GET /api/social/blob</code> and <code>PUT /api/social/blob</code>. The blob is an AES-256-GCM
              ciphertext produced by the client; the server only enforces the last-write-wins version and the 64 KiB size limit.
            </p>

            <h3>Post-quantum challenge migration</h3>
            <p>
              The anti-abuse PQC challenge was migrated from a hand implemented polynomial KEM to the audited <code>ml-kem</code> (RustCrypto) and
              <code>@noble/post-quantum</code> libraries. The wire fields changed from <code>{ tHex, rhoHex }</code> / <code>{ uHex, vHex }</code> to
              <code>{ ekHex }</code> / <code>{ ctHex }</code>. The server and client were updated together.
            </p>

            <h3>Gap report</h3>
            <p>
              The following table records where the threat model or the design document describes a mechanism that differs from what is shipped. These
              are intentional accuracy notes, not an indication that the implementation is silently weaker without review.
            </p>
            <div class="doc-table-wrap">
              <table>
                <thead><tr><th>Area</th><th>Design or threat model claim</th><th>Shipped implementation</th><th>Impact</th></tr></thead>
                <tbody>
                  <tr><td>Message encryption</td><td>MLS with X-Wing hybrid post-quantum (E8)</td><td>Room-key AES-256-GCM with ECDSA P-256 signatures (<code>QXDR-A256GCM-HKDFSHA256</code>), no MLS, no X-Wing</td><td>E2EE but not post-quantum and not MLS.</td></tr>
                  <tr><td>Rate-limiting nullifier</td><td>Zero-knowledge RLN (E5)</td><td>HMAC-signed anonymous quota tokens and SHA-256 nullifiers</td><td>Anonymous and replay-resistant, but not zero-knowledge in the SNARK sense.</td></tr>
                  <tr><td>Privacy Pass redemption</td><td>Implemented (S1, E7)</td><td>Route and nonce store wired, but VOPRF verification is a stub that always fails</td><td>The <code>pass</code> deposit gate is currently unusable.</td></tr>
                  <tr><td>Contextual pseudonym</td><td>Ed25519 derived per room (P3)</td><td>ECDSA P-256 derived per room</td><td>Same domain separation property, different curve.</td></tr>
                  <tr><td>Inner envelope sealing</td><td>MLS / X-Wing inner layer (P4)</td><td>ML-KEM-768 plus AES-256-GCM, no second MLS layer</td><td>Envelopes are sealed to the recipient and opaque to the server.</td></tr>
                  <tr><td>Deposit gate</td><td>Pass, cap, or ghost token</td><td>Anonymous quota nullifier plus one of pass or cap</td><td>One additional anonymous gate is always required. The ghost gate was removed.</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Audit items integrated</h3>
            <p>Several audit items are present in the implementation:</p>
            <ul class="doc-bullets">
              <li>The VDF challenge signature covers <code>expiresAt</code> in addition to the other fields (S2).</li>
              <li>VDF parameters are length-bounded before parsing into large integers (S3).</li>
              <li>Nullifier and target-hash comparisons use constant-time checks (S4).</li>
              <li>Device and contextual signatures use ECDSA P-256 rather than Ed25519 (C3).</li>
            </ul>
          </article>

          <!-- GitBook Previous / Next Footer Navigation Cards -->
          <div class="gitbook-page-nav">
            <button 
              v-if="prevSection" 
              class="page-nav-card page-nav-prev" 
              @click="onNavClick(prevSection.id)"
            >
              <span class="nav-direction">← Previous</span>
              <span class="nav-title">{{ prevSection.label }}</span>
            </button>
            <div v-else></div>

            <button 
              v-if="nextSection" 
              class="page-nav-card page-nav-next" 
              @click="onNavClick(nextSection.id)"
            >
              <span class="nav-direction">Next →</span>
              <span class="nav-title">{{ nextSection.label }}</span>
            </button>
          </div>

        </div>
      </main>

      <aside class="gitbook-toc">
        <div class="toc-inner">
          <div class="toc-title">ON THIS PAGE</div>
          <ul class="toc-list">
            <li v-for="item in flatNavItems" :key="item.id">
              <a 
                :href="'#' + item.id" 
                class="toc-link" 
                :class="{ active: activeSection === item.id }"
                @click.prevent="onNavClick(item.id)"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>

          <hr class="toc-divider" />

          <div class="toc-actions">
            <a href="https://discord.wf/qxchat" target="_blank" rel="noopener" class="toc-action-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Ask community on Discord</span>
            </a>
          </div>
        </div>
      </aside>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

useHead({
  title: 'Handbook & Documentation | QxChat',
  meta: [
    { name: 'description', content: 'Explore the QxChat philosophy, zero-logs E2EE architecture, self-hosting model, and open-source stack.' }
  ]
})

const searchQuery = ref('')
const isMobileSidebarOpen = ref(false)
const activeSection = ref('why-qxchat-exists')

const navGroups = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'why-qxchat-exists', label: 'Why QxChat exists' }
    ]
  },
  {
    title: 'ARCHITECTURE',
    items: [
      { id: 'how-it-works', label: 'How it works' }
    ]
  },
  {
    title: 'ENGINEERING',
    items: [
      { id: 'the-technology', label: 'The technology' }
    ]
  },
  {
    title: 'OPEN SOURCE & COMMUNITY',
    items: [
      { id: 'open-source', label: 'Open source, always' },
      { id: 'join-community', label: 'Join the community' }
    ]
  },
  {
    title: 'TECHNICAL REFERENCE',
    items: [
      { id: 'architecture', label: 'Architecture' },
      { id: 'authentication', label: 'Account Authentication' },
      { id: 'signature-protocol', label: 'Client Signature Protocol' },
      { id: 'message-transport', label: 'Message Transport' },
      { id: 'phantom-protocol', label: 'QXP-PHANTOM Protocol' },
      { id: 'crypto-primitives', label: 'Cryptographic Primitives' },
      { id: 'anti-abuse', label: 'Anti-Abuse' },
      { id: 'protocol-changes', label: 'Changelog & Gap Report' }
    ]
  }
]

const flatNavItems = computed(() => {
  return navGroups.flatMap(g => g.items)
})

const filteredNavGroups = computed(() => {
  if (!searchQuery.value.trim()) return navGroups
  const q = searchQuery.value.toLowerCase()
  return navGroups
    .map(g => ({
      title: g.title,
      items: g.items.filter(i => i.label.toLowerCase().includes(q))
    }))
    .filter(g => g.items.length > 0)
})

const currentSectionLabel = computed(() => {
  const found = flatNavItems.value.find(i => i.id === activeSection.value)
  return found ? found.label : 'Documentation'
})

const currentIndex = computed(() => {
  return flatNavItems.value.findIndex(i => i.id === activeSection.value)
})

const prevSection = computed(() => {
  if (currentIndex.value > 0) {
    return flatNavItems.value[currentIndex.value - 1]
  }
  return null
})

const nextSection = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < flatNavItems.value.length - 1) {
    return flatNavItems.value[currentIndex.value + 1]
  }
  return null
})

const onNavClick = (id: string) => {
  activeSection.value = id
  isMobileSidebarOpen.value = false
  if (typeof window !== 'undefined') {
    if (history.pushState) {
      history.pushState(null, '', '#' + id)
    }
    const lenis = (window as any).lenis
    const el = document.getElementById(id)
    if (el) {
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(el, {
          offset: -100,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        const offset = 100
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = el.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }
}

// Scrollspy
const handleScroll = () => {
  if (typeof window === 'undefined') return
  const scrollPos = window.scrollY + 140
  for (const item of flatNavItems.value) {
    const el = document.getElementById(item.id)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPos >= top && scrollPos < top + height) {
        activeSection.value = item.id
      }
    }
  }
}

const isMac = ref(false)

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    const input = document.querySelector('.search-input') as HTMLInputElement
    if (input) input.focus()
  }
}

onMounted(() => {
  isMac.value = navigator.platform.toUpperCase().includes('MAC')
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  if (window.location.hash) {
    const hash = window.location.hash.substring(1)
    if (flatNavItems.value.some(i => i.id === hash)) {
      activeSection.value = hash
      setTimeout(() => {
        onNavClick(hash)
      }, 300)
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.page-wiki-gitbook {
  min-height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
  padding-top: 85px;
}

.gitbook-layout {
  display: grid;
  grid-template-columns: 280px 1fr 240px;
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

.gitbook-sidebar {
  position: sticky;
  top: 100px;
  height: calc(100vh - 120px);
  overflow: hidden;
  padding-right: 1.25rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
}

.sidebar-header {
  flex-shrink: 0;
}

.sidebar-search {
  flex-shrink: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.close-sidebar-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
}

/* Search input */
.sidebar-search {
  margin-bottom: 1.5rem;
}

.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--text-secondary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 9px 36px 9px 36px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 0.88rem;
  color: var(--text-color);
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.search-input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(28, 113, 216, 0.15);
}

.search-kbd {
  position: absolute;
  right: 10px;
  font-size: 0.7rem;
  padding: 2px 6px;
  background: var(--surface-raised);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-secondary);
  font-weight: 600;
  pointer-events: none;
}

/* Navigation Groups */
.sidebar-nav {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  padding-right: 0.5rem;
  margin-right: -0.5rem;
  scrollbar-width: thin;
  scrollbar-color: var(--border-strong, var(--border-color)) transparent;
}

.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: var(--border-strong, var(--border-color));
  border-radius: 999px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: var(--blue-400, var(--accent-color));
}

.nav-group {
  margin-bottom: 1.75rem;
}

.group-title {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  margin-bottom: 0.6rem;
  padding-left: 10px;
  text-transform: uppercase;
}

.group-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 0.88rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.nav-link:hover {
  color: var(--text-color);
  background: var(--bg-secondary);
  transform: translateX(3px);
}

.nav-link.active {
  color: var(--accent-color);
  background: rgba(28, 113, 216, 0.08);
  font-weight: 700;
}

.nav-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 3px;
  border-radius: 3px;
  background: var(--accent-color);
}

.sidebar-footer {
  flex-shrink: 0;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar-footer-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.84rem;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 8px;
  transition: color 0.2s, background-color 0.2s;
}

.sidebar-footer-link:hover {
  color: var(--text-color);
  background: var(--bg-secondary);
}

.gitbook-main {
  min-width: 0;
  padding: 0.5rem 0;
}

.article-inner {
  max-width: 780px;
}

.gitbook-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.crumb-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.crumb-link:hover {
  color: var(--accent-color);
}

.crumb-sep {
  opacity: 0.4;
}

.crumb-current {
  color: var(--text-color);
  font-weight: 600;
}

.article-header {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 3rem;
}

.article-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--accent-color);
  background: rgba(28, 113, 216, 0.08);
  border: 1px solid rgba(28, 113, 216, 0.2);
  padding: 3px 10px;
  border-radius: 50px;
  margin-bottom: 0.85rem;
}

.article-title {
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.12;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.article-lead {
  font-size: 1.18rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 1.25rem;
}

/* Chapters */
.doc-chapter {
  padding-bottom: 3.5rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 3.5rem;
}

.chapter-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.25rem;
}

.doc-chapter h2 {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-color);
  margin: 0;
}

.heading-anchor {
  color: var(--text-secondary);
  text-decoration: none;
  opacity: 0;
  transition: opacity 0.2s, color 0.2s;
  font-weight: 400;
  font-size: 1.2rem;
}

.doc-chapter:hover .heading-anchor {
  opacity: 0.6;
}

.heading-anchor:hover {
  opacity: 1 !important;
  color: var(--accent-color);
}

.doc-chapter p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
}

.doc-chapter h3 {
  font-size: 1.28rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--text-color);
  margin: 2.4rem 0 0.9rem;
}

.doc-chapter h4 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 1.6rem 0 0.6rem;
}

.doc-chapter p code,
.doc-chapter li code,
.doc-chapter td code {
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  font-size: 0.82em;
  background: var(--surface-raised);
  padding: 2px 6px;
  border-radius: 5px;
  color: var(--accent-color);
}

.doc-table-wrap {
  overflow-x: auto;
  margin: 1.5rem 0 2rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
}

.doc-table-wrap table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.doc-table-wrap th {
  text-align: left;
  font-weight: 700;
  color: var(--text-color);
  padding: 0.85rem 1rem;
  background: var(--surface-raised);
  border-bottom: 1px solid var(--border-color);
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
}

.doc-table-wrap td {
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
  vertical-align: top;
  line-height: 1.6;
}

.doc-table-wrap tr:last-child td {
  border-bottom: none;
}

.doc-table-wrap td code {
  font-size: 0.78em;
  color: var(--accent-color);
}

.doc-code-block {
  background: #0d1117;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0 2rem;
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.doc-code-block pre {
  margin: 0;
}

.doc-code-block code {
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  font-size: 0.85rem;
  line-height: 1.7;
  color: #e6edf3;
  white-space: pre;
}

.doc-bullets {
  list-style: none;
  padding: 0;
  margin: 0 0 1.2rem;
}

.doc-bullets li {
  position: relative;
  padding: 0.35rem 0 0.35rem 1.5rem;
  color: var(--text-secondary);
  line-height: 1.65;
  font-size: 0.98rem;
}

.doc-bullets li::before {
  content: "›";
  position: absolute;
  left: 0.3rem;
  color: var(--accent-color);
  font-weight: 700;
}

.doc-bullets li code {
  font-size: 0.82em;
  background: var(--surface-raised);
  padding: 2px 6px;
  border-radius: 5px;
  color: var(--accent-color);
}

.highlight-p {
  color: var(--text-color) !important;
  font-size: 1.12rem !important;
}

.gitbook-callout {
  display: flex;
  gap: 16px;
  padding: 1.4rem 1.6rem;
  border-radius: 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  margin: 2rem 0;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
}

.gitbook-callout--highlight {
  border-left: 4px solid var(--accent-color);
  background: rgba(28, 113, 216, 0.04);
}

.gitbook-callout--highlight .callout-icon {
  color: var(--accent-color);
}

.gitbook-callout--info {
  border-left: 4px solid #10b981;
  background: rgba(16, 185, 129, 0.04);
}

.gitbook-callout--info .callout-icon {
  color: #10b981;
}

.gitbook-callout--quote {
  border-left: 4px solid var(--border-color);
  background: var(--surface-raised);
  font-style: italic;
}

.callout-icon {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.callout-body {
  flex: 1;
}

.callout-body strong {
  display: block;
  font-size: 1.02rem;
  color: var(--text-color);
  margin-bottom: 0.35rem;
}

.callout-body p {
  margin: 0 !important;
  font-size: 0.95rem !important;
  line-height: 1.65 !important;
  color: var(--text-color) !important;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;
}

.comp-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 1.75rem 1.6rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.comp-card:hover {
  transform: translateY(-3px);
}

.comp-card--bad {
  border-top: 3px solid #ef4444;
  background: rgba(239, 68, 68, 0.02);
}

.comp-card--good {
  border-top: 3px solid #10b981;
  background: rgba(16, 185, 129, 0.03);
}

.comp-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 1.25rem;
}

.comp-cross {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 800;
}

.comp-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 0.8rem;
  font-weight: 800;
}

.comp-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comp-card li {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2.2rem 0;
}

.step-row {
  display: flex;
  gap: 1.25rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.4rem 1.6rem;
  align-items: flex-start;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
}

.step-row:hover {
  transform: translateX(4px);
  border-color: var(--accent-color);
}

.step-num {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent-color);
  color: #ffffff;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(28, 113, 216, 0.3);
}

.step-info h4 {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-color);
  margin: 0 0 0.4rem;
}

.step-info p {
  margin: 0 !important;
  font-size: 0.94rem !important;
  color: var(--text-secondary) !important;
  line-height: 1.6 !important;
}

.tech-stack-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin: 2rem 0;
}

.tech-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.6rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong, var(--border-color));
}

.tech-card-header {
  margin-bottom: 0.75rem;
}

.tech-pill {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.tech-pill--vue { background: rgba(66, 184, 131, 0.15); color: #42b883; }
.tech-pill--tauri { background: rgba(36, 200, 219, 0.15); color: #24c8db; }
.tech-pill--rust { background: rgba(234, 88, 12, 0.15); color: #ea580c; }
.tech-pill--webrtc { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }

.tech-card h4 {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-color);
  margin: 0;
}

.tech-card p {
  margin: 0 !important;
  font-size: 0.92rem !important;
  color: var(--text-secondary) !important;
  line-height: 1.55 !important;
}

/* CTA Actions */
.cta-actions-box {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 2.5rem;
}

.discord-btn {
  background: #5865F2 !important;
  color: #ffffff !important;
  border-color: #5865F2 !important;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* Bento Pill Buttons */
.bento-pill-btn {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--text-color);
  border-radius: 50px;
  padding: 0 0.45rem 0 1.6rem;
  height: 54px;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--bg-secondary);
  background: var(--text-color);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.bento-pill-btn span { margin-right: 1.25rem; }

.bento-pill-btn .pill-icon {
  background: var(--bg-secondary);
  color: var(--text-color);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, background-color 0.3s, color 0.3s;
}

.bento-pill-btn:hover {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: #ffffff;
}

.bento-pill-btn:active {
  transform: scale(0.96);
}

.bento-pill-btn:hover .pill-icon {
  background: #ffffff;
  color: var(--accent-color);
}

.bento-pill-btn:active .pill-icon {
  transform: scale(0.92);
}

.hero-secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 1.8rem;
  height: 54px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.hero-secondary-btn:hover {
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.hero-secondary-btn:active {
  transform: scale(0.96);
}

/* Page Nav Cards (Previous / Next) */
.gitbook-page-nav {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 3.5rem;
}

.page-nav-card {
  flex: 1;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.4rem 1.6rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
}

.page-nav-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.page-nav-card:active {
  transform: scale(0.98);
}

.page-nav-next {
  text-align: right;
}

.nav-direction {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  margin-bottom: 0.35rem;
}

.nav-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-color);
}

.gitbook-toc {
  position: sticky;
  top: 100px;
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding-left: 0.75rem;
}

.toc-inner {
  display: flex;
  flex-direction: column;
}

.toc-title {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  margin-bottom: 0.85rem;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toc-link {
  font-size: 0.86rem;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 4px 0 4px 10px;
  display: block;
  border-left: 2px solid transparent;
  transition: all 0.2s ease;
}

.toc-link:hover {
  color: var(--text-color);
}

.toc-link.active {
  color: var(--accent-color);
  border-left-color: var(--accent-color);
  font-weight: 700;
}

.toc-divider {
  border: none;
  height: 1px;
  background: var(--border-color);
  margin: 1.5rem 0;
}

.toc-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toc-action-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.toc-action-link:hover {
  color: var(--accent-color);
}

/* Mobile top subnav */
.mobile-top-subnav {
  display: none;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  justify-content: space-between;
}

.mobile-menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-color);
  background: none;
  border: none;
  cursor: pointer;
}

.active-topic-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent-color);
  background: rgba(28, 113, 216, 0.1);
  padding: 3px 8px;
  border-radius: 6px;
}

@media (max-width: 1024px) {
  .gitbook-layout {
    grid-template-columns: 240px 1fr;
  }
  .gitbook-toc {
    display: none;
  }
}

@media (max-width: 768px) {
  .gitbook-layout {
    grid-template-columns: 1fr;
    padding: 0 1rem 4rem;
  }

  .mobile-top-subnav {
    display: flex;
  }

  .gitbook-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    height: 100vh;
    background: var(--bg-secondary);
    z-index: 10000;
    padding: 1.5rem;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .gitbook-sidebar.sidebar-open {
    transform: translateX(0);
  }

  .close-sidebar-btn {
    display: block;
    margin-left: auto;
  }

  .comparison-grid,
  .tech-stack-cards {
    grid-template-columns: 1fr;
  }

  .gitbook-page-nav {
    flex-direction: column;
  }
}
</style>