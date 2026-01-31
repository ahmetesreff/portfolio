<template>
  <div class="home-view">
    <section class="section hero-section">
      <div class="container">
        <ProfileCard />
      </div>
    </section>

    <section class="section about-section">
      <div class="container">
        <AboutText />
      </div>
    </section>
  </div>
</template>

<script setup>
import ProfileCard from '../components/about/ProfileCard.vue'
import AboutText from '../components/about/AboutText.vue'
</script>

<style scoped>
.home-view {
  flex: 1;
}

.hero-section {
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
  padding: var(--spacing-2xl) 0;
}

.about-section {
  padding: var(--spacing-xl) 0;
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--spacing-lg) 0;
  }

  .about-section {
    padding: var(--spacing-md) 0;
  }
}
</style>
