<template>
  <div class="about-view">
    <div v-scroll-reveal="{ type: 'fade-up', delay: 100 }">
      <Skills />
    </div>

    <section class="about-section">
      <div class="container">
        <div v-scroll-reveal="{ type: 'fade-up', delay: 150 }">
          <AboutText />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import AboutText from '../components/about/AboutText.vue'
import Skills from '../components/about/Skills.vue'
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
