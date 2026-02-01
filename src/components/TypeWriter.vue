<template>
  <span class="typewriter">
    <span class="typewriter-text">{{ displayText }}</span>
    <span class="typewriter-cursor" :class="{ 'blink': !isTyping }">|</span>
  </span>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const props = defineProps({
  speed: {
    type: Number,
    default: 100
  },
  deleteSpeed: {
    type: Number,
    default: 50
  },
  pauseTime: {
    type: Number,
    default: 2000
  }
})

const words = {
  tr: [
    'Backend Developer',
    'API Mimarı',
    'Problem Çözücü',
    'NestJS Geliştirici',
    'IT Altyapı Uzmanı'
  ],
  en: [
    'Backend Developer',
    'API Architect',
    'Problem Solver',
    'NestJS Developer',
    'IT Infrastructure Expert'
  ]
}

const currentWords = computed(() => words[locale.value] || words.tr)

// Start with first word already displayed
const displayText = ref(currentWords.value[0])
const isTyping = ref(false)
const currentWordIndex = ref(0)
const currentCharIndex = ref(currentWords.value[0].length)
const isDeleting = ref(false)

let timeout = null

const type = () => {
  const currentWord = currentWords.value[currentWordIndex.value]

  if (isDeleting.value) {
    // Deleting
    displayText.value = currentWord.substring(0, currentCharIndex.value - 1)
    currentCharIndex.value--
    isTyping.value = true

    if (currentCharIndex.value === 0) {
      isDeleting.value = false
      currentWordIndex.value = (currentWordIndex.value + 1) % currentWords.value.length
      timeout = setTimeout(type, 500)
      return
    }

    timeout = setTimeout(type, props.deleteSpeed)
  } else {
    // Typing
    displayText.value = currentWord.substring(0, currentCharIndex.value + 1)
    currentCharIndex.value++
    isTyping.value = true

    if (currentCharIndex.value === currentWord.length) {
      isTyping.value = false
      isDeleting.value = true
      timeout = setTimeout(type, props.pauseTime)
      return
    }

    timeout = setTimeout(type, props.speed)
  }
}

onMounted(() => {
  // Start deleting after initial pause (first word is already displayed)
  isDeleting.value = true
  timeout = setTimeout(type, props.pauseTime)
})

onUnmounted(() => {
  if (timeout) {
    clearTimeout(timeout)
  }
})
</script>

<style scoped>
.typewriter {
  display: inline-flex;
  align-items: center;
}

.typewriter-text {
  display: inline;
}

.typewriter-cursor {
  display: inline-block;
  margin-left: 2px;
  font-weight: 100;
  color: var(--color-secondary);
}

.typewriter-cursor.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}
</style>
