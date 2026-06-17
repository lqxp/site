<script setup lang="ts">
useSeoMeta({
  title: 'Features — QxChat',
  description: 'Private rooms, encryption, multi-platform and self-hosting: what QxChat actually does.',
  ogType: 'website'
})

const showcase = [
  {
    src: '/assets/texting_showcase.png',
    title: 'Text rooms',
    text: 'Conversations organized by room, with a clear hierarchy.'
  },
  {
    src: '/assets/stream_showcase.png',
    title: 'Calls & streaming',
    text: 'Voice, video and screen sharing, in the same window as text.'
  },
  {
    src: '/assets/writing_showcase.png',
    title: 'Quick writing',
    text: 'Compose, reply, follow a thread without losing context.'
  },
  {
    src: "/assets/overview_pc.png",
    title: "Desktop Experience",
    text: "Available in lightweight desktop client for Windows, macOS and Linux"
  }
]

const features = [
  {
    tag: 'ROOMS',
    title: 'Private rooms',
    text: 'Invite-only spaces, each with its own members.',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 7H16V9H8V7Z" fill="currentColor"/>
      <path d="M14 11H8V13H14V11Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2 3C20.19 3 20.991 3.81 20.991 4.8L21 21L17.4 17.4H4.8C3.81 17.4 3 16.59 3 15.6V4.8C3 3.81 3.81 3 4.8 3H19.2ZM19.2 16.653V4.8H4.8V15.6H18.147L19.2 16.653Z" fill="currentColor"/>
    </svg>`,
  },
  {
    tag: 'CRYPTO',
    title: 'Per-room encryption',
    text: 'Each room generates its own key; messages are protected client-side.',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.59309 9.5L21 9.5V12.5L18 12.5V17H15.5V12.5H9.59309C9.59309 12.5 8.5 15 6 15C3.5 15 2 13.2091 2 11C2 8.79086 3.5 7 6 7C8.5 7 9.59309 9.5 9.59309 9.5ZM3 11C3 12.6569 4.34315 14 6 14C7.65685 14 9 12.6569 9 11C9 9.34315 7.65685 8 6 8C4.34315 8 3 9.34315 3 11Z" fill="currentColor"/>
    </svg>`,
  },
  {
    tag: 'OS × 4',
    title: 'Multi-platform',
    text: 'Web, desktop (Tauri) and mobile, built from the same codebase.',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="15.5,17.5 2.5,17.5 2.5,9.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>
      <polyline points="7.5,4.5 19.5,4.5 19.5,12.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>
      <line x1="10.5" y1="17.5" x2="10.5" y2="21.5" stroke="currentColor" stroke-linejoin="round" stroke-miterlimit="10"/>
      <line x1="6.5" y1="21.5" x2="14.5" y2="21.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>
      <line x1="2.5" y1="14.5" x2="15.5" y2="14.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>
      <rect x="0.5" y="0.5" width="5" height="7" stroke="currentColor" stroke-linejoin="round" stroke-miterlimit="10"/>
      <rect x="17.5" y="14.5" width="6" height="9" stroke="currentColor" stroke-linejoin="round" stroke-miterlimit="10"/>
      <line x1="2.5" y1="5.5" x2="3.5" y2="5.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>
      <line x1="17.5" y1="21.5" x2="23.5" y2="21.5" stroke="currentColor" stroke-linejoin="round" stroke-miterlimit="10"/>
    </svg>`,
  },
  {
    tag: 'SELF',
    title: 'Self-hosting',
    text: 'API, WebSocket and TURN configurable to your infra — nothing forced.',
    icon: `<svg viewBox="0 0 389.895 389.895" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M287.734,267.822c0-21.036-40.476-31.29-80.634-32.425V129.981l12.867,12.867c1.464,1.464,3.384,2.196,5.303,2.196s3.839-0.732,5.303-2.196c2.929-2.93,2.929-7.678,0-10.607l-25.67-25.67c-2.929-2.928-7.678-2.928-10.606,0l-25.67,25.67c-2.929,2.93-2.929,7.678,0,10.607c2.928,2.928,7.677,2.928,10.606,0l12.867-12.867v105.415c-40.174,1.128-80.682,11.382-80.682,32.426v89.54h0.262c0,22.352,45.699,32.532,88.158,32.532s88.158-10.181,88.158-32.532h-0.262V267.822zM192.1,250.4v9.731c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-9.73c45.094,1.253,65.634,13.547,65.634,17.42c0,4.084-22.805,17.533-73.158,17.533s-73.158-13.449-73.158-17.533C126.418,263.948,146.973,251.647,192.1,250.4zM199.838,374.895c-50.354,0-73.158-13.449-73.158-17.532h-0.262v-27.665c13.629,6.434,37.065,10.927,72.455,14.259c2.349,0.222,4.942,0.33,7.743,0.33c10.209,0,23.146-1.447,36.795-4.168c4.062-0.81,6.699-4.76,5.889-8.821c-0.81-4.062-4.758-6.697-8.822-5.89c-16.025,3.194-30.677,4.514-40.199,3.615c-24.676-2.323-42.889-5.157-55.681-8.664c-16.826-4.612-18.181-8.862-18.181-8.901v-24.395c16.938,9.039,45.722,13.292,73.158,13.292s56.221-4.253,73.158-13.292v70.299h0.262C272.997,361.445,250.192,374.895,199.838,374.895z" fill="currentColor"/>
      <path d="M290.299,80.34c0.005-0.33,0.007-0.658,0.007-0.983C290.306,35.6,254.707,0,210.95,0c-41.367,0-75.442,31.813-79.042,72.259c-7.286-2.895-15.081-4.395-23.042-4.395c-34.465,0-62.505,28.039-62.505,62.505s28.04,62.506,62.469,62.506l49.188,0.24c0.013,0,0.025,0,0.038,0c4.125,0,7.479-3.334,7.499-7.463c0.02-4.143-3.321-7.517-7.463-7.537l-49.224-0.24c-26.194,0-47.505-21.311-47.505-47.506c0-26.194,21.311-47.505,47.505-47.505c9.411,0,18.515,2.757,26.329,7.973c2.381,1.588,5.462,1.685,7.938,0.243s3.914-4.167,3.707-7.023l-0.033-0.453c-0.109-1.493-0.212-2.903-0.212-4.247C146.594,43.87,175.464,15,210.95,15s64.356,28.87,64.356,64.356c0,2.319-0.167,4.843-0.51,7.715c-0.269,2.247,0.492,4.496,2.07,6.119c1.578,1.622,3.803,2.437,6.06,2.239c1.479-0.135,2.703-0.198,3.851-0.198c23.024,0,41.756,18.731,41.756,41.756s-18.731,41.757-41.719,41.757l-52.676-0.258c-0.013,0-0.025,0-0.038,0c-4.125,0-7.479,3.334-7.499,7.463c-0.02,4.143,3.321,7.517,7.463,7.537l52.713,0.258c31.295,0,56.756-25.461,56.756-56.757C343.533,106.874,319.96,82.164,290.299,80.34z" fill="currentColor"/>
    </svg>`,
  }
]
</script>

<template>
  <section class="page-hero container">
    <p class="eyebrow">Features</p>
    <h1>How it actually works.</h1>
    <p class="lead">
      Three screens are enough to show the essentials: clear rooms, calls that work, an interface
      that doesn't drag.
    </p>
  </section>

  <section class="showcase-video container">
    <div class="window-chrome">
      <div class="window-chrome__bar">
        <span></span><span></span><span></span>
      </div>
      <video class="window-chrome__media" src="/assets/mobile_demo.mp4" autoplay muted loop playsinline
        controls></video>
    </div>
    <p class="showcase-video__caption">Mobile demo — same base as desktop.</p>
  </section>

  <section class="showcase-grid container">
    <figure v-for="item in showcase" :key="item.src">
      <img :src="item.src" :alt="item.title" />
      <figcaption>
        <strong>{{ item.title }}</strong>
        <span>{{ item.text }}</span>
      </figcaption>
    </figure>
  </section>

  <section class="feature-rows container">
    <div class="feature-row" v-for="f in features" :key="f.tag">
      <span class="feature-row__tag"></span>
      <div class="feature-row__icon" v-html="f.icon"></div>
      <div class="feature-row__body">
        <h3>{{ f.title }}</h3>
        <p>{{ f.text }}</p>
      </div>
    </div>
  </section>

  <section class="stack-strip">
    <p class="container">Built with <strong>lqxp</strong> · Vue · Tauri · WebRTC · Rust</p>
  </section>
</template>

<style scoped>
.page-hero {
  padding: 56px 0 40px;
}

.page-hero h1 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin-bottom: 14px;
  max-width: 620px;
}

.showcase-video {
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Shrink the demo video so it no longer dominates the page */
.showcase-video .window-chrome {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.showcase-video__caption {
  margin-top: 12px;
  color: var(--slate);
  font-size: 0.9rem;
  text-align: center;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-bottom: 56px;
}

.showcase-grid figure {
  margin: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #fff;
}

.showcase-grid img {
  aspect-ratio: 16 / 11;
  object-fit: cover;
}

.showcase-grid figcaption {
  padding: 16px;
}

.showcase-grid figcaption strong {
  display: block;
  margin-bottom: 4px;
}

.showcase-grid figcaption span {
  color: var(--slate);
  font-size: 0.88rem;
}

.feature-rows {
  padding-bottom: 64px;
}

.feature-row {
  display: grid;
  grid-template-columns: 96px 28px 1fr;
  align-items: center;
  gap: 20px;
  padding: 24px 0;
  border-top: 1px solid var(--line);
}

.feature-row:first-child {
  border-top: none;
}

.feature-row__tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--blue-700);
}

.feature-row__icon {
  width: 20px;
  height: 20px;
  color: var(--blue-700);
  flex-shrink: 0;
}

.feature-row__icon :deep(svg) {
  width: 20px;
  height: 20px;
  display: block;
}

.feature-row__body h3 {
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.feature-row__body p {
  color: var(--slate);
  max-width: 560px;
  margin: 0;
}

@media (max-width: 680px) {
  .feature-row {
    grid-template-columns: 28px 1fr;
    grid-template-rows: auto auto;
  }

  .feature-row__tag {
    grid-column: 1 / -1;
  }
}

.stack-strip {
  background: var(--cream);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 18px 0;
}

.stack-strip p {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  text-align: center;
  color: var(--ink);
}

@media (max-width: 900px) {
  .showcase-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 680px) {
  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .feature-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .showcase-video .window-chrome {
    max-width: 320px;
  }
}
</style>