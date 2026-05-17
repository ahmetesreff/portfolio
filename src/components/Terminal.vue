<template>
  <div class="terminal-container">
    <div class="terminal" ref="terminalRoot">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="btn-close"></span>
          <span class="btn-minimize"></span>
          <span class="btn-maximize"></span>
        </div>
        <div class="terminal-title">aek@portfolio:~</div>
      </div>

      <div class="terminal-body" ref="terminalBody" @click="focusInput">
        <div class="terminal-welcome">
          <pre>{{ welcomeArt }}</pre>
          <p>{{ t('terminal.welcome') }}</p>
          <p class="hint">{{ t('terminal.hint') }}</p>
        </div>

        <div v-for="(item, index) in history" :key="index" class="terminal-line">
          <div v-if="!item.raw" class="terminal-prompt">
            <span class="prompt-user">aek@portfolio</span>
            <span class="prompt-separator">:</span>
            <span class="prompt-path">~</span>
            <span class="prompt-symbol">$</span>
            <span class="prompt-command">{{ item.command }}</span>
          </div>
          <div class="terminal-output" v-html="item.output"></div>
        </div>

        <div class="terminal-input-line">
          <span class="prompt-user">aek@portfolio</span>
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
            autocapitalize="off"
            autocorrect="off"
            autocomplete="off"
            :aria-label="t('terminal.inputLabel')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import profilePhoto from '../assets/images/profile.jpg'

const { t, locale } = useI18n()
const router = useRouter()

const terminalBody = ref(null)
const terminalInput = ref(null)
const terminalRoot = ref(null)
const currentCommand = ref('')
const history = ref([])
const commandHistory = ref([])
const historyIndex = ref(-1)

// Sentinel: `clear` wipes the screen and must NOT echo its own line
const CLEAR = Symbol('clear')
const COMMANDS = ['help', 'whoami', 'neofetch', 'ls', 'cat', 'clear', 'sudo', 'lang', 'easter-egg', 'pwd', 'echo', 'date', 'history']

// neofetch: profile photo rendered to ASCII via canvas (computed once)
const ASCII_COLS = 64
// Paul Bourke 70-level ramp, dense -> sparse
const ASCII_RAMP = `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^\`'. `
let lumGrid = null

const loadAsciiSource = () => {
  const img = new Image()
  img.src = profilePhoto
  img.onload = () => {
    const cols = ASCII_COLS
    const rows = Math.max(1, Math.round((cols * img.height / img.width) * 0.5))
    const canvas = document.createElement('canvas')
    canvas.width = cols
    canvas.height = rows
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, cols, rows)
    const { data } = ctx.getImageData(0, 0, cols, rows)
    const grid = []
    for (let y = 0; y < rows; y++) {
      const line = []
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4
        line.push((0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255)
      }
      grid.push(line)
    }
    lumGrid = grid
  }
}

const buildAscii = () => {
  if (!lumGrid) return null

  // Stretch contrast across the actual luminance range so the
  // portrait reads as a shape instead of a washed-out blob.
  let min = 1
  let max = 0
  for (const row of lumGrid) {
    for (const l of row) {
      if (l < min) min = l
      if (l > max) max = l
    }
  }
  const span = max - min || 1
  const dark = document.documentElement.getAttribute('data-theme') === 'dark'
  const n = ASCII_RAMP.length - 1

  return lumGrid
    .map((row) =>
      row
        .map((l) => {
          let v = (l - min) / span // normalize to full 0..1 range
          v = Math.min(1, Math.max(0, (v - 0.5) * 1.4 + 0.5)) // S-curve contrast
          const t = dark ? 1 - v : v
          return ASCII_RAMP[Math.round(t * n)]
        })
        .join('')
    )
    .join('\n')
}

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
  <span class="cmd">neofetch</span>        - Sistem künyesi (ASCII foto)
  <span class="cmd">ls</span>              - Dizin içeriğini listele
  <span class="cmd">ls /skills</span>      - Yeteneklerimi gör
  <span class="cmd">ls /experience</span>  - Deneyimlerimi gör
  <span class="cmd">cat &lt;file&gt;</span>      - Dosya içeriğini göster
  <span class="cmd">pwd</span>             - Bulunduğun dizin
  <span class="cmd">echo &lt;metin&gt;</span>    - Metni yazdır
  <span class="cmd">date</span>            - Tarih ve saat
  <span class="cmd">history</span>         - Komut geçmişi
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
  <span class="cmd">neofetch</span>        - System info (ASCII photo)
  <span class="cmd">ls</span>              - List directory contents
  <span class="cmd">ls /skills</span>      - View my skills
  <span class="cmd">ls /experience</span>  - View my experience
  <span class="cmd">cat &lt;file&gt;</span>      - Display file contents
  <span class="cmd">pwd</span>             - Print working directory
  <span class="cmd">echo &lt;text&gt;</span>     - Print text
  <span class="cmd">date</span>            - Date and time
  <span class="cmd">history</span>         - Command history
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
  },
  // Hidden: not listed by ls, only reachable via the easter-egg hint
  secrets: {
    tr: `🔓 Gizli dosyaya eriştin!

"İyi bir backend, kullanıcının asla görmediği yerde mükemmel çalışandır."

Bu siteyi terminaliyle birlikte Vue 3 + Vite ile sıfırdan yazdım.
Buraya kadar geldiysen: sudo hire-me 😉`,
    en: `🔓 You found the secret file!

"A good backend is the one that works flawlessly where the user never looks."

I built this whole site — terminal included — from scratch with Vue 3 + Vite.
If you made it this far: sudo hire-me 😉`
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

  const output = processCommand(cmd)

  if (output === CLEAR) {
    history.value = []
    currentCommand.value = ''
    return
  }

  history.value.push({
    command: cmd,
    output: output
  })

  currentCommand.value = ''
  scrollToBottom()
}

