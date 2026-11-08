<template>
  <div class="tool json-tool">
    <div class="tool-header">
      <div class="tool-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/>
          <path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>
        </svg>
      </div>
      <h2>{{ t('tools.json.title') }}</h2>
    </div>

    <div class="tool-content">
      <label class="sr-only" for="json-input">{{ t('tools.json.title') }}</label>
      <textarea
        id="json-input"
        v-model="input"
        class="tool-input"
        :placeholder="t('tools.json.placeholder')"
        spellcheck="false"
        autocomplete="off"
      ></textarea>

      <div class="tool-row" role="group" :aria-label="t('tools.json.view')">
        <button
          v-for="m in MODES"
          :key="m"
          type="button"
          class="tool-btn secondary json-mode"
          :aria-pressed="mode === m"
          @click="mode = m"
        >{{ t(`tools.json.${m}`) }}</button>
      </div>

      <div class="tool-row json-meta">
        <button type="button" class="tool-link" @click="loadSample">{{ t('tools.example') }}</button>
        <span v-if="parsed.ok" class="tool-hint json-ok">✓ {{ t('tools.json.valid') }} · {{ sizeText }}</span>
      </div>

      <p v-if="parsed.error" class="tool-error" role="alert">{{ parsed.error }}</p>

      <template v-else-if="parsed.ok">
        <template v-if="mode === 'tree'">
          <div class="tool-row">
            <button type="button" class="tool-btn secondary" @click="expandAll">{{ t('tools.json.expandAll') }}</button>
            <button type="button" class="tool-btn secondary" @click="collapseAll">{{ t('tools.json.collapseAll') }}</button>
          </div>
          <div class="tool-output json-tree">
            <JsonNode :data="parsed.value" path="root" :expanded-state="expanded" @toggle="toggleNode" />
          </div>
        </template>
        <pre v-else class="tool-output json-text">{{ outputText }}</pre>

        <button type="button" class="tool-btn" @click="copyOutput">
          {{ copied ? t('tools.copied') : t('tools.copy') }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import JsonNode from './JsonNode.vue'
import { jsonErrorIndex, lineColumn } from './json-error.js'

const { t } = useI18n()

const MODES = ['pretty', 'minify', 'tree']
const SAMPLE = {
  user: { id: 42, name: 'Ahmet', roles: ['admin', 'dev'], active: true },
  server: { host: 'hetzner-1', memoryGb: 3.7, services: ['nginx', 'docker', 'jellyfin'] },
  lastBackup: '2026-11-08T04:00:00Z',
  error: null
}

const input = ref('')
const mode = ref('pretty')
const copied = ref(false)
const expanded = reactive({ root: true })

const parsed = computed(() => {
  const text = input.value
  if (!text.trim()) return { ok: false }
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    const index = jsonErrorIndex(text)
    return {
      ok: false,
      error: index >= 0 ? t('tools.json.invalidAt', lineColumn(text, index)) : t('tools.json.invalid')
    }
  }
})

const outputText = computed(() => {
  if (!parsed.value.ok) return ''
  return mode.value === 'minify'
    ? JSON.stringify(parsed.value.value)
    : JSON.stringify(parsed.value.value, null, 2)
})

const sizeText = computed(() => {
  const bytes = new Blob([outputText.value]).size
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`
})

// Yeni JSON gelince ağacı sıfırla: yalnız kök açık
watch(() => parsed.value.value, () => {
  Object.keys(expanded).forEach(k => delete expanded[k])
  expanded.root = true
})

const toggleNode = (path) => { expanded[path] = !expanded[path] }

const expandAll = () => {
  const walk = (value, path) => {
    expanded[path] = true
    if (value && typeof value === 'object') {
      Object.keys(value).forEach(k => walk(value[k], `${path}.${k}`))
    }
  }
  walk(parsed.value.value, 'root')
}

const collapseAll = () => {
  Object.keys(expanded).forEach(k => { expanded[k] = false })
  expanded.root = true
}

const loadSample = () => { input.value = JSON.stringify(SAMPLE) }

const copyOutput = async () => {
  try {
    await navigator.clipboard.writeText(outputText.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // pano izni yoksa sessizce geç
  }
}
</script>

<style scoped src="./tool-base.css"></style>
<style scoped>
.json-meta {
  justify-content: space-between;
  min-height: 22px;
}

.json-ok {
  color: var(--color-secondary);
}

.json-tree {
  white-space: normal;
}

.json-mode {
  padding: 9px 6px;
  font-size: 13px;
}
</style>
