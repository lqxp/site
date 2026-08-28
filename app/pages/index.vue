<template>
  <div class="page-index">
    <section class="hero hero-bento">
      <div class="bento-container">

        <!-- Bento Item 1: Main Title & CTA (Transparent) -->
        <div class="bento-title-card">
          <h1 class="hero-title reveal-text">
            <span class="motion-line"><span class="motion-text">Your server.</span></span><br />
            <span class="motion-line"><span class="motion-text">Your rules.</span></span>
          </h1>
          <p class="title-desc">
            <span class="motion-line"><span class="motion-text">Private rooms, client-side E2EE encryption, and seamless voice & video calls.</span></span><br />
            <span class="motion-line"><span class="motion-text">Host your own infrastructure with ultra-lightweight apps across every desktop and mobile OS.</span></span>
          </p>
          <div class="hero-actions-row">
            <NuxtLink to="/download" class="bento-pill-btn reveal-text-delay">
              <span>Download QxChat</span>
              <div class="pill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
            </NuxtLink>

            <a href="https://qxch.at/app" target="_blank" rel="noopener" class="hero-secondary-btn">
              Open Web App
            </a>
          </div>
        </div>

        <!-- Bento Item 2: Large Visual App Showcase -->
        <div class="bento-item bento-image-large reveal-text-delay">
          <div class="image-bg-rect"></div>
          <img src="/assets/marketing/overview_white.png" alt="QxChat Desktop Client" class="showcase-cover-img" />
          <div class="bento-overlay">
            <div class="overlay-text">
              <h3>Desktop & Mobile Client</h3>
              <p>Built with Tauri v2, Vue 3 & Rust</p>
            </div>
          </div>
        </div>

        <!-- Bento Item 3: Multi-Platform (Floating 3D OS Badges) -->
        <NuxtLink to="/download" class="bento-item bento-boutique bento-os-card reveal-text-delay">
          <div class="floating-os-container" aria-hidden="true">
            <div class="os-badge os-badge--win" v-html="iconWindows"></div>
            <div class="os-badge os-badge--apple" v-html="iconMacos"></div>
            <div class="os-badge os-badge--linux" v-html="iconLinux"></div>
            <div class="os-badge os-badge--android" v-html="iconAndroid"></div>
          </div>

          <div class="card-bottom-wrap">
            <h3>Multi-<br />Platform</h3>
            <div class="card-bottom-row">
              <p>Windows · macOS<br />Linux · Mobile</p>
              <div class="bento-circle-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Bento Item 4: Documentation & Wiki -->
        <NuxtLink to="/wiki" class="bento-item bento-community reveal-text-delay">
          <div class="floating-docs-container" aria-hidden="true">
            <div class="doc-icon-badge doc-badge--1">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <div class="doc-icon-badge doc-badge--2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <div class="doc-icon-badge doc-badge--3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>

          <div class="card-bottom-wrap">
            <h3>Documentation</h3>
            <div class="card-bottom-row">
              <p>Guides, Clients & APIs</p>
              <div class="bento-circle-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Bento Item 5: GitHub Organization -->
        <a href="https://github.com/lqxp" target="_blank" rel="noopener" class="bento-item bento-wiki reveal-text-delay">
          <div class="bento-top-badge">
            <div class="large-brand-icon large-brand-icon--github">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
              </svg>
            </div>
          </div>
          <div class="card-bottom-wrap">
            <h3>GitHub</h3>
            <div class="card-bottom-row">
              <p>100% Free & Open Source MIT</p>
              <div class="bento-circle-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </a>

        <!-- Bento Item 6: Community Discord -->
        <a href="https://discord.wf/qxchat" target="_blank" rel="noopener" class="bento-item bento-stats reveal-text-delay">
          <div class="bento-top-badge">
            <div class="large-brand-icon large-brand-icon--discord">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
          </div>
          <div class="card-bottom-wrap">
            <h3>Discord</h3>
            <div class="card-bottom-row">
              <p>Join official community chat</p>
              <div class="bento-circle-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </a>

      </div>
    </section>

    <div class="slide-content-wrapper">

      <!-- Feature Banner Section -->
      <section id="features" class="feature-section">
        <div class="container" style="max-width: 900px; margin: 0 auto; text-align: center;">
          <span class="section-tag-eyebrow">Privacy By Design</span>
          <h2 class="feature-heading">
            Your private messaging starts here.
          </h2>
          <p class="feature-text">
            QxChat is built on the core belief that communication tools should be transparent, self-hosted, and free from centralized telemetry. Experience instant message relays, end-to-end encrypted rooms, and crystal-clear WebRTC audio & video.
          </p>
        </div>
      </section>

      <!-- Redesigned High-End Mobile Demo Showcase -->
      <section class="mobile-showcase-section">
        <div class="container mobile-showcase-container">
          <div class="mobile-showcase-left">
            <span class="section-tag-eyebrow">Mobile Experience</span>
            <h2 class="mobile-showcase-title">
              Fast. Lightweight.<br />Everywhere you go.
            </h2>
            <p class="mobile-showcase-desc">
              Experience instant encrypted message relays, low-latency push notifications, and clear WebRTC voice & video calls directly on your phone.
            </p>

            <div class="mobile-feature-pills">
              <div class="mobile-pill">
                <div class="pill-dot"></div>
                <span>Zero Metadata Logging</span>
              </div>
              <div class="mobile-pill">
                <div class="pill-dot"></div>
                <span>Ultra-Low Battery & RAM Consumption</span>
              </div>
              <div class="mobile-pill">
                <div class="pill-dot"></div>
                <span>Native Android APK & iOS Web App</span>
              </div>
            </div>

            <div style="margin-top: 2rem;">
              <NuxtLink to="/download" class="bento-pill-btn">
                <span>Download Mobile App</span>
                <div class="pill-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Centered Realistic Smartphone Frame (No Black Letterboxing) -->
          <div class="mobile-phone-wrapper">
            <div class="smartphone-frame">
              <!-- <div class="smartphone-island"></div> -->
              <div class="smartphone-screen">
                <video src="/assets/mobile_demo.mp4" autoplay muted loop playsinline disablePictureInPicture disableremoteplayback class="smartphone-video"></video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4 Showcase Cards Grid -->
      <section class="showcase-section">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 3.5rem;">
            <span class="section-tag-eyebrow">Client Features</span>
            <h2 style="font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800; color: var(--text-color); margin-bottom: 0.75rem;">
              Everything in one unified client.
            </h2>
            <p style="color: var(--text-secondary); font-size: 1.05rem;">
              Native performance on desktop and mobile powered by Tauri v2 and Vue 3.
            </p>
          </div>

          <div class="showcase-grid">
            <div class="showcase-card">
              <div class="showcase-card__img-wrap">
                <img src="/assets/marketing/overview_black.png" alt="Text Rooms" />
              </div>
              <div class="showcase-card__content">
                <h3>Private Text Rooms</h3>
                <p>Organize discussions into distinct rooms with custom member roles and isolated E2EE encryption keys.</p>
              </div>
            </div>

            <div class="showcase-card">
              <div class="showcase-card__img-wrap">
                <img src="/assets/marketing/stream_black.png" alt="Voice and Video Streaming" />
              </div>
              <div class="showcase-card__content">
                <h3>WebRTC Calls & Screen Share</h3>
                <p>Encrypted audio, high-definition video, and screen sharing directly inside the same window as your text.</p>
              </div>
            </div>

            <div class="showcase-card">
              <div class="showcase-card__img-wrap">
                <img src="/assets/marketing/markdown_dark.png" alt="Quick Writing and Markdown" />
              </div>
              <div class="showcase-card__content">
                <h3>Markdown & Media Sharing</h3>
                <p>Full GitHub Flavored Markdown support, syntax highlighting for code, and frictionless file attachments.</p>
              </div>
            </div>

            <div class="showcase-card">
              <div class="showcase-card__img-wrap">
                <img src="/assets/marketing/stream_white.png" alt="Desktop and Mobile Experience" />
              </div>
              <div class="showcase-card__content">
                <h3>Native Lightweight Apps</h3>
                <p>Powered by Tauri v2 with zero Electron overhead. Instant startup and minimal RAM consumption.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Performance Benchmarks -->
      <section ref="benchSectionRef" class="capabilities-section" :class="{ 'is-bench-visible': isBenchVisible }">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">

          <div class="bench-header-wrap">
            <span class="section-tag-eyebrow">Performance Benchmarks</span>
            <h2 class="bench-main-heading">
              While others ship Chromium, we ship code.
            </h2>
            <p class="bench-main-desc">
              Electron apps ship an entire web browser just to render a chat window. QxChat uses your system's native WebView, so you get the features without the bloat.
            </p>
          </div>

          <!-- Row 1: RAM -->
          <div class="bench-row-alt">
            <div class="bench-chart-side">
              <div class="bench-bars-container">
                <div class="bench-bar-row bench-bar-row--qx">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">QxChat</span>
                    <span class="bench-bar-val bench-bar-val--accent">~45 MB</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill bench-bar-fill--qx" style="--bar-width: 7%;"></div>
                  </div>
                </div>
                <div class="bench-bar-row">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">Element</span>
                    <span class="bench-bar-val">~300 MB</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill" style="--bar-width: 46%;"></div>
                  </div>
                </div>
                <div class="bench-bar-row">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">Slack</span>
                    <span class="bench-bar-val">~500 MB</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill" style="--bar-width: 77%;"></div>
                  </div>
                </div>
                <div class="bench-bar-row">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">Discord</span>
                    <span class="bench-bar-val">~600 MB</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill" style="--bar-width: 100%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bench-text-side">
              <span class="bench-row-tag bench-row-tag--green">13x less RAM</span>
              <h3 class="bench-row-title">~45 MB of RAM.</h3>
              <p class="bench-row-desc">
                Discord uses about 600 MB just sitting there. Slack needs 500 MB to show you a notification dot. We do the same thing at 45 MB. With E2EE, voice, video, and file sharing included. Turns out you don't need an entire Chromium instance to display text messages.
              </p>
              <span class="bench-row-note">Measured idle with 5 encrypted rooms connected, Windows 11.</span>
            </div>
          </div>

          <!-- Row 2: Binary Size -->
          <div class="bench-row-alt bench-row-alt--reverse">
            <div class="bench-text-side">
              <span class="bench-row-tag bench-row-tag--blue">30x smaller</span>
              <h3 class="bench-row-title">~6 MB installer.</h3>
              <p class="bench-row-desc">
                The Element installer is 183 MB. Slack is 146 MB. Discord is 139 MB. For chat apps. QxChat ships at 6 MB because we don't bundle a copy of Google Chrome inside every download. Revolutionary concept, apparently.
              </p>
              <span class="bench-row-note">Standalone .msi installer, no runtime dependencies.</span>
            </div>

            <div class="bench-chart-side">
              <div class="bench-bars-container">
                <div class="bench-bar-row bench-bar-row--qx">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">QxChat</span>
                    <span class="bench-bar-val bench-bar-val--accent">~6 MB</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill bench-bar-fill--qx" style="--bar-width: 3%;"></div>
                  </div>
                </div>
                <div class="bench-bar-row">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">Discord</span>
                    <span class="bench-bar-val">139 MB</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill" style="--bar-width: 76%;"></div>
                  </div>
                </div>
                <div class="bench-bar-row">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">Slack</span>
                    <span class="bench-bar-val">146 MB</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill" style="--bar-width: 80%;"></div>
                  </div>
                </div>
                <div class="bench-bar-row">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">Element</span>
                    <span class="bench-bar-val">183 MB</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill" style="--bar-width: 100%;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 3: Cold Launch -->
          <div class="bench-row-alt">
            <div class="bench-chart-side">
              <div class="bench-bars-container">
                <div class="bench-bar-row bench-bar-row--qx">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">QxChat</span>
                    <span class="bench-bar-val bench-bar-val--accent">~0.3s</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill bench-bar-fill--qx" style="--bar-width: 7%;"></div>
                  </div>
                </div>
                <div class="bench-bar-row">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">Element</span>
                    <span class="bench-bar-val">~2.8s</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill" style="--bar-width: 67%;"></div>
                  </div>
                </div>
                <div class="bench-bar-row">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">Discord</span>
                    <span class="bench-bar-val">~3.5s</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill" style="--bar-width: 83%;"></div>
                  </div>
                </div>
                <div class="bench-bar-row">
                  <div class="bench-bar-label">
                    <span class="bench-bar-name">Slack</span>
                    <span class="bench-bar-val">~4.2s</span>
                  </div>
                  <div class="bench-bar-track">
                    <div class="bench-bar-fill" style="--bar-width: 100%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bench-text-side">
              <span class="bench-row-tag bench-row-tag--orange">14x faster</span>
              <h3 class="bench-row-title">Open in 0.3 seconds.</h3>
              <p class="bench-row-desc">
                Click the icon, you're in. No splash screen, no loading animation pretending to do something, no "checking for updates" loop. Slack takes over 4 seconds to cold launch. That's enough time to lose interest entirely.
              </p>
              <span class="bench-row-note">Cold start from icon click to interactive UI, Windows 11.</span>
            </div>
          </div>

        </div>
      </section>

      <section id="contributors" class="contributors-row-section">
        <div class="container" style="max-width: 900px; margin: 0 auto; text-align: center;">

          <span class="section-tag-eyebrow">Open Source Contributors</span>
          <h2 class="contributors-row-title">
            Contributors
          </h2>
          <p class="contributors-row-desc">
            Organized across all official repositories (app, client, lqxp, qxchat.ts, site). Ranked by commits.
          </p>

          <div class="contributors-avatars-track">
            <a
              v-for="c in topContributors"
              :key="c.login"
              :href="c.html_url || `https://github.com/${c.login}`"
              target="_blank"
              rel="noopener"
              class="contributor-avatar-pill"
              :aria-label="`${c.login} (${c.contributions} commits)`"
            >
              <div class="avatar-ring">
                <img :src="c.avatar_url" :alt="c.login" class="contributor-img" loading="lazy" />
              </div>
              <div class="contributor-tooltip">
                <span class="tooltip-name">{{ c.login }}</span>
                <span class="tooltip-commits">{{ c.contributions.toLocaleString() }} commits</span>
              </div>
            </a>

            <!-- +N overflow bubble if more than 10 contributors -->
            <a
              v-if="extraCount > 0"
              href="https://github.com/lqxp"
              target="_blank"
              rel="noopener"
              class="contributor-avatar-pill contributor-avatar-pill--more"
              :aria-label="`+${extraCount} more contributors on GitHub`"
            >
              <div class="avatar-ring avatar-ring--more">
                <span>+{{ extraCount }}</span>
              </div>
              <div class="contributor-tooltip">
                <span class="tooltip-name">+{{ extraCount }} more</span>
                <span class="tooltip-commits">View all on GitHub</span>
              </div>
            </a>
          </div>

          <!-- Thank You & Stars Appreciation Pill -->
          <div class="contributors-thank-you">
            <div class="thank-you-pill">
              <div class="thank-you-icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake-icon lucide-heart-handshake"><path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/></svg>
              </div>
              <div class="thank-you-content">
                <p class="thank-you-text">
                  A massive <strong>thank you</strong> to all contributors who build and improve QxChat, and to our community for the
                  <a href="https://github.com/lqxp" target="_blank" rel="noopener" class="thank-you-stars-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>{{ githubStats?.stars || 24 }} stars</span>
                  </a>
                  across all our repositories!
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Community & Support Banner -->
      <section class="how-to-section">
        <div class="support-banner">
          <div class="support-content">
            <h2>Need help or have questions?</h2>
            <h4 class="support-subtitle">WE'RE ALWAYS HERE TO HELP</h4>
            <p>
              Whether you're deploying a server, reporting an issue, or contributing to the codebase, join our growing community on Discord or open an issue on GitHub.
            </p>
            <div class="support-actions-row">
              <a href="https://github.com/lqxp/app/issues" target="_blank" rel="noopener" class="btn-primary support-btn" style="display: inline-flex; align-items: center; gap: 10px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
                <span>Open GitHub Issue</span>
              </a>
              <a href="https://discord.wf/qxchat" target="_blank" rel="noopener" class="btn-secondary" style="color: white; border-color: rgba(255,255,255,0.4); display: inline-flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Join Discord Community</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import iconWindows from '~/assets/svgs/windows.svg?raw'
