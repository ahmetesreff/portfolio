<template>
  <div class="terminal-container">
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="btn-close"></span>
          <span class="btn-minimize"></span>
          <span class="btn-maximize"></span>
        </div>
        <div class="terminal-title">visitor@portfolio:~</div>
      </div>

      <div class="terminal-body" ref="terminalBody" @click="focusInput">
        <div class="terminal-welcome">
          <pre>{{ welcomeArt }}</pre>
          <p>{{ t('terminal.welcome') }}</p>
          <p class="hint">{{ t('terminal.hint') }}</p>
        </div>

        <div v-for="(item, index) in history" :key="index" class="terminal-line">
          <div class="terminal-prompt">
            <span class="prompt-user">visitor@portfolio</span>
            <span class="prompt-separator">:</span>
            <span class="prompt-path">~</span>
            <span class="prompt-symbol">$</span>
            <span class="prompt-command">{{ item.command }}</span>
          </div>
          <div class="terminal-output" v-html="item.output"></div>
        </div>

        <div class="terminal-input-line">
          <span class="prompt-user">visitor@portfolio</span>
          <span class="prompt-separator">:</span>
          <span class="prompt-path">~</span>
          <span class="prompt-symbol">$</span>
          <input
            ref="terminalInput"
            v-model="currentCommand"
            @keydown.enter="executeCommand"
            @keydown.up.prevent="navigateHistory('up')"
            @keydown.down.prevent="navigateHistory('down')"
            @keydown.tab.prevent="autocomplete"
            class="terminal-input"
            spellcheck="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()

const terminalBody = ref(null)
const terminalInput = ref(null)
const currentCommand = ref('')
const history = ref([])
const commandHistory = ref([])
const historyIndex = ref(-1)

const welcomeArt = `
 ____             _                  _   ____
| __ )  __ _  ___| | _____ _ __   __| | |  _ \\  _____   __
|  _ \\ / _\` |/ __| |/ / _ \\ '_ \\ / _\` | | | | |/ _ \\ \\ / /
| |_) | (_| | (__|   <  __/ | | | (_| | | |_| |  __/\\ V /
|____/ \\__,_|\\___|_|\\_\\___|_| |_|\\__,_| |____/ \\___| \\_/
`

const commands = {
  help: {
    tr: `<div class="help-section">
<strong>Kullanılabilir Komutlar:</strong>

  <span class="cmd">whoami</span>          - Ben kimim?
  <span class="cmd">ls</span>              - Dizin içeriğini listele
  <span class="cmd">ls /skills</span>      - Yeteneklerimi gör
  <span class="cmd">ls /experience</span>  - Deneyimlerimi gör
  <span class="cmd">cat &lt;file&gt;</span>      - Dosya içeriğini göster
  <span class="cmd">clear</span>           - Terminali temizle
  <span class="cmd">help</span>            - Bu yardım mesajı
  <span class="cmd">sudo hire-me</span>    - İletişime geç
  <span class="cmd">lang</span>            - Dili değiştir (tr/en)
  <span class="cmd">easter-egg</span>      - 🥚 Sürpriz!

<span class="hint">💡 Tab tuşu ile otomatik tamamlama yapabilirsiniz</span>
</div>`,
    en: `<div class="help-section">
<strong>Available Commands:</strong>

  <span class="cmd">whoami</span>          - Who am I?
  <span class="cmd">ls</span>              - List directory contents
  <span class="cmd">ls /skills</span>      - View my skills
  <span class="cmd">ls /experience</span>  - View my experience
  <span class="cmd">cat &lt;file&gt;</span>      - Display file contents
  <span class="cmd">clear</span>           - Clear terminal
  <span class="cmd">help</span>            - Show this help message
  <span class="cmd">sudo hire-me</span>    - Get in touch
  <span class="cmd">lang</span>            - Change language (tr/en)
  <span class="cmd">easter-egg</span>      - 🥚 Surprise!

<span class="hint">💡 Use Tab key for autocomplete</span>
</div>`
  },

  whoami: {
    tr: `<div class="whoami">
<strong>Ahmet Eşref Karabulut</strong>
Backend Developer & IT Management Experience

📍 Trabzon, Türkiye
💼 Bibs Teknoloji
🎓 Bilgisayar Programcılığı

<span class="hint">Daha fazla bilgi için: <span class="cmd">cat /about</span></span>
</div>`,
    en: `<div class="whoami">
<strong>Ahmet Eşref Karabulut</strong>
Backend Developer & IT Management Experience

📍 Trabzon, Turkey
💼 Bibs Teknoloji
🎓 Computer Programming

<span class="hint">For more info: <span class="cmd">cat /about</span></span>
</div>`
  }
}

