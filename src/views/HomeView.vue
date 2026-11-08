<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="container">
        <div v-scroll-reveal="{ type: 'fade-up', duration: 800 }">
          <ProfileCard />
        </div>
      </div>
    </section>

    <section class="terminal-section">
      <div class="container">
        <div v-scroll-reveal="{ type: 'fade-scale', delay: 100 }">
          <Terminal />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ProfileCard from '../components/about/ProfileCard.vue'
import Terminal from '../components/Terminal.vue'
</script>

<style scoped>
.home-view {
  flex: 1;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.hero-section {
  background: transparent;
  padding: var(--spacing-2xl) 0 var(--spacing-lg) 0;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}

.terminal-section {
  padding: var(--spacing-lg) 0 var(--spacing-3xl);
  background: transparent;
  position: relative;
  z-index: 1;
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

  .terminal-section {
    padding: var(--spacing-xl) 0;
  }

  .container {
    padding: 0 var(--spacing-sm);   /* diğer sayfalar gibi 16px kenar boşluğu */
  }
}
</style>