import iconMacos from '~/assets/svgs/macos.svg?raw'
import iconLinux from '~/assets/svgs/linux.svg?raw'
import iconAndroid from '~/assets/svgs/android.svg?raw'

useHead({
  title: 'QxChat | Private, Self-Hosted & Multi-Platform Messaging',
  meta: [
    { name: 'description', content: 'QxChat is an open-source, end-to-end encrypted messaging platform you host on your own server. Available on Windows, macOS, Linux, Android and iOS.' }
  ]
})

const benchSectionRef = ref<HTMLElement | null>(null)
const isBenchVisible = ref(false)
let benchObserver: IntersectionObserver | null = null

interface Contributor {
  login: string
  id: number
  avatar_url: string
  html_url: string
  contributions: number
}

interface GithubStats {
  stars: number
  reposCount: number
}

const { data: githubStats } = await useFetch<GithubStats>('/api/github-stats', {
  default: () => ({
    stars: 24,
    reposCount: 6
  })
})

const { data: rawContributors } = await useFetch<Contributor[]>('/api/contributors', {
  default: () => [
    {
      login: 'Kisakay',
      id: 53227802,
      avatar_url: 'https://avatars.githubusercontent.com/u/53227802?v=4',
      html_url: 'https://github.com/Kisakay',
      contributions: 1489
    },
    {
      login: 'sqlu',
      id: 81018697,
      avatar_url: 'https://avatars.githubusercontent.com/u/81018697?v=4',
      html_url: 'https://github.com/sqlu',
      contributions: 73
    },
    {
      login: 'im-nymii',
      id: 146101928,
      avatar_url: 'https://avatars.githubusercontent.com/u/146101928?v=4',
      html_url: 'https://github.com/im-nymii',
      contributions: 1
    }
  ]
})

