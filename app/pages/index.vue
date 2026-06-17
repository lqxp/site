<script setup lang="ts">
useSeoMeta({
  title: 'QxChat — Private, self-hosted messaging',
  description:
    'QxChat is a private messenger with rooms, voice/video calls, profiles, and per-room encryption, built to be self-hosted.',
  ogTitle: 'QxChat',
  ogDescription: 'A clear, private, cross-platform messenger built on lqxp.',
  ogType: 'website',
  ogImage: 'https://qxch.at/image.png',

  twitterCard: 'summary_large_image',
  twitterTitle: 'QxChat',
  twitterDescription: 'Private self-hosted messaging.',
  twitterImage: 'https://qxch.at/128x128.png'
})

const valueProps = [
  { title: 'Self-hosted', text: 'API, WebSocket, and TURN run on your own infrastructure, not a closed cloud.' },
  { title: 'Encrypted per room', text: 'Each room generates its own key, verified client-side.' },
  { title: 'Cross-platform', text: 'Web, desktop (Tauri), and mobile share the same codebase.' },
  { title: 'Built on lqxp', text: 'Built on an open Vue foundation, not a proprietary framework.' }
]

const useCases = [
  'Set up a private server for a team or community',
  'Chat in text rooms with locally stored history',
  'Start a voice or video call from any room',
  'Host the entire infrastructure yourself, with no closed platform'
]
</script>

<template>
  <section class="hero container">
    <div class="hero__copy">
      <p class="eyebrow">Private messaging · self-hosted</p>
      <h1>Your server, your rooms, your rules.</h1>
      <p class="lead">
        QxChat brings together text rooms, calls, and profiles in an app you host yourself —
        on your own server, with your own keys.
      </p>
      <div class="hero__actions">
        <NuxtLink to="/download" class="btn btn--primary">Download QxChat</NuxtLink>
        <NuxtLink to="/features" class="btn btn--secondary">See the features</NuxtLink>
      </div>
    </div>

    <div class="hero__visual" aria-hidden="true">
      <div class="window-chrome">
        <div class="window-chrome__bar">
          <span></span><span></span><span></span>
        </div>

        <div class="mock-app">
          <!-- conversation list -->
          <div class="mock-convos">
            <div class="mock-convos__search">
              <span class="mock-icon mock-icon--search"></span>
              <span>Search</span>
            </div>

            <div class="mock-convo mock-convo--active">
              <span class="mock-avatar mock-avatar--github-lqxp"></span>
              <div class="mock-convo__meta">
                <strong>8e7b9ec9…0e6b9</strong>
                <p>hello</p>
              </div>
            </div>

            <div class="mock-convo">
              <span class="mock-avatar mock-avatar--olive">12</span>
              <div class="mock-convo__meta">
                <strong>12cb4481…2fae375</strong>
                <p>💚</p>
              </div>
            </div>

            <div class="mock-convo">
              <span class="mock-avatar mock-avatar--violet">AA</span>
              <div class="mock-convo__meta">
                <strong>aa94bf78…009f1d3e</strong>
                <p>No messages yet</p>
              </div>
            </div>
          </div>

          <!-- active thread -->
          <div class="mock-thread">
            <div class="mock-thread__header">
              <span class="mock-avatar mock-avatar--github-lqxp"></span>
              <div>
                <strong>8e7b9ec9…0e6b9</strong>
                <p>Room conversation · E2EE ready</p>
              </div>
            </div>


            <div class="mock-thread__day">Jun 8</div>

            <div class="mock-thread__messages">
              <div class="mock-msg">
                <span class="mock-avatar mock-avatar--github-kisakay"></span>
                <div class="mock-msg__body">
                  <strong>2h0 <time>02:32 AM</time></strong>
                  <p>hello</p>
                </div>
              </div>

              <div class="mock-msg">
                <span class="mock-avatar mock-avatar--pink">2H</span>
                <div class="mock-msg__body">
                  <strong>2h01 <time>02:33 AM</time></strong>
                  <p>heyy</p>
                  <div class="mock-reactions">
                    <span>❤ 1</span>
                    <span>🔵 1</span>
                  </div>
                </div>
              </div>

              <div class="mock-msg mock-msg--deleted">
                <span class="mock-avatar mock-avatar--pink">2H</span>
                <div class="mock-msg__body">
                  <strong>2h01 <time>02:33 AM</time></strong>
                  <p class="mock-msg__deleted">Message deleted</p>
                  <p>eeee <span class="mock-msg__edited">(edited)</span></p>
                  <div class="mock-reactions"><span>❤ 1</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- presence panel -->
          <div class="mock-presence">
            <p class="mock-presence__label">Presence</p>
            <p class="mock-presence__count">1 online</p>
            <p class="mock-presence__group">Online — 1</p>
            <div class="mock-presence__user">
              <span class="mock-avatar mock-avatar--github-kisakay"></span>
              <div>
                <strong>2h0 <span class="mock-tag">Web</span></strong>
                <p><span class="mock-dot"></span>Do not disturb</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="value-row container">
    <div v-for="v in valueProps" :key="v.title" class="value-row__item">
      <h3>{{ v.title }}</h3>
      <p>{{ v.text }}</p>
    </div>
  </section>

  <section class="definition container">
    <div class="definition__text">
      <h2>What exactly is QxChat?</h2>
      <p>
        It's a tool for teams and communities who want a chat space without depending on a
        centralized platform: rooms organized by topic, voice, video, and a history that stays
        on your own server.
      </p>
    </div>
    <div class="definition__panel">
      <p class="definition__panel-title">With QxChat, you can:</p>
      <ul>
        <li v-for="item in useCases" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>

  <!-- <section class="cta-band">
    <div class="container cta-band__inner">
      <div>
        <h2>Ready to host your own server?</h2>
        <p class="cta-band__sub">Builds available for Windows, Linux, macOS, and Android.</p>
      </div>
      <NuxtLink to="/download" class="btn btn--primary">Download</NuxtLink>
    </div>
  </section> -->
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 48px;
  align-items: center;
  padding: 56px 0 64px;
}

