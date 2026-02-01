<template>
  <div class="json-node">
    <!-- Object or Array -->
    <div v-if="isExpandable" class="node-line">
      <span class="toggle" @click="$emit('toggle', path)">
        {{ isExpanded ? '▼' : '▶' }}
      </span>
      <span v-if="nodeKey" class="key">{{ nodeKey }}:</span>
      <span class="bracket">{{ openBracket }}</span>
      <span v-if="!isExpanded" class="collapsed-preview">
        {{ collapsedPreview }}
      </span>
      <span v-if="!isExpanded" class="bracket">{{ closeBracket }}</span>
      <button v-if="!isExpanded" @click="copyValue" class="copy-icon" :title="copied ? 'Copied!' : 'Copy'">
        <svg v-if="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </button>
    </div>

    <!-- Expanded content -->
    <div v-if="isExpandable && isExpanded" class="node-children">
      <JsonNode
        v-for="(value, key) in data"
        :key="key"
        :data="value"
        :node-key="key"
        :path="`${path}.${key}`"
        :expanded-state="expandedState"
        @toggle="$emit('toggle', $event)"
      />
      <div class="node-line">
        <span class="bracket">{{ closeBracket }}</span>
      </div>
    </div>

    <!-- Primitive values -->
    <div v-else class="node-line">
      <span v-if="nodeKey" class="key">{{ nodeKey }}:</span>
      <span :class="['value', `value-${valueType}`]">{{ formattedValue }}</span>
      <button @click="copyValue" class="copy-icon" :title="copied ? 'Copied!' : 'Copy'">
        <svg v-if="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  data: {
    required: true
  },
  nodeKey: {
    type: [String, Number],
    default: null
  },
  path: {
    type: String,
    required: true
  },
  expandedState: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle'])

const copied = ref(false)

const isExpandable = computed(() => {
  return props.data !== null && typeof props.data === 'object'
})

const isExpanded = computed(() => {
  return !!props.expandedState[props.path]
})

const isArray = computed(() => {
  return Array.isArray(props.data)
})

const openBracket = computed(() => isArray.value ? '[' : '{')
const closeBracket = computed(() => isArray.value ? ']' : '}')

const collapsedPreview = computed(() => {
  if (isArray.value) {
    return `${props.data.length} items`
  }
  const keys = Object.keys(props.data)
  return `${keys.length} keys`
})

const valueType = computed(() => {
  if (props.data === null) return 'null'
  if (typeof props.data === 'boolean') return 'boolean'
  if (typeof props.data === 'number') return 'number'
  if (typeof props.data === 'string') return 'string'
  return 'unknown'
})

const formattedValue = computed(() => {
  if (props.data === null) return 'null'
  if (typeof props.data === 'string') return `"${props.data}"`
  return String(props.data)
})

const copyValue = async () => {
  try {
    const valueToCopy = typeof props.data === 'object'
      ? JSON.stringify(props.data, null, 2)
      : String(props.data)

    await navigator.clipboard.writeText(valueToCopy)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {
    // Clipboard failed
  }
}
</script>

<style scoped>
.json-node {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: var(--font-size-sm);
}

.node-line {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
  position: relative;
}

.node-line:hover {
  background: var(--color-accent);
}

.node-line:hover .copy-icon {
  opacity: 1;
}

.toggle {
  cursor: pointer;
  user-select: none;
  width: 16px;
  display: inline-block;
  color: var(--color-text-secondary);
  font-size: 10px;
}

.toggle:hover {
  color: var(--color-secondary);
}

.key {
  color: #881391;
  font-weight: var(--font-weight-medium);
}

[data-theme="dark"] .key {
  color: #ce9178;
}

.bracket {
  color: var(--color-text-secondary);
}

.collapsed-preview {
  color: var(--color-text-secondary);
  font-style: italic;
  font-size: 12px;
  margin-left: 4px;
}

.value {
  word-break: break-all;
}

.value-string {
  color: #0b8235;
}

[data-theme="dark"] .value-string {
  color: #ce9178;
}

.value-number {
  color: #0451a5;
}

[data-theme="dark"] .value-number {
  color: #b5cea8;
}

.value-boolean {
  color: #0000ff;
}

[data-theme="dark"] .value-boolean {
  color: #569cd6;
}

.value-null {
  color: #0000ff;
  font-style: italic;
}

[data-theme="dark"] .value-null {
  color: #569cd6;
}

.node-children {
  margin-left: 20px;
  border-left: 1px dotted var(--color-border);
  padding-left: 8px;
}

.copy-icon {
  opacity: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  color: var(--color-text-secondary);
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
}

.copy-icon:hover {
  color: var(--color-secondary);
}

.copy-icon:focus {
  outline: none;
}

.copy-icon:focus-visible {
  outline: 2px solid var(--color-secondary);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