// Escape user-controlled input before it is embedded into v-html output
const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

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
      return CLEAR

    case 'pwd':
      return `<div class="cat-output">/home/visitor</div>`

    case 'echo':
      return `<div class="cat-output">${escapeHtml(args.join(' '))}</div>`

    case 'date':
      return `<div class="cat-output">${escapeHtml(new Date().toString())}</div>`

    case 'history': {
      if (commandHistory.value.length === 0) {
        return `<div class="cat-output"></div>`
      }
      return `<div class="cat-output">${commandHistory.value
        .map((c, i) => `${String(i + 1).padStart(3, ' ')}  ${escapeHtml(c)}`)
        .join('\n')}</div>`
    }

    case 'neofetch': {
      const art = buildAscii()
      if (!art) {
        return `<span class="hint">rendering... try again in a moment</span>`
      }
      const info = `<span class="nf-key">visitor</span>@<span class="nf-key">portfolio</span>
-----------------
<span class="nf-key">OS</span>: Portfolio OS (Vue 3 + Vite)
<span class="nf-key">Host</span>: ahmetesrefkarabulut.com.tr
<span class="nf-key">Role</span>: Backend Developer
<span class="nf-key">Stack</span>: NestJS · PostgreSQL · Docker · Redis
<span class="nf-key">Editor</span>: VS Code
<span class="nf-key">Location</span>: Trabzon, TR
<span class="nf-key">Shell</span>: aek-sh 1.0
<span class="nf-key">Contact</span>: sudo hire-me`
      return `<div class="neofetch"><pre class="nf-art">${escapeHtml(art)}</pre><div class="nf-info">${info}</div></div>`
    }

    case 'ls': {
      if (args.length === 0) {
        return `<div class="ls-output">
about  contact  experience/  skills/
<span class="hint">${escapeHtml(t('terminal.lsHint'))}</span>
</div>`
      }
      const name = args[0].replace(/^\//, '')
      if (directories[name]) {
        return `<div class="ls-output">${directories[name].join('  ')}</div>`
      }
      if (files[name]) {
        return `<span class="error">ls: ${escapeHtml(args[0])}: Not a directory</span>`
      }
      return `<span class="error">ls: ${escapeHtml(args[0])}: No such file or directory</span>`
    }

    case 'cat': {
      if (args.length === 0) {
        return `<span class="error">cat: missing file operand</span>`
      }
      const name = args[0].replace(/^\//, '')
      if (files[name]) {
        return `<div class="cat-output">${files[name][lang]}</div>`
      }
      if (directories[name]) {
        return `<span class="error">cat: ${escapeHtml(args[0])}: Is a directory</span>`
      }
      return `<span class="error">cat: ${escapeHtml(args[0])}: No such file or directory</span>`
    }

    case 'sudo':
      if (args[0] === 'hire-me') {
        setTimeout(() => router.push('/iletisim'), 1000)
        return `<div class="success">
✅ Permission granted!
🚀 Redirecting to /iletisim...
</div>`
      }
      return `<span class="error">sudo: ${escapeHtml(args.join(' '))}: command not found</span>`

    case 'lang':
      locale.value = locale.value === 'tr' ? 'en' : 'tr'
      localStorage.setItem('locale', locale.value)
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
      return `<span class="error">bash: ${escapeHtml(command)}: command not found
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
  if (!cmd) return

  const matches = COMMANDS.filter(c => c.startsWith(cmd))
  if (matches.length === 0) return

  if (matches.length === 1) {
    currentCommand.value = matches[0]
    return
  }

  // Complete to the longest common prefix of all matches...
  let prefix = matches[0]
  for (const m of matches) {
    while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1)
  }

  if (prefix.length > cmd.length) {
    currentCommand.value = prefix
    return
  }

  // ...otherwise list the candidates (bash double-Tab style)
  history.value.push({
    raw: true,
    output: `<div class="ls-output">${matches.join('  ')}</div>`
  })
  scrollToBottom()
}

onMounted(loadAsciiSource)

let viewObserver = null

onMounted(() => {
  // Focus the input once the terminal scrolls into view, but skip
  // touch devices so the keyboard doesn't pop up mid-scroll.
  const isTouch = window.matchMedia('(hover: none)').matches
  if (isTouch || !('IntersectionObserver' in window)) return

  viewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        terminalInput.value?.focus({ preventScroll: true })
        viewObserver.disconnect()
      }
    })
  }, { threshold: 0.6 })

  if (terminalRoot.value) viewObserver.observe(terminalRoot.value)
})

onUnmounted(() => {
  if (viewObserver) viewObserver.disconnect()
})
</script>

<style scoped>
/* Theme-aware palette: light "editor" by default, the original
   dark scheme under the site's [data-theme="dark"]. */
.terminal-container {
  /* Inherit the shared terminal design system so the interactive
     shell matches the hero / About / Contact / Tools windows.
     --tw-* is already theme-aware, so no dark override is needed. */
  --tm-bg: var(--tw-bg);
  --tm-header-bg: var(--tw-bar);
  --tm-border: var(--tw-edge);
  --tm-title: var(--tw-dim);
  --tm-text: var(--tw-fg);
  --tm-user: var(--tw-green);
  --tm-path: var(--tw-amber);
  --tm-hint: var(--tw-dim);
  --tm-error: #e5484d;
  --tm-success: var(--tw-green);
  --tm-easter: var(--tw-amber);
  --tm-easter-pre: var(--tw-green-soft);
  --tm-scroll-thumb: var(--tw-edge);

  width: 100%;
  max-width: 860px;
  margin: var(--spacing-xl) auto;
  padding: 0 var(--spacing-md);
}

.terminal {
  background: var(--tm-bg);
  border: 1px solid var(--tm-border);
  border-radius: 14px;
  box-shadow: var(--tw-win-shadow);
  overflow: hidden;
  font-family: var(--tw-mono);
  font-size: 14px;
}

.terminal-header {
  background: var(--tm-header-bg);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--tm-border);
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
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.btn-close {
  background: #e0533b;
}

.btn-minimize {
  background: #e6a417;
}

.btn-maximize {
  background: #1ba672;
}

.terminal-title {
  color: var(--tm-title);
  font-size: 12px;
  letter-spacing: 0.04em;
  flex: 1;
  text-align: center;
  margin-right: 52px;
}

.terminal-body {
  background: var(--tm-bg);
  color: var(--tm-text);
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
  background: var(--tm-bg);
}

.terminal-body::-webkit-scrollbar-thumb {
  background: var(--tm-scroll-thumb);
  border-radius: 5px;
}

.terminal-welcome {
  margin-bottom: 24px;
}

.terminal-welcome pre {
  color: var(--tm-user);
  font-size: 10px;
  line-height: 1.2;
  margin-bottom: 12px;
}

.terminal-welcome p {
  color: var(--tm-text);
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
  color: var(--tm-user);
}

.prompt-separator {
  color: var(--tm-text);
}

.prompt-path {
  color: var(--tm-path);
}

.prompt-symbol {
  color: var(--tm-text);
  margin-right: 8px;
}

.prompt-command {
  color: var(--tm-text);
}

.terminal-output {
  color: var(--tm-text);
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
  color: var(--tm-text);
  font-family: inherit;
  font-size: inherit;
  padding: 0;
}

.hint {
  color: var(--tm-hint);
  font-size: 13px;
}

.cmd {
  color: var(--tm-user);
  font-weight: 600;
}

.error {
  color: var(--tm-error);
}

.success {
  color: var(--tm-success);
}

.ls-output {
  color: var(--tm-path);
}

.cat-output {
  color: var(--tm-text);
  line-height: 1.6;
}

.neofetch {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.nf-art {
  margin: 0;
  font-size: 6px;
  line-height: 1;
  letter-spacing: 0.5px;
  white-space: pre;
  color: var(--tm-user);
}

.nf-info {
  font-size: 13px;
  line-height: 1.55;
  color: var(--tm-text);
}

.nf-key {
  color: var(--tm-path);
  font-weight: 600;
}

@media (max-width: 768px) {
  .nf-art { font-size: 4px; letter-spacing: 0.3px; }
  .neofetch { gap: 14px; }
}

.help-section strong {
  color: var(--tm-user);
  display: block;
  margin-bottom: 12px;
}

.whoami {
  line-height: 1.8;
}

.whoami strong {
  color: var(--tm-user);
  font-size: 16px;
}

.easter-egg {
  color: var(--tm-easter);
  text-align: center;
}

.easter-egg pre {
  color: var(--tm-easter-pre);
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
