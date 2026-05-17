<template>
  <div class="term-hero">
    <div class="term-window">
      <div class="term-bar">
        <div class="term-lights" aria-hidden="true">
          <i></i><i></i><i></i>
        </div>
        <span class="term-path">aek@portfolio:~/profile</span>
        <span class="term-live" aria-hidden="true">
          <i></i>live
        </span>
      </div>

      <div class="term-screen">
        <div class="term-body">
          <p class="ln">
            <span class="usr">aek@portfolio</span><span class="sep">:</span><span class="cwd">~</span><span class="dollar">$</span>
            <span class="kw">whoami</span>
          </p>

          <div class="term-id">
            <div class="term-avatar">
              <img :src="profileImage" alt="Ahmet Eşref Karabulut" />
              <span class="term-scan" aria-hidden="true"></span>
              <span class="term-bracket tl" aria-hidden="true"></span>
              <span class="term-bracket br" aria-hidden="true"></span>
            </div>
            <div class="term-id-text">
              <h1 class="term-name">{{ t('profile.name') }}</h1>
              <p class="term-role">
                <span class="arrow" aria-hidden="true">&gt;</span>
                <TypeWriter />
              </p>
            </div>
          </div>

          <p class="ln dim">
            <span class="dollar">$</span> <span class="kw">cat</span> about.txt
          </p>
          <p class="term-bio">{{ t('profile.bio') }}</p>

          <p class="ln dim">
            <span class="dollar">$</span> <span class="kw">ls</span> ./stack
          </p>
          <ul class="term-stack">
            <li v-for="item in stack" :key="item">{{ item }}</li>
          </ul>

          <p class="ln dim">
            <span class="dollar">$</span> <span class="kw">./contact.sh</span>
          </p>
          <div class="term-actions">
            <router-link to="/iletisim" class="term-btn">
              <span class="glyph" aria-hidden="true">▸</span>
              {{ t('profile.contactButton') }}
            </router-link>
            <nav class="term-flags" aria-label="Social links">
              <a
                v-for="link in socialLinks"
                :key="link.flag"
                :href="link.url"
                :aria-label="link.label"
                target="_blank"
                rel="noopener noreferrer"
                class="term-flag"
              >--{{ link.flag }}</a>
            </nav>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import TypeWriter from '../TypeWriter.vue'

import profilePhoto from '../../assets/images/profile.jpg'

const { t } = useI18n()
const profileImage = profilePhoto

const stack = ['NestJS', 'PostgreSQL', 'Docker', 'Redis', 'TypeScript', 'REST API']

