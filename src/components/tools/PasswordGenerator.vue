<template>
  <div class="tool password-generator">
    <div class="tool-header">
      <div class="tool-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <h3>{{ t('tools.passwordGenerator.title') }}</h3>
    </div>

    <div class="tool-content">
      <div class="password-display">
        <input
          type="text"
          :value="password"
          readonly
          class="password-input"
        />
        <button @click="copyPassword" class="copy-btn" :title="t('tools.copy')">
          <svg v-if="!copied" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>

      <div class="password-options">
        <div class="option-row">
          <label>{{ t('tools.passwordGenerator.length') }}: {{ length }}</label>
          <input type="range" v-model="length" min="8" max="32" class="range-input" />
        </div>

        <div class="option-row checkbox">
          <label>
            <input type="checkbox" v-model="includeUppercase" />
            {{ t('tools.passwordGenerator.uppercase') }} (A-Z)
          </label>
        </div>

        <div class="option-row checkbox">
          <label>
            <input type="checkbox" v-model="includeLowercase" />
            {{ t('tools.passwordGenerator.lowercase') }} (a-z)
          </label>
        </div>

        <div class="option-row checkbox">
          <label>
            <input type="checkbox" v-model="includeNumbers" />
            {{ t('tools.passwordGenerator.numbers') }} (0-9)
          </label>
        </div>

        <div class="option-row checkbox">
          <label>
            <input type="checkbox" v-model="includeSymbols" />
            {{ t('tools.passwordGenerator.symbols') }} (!@#$%)
          </label>
        </div>
      </div>

      <div class="password-strength">
        <div class="strength-bar">
          <div class="strength-fill" :style="{ width: strengthPercent, background: strengthColor }"></div>
        </div>
        <span class="strength-text" :style="{ color: strengthColor }">{{ strengthText }}</span>
      </div>

      <button @click="generatePassword" class="tool-btn">
        {{ t('tools.passwordGenerator.generate') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const password = ref('')
const length = ref(16)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(true)
const copied = ref(false)

const charset = computed(() => {
  let chars = ''
  if (includeUppercase.value) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (includeLowercase.value) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (includeNumbers.value) chars += '0123456789'
  if (includeSymbols.value) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  return chars
})

const strength = computed(() => {
  let score = 0
  if (length.value >= 12) score += 1
  if (length.value >= 16) score += 1
  if (includeUppercase.value) score += 1
  if (includeLowercase.value) score += 1
  if (includeNumbers.value) score += 1
  if (includeSymbols.value) score += 1
  return Math.min(score, 6)
})

const strengthPercent = computed(() => `${(strength.value / 6) * 100}%`)

const strengthColor = computed(() => {
  if (strength.value <= 2) return '#f44336'
  if (strength.value <= 4) return '#ff9800'
  return '#4caf50'
})

const strengthText = computed(() => {
  if (strength.value <= 2) return t('tools.passwordGenerator.weak')
  if (strength.value <= 4) return t('tools.passwordGenerator.medium')
  return t('tools.passwordGenerator.strong')
})

const generatePassword = () => {
  if (!charset.value) return

  let result = ''
  const array = new Uint32Array(length.value)
  crypto.getRandomValues(array)

  for (let i = 0; i < length.value; i++) {
    result += charset.value[array[i] % charset.value.length]
  }

  password.value = result
}

const copyPassword = async () => {
  if (!password.value) return
  try {
    await navigator.clipboard.writeText(password.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {
    // Clipboard failed
  }
}

watch([length, includeUppercase, includeLowercase, includeNumbers, includeSymbols], () => {
  generatePassword()
})

onMounted(() => {
  generatePassword()
})
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

.password-display {
  display: flex;
  gap: var(--spacing-xs);
}

.password-input {
  flex: 1;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: var(--font-size-sm);
  background: var(--color-background);
  color: var(--color-primary);
}

.copy-btn {
  padding: var(--spacing-sm);
  background: var(--color-accent);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
}

.copy-btn:hover {
  background: var(--color-secondary);
  color: white;
}

.password-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.option-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.option-row label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  min-width: 120px;
}

.option-row.checkbox {
  flex-direction: row;
}

.option-row.checkbox label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
}

.range-input {
  width: 100%;
  cursor: pointer;
}

.password-strength {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.strength-bar {
  flex: 1;
  height: 6px;
  background: var(--color-accent);
  border-radius: 3px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 3px;
}

.strength-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  min-width: 70px;
  text-align: right;
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
}

.tool-btn:hover {
  opacity: 0.9;
}
</style>
