<template>
  <div class="tools-view">
    <div class="tools-header">
      <h1>{{ t('tools.title') }}</h1>
      <p class="tools-subtitle">{{ t('tools.subtitle') }}</p>
    </div>

    <div class="tools-grid">
      <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 0 }">
        <IpChecker />
      </div>

      <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 50 }">
        <SpeedTest />
      </div>

      <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 100 }">
        <JsonFormatter />
      </div>

      <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 150 }">
        <JsonViewer />
      </div>

      <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 200 }">
        <PasswordGenerator />
      </div>

      <div class="tool-card" v-scroll-reveal="{ type: 'fade-up', delay: 250 }">
        <QrGenerator />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import IpChecker from '../components/tools/IpChecker.vue'
import SpeedTest from '../components/tools/SpeedTest.vue'
import JsonFormatter from '../components/tools/JsonFormatter.vue'
import JsonViewer from '../components/tools/JsonViewer.vue'
import PasswordGenerator from '../components/tools/PasswordGenerator.vue'
import QrGenerator from '../components/tools/QrGenerator.vue'

const { t } = useI18n()
</script>

<style scoped>
.tools-view {
  flex: 1;
  background: var(--color-background);
  padding: var(--spacing-xl) var(--spacing-md);
  max-width: 1200px;
  margin: 0 auto;
}

.tools-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.tools-header h1 {
  font-size: var(--font-size-h2);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.tools-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
}

.tool-card {
  background: var(--color-surface);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  transition: var(--transition-fast);
  min-height: 420px;
  display: flex;
  flex-direction: column;
}

.tool-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-secondary);
}

@media (max-width: 768px) {
  .tools-view {
    padding: var(--spacing-md) var(--spacing-sm);
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }

  .tool-card {
    padding: var(--spacing-md);
  }
}
</style>