const socialLinks = [
  { flag: 'github', label: 'GitHub', url: 'https://github.com/ahmetesreff' },
  { flag: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmetesrefkarabulut/' },
  { flag: 'email', label: 'Email', url: 'mailto:ahmetesrefkarabulut@gmail.com' }
]
</script>

<style scoped>
/* Theme-aware terminal: a clean "light editor" look by default,
   and a full CRT/phosphor look under the site's dark theme.
   Palette is driven by variables; CRT-only effects (scanlines,
   beam, glow, phosphor photo) are gated to [data-theme="dark"]. */
.term-hero {
  /* palette comes from the shared terminal design system */
  --t-bg: var(--tw-bg);
  --t-bar: var(--tw-bar);
  --t-fg: var(--tw-fg);
  --t-green: var(--tw-green);
  --t-green-soft: var(--tw-green-soft);
  --t-amber: var(--tw-amber);
  --t-dim: var(--tw-dim);
  --t-line: var(--tw-line);
  --t-edge: var(--tw-edge);
  --t-name: var(--tw-name);
  --t-bio: var(--tw-bio);
  --t-stack-bg: var(--tw-stack-bg);
  --t-win-shadow: var(--tw-win-shadow);
  --t-screen-bg: var(--tw-bg);

  width: 100%;
  display: flex;
  justify-content: center;
  font-family: var(--tw-mono);
}

[data-theme="dark"] .term-hero {
  /* hero-only CRT screen wash (palette already themed via --tw-*) */
  --t-screen-bg: radial-gradient(
      120% 90% at 50% 0%,
      rgba(52, 211, 153, 0.06),
      transparent 60%
    ),
    var(--tw-bg);
}

.term-window {
  width: 100%;
  max-width: 720px;
  border-radius: 14px;
  background: var(--t-bg);
  border: 1px solid var(--t-edge);
  box-shadow: var(--t-win-shadow);
  overflow: hidden;
  animation: win-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes win-in {
  from { opacity: 0; transform: translateY(16px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ---- Title bar ---- */
.term-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 44px;
  padding: 0 16px;
  background: var(--t-bar);
  border-bottom: 1px solid var(--t-edge);
}

.term-lights {
  display: flex;
  gap: 8px;
}

.term-lights i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: block;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.term-lights i:nth-child(1) { background: #e0533b; }
.term-lights i:nth-child(2) { background: #e6a417; }
.term-lights i:nth-child(3) { background: #1ba672; }

.term-path {
  flex: 1;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--t-dim);
}

.term-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--t-green-soft);
}

.term-live i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--t-green);
  animation: pulse 1.8s ease-in-out infinite;
}

[data-theme="dark"] .term-live i {
  box-shadow: 0 0 8px var(--t-green);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

/* ---- Screen ---- */
.term-screen {
  position: relative;
  padding: clamp(20px, 4vw, 38px) clamp(20px, 4vw, 42px);
  background: var(--t-screen-bg);
  overflow: hidden;
}

[data-theme="dark"] .term-screen {
  box-shadow: inset 0 0 120px -40px rgba(0, 0, 0, 0.9);
}

/* scanlines + travelling beam: CRT only (dark theme) */
.term-screen::before,
.term-screen::after {
  content: '';
  position: absolute;
  pointer-events: none;
  display: none;
}

[data-theme="dark"] .term-screen::before {
  display: block;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0 2px,
    rgba(0, 0, 0, 0.16) 2px 4px
  );
  z-index: 3;
  opacity: 0.55;
}

[data-theme="dark"] .term-screen::after {
  display: block;
  left: 0;
  right: 0;
  top: 0;
  height: 36%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(52, 211, 153, 0.05) 70%,
    rgba(52, 211, 153, 0.09)
  );
  z-index: 2;
  animation: beam 7s linear infinite;
}

@keyframes beam {
  0% { transform: translateY(-120%); }
  100% { transform: translateY(360%); }
}

.term-body {
  position: relative;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.term-body > * {
  animation: ln-in 0.5s ease-out both;
}

.term-body > *:nth-child(1) { animation-delay: 0.25s; }
.term-body > *:nth-child(2) { animation-delay: 0.34s; }
.term-body > *:nth-child(3) { animation-delay: 0.5s; }
.term-body > *:nth-child(4) { animation-delay: 0.58s; }
.term-body > *:nth-child(5) { animation-delay: 0.7s; }
.term-body > *:nth-child(6) { animation-delay: 0.78s; }
.term-body > *:nth-child(7) { animation-delay: 0.9s; }
.term-body > *:nth-child(8) { animation-delay: 0.98s; }
.term-body > *:nth-child(9) { animation-delay: 1.1s; }

@keyframes ln-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ---- Prompt lines ---- */
.ln {
  font-size: 13.5px;
  color: var(--t-fg);
  margin: 0;
  line-height: 1.5;
  word-break: break-word;
}

.ln.dim { color: var(--t-dim); margin-top: 4px; }
.usr { color: var(--t-green); }
.sep { color: var(--t-dim); }
.cwd { color: var(--t-amber); }
.dollar { color: var(--t-green); margin: 0 6px 0 2px; }
.kw { color: var(--t-amber); }

/* ---- Identity block ---- */
.term-id {
  display: flex;
  align-items: center;
  gap: clamp(18px, 4vw, 30px);
  padding: 6px 0 4px;
}

.term-avatar {
  position: relative;
  flex-shrink: 0;
  width: clamp(96px, 22vw, 132px);
  height: clamp(96px, 22vw, 132px);
}

.term-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border: 1px solid var(--t-edge);
  border-radius: 4px;
  filter: grayscale(0.15) contrast(1.03);
}

[data-theme="dark"] .term-avatar img {
  filter: grayscale(1) brightness(0.92) contrast(1.08) sepia(0.45)
    hue-rotate(78deg) saturate(1.5);
  mix-blend-mode: screen;
}

.term-avatar::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 4px;
  background: linear-gradient(160deg, rgba(15, 157, 107, 0.12), transparent 55%);
  pointer-events: none;
}

[data-theme="dark"] .term-avatar::after {
  background: linear-gradient(160deg, rgba(52, 211, 153, 0.18), transparent 55%);
}

/* moving scan line over the photo: CRT only */
.term-scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  top: 0;
  display: none;
  pointer-events: none;
}