const sortedContributors = computed(() => {
  if (!rawContributors.value || !Array.isArray(rawContributors.value)) return []
  return [...rawContributors.value].sort((a, b) => b.contributions - a.contributions)
})

const topContributors = computed(() => {
  return sortedContributors.value.slice(0, 10)
})

const extraCount = computed(() => {
  return Math.max(0, sortedContributors.value.length - 10)
})

onMounted(() => {
  if (import.meta.client) {
    if ((window as any).initSiteLogic) {
      (window as any).initSiteLogic()
    }

    if (benchSectionRef.value) {
      benchObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isBenchVisible.value = true
              if (benchObserver) benchObserver.disconnect()
            }
          })
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )
      benchObserver.observe(benchSectionRef.value)
    }
  }
})

onUnmounted(() => {
  if (benchObserver) {
    benchObserver.disconnect()
  }
})
</script>

<style scoped>
.page-index {
  position: relative;
  width: 100%;
  background: var(--bg-color);
}

.hero-bento {
  padding-top: 100px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rem;
  background-color: var(--bg-color);
  position: sticky;
  top: 0;
  z-index: 1;
}

.bento-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.25rem;
  max-width: 1300px;
  width: 95vw;
  margin: 0 auto;
}

.bento-item {
  border-radius: 30px;
  padding: 1.8rem;
  position: relative;
  overflow: hidden;
  background: var(--bg-secondary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--border-color);
}

