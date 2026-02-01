<template>
  <div class="tool qr-generator">
    <div class="tool-header">
      <div class="tool-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
          <rect x="14" y="14" width="3" height="3"/>
          <rect x="18" y="14" width="3" height="3"/>
          <rect x="14" y="18" width="3" height="3"/>
          <rect x="18" y="18" width="3" height="3"/>
        </svg>
      </div>
      <h3>{{ t('tools.qrGenerator.title') }}</h3>
    </div>

    <div class="tool-content">
      <input
        v-model="inputText"
        type="text"
        :placeholder="t('tools.qrGenerator.placeholder')"
        class="qr-input"
        @keyup.enter="generateQr"
      />

      <button @click="generateQr" class="tool-btn" :disabled="!inputText.trim()">
        {{ t('tools.qrGenerator.generate') }}
      </button>

      <div v-if="qrUrl" class="qr-result">
        <img :src="qrUrl" alt="QR Code" class="qr-image" />
        <button @click="downloadQr" class="tool-btn secondary">
          {{ t('tools.qrGenerator.download') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const inputText = ref('')
const qrUrl = ref('')

const generateQr = () => {
  if (!inputText.value.trim()) return

  const text = encodeURIComponent(inputText.value)
  qrUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${text}`
}

const downloadQr = () => {
  if (!qrUrl.value) return

  const link = document.createElement('a')
  link.href = qrUrl.value
  link.download = 'qrcode.png'
  link.target = '_blank'
  link.click()
}
</script>

<style scoped>
.tool-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.tool-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-sm);
  background: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-secondary);
}

.tool-header h3 {
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  margin: 0;
}

.tool-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.qr-input {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  background: var(--color-background);
  color: var(--color-primary);
}

.qr-input:focus {
  outline: none;
  border-color: var(--color-secondary);
}

.tool-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-secondary);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: var(--transition-fast);
  min-width: 150px;
  text-align: center;
}

.tool-btn.secondary {
  background: var(--color-accent);
  color: var(--color-primary);
}

.tool-btn:hover {
  opacity: 0.9;
}

.tool-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qr-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-background);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
}

.qr-image {
  width: 200px;
  height: 200px;
  border-radius: var(--border-radius-sm);
}
</style>