[data-theme="dark"] .term-scan {
  display: block;
  background: rgba(127, 233, 190, 0.55);
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.7);
  animation: avatar-scan 3.2s ease-in-out infinite;
}

@keyframes avatar-scan {
  0%, 100% { top: 4%; opacity: 0; }
  10% { opacity: 1; }
  50% { top: 94%; opacity: 0.9; }
  90% { opacity: 1; }
}

.term-bracket {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: var(--t-green);
  pointer-events: none;
}

.term-bracket.tl {
  top: -5px;
  left: -5px;
  border-top: 2px solid;
  border-left: 2px solid;
}

.term-bracket.br {
  bottom: -5px;
  right: -5px;
  border-bottom: 2px solid;
  border-right: 2px solid;
}

.term-id-text { min-width: 0; }

.term-name {
  font-size: clamp(1.5rem, 5.5vw, 2.45rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: var(--t-name);
  margin: 0 0 10px;
}

[data-theme="dark"] .term-name {
  text-shadow: 0 0 22px rgba(52, 211, 153, 0.35);
}

.term-role {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: clamp(0.95rem, 2.6vw, 1.18rem);
  color: var(--t-green-soft);
  margin: 0;
}

.term-role .arrow { color: var(--t-amber); font-weight: 700; }

/* recolor the shared TypeWriter to match the palette */
.term-role :deep(.typewriter-text) { color: var(--t-green-soft); }
.term-role :deep(.typewriter-cursor) { color: var(--t-amber); }

/* ---- Bio ---- */
.term-bio {
  font-size: 14px;
  line-height: 1.65;
  color: var(--t-bio);
  margin: 0;
  max-width: 62ch;
  padding-left: 14px;
  border-left: 1px solid var(--t-line);
}

/* ---- Stack ---- */
.term-stack {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
}

.term-stack li {
  font-size: 12.5px;
  color: var(--t-fg);
  padding: 5px 11px 5px 9px;
  border: 1px solid var(--t-edge);
  border-left: 3px solid var(--t-green);
  border-radius: 3px;
  background: var(--t-stack-bg);
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.term-stack li:hover {
  color: var(--t-amber);
  border-color: var(--t-amber);
  border-left-color: var(--t-amber);
  background: rgba(194, 65, 12, 0.07);
}

[data-theme="dark"] .term-stack li:hover {
  background: rgba(244, 183, 64, 0.07);
}

/* ---- Actions ---- */
.term-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 22px;
  margin-top: 4px;
}

.term-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--t-green);
  padding: 11px 22px;
  border: 1px solid var(--t-green);
  border-radius: 4px;
  background: transparent;
  text-decoration: none;
  transition: background 0.18s ease, color 0.18s ease,
    box-shadow 0.18s ease, transform 0.18s ease;
}

.term-btn .glyph { transition: transform 0.18s ease; }

.term-btn:hover {
  background: var(--t-green);
  color: var(--t-bg);
  box-shadow: 0 0 22px -2px rgba(15, 157, 107, 0.45);
}

[data-theme="dark"] .term-btn:hover {
  box-shadow: 0 0 22px -2px rgba(52, 211, 153, 0.6);
}

.term-btn:hover .glyph { transform: translateX(3px); }
.term-btn:active { transform: translateY(1px); }

.term-flags {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.term-flag {
  font-size: 13px;
  color: var(--t-dim);
  text-decoration: none;
  position: relative;
  transition: color 0.18s ease;
}

.term-flag::after {
  content: '';
  position: absolute;
  left: 0;
  right: 100%;
  bottom: -3px;
  height: 1px;
  background: var(--t-amber);
  transition: right 0.22s ease;
}

.term-flag:hover { color: var(--t-amber); }
.term-flag:hover::after { right: 0; }

/* ---- Focus states ---- */
.term-btn:focus-visible,
.term-flag:focus-visible {
  outline: 2px solid var(--t-amber);
  outline-offset: 3px;
  border-radius: 3px;
}

/* ---- Responsive ---- */
@media (max-width: 560px) {
  .term-id {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .term-screen { padding: 22px 18px; }
  .ln, .term-bio { font-size: 13px; }
  .term-actions { gap: 14px; }
  .term-btn { width: 100%; justify-content: center; }
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .term-window,
  .term-body > *,
  .term-scan,
  .term-screen::after,
  .term-live i {
    animation: none !important;
  }

  .term-body > * { opacity: 1; transform: none; }
  .term-scan { display: none; }
}
</style>
