<template>
  <button
    @click="toggleLanguage"
    class="language-toggle"
    :aria-label="currentLocale === 'tr' ? 'Switch to English' : 'Türkçeye geç'"
  >
    <span class="language-text">{{ currentLocale.toUpperCase() }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const toggleLanguage = () => {
  const newLocale = locale.value === 'tr' ? 'en' : 'tr'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}
</script>

<style scoped>
.language-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 var(--spacing-xs);
  border-radius: var(--border-radius-sm);
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  transition: var(--transition-fast);
  border: none;
  font-family: var(--font-primary);
}

.language-text {
  font-size: 13px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.02em;
}

.language-toggle:hover {
  background: var(--color-accent);
  opacity: 0.8;
}

.language-toggle:active {
  transform: scale(0.95);
}
</style>
