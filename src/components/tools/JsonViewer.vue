<template>
  <div class="tool json-viewer">
    <div class="tool-header">
      <div class="tool-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M12 18v-6"/>
          <path d="M9 15l3 3 3-3"/>
        </svg>
      </div>
      <h3>{{ t('tools.jsonViewer.title') }}</h3>
    </div>

    <div class="tool-content">
      <textarea
        v-model="inputJson"
        :placeholder="t('tools.jsonViewer.placeholder')"
        class="json-input"
        spellcheck="false"
        @input="parseJson"
      ></textarea>

      <div class="json-actions">
        <button @click="expandAll" class="tool-btn secondary" :disabled="!parsedJson">
          {{ t('tools.jsonViewer.expandAll') }}
        </button>
        <button @click="collapseAll" class="tool-btn secondary" :disabled="!parsedJson">
          {{ t('tools.jsonViewer.collapseAll') }}
        </button>
      </div>

      <div v-if="error" class="json-error">
        {{ error }}
      </div>

      <div v-if="parsedJson && !error" class="json-tree">
        <JsonNode
          :data="parsedJson"
          :path="'root'"
          :expanded-state="expandedState"
          @toggle="toggleNode"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import JsonNode from './JsonNode.vue'

const { t } = useI18n()

const inputJson = ref('')
const parsedJson = ref(null)
const error = ref('')
const expandedState = reactive({})

const parseJson = () => {
  error.value = ''
  if (!inputJson.value.trim()) {
    parsedJson.value = null
    return
  }

  try {
    parsedJson.value = JSON.parse(inputJson.value)
    // Auto expand first level
    Object.keys(expandedState).forEach(key => delete expandedState[key])
    expandedState['root'] = true
  } catch (e) {
    error.value = t('tools.jsonViewer.invalidJson')
    parsedJson.value = null
  }
}

const toggleNode = (path) => {
  expandedState[path] = !expandedState[path]
}

const expandAll = () => {
  const expand = (obj, path) => {
    expandedState[path] = true
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        expand(obj[key], `${path}.${key}`)
      })
    }
  }
  expand(parsedJson.value, 'root')
}

const collapseAll = () => {
  Object.keys(expandedState).forEach(key => {
    expandedState[key] = false
  })
  expandedState['root'] = true
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
  min-width: 100px;
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

.json-tree {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm);
  overflow-x: auto;
  max-height: 500px;
  overflow-y: auto;
}
</style>
