<template>
  <div class="tool json-formatter">
    <div class="tool-header">
      <div class="tool-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 7V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M5 12h6"/>
          <path d="M5 16h9"/>
        </svg>
      </div>
      <h3>{{ t('tools.jsonFormatter.title') }}</h3>
    </div>

    <div class="tool-content">
      <textarea
        v-model="inputJson"
        :placeholder="t('tools.jsonFormatter.placeholder')"
        class="json-input"
        spellcheck="false"
      ></textarea>

      <div class="json-actions">
        <button @click="formatJson" class="tool-btn">
          {{ t('tools.jsonFormatter.format') }}
        </button>
        <button @click="minifyJson" class="tool-btn secondary">
          {{ t('tools.jsonFormatter.minify') }}
        </button>
        <button @click="copyResult" class="tool-btn secondary" :disabled="!outputJson">
          {{ copied ? t('tools.copied') : t('tools.copy') }}
        </button>
      </div>

      <div v-if="error" class="json-error">
        {{ error }}
      </div>

      <div v-if="outputJson && !error" class="json-output">
        <pre>{{ outputJson }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const inputJson = ref('')
const outputJson = ref('')
const error = ref('')
const copied = ref(false)

const formatJson = () => {
  error.value = ''
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed, null, 2)
  } catch (e) {
    error.value = t('tools.jsonFormatter.invalidJson')
    outputJson.value = ''
  }
}

const minifyJson = () => {
  error.value = ''
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed)
  } catch (e) {
    error.value = t('tools.jsonFormatter.invalidJson')
    outputJson.value = ''
  }
}

const copyResult = async () => {
  if (!outputJson.value) return
  try {
    await navigator.clipboard.writeText(outputJson.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {
    // Clipboard failed
  }
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
  gap: var(--spacing-sm);
}

.json-input {
  width: 100%;
  min-height: 100px;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: var(--font-size-sm);
  resize: vertical;
  background: var(--color-background);
  color: var(--color-primary);
}

.json-input:focus {
  outline: none;
  border-color: var(--color-secondary);
}

.json-actions {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.tool-btn {
  flex: 1;
  min-width: 80px;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-secondary);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: var(--transition-fast);
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

.json-error {
  color: #f44336;
  font-size: var(--font-size-sm);
  padding: var(--spacing-xs);
  background: rgba(244, 67, 54, 0.1);
  border-radius: var(--border-radius-sm);
}

.json-output {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm);
  overflow-x: auto;
}

.json-output pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: var(--font-size-sm);
  color: var(--color-secondary);
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