.bento-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.08);
}

.bento-image-large:hover {
  transform: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

/* Title Card: 100% transparent */
.bento-title-card {
  grid-column: span 6;
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1.5rem 1.5rem 0;
}

.bento-title-card .hero-title {
  font-size: clamp(2.8rem, 6vw, 5rem);
  line-height: 1.05;
  letter-spacing: -0.05em;
  margin-bottom: 1rem;
  font-weight: 800;
}

.title-desc {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.55;
  margin-bottom: 2.2rem;
  max-width: 92%;
}

.hero-actions-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

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
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.bento-pill-btn:active {
  transform: scale(0.96);
}

.bento-pill-btn span {
  margin-right: 1.25rem;
}

.bento-pill-btn .pill-icon {
  background: var(--bg-secondary);
  color: var(--text-color);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, color 0.3s ease;
}

.bento-pill-btn:hover {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: #ffffff;
}

.bento-pill-btn:hover .pill-icon {
  background: #ffffff;
  color: var(--accent-color);
}

.hero-secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.8rem;
  height: 54px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color);
  background: var(--surface-raised);
  border: 1px solid var(--border-color);
  text-decoration: none;
  transition: background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.hero-secondary-btn:hover {
  background: var(--surface-hover);
  border-color: var(--accent-color);
}