const files = {
  about: {
    tr: `Backend sistemler geliştirirken aynı zamanda kurumsal IT altyapısı ve operasyon süreçleri konusunda tecrübeye sahibim.

Kariyerime web scraping ile başladım, IT Manager olarak çalıştım, şimdi backend development yapıyorum.`,
    en: `I develop backend systems while having experience in corporate IT infrastructure and operational processes.

Started with web scraping, worked as IT Manager, now doing backend development.`
  },
  contact: {
    tr: `📧 ahmetesrefkarabulut@gmail.com
🐙 github.com/ahmetesreff
💼 linkedin.com/in/ahmetesrefkarabulut`,
    en: `📧 ahmetesrefkarabulut@gmail.com
🐙 github.com/ahmetesreff
💼 linkedin.com/in/ahmetesrefkarabulut`
  }
}

const directories = {
  skills: ['NestJS', 'PostgreSQL', 'Redis', 'Docker', 'TypeScript', 'Linux', 'Nginx', 'Git', 'CI/CD', 'REST API'],
  experience: ['backend-developer.txt', 'it-manager.txt', 'it-specialist.txt', 'data-processing.txt']
}

const focusInput = () => {
  terminalInput.value?.focus()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })
}

const executeCommand = () => {
  const cmd = currentCommand.value.trim()
  if (!cmd) {
    currentCommand.value = ''
    return
  }

  commandHistory.value.push(cmd)
  historyIndex.value = commandHistory.value.length

  let output = processCommand(cmd)

  history.value.push({
    command: cmd,
    output: output
  })

  currentCommand.value = ''
  scrollToBottom()
}

