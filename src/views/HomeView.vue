<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="container">
        <ProfileCard />
      </div>
    </section>

    <Skills />

    <section class="about-section">
      <div class="container">
        <AboutText />
      </div>
    </section>

    <section class="terminal-section">
      <div class="container">
        <Terminal />
      </div>
    </section>
  </div>
</template>

<script setup>
import ProfileCard from '../components/about/ProfileCard.vue'
import AboutText from '../components/about/AboutText.vue'
import Skills from '../components/about/Skills.vue'
import Terminal from '../components/Terminal.vue'
</script>

<style scoped>
.home-view {
  flex: 1;
  background: var(--color-background);
}

.hero-section {
  background: var(--color-background);
  padding: var(--spacing-2xl) 0 var(--spacing-xl) 0;
}

.about-section {
  padding: var(--spacing-3xl) 0;
  background: var(--color-background);
}

.terminal-section {
  padding: var(--spacing-3xl) 0;
  background: var(--color-surface);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--spacing-xl) 0 var(--spacing-lg) 0;
  }

  .about-section {
    padding: var(--spacing-xl) 0;
  }

  .terminal-section {
    padding: var(--spacing-xl) 0;
  }
}
</style>