/* Bento Image Large */
.bento-image-large {
  grid-column: span 6;
  padding: 0;
  min-height: 280px;
  max-height: 360px;
}

.image-bg-rect {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -20px;
  right: 0;
  background: linear-gradient(135deg, #0f1c2e 0%, #172a45 100%);
  border-radius: 30px;
  z-index: 0;
}

.showcase-cover-img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
}

.bento-overlay {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 2;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.overlay-text h3 {
  font-size: 1.35rem;
  margin-bottom: 0.2rem;
  font-weight: 800;
}

.overlay-text p {
  opacity: 0.85;
  font-size: 0.88rem;
}

/* Bento Bottom Cards (span 3) */
.bento-boutique,
.bento-community,
.bento-wiki,
.bento-stats {
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 220px;
  position: relative;
}

.floating-os-container {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 190px;
  height: 150px;
  pointer-events: none;
}

.os-badge {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.14);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}

.os-badge :deep(svg),
.os-badge svg {
  width: 32px;
  height: 32px;
}

.os-badge--win {
  right: 70px;
  top: 15px;
  width: 62px;
  height: 62px;
  background: linear-gradient(135deg, #0e2a47, #081a2e);
  color: #0088ff;
  border: 1px solid rgba(0, 136, 255, 0.35);
  transform: rotate(-12deg);
  z-index: 1;
}

.os-badge--apple {
  right: 8px;
  top: 0px;
  width: 66px;
  height: 66px;
  background: linear-gradient(135deg, #232833, #12151c);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.22);
  transform: rotate(14deg);
  z-index: 2;
}

.os-badge--linux {
  right: 50px;
  top: 55px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #33271d, #1c1510);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.35);
  transform: rotate(-4deg);
  z-index: 3;
}

.os-badge--android {
  right: -6px;
  top: 60px;
  width: 58px;
  height: 58px;
  background: linear-gradient(135deg, #103320, #091d12);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.35);
  transform: rotate(18deg);
  z-index: 4;
}

.bento-os-card:hover .os-badge--win {
  transform: rotate(-18deg) translate(-4px, -6px) scale(1.08);
  border-color: #0088ff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
}

.bento-os-card:hover .os-badge--apple {
  transform: rotate(20deg) translate(4px, -8px) scale(1.08);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
}

.bento-os-card:hover .os-badge--linux {
  transform: rotate(-8deg) translate(-2px, 6px) scale(1.08);
  border-color: #f59e0b;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
}

.bento-os-card:hover .os-badge--android {
  transform: rotate(24deg) translate(6px, 8px) scale(1.08);
  border-color: #22c55e;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
}

.floating-docs-container {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 170px;
  height: 140px;
  pointer-events: none;
}

.doc-icon-badge {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--surface-raised);
  border: 3px solid var(--bg-secondary);
  color: var(--text-color);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.doc-icon-badge svg {
  width: 32px;
  height: 32px;
}

.doc-badge--1 {
  right: 65px;
  top: 15px;
  width: 62px;
  height: 62px;
  z-index: 3;
}

.doc-badge--2 {
  right: 28px;
  top: 25px;
  width: 62px;
  height: 62px;
  z-index: 2;
}

.doc-badge--3 {
  right: -6px;
  top: 35px;
  width: 62px;
  height: 62px;
  z-index: 1;
}

.bento-community:hover .doc-badge--1 {
  transform: translateY(-6px) scale(1.06);
}
.bento-community:hover .doc-badge--2 {
  transform: translateY(-8px) scale(1.06);
}
.bento-community:hover .doc-badge--3 {
  transform: translateY(-4px) scale(1.06);
}

.bento-top-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  pointer-events: none;
}

.large-brand-icon {
  width: 76px;
  height: 76px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.large-brand-icon svg {
  width: 44px;
  height: 44px;
}

.large-brand-icon--github {
  background: #24292f;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.large-brand-icon--discord {
  background: #5865F2;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.bento-wiki:hover .large-brand-icon,
.bento-stats:hover .large-brand-icon {
  transform: scale(1.08) rotate(4deg);
}

.card-bottom-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.card-bottom-wrap h3 {
  font-size: 1.4rem;
  line-height: 1.15;
  margin-bottom: 0.4rem;
  font-weight: 800;
  color: var(--text-color);
}

.card-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  gap: 0.75rem;
}

.card-bottom-row p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.35;
  flex: 1;
  min-width: 0;
}

.bento-circle-btn {
  background: var(--surface-raised);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.bento-item:hover .bento-circle-btn {
  transform: scale(1.12) rotate(45deg);
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: #ffffff;
}

.bento-item:active .bento-circle-btn {
  transform: scale(0.92) rotate(45deg);
}

.slide-content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  background: var(--bg-color);
  border-top: 1px solid var(--border-color);
}

.feature-section {
  padding: 6rem 1.5rem 4rem;
  background-color: var(--bg-color);
  text-align: center;
}

.section-tag-eyebrow {
  display: inline-block;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-color);
  margin-bottom: 0.75rem;
}

.feature-heading {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text-color);
  margin-bottom: 1.25rem;
}