const processCommand = (cmd) => {
  const parts = cmd.split(' ')
  const command = parts[0].toLowerCase()
  const args = parts.slice(1)
  const lang = locale.value

  switch (command) {
    case 'help':
      return commands.help[lang]

    case 'whoami':
      return commands.whoami[lang]

    case 'clear':
      history.value = []
      return ''

    case 'ls':
      if (args.length === 0) {
        return `<div class="ls-output">
about  contact  experience/  skills/
<span class="hint">Klasör içeriği için: ls /&lt;klasör&gt;</span>
</div>`
      }
      const dir = args[0].replace(/^\//, '')
      if (directories[dir]) {
        return `<div class="ls-output">${directories[dir].join('  ')}</div>`
      }
      return `<span class="error">ls: ${args[0]}: No such directory</span>`

    case 'cat':
      if (args.length === 0) {
        return `<span class="error">cat: missing file operand</span>`
      }
      const file = args[0].replace(/^\//, '')
      if (files[file]) {
        return `<div class="cat-output">${files[file][lang]}</div>`
      }
      return `<span class="error">cat: ${args[0]}: No such file</span>`

    case 'sudo':
      if (args[0] === 'hire-me') {
        setTimeout(() => router.push('/iletisim'), 1000)
        return `<div class="success">
✅ Permission granted!
🚀 Redirecting to /contact...
</div>`
      }
      return `<span class="error">sudo: ${args.join(' ')}: command not found</span>`

    case 'lang':
      locale.value = locale.value === 'tr' ? 'en' : 'tr'
      return `<div class="success">Language changed to: ${locale.value.toUpperCase()}</div>`

    case 'easter-egg':
      return `<div class="easter-egg">
🎉 Congratulations! You found the Easter Egg! 🎉

<pre>
    ___
   /   \\
  | o o |
   \\   /
    ---
</pre>

<span class="hint">Try: <span class="cmd">cat /secrets</span> 🤫</span>
</div>`

    case '':
      return ''

    default:
      return `<span class="error">bash: ${command}: command not found
<span class="hint">Try '<span class="cmd">help</span>' to see available commands</span></span>`
  }
}

const navigateHistory = (direction) => {
  if (commandHistory.value.length === 0) return

  if (direction === 'up') {
    if (historyIndex.value > 0) {
      historyIndex.value--
      currentCommand.value = commandHistory.value[historyIndex.value]
    }
  } else {
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++
      currentCommand.value = commandHistory.value[historyIndex.value]
    } else {
      historyIndex.value = commandHistory.value.length
      currentCommand.value = ''
    }
  }
}

const autocomplete = () => {
  const cmd = currentCommand.value.toLowerCase()
  const availableCommands = ['help', 'whoami', 'ls', 'cat', 'clear', 'sudo', 'lang', 'easter-egg']
  const matches = availableCommands.filter(c => c.startsWith(cmd))

  if (matches.length === 1) {
    currentCommand.value = matches[0]
  }
}
</script>

<style scoped>
.terminal-container {
  width: 100%;
  max-width: 900px;
  margin: var(--spacing-xl) auto;
  padding: 0 var(--spacing-md);
}

.terminal {
  background: #1e1e1e;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
}

.terminal-header {
  background: #323232;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #444;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.terminal-buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
}

.btn-close {
  background: #ff5f56;
}

.btn-minimize {
  background: #ffbd2e;
}

.btn-maximize {
  background: #27c93f;
}

.terminal-title {
  color: #999;
  font-size: 12px;
  flex: 1;
  text-align: center;
  margin-right: 52px;
}

.terminal-body {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 20px;
  min-height: 500px;
  max-height: 600px;
  overflow-y: auto;
  cursor: text;
}

.terminal-body::-webkit-scrollbar {
  width: 10px;
}

.terminal-body::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.terminal-body::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 5px;
}

.terminal-welcome {
  margin-bottom: 24px;
}

.terminal-welcome pre {
  color: #4ec9b0;
  font-size: 10px;
  line-height: 1.2;
  margin-bottom: 12px;
}

.terminal-welcome p {
  color: #d4d4d4;
  margin-bottom: 8px;
}

.terminal-line {
  margin-bottom: 16px;
}

.terminal-prompt {
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
}

.prompt-user {
  color: #4ec9b0;
}

.prompt-separator {
  color: #d4d4d4;
}

.prompt-path {
  color: #569cd6;
}

.prompt-symbol {
  color: #d4d4d4;
  margin-right: 8px;
}

.prompt-command {
  color: #d4d4d4;
}

.terminal-output {
  color: #d4d4d4;
  margin-left: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.terminal-input-line {
  display: flex;
  gap: 4px;
  align-items: center;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #d4d4d4;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
}

.hint {
  color: #858585;
  font-size: 13px;
}

.cmd {
  color: #4ec9b0;
  font-weight: 600;
}

.error {
  color: #f48771;
}

.success {
  color: #89d185;
}

.ls-output {
  color: #569cd6;
}

.cat-output {
  color: #d4d4d4;
  line-height: 1.6;
}

.help-section strong {
  color: #4ec9b0;
  display: block;
  margin-bottom: 12px;
}

.whoami {
  line-height: 1.8;
}

.whoami strong {
  color: #4ec9b0;
  font-size: 16px;
}

.easter-egg {
  color: #ce9178;
  text-align: center;
}

.easter-egg pre {
  color: #dcdcaa;
  font-size: 12px;
}

@media (max-width: 768px) {
  .terminal {
    font-size: 12px;
  }

  .terminal-welcome pre {
    font-size: 8px;
  }

  .terminal-body {
    min-height: 400px;
    max-height: 500px;
    padding: 16px;
  }
}
</style>
