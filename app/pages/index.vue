<script setup lang="ts">
useSeoMeta({
  title: 'QxChat — Messagerie privée et auto-hébergée',
  description:
    'QxChat est une messagerie privée avec salons, appels vocaux/vidéo, profils et chiffrement de rooms, pensée pour être auto-hébergée.',
  ogTitle: 'QxChat',
  ogDescription: 'Une messagerie privée, claire et multi-plateformes construite sur lqxp.',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

const valueProps = [
  { title: 'Auto-hébergé', text: 'API, WebSocket et TURN tournent sur ton infra, pas sur un cloud fermé.' },
  { title: 'Chiffré par room', text: 'Chaque room génère sa propre clé, vérifiée côté client.' },
  { title: 'Multi-plateforme', text: 'Web, desktop (Tauri) et mobile partagent la même base de code.' },
  { title: 'Basé sur lqxp', text: 'Construit sur une fondation Vue ouverte, pas un framework propriétaire.' }
]

const useCases = [
  'Monter un serveur privé pour une équipe ou une communauté',
  'Discuter dans des salons texte avec un historique local',
  'Lancer un appel vocal ou vidéo depuis n’importe quelle room',
  'Héberger toute l’infrastructure toi-même, sans plateforme fermée'
]
</script>

<template>
  <section class="hero container">
    <div class="hero__copy">
      <p class="eyebrow">Messagerie privée · auto-hébergée</p>
      <h1>Ton serveur, tes salons, tes règles.</h1>
      <p class="lead">
        QxChat rassemble des rooms texte, des appels et des profils dans une appli que tu héberges toi-même —
        sur ton serveur, avec tes clés.
      </p>
      <div class="hero__actions">
        <NuxtLink to="/telechargement" class="btn btn--primary">Télécharger QxChat</NuxtLink>
        <NuxtLink to="/fonctionnalites" class="btn btn--secondary">Voir les fonctionnalités</NuxtLink>
      </div>
    </div>

    <div class="hero__visual" aria-hidden="true">
      <div class="window-chrome">
        <div class="window-chrome__bar">
          <span></span><span></span><span></span>
        </div>
        <div class="mock-window__body">
          <div class="mock-rail">
            <div class="mock-rail__dot mock-rail__dot--active"></div>
            <div class="mock-rail__dot"></div>
            <div class="mock-rail__dot"></div>
          </div>
          <div class="mock-channels">
            <span class="mock-channels__title">QxChat — équipe</span>
            <p># général</p>
            <p class="is-active"># dev</p>
            <p># vocal</p>
            <p># annonces</p>
          </div>
          <div class="mock-thread">
            <div class="mock-msg">
              <span class="mock-msg__avatar"></span>
              <div>
                <strong>léa</strong>
                <p>le build tient sur Tauri sans souci</p>
              </div>
            </div>
            <div class="mock-msg">
              <span class="mock-msg__avatar"></span>
              <div>
                <strong>noa</strong>
                <p>vocal dans 5 min ?</p>
              </div>
            </div>
            <div class="mock-msg">
              <span class="mock-msg__avatar"></span>
              <div>
                <strong>léa</strong>
                <p>yep, je lance la room</p>
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
      <h2>QxChat, c’est quoi exactement ?</h2>
      <p>
        C’est un outil pour les équipes et les communautés qui veulent un espace de discussion sans dépendre
        d’une plateforme centralisée : des salons organisés par room, de la voix, de la vidéo, et un historique
        qui reste chez toi.
      </p>
    </div>
    <div class="definition__panel">
      <p class="definition__panel-title">Avec QxChat, tu peux :</p>
      <ul>
        <li v-for="item in useCases" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>

  <section class="cta-band">
    <div class="container cta-band__inner">
      <div>
        <h2>Prêt à héberger ton propre serveur ?</h2>
        <p class="cta-band__sub">Builds Windows, Linux, macOS et Android disponibles.</p>
      </div>
      <NuxtLink to="/telechargement" class="btn btn--primary">Télécharger</NuxtLink>
    </div>
  </section>
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

.mock-window__body {
  display: grid;
  grid-template-columns: 56px 140px 1fr;
  min-height: 320px;
}

.mock-rail {
  background: var(--ink);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-top: 18px;
}

.mock-rail__dot {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
}

.mock-rail__dot--active {
  background: var(--blue-700);
}

.mock-channels {
  border-right: 1px solid var(--line);
  padding: 16px 12px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--slate);
}

.mock-channels__title {
  display: block;
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--ink);
  font-size: 0.85rem;
  margin-bottom: 12px;
}

.mock-channels p {
  margin: 8px 0;
}

.mock-channels p.is-active {
  color: var(--blue-700);
  font-weight: 600;
}

.mock-thread {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mock-msg {
  display: flex;
  gap: 10px;
}

.mock-msg__avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--cream);
  flex-shrink: 0;
}

.mock-msg strong {
  display: block;
  font-size: 0.82rem;
  margin-bottom: 2px;
}

.mock-msg p {
  font-size: 0.86rem;
  color: var(--slate);
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

  .mock-window__body {
    grid-template-columns: 44px 1fr;
  }

  .mock-channels {
    display: none;
  }
}
</style>