.feature-text {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 720px;
  margin: 0 auto;
}

.mobile-showcase-section {
  background: var(--bg-color);
  padding: 5rem 1.5rem;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.mobile-showcase-container {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.mobile-showcase-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mobile-showcase-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text-color);
  margin-bottom: 1rem;
  line-height: 1.15;
}

.mobile-showcase-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.mobile-feature-pills {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.mobile-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 0.75rem 1.25rem;
  border-radius: 14px;
  color: var(--text-color);
  font-size: 0.95rem;
  font-weight: 600;
  width: fit-content;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
  cursor: default;
}

.pill-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-color);
}

.mobile-phone-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Smartphone Mockup Frame with Ambient Floating Motion */
@keyframes phoneBreathingFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(0.4deg);
  }
}

.smartphone-frame {
  width: 320px;
  height: 640px;
  background: #0f172a;
  border-radius: 46px;
  padding: 12px;
  border: 4px solid #334155;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  animation: phoneBreathingFloat 6s ease-in-out infinite;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.smartphone-frame:hover {
  animation-play-state: paused;
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 35px 75px -15px rgba(0, 0, 0, 0.5);
}

.smartphone-island {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 22px;
  background: #000000;
  border-radius: 20px;
  z-index: 10;
}

.smartphone-screen {
  width: 100%;
  height: 100%;
  border-radius: 36px;
  overflow: hidden;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  user-select: none;
}

