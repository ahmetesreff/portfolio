<template>
  <div class="about-view">
    <TechStack />

    <section class="about-section">
      <div class="container">
        <AboutText />
      </div>
    </section>
  </div>
</template>

<script setup>
import AboutText from '../components/about/AboutText.vue'
import TechStack from '../components/about/TechStack.vue'
</script>

<style scoped>
.about-view {
  flex: 1;
  background: var(--color-background);
}

.about-section {
  padding: var(--spacing-3xl) 0;
  background: var(--color-background);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (max-width: 768px) {
  .about-section {
    padding: var(--spacing-xl) 0;
  }
}
</style>