.hero h1 {
  max-width: 560px;
  margin-bottom: 18px;
  font-size: clamp(2.1rem, 4.6vw, 3.4rem);
  line-height: 1.04;
}

.hero__actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
}

/* ---- mock app: dark, matches the real QxChat UI ---- */
.window-chrome {
  --mock-bg: #15171c;
  --mock-panel: #1b1e25;
  --mock-panel-alt: #1f222a;
  --mock-line: rgba(255, 255, 255, 0.08);
  --mock-text: #e9eaed;
  --mock-muted: #9aa0ab;
  --mock-accent: #5b8cff;
  --mock-pink: #e1527c;
  --mock-olive: #8a9a3c;
  --mock-violet: #6a5acd;
  background: var(--mock-bg);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(10, 12, 16, 0.35);
}

.mock-app {
  display: grid;
  grid-template-columns: 168px 1fr 140px;
  min-height: 320px;
  font-family: var(--font-body);
  color: var(--mock-text);
}

.mock-icon {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: var(--mock-muted);
  opacity: 0.6;
  display: inline-block;
}

/* conversation list */
.mock-convos {
  background: var(--mock-panel);
  border-right: 1px solid var(--mock-line);
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mock-convos__search {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--mock-panel-alt);
  border-radius: 7px;
  padding: 6px 8px;
  font-size: 0.72rem;
  color: var(--mock-muted);
  margin-bottom: 8px;
}

.mock-convo {
  display: grid;
  grid-template-columns: 26px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 6px 6px;
  border-radius: 8px;
}

.mock-convo--active {
  background: var(--mock-panel-alt);
}

