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
  overflow-y: auto;
  padding-right: 1.25rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
}

.gitbook-sidebar::-webkit-scrollbar {
  width: 4px;
}

.gitbook-sidebar::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
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
  padding-top: 1.25rem;
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