.smartphone-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 38px;
  pointer-events: none;
  user-select: none;
}

/* Showcase 4 Cards Grid */
.showcase-section {
  padding: 5rem 1.5rem 6rem;
  background: var(--bg-color);
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.showcase-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  transition: none;
  display: flex;
  flex-direction: column;
}

.showcase-card__img-wrap {
  width: 100%;
  height: 230px;
  overflow: hidden;
  background: var(--surface-raised);
}

.showcase-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.showcase-card__content {
  padding: 1.75rem;
}

.showcase-card__content h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.showcase-card__content p {
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.6;
  margin: 0;
}

.capabilities-section {
  background: var(--bg-color);
  padding: 6rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

.bench-header-wrap {
  text-align: center;
  margin-bottom: 4.5rem;
}

.bench-main-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 1rem;
  letter-spacing: -0.04em;
  line-height: 1.2;
}

.bench-main-desc {
  color: var(--text-secondary);
  font-size: 1.05rem;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
}

.bench-row-alt {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4.5rem;
  align-items: center;
  padding: 3.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.bench-row-alt:last-child {
  border-bottom: none;
}

.bench-row-alt--reverse {
  direction: rtl;
}

.bench-row-alt--reverse > * {
  direction: ltr;
}

.bench-bars-container {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  background: var(--bg-secondary);
  padding: 2rem 2.2rem;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.bench-bars-container:hover {
  border-color: var(--border-strong, var(--border-color));
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.05);
}

.bench-bar-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: default;
  transition: opacity 0.25s ease;
}

.bench-bars-container:hover .bench-bar-row {
  opacity: 0.65;
}

.bench-bars-container:hover .bench-bar-row:hover,
.bench-bars-container:hover .bench-bar-row--qx {
  opacity: 1;
}

.bench-bar-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bench-bar-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.bench-bar-row:hover .bench-bar-name {
  color: var(--text-color);
}

.bench-bar-row--qx .bench-bar-name {
  color: var(--text-color);
  font-weight: 800;
}

.bench-bar-val {
  font-size: 0.88rem;
  font-weight: 800;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.bench-bar-row:hover .bench-bar-val {
  color: var(--text-color);
}

.bench-bar-val--accent {
  color: var(--accent-color) !important;
}

.bench-bar-track {
  height: 10px;
  background: var(--surface-raised);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
}

.bench-bar-fill {
  height: 100%;
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.3);
  min-width: 6px;
  width: 0%;
  transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease;
}

.bench-bar-row:hover .bench-bar-fill {
  filter: brightness(1.2);
}

.capabilities-section.is-bench-visible .bench-bar-fill {
  width: var(--bar-width, 0%);
}

.capabilities-section.is-bench-visible .bench-bar-fill {
  width: var(--bar-width, 0%);
}

.bench-bar-fill--qx {
  background: linear-gradient(90deg, var(--accent-color) 0%, #38bdf8 100%);
  box-shadow: 0 0 14px rgba(28, 113, 216, 0.4);
}

.capabilities-section.is-bench-visible .bench-bar-row:nth-child(1) .bench-bar-fill { transition-delay: 0.05s; }
.capabilities-section.is-bench-visible .bench-bar-row:nth-child(2) .bench-bar-fill { transition-delay: 0.18s; }
.capabilities-section.is-bench-visible .bench-bar-row:nth-child(3) .bench-bar-fill { transition-delay: 0.3s; }
.capabilities-section.is-bench-visible .bench-bar-row:nth-child(4) .bench-bar-fill { transition-delay: 0.42s; }

.bench-text-side {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.bench-row-tag {
  display: inline-block;
  width: fit-content;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 1rem;
}

.bench-row-tag--green {
  color: #10b981;
}

.bench-row-tag--blue {
  color: #38bdf8;
}

.bench-row-tag--orange {
  color: #f97316;
}

.bench-row-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--text-color);
  margin: 0 0 1rem;
  line-height: 1.15;
}

.bench-row-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 1.25rem;
}

.bench-row-note {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
  opacity: 0.6;
  font-style: italic;
}

