<template>
  <div class="tool qr-generator">
    <div class="tool-header">
      <div class="tool-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
          <rect x="14" y="14" width="3" height="3"/>
          <rect x="18" y="14" width="3" height="3"/>
          <rect x="14" y="18" width="3" height="3"/>
          <rect x="18" y="18" width="3" height="3"/>
        </svg>
      </div>
      <h2>{{ t('tools.qrGenerator.title') }}</h2>
    </div>

    <div class="tool-content">
      <label class="sr-only" for="qr-input">{{ t('tools.qrGenerator.title') }}</label>
      <input
        id="qr-input"
        v-model="text"
        type="text"
        class="tool-input"
        maxlength="1200"
        :placeholder="t('tools.qrGenerator.placeholder')"
        spellcheck="false"
        autocomplete="off"
      />

      <p v-if="tooLong" class="tool-error" role="alert">{{ t('tools.qrGenerator.tooLong') }}</p>

      <div v-show="ready" class="qr-result">
        <canvas ref="canvas" class="qr-canvas" role="img" :aria-label="t('tools.qrGenerator.label')"></canvas>
        <button type="button" class="tool-btn" @click="download">{{ t('tools.qrGenerator.download') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { encode } from 'uqr'

const { t } = useI18n()

const MODULE_PX = 10   // modül başına piksel: indirilen PNG baskıya da yetsin

const text = ref('')
const canvas = ref(null)
const ready = ref(false)
const tooLong = ref(false)

// QR tamamen tarayıcıda üretilir; metin hiçbir servise gönderilmez
const draw = (value) => {
  tooLong.value = false
  ready.value = false
  if (!value.trim() || !canvas.value) return
  let qr
  try {
    qr = encode(value, { ecc: 'M', border: 2 })
  } catch {
    tooLong.value = true
    return
  }
  const el = canvas.value
  el.width = el.height = qr.size * MODULE_PX
  const ctx = el.getContext('2d')
  // Temadan bağımsız: okuyucular için beyaz zemin, siyah modül
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, el.width, el.height)
  ctx.fillStyle = '#000'
  qr.data.forEach((row, y) => row.forEach((on, x) => {
    if (on) ctx.fillRect(x * MODULE_PX, y * MODULE_PX, MODULE_PX, MODULE_PX)
  }))
  ready.value = true
}

watch(text, draw)

const download = () => {
  canvas.value?.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'qrcode.png'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }, 'image/png')
}
</script>

<style scoped src="./tool-base.css"></style>
<style scoped>
.qr-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.qr-canvas {
  width: min(220px, 100%);
  height: auto;
  aspect-ratio: 1;
  image-rendering: pixelated;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
}

.qr-result .tool-btn {
  align-self: stretch;
}
</style>