.mock-convo__meta strong {
  display: block;
  font-size: 0.68rem;
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--mock-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mock-convo__meta p {
  font-size: 0.66rem;
  color: var(--mock-muted);
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mock-convo__time {
  font-size: 0.6rem;
  color: var(--mock-muted);
}

/* avatars */
.mock-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
  color: #fff;
}

.mock-avatar--photo {
  background: linear-gradient(160deg, #3a3f4a, #20222a);
}

.mock-avatar--pink {
  background: var(--mock-pink);
}

.mock-avatar--olive {
  background: var(--mock-olive);
}

.mock-avatar--violet {
  background: var(--mock-violet);
}

.mock-avatar--github-kisakay {
  background-image: url("https://github.com/Kisakay.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.mock-avatar--github-lqxp {
  background-image: url("https://github.com/lqxp.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* thread */
.mock-thread {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.mock-thread__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--mock-line);
}

.mock-thread__header strong {
  display: block;
  font-size: 0.74rem;
  font-family: var(--font-mono);
}

.mock-thread__header p {
  font-size: 0.64rem;
  color: var(--mock-muted);
  margin-top: 1px;
}

.mock-thread__icons {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.mock-thread__day {
  text-align: center;
  font-size: 0.6rem;
  color: var(--mock-muted);
  padding: 10px 0 4px;
}

.mock-thread__messages {
  padding: 6px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
}

.mock-msg {
  display: flex;
  gap: 10px;
}

.mock-msg__body strong {
  font-size: 0.7rem;
  font-weight: 600;
}

.mock-msg__body time {
  font-size: 0.6rem;
  color: var(--mock-muted);
  font-weight: 400;
  margin-left: 6px;
}

.mock-msg__body p {
  font-size: 0.74rem;
  color: var(--mock-text);
  margin-top: 2px;
}

.mock-msg__deleted {
  color: var(--mock-muted);
  font-style: italic;
}

.mock-msg__edited {
  color: var(--mock-muted);
  font-size: 0.62rem;
  font-style: italic;
}

.mock-reactions {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}

.mock-reactions span {
  background: var(--mock-panel-alt);
  border-radius: 10px;
  padding: 2px 7px;
  font-size: 0.62rem;
}

/* presence panel */
.mock-presence {
  background: var(--mock-panel);
  border-left: 1px solid var(--mock-line);
  padding: 14px 12px;
}

.mock-presence__label {
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  color: var(--mock-muted);
  text-transform: uppercase;
}

.mock-presence__count {
  font-size: 0.72rem;
  font-weight: 600;
  margin-top: 2px;
  margin-bottom: 14px;
}

.mock-presence__group {
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  color: var(--mock-muted);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.mock-presence__user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mock-presence__user strong {
  font-size: 0.68rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.mock-presence__user p {
  font-size: 0.62rem;
  color: var(--mock-muted);
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 1px;
}

.mock-tag {
  background: var(--mock-panel-alt);
  border-radius: 5px;
  padding: 0 4px;
  font-size: 0.56rem;
  font-weight: 500;
  color: var(--mock-muted);
}

.mock-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e1527c;
  display: inline-block;
}

.value-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 36px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.value-row__item {
  padding: 0 20px;
  border-left: 1px solid var(--line);
}

.value-row__item:first-child {
  border-left: none;
  padding-left: 0;
}

.value-row__item h3 {
  font-size: 1rem;
  margin-bottom: 8px;
}

.value-row__item p {
  font-size: 0.88rem;
  color: var(--slate);
}

.definition {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 40px;
  padding: 72px 0;
  align-items: start;
}

.definition__text h2 {
  font-size: clamp(1.6rem, 2.6vw, 2.1rem);
  margin-bottom: 16px;
}

.definition__text p {
  color: var(--slate);
  max-width: 480px;
}

.definition__panel {
  background: var(--cream);
  border-radius: var(--radius-md);
  padding: 28px;
}

.definition__panel-title {
  font-weight: 600;
  margin-bottom: 14px;
}

.definition__panel ul {
  list-style: none;
}

.definition__panel li {
  padding: 12px 0;
  border-top: 1px solid rgba(17, 32, 47, 0.12);
  color: var(--ink);
  font-size: 0.93rem;
}

.definition__panel li:first-child {
  border-top: none;
  padding-top: 0;
}

.cta-band {
  background: var(--ink);
  color: #fff;
}

.cta-band__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding: 56px 0;
}

.cta-band h2 {
  font-size: clamp(1.4rem, 2.4vw, 1.9rem);
  max-width: 480px;
  color: #fff;
}

.cta-band__sub {
  color: var(--cream);
  font-size: 0.9rem;
  margin-top: 6px;
}

@media (max-width: 900px) {

  .hero,
  .definition {
    grid-template-columns: 1fr;
  }

  .value-row {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 24px;
  }

  .value-row__item:nth-child(2) {
    border-left: 1px solid var(--line);
  }

  .value-row__item:nth-child(odd) {
    border-left: none;
    padding-left: 0;
  }

  .mock-app {
    grid-template-columns: 140px 1fr;
  }

  .mock-presence {
    display: none;
  }
}

@media (max-width: 680px) {
  .value-row {
    grid-template-columns: 1fr;
  }

  .value-row__item {
    border-left: none !important;
    padding: 18px 0 0;
    border-top: 1px solid var(--line);
  }

  .value-row__item:first-child {
    border-top: none;
    padding-top: 0;
  }

  .mock-app {
    grid-template-columns: 1fr;
  }

  .mock-convos {
    display: none;
  }
}
</style>