.contributors-row-section {
  padding: 5rem 1.5rem;
  background: var(--bg-color);
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.contributors-row-title {
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 800;
  color: var(--text-color);
  margin: 0 0 0.5rem;
  letter-spacing: -0.04em;
}

.contributors-row-desc {
  color: var(--text-secondary);
  font-size: 0.98rem;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.contributors-row-desc code {
  font-family: 'JetBrains Mono', monospace, sans-serif;
  font-size: 0.85em;
  background: var(--surface-raised);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.contributors-avatars-track {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem 3rem;
  margin: 0 auto;
  flex-wrap: wrap;
}

.contributor-avatar-pill {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  margin-left: -18px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.4s ease;
  z-index: 1;
}

.contributor-avatar-pill:first-child {
  margin-left: 0;
}

.avatar-ring {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  padding: 3px;
  background: var(--bg-secondary);
  border: 2px solid var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.contributor-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.avatar-ring--more {
  border: 3px dashed var(--accent-color);
  background: rgba(28, 113, 216, 0.08);
  color: var(--accent-color);
  font-size: 0.95rem;
  font-weight: 800;
}

.contributor-avatar-pill:hover {
  transform: translateY(-18px) scale(1.18);
  z-index: 50;
}

.contributor-avatar-pill:hover .avatar-ring {
  border-color: var(--accent-color);
}

.contributor-avatar-pill:hover .contributor-img {
  transform: scale(1.05);
}

.contributor-tooltip {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(-8px) scale(0.92);
  transform-origin: top center;
  background: var(--bg-secondary);
  border: 1.5px solid var(--border-color);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.16);
  padding: 8px 14px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  transition: opacity 0.25s ease, transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), visibility 0.25s ease;
  z-index: 60;
  backdrop-filter: blur(12px);
}

.contributor-tooltip::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  width: 10px;
  height: 10px;
  background: var(--bg-secondary);
  border-top: 1.5px solid var(--border-color);
  border-left: 1.5px solid var(--border-color);
  transform: translateX(-50%) rotate(45deg);
  border-top-left-radius: 3px;
  z-index: 1;
}

.contributor-avatar-pill:hover .contributor-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0) scale(1);
}

.tooltip-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-color);
  letter-spacing: -0.02em;
  position: relative;
  z-index: 2;
  font-family: 'JetBrains Mono', monospace;
}

.tooltip-commits {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--accent-color);
  position: relative;
  z-index: 2;
  font-family: 'JetBrains Mono', monospace;
}

.contributors-thank-you {
  margin-top: 1.25rem;
  display: flex;
  justify-content: center;
  width: 100%;
}

.thank-you-pill {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 10px 22px;
  border-radius: 50px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.04);
  max-width: 680px;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.thank-you-pill:hover {
  border-color: var(--accent-color);
}

.thank-you-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--accent-color);
}

.thank-you-content {
  display: flex;
  align-items: center;
}

.thank-you-text {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0;
  text-align: left;
}

.thank-you-text strong {
  color: var(--text-color);
}

.thank-you-stars-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 2px 9px;
  border-radius: 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  vertical-align: middle;
  margin: 0 3px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.thank-you-stars-badge:hover {
  background: rgba(245, 158, 11, 0.22);
  border-color: #f59e0b;
}

.how-to-section {
  padding: 4rem 1.5rem 5rem;
  background: var(--bg-color);
}

.support-actions-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

@media (max-width: 1024px) {
  .bento-title-card,
  .bento-image-large {
    grid-column: span 12;
  }
  .bento-boutique,
  .bento-community,
  .bento-stats,
  .bento-wiki {
    grid-column: span 6;
  }
  .mobile-showcase-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .bench-row-alt {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 2.5rem 0;
  }
  .bench-row-alt--reverse {
    direction: ltr;
  }
}

@media (max-width: 768px) {
  .hero-bento {
    position: relative;
    top: auto;
    min-height: auto;
    padding-top: 90px;
  }
  .bento-title-card {
    padding: 0 0 1.5rem 0;
    text-align: center;
    align-items: center;
  }
  .bento-title-card .hero-title {
    font-size: clamp(2.2rem, 8vw, 3.4rem);
  }
  .title-desc {
    max-width: 100%;
    text-align: center;
  }
  .hero-actions-row {
    justify-content: center;
    width: 100%;
  }
  .bento-item {
    grid-column: span 12 !important;
  }
  .showcase-grid {
    grid-template-columns: 1fr;
  }
  .avatar-ring {
    width: 52px;
    height: 52px;
  }
  .contributors-thank-you {
    padding: 0 0.75rem;
    margin-top: 1rem;
  }
  .thank-you-pill {
    flex-direction: column;
    align-items: center;
    border-radius: 18px;
    padding: 1.1rem 1.1rem;
    gap: 8px;
    width: 100%;
    max-width: 440px;
    margin: 0 auto;
  }
  .thank-you-content {
    text-align: center;
    justify-content: center;
  }
  .thank-you-text {
    text-align: center;
    font-size: 0.86rem;
    line-height: 1.6;
  }
  .thank-you-stars-badge {
    margin: 2px 2px;
  }
}
</style>
