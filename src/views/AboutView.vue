<template>
  <div class="about-view">
    <section class="about-section">
      <div class="container">
        <h1 class="about-title">{{ t('about.title') }}</h1>
        <AboutText />
      </div>
    </section>

    <TechStack />
  </div>
</template>

<script setup>
import AboutText from '../components/about/AboutText.vue'
import TechStack from '../components/about/TechStack.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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

.about-title {
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
  text-align: center;
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
