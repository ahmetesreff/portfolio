<template>
  <div class="contact-view">
    <section class="section">
      <div class="container">
        <div v-scroll-reveal="{ type: 'fade-up', duration: 800 }">
          <ContactInfo />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ContactInfo from '../components/contact/ContactInfo.vue'
</script>

<style scoped>
.contact-view {
  flex: 1;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%);
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
}

.section {
  width: 100%;
  padding: var(--spacing-xl) 0;
}

@media (max-width: 768px) {
  .contact-view {
    min-height: auto;
  }

  .section {
    padding: var(--spacing-md) 0;
  }
}
</style>
