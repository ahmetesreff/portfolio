<template>
  <div class="tool speed-test">
    <div class="tool-header">
      <div class="tool-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      </div>
      <h3>{{ t('tools.speedTest.title') }}</h3>
    </div>

    <div class="tool-content">
      <div class="speed-display">
        <div class="speed-value" :class="{ 'testing': testing }">
          {{ testing ? currentSpeed.toFixed(1) : (result ? result.toFixed(1) : '0.0') }}
        </div>
        <div class="speed-unit">Mbps</div>
      </div>

      <div class="speed-bar">
        <div class="speed-progress" :style="{ width: progressWidth }"></div>
      </div>

      <div class="speed-status">
        {{ statusText }}
      </div>

      <button @click="startTest" class="tool-btn" :disabled="testing">
        {{ testing ? t('tools.speedTest.testing') : t('tools.speedTest.start') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const testing = ref(false)
const result = ref(null)
const currentSpeed = ref(0)
const progress = ref(0)

const progressWidth = computed(() => `${progress.value}%`)

const statusText = computed(() => {
  if (testing.value) return t('tools.speedTest.measuring')
  if (result.value === null) return t('tools.speedTest.ready')
  if (result.value > 100) return t('tools.speedTest.excellent')
  if (result.value > 50) return t('tools.speedTest.good')
  if (result.value > 20) return t('tools.speedTest.average')
  return t('tools.speedTest.slow')
})

const startTest = async () => {
  testing.value = true
  result.value = null
  currentSpeed.value = 0
  progress.value = 0

  const testDuration = 5000 // 5 seconds
  const updateInterval = 100
  const startTime = Date.now()

  // Simulate speed test with realistic fluctuation
  const baseSpeed = 50 + Math.random() * 100 // Random base between 50-150

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime
    progress.value = Math.min((elapsed / testDuration) * 100, 100)

    // Add realistic fluctuation
    const fluctuation = (Math.random() - 0.5) * 20
    currentSpeed.value = Math.max(0, baseSpeed + fluctuation + (elapsed / testDuration) * 10)

    if (elapsed >= testDuration) {
      clearInterval(interval)
      testing.value = false
      result.value = baseSpeed + Math.random() * 20
      progress.value = 100
    }
  }, updateInterval)
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
  align-items: center;
  gap: var(--spacing-md);
}

.speed-display {
  text-align: center;
}

.speed-value {
  font-size: 3rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
  font-family: 'Monaco', 'Menlo', monospace;
  line-height: 1;
  transition: var(--transition-fast);
}

.speed-value.testing {
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.speed-unit {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}

.speed-bar {
  width: 100%;
  height: 8px;
  background: var(--color-accent);
  border-radius: 4px;
  overflow: hidden;
}

.speed-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--color-secondary), var(--color-hover));
  border-radius: 4px;
  transition: width 0.1s linear;
}

.speed-status {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.tool-btn {
  width: 100%;
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

.tool-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
