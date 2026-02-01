<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="logo">
          <span class="logo-initials">AEK</span>
        </router-link>

        <div class="nav-right">
          <div class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
          <router-link
            to="/"
            class="nav-link"
            @click="closeMenu"
          >
            {{ t('nav.home') }}
          </router-link>
          <router-link
            to="/hakkimda"
            class="nav-link"
            @click="closeMenu"
          >
            {{ t('nav.about') }}
          </router-link>
          <router-link
            to="/iletisim"
            class="nav-link"
            @click="closeMenu"
          >
            {{ t('nav.contact') }}
          </router-link>
          <router-link
            to="/araclar"
            class="nav-link"
            @click="closeMenu"
          >
            {{ t('nav.tools') }}
          </router-link>
          </div>

          <LanguageToggle />
          <ThemeToggle />

          <button
          class="nav-toggle"
          @click="toggleMenu"
          aria-label="Menu"
        >
          <span class="hamburger"></span>
        </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ThemeToggle from '../ThemeToggle.vue'
import LanguageToggle from '../LanguageToggle.vue'

const { t } = useI18n()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 0.5px solid var(--color-border);
  padding: 0;
  z-index: var(--z-index-header);
}

[data-theme="dark"] .header {
  background: rgba(28, 28, 30, 0.72);
  border-bottom: 0.5px solid var(--color-border);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  max-width: var(--max-width-wide);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.logo {
  text-decoration: none;
}

.logo-initials {
  font-size: 20px;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  transition: var(--transition-fast);
  letter-spacing: -0.02em;
  font-family: var(--font-primary);
}

.logo:hover .logo-initials {
  opacity: 0.7;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.nav-menu {
  display: flex;
  gap: 0;
  align-items: center;
}

.nav-link {
  color: var(--color-primary);
  font-size: 14px;
  font-weight: var(--font-weight-normal);
  padding: 0 var(--spacing-sm);
  height: 52px;
  display: flex;
  align-items: center;
  transition: var(--transition-fast);
  position: relative;
  opacity: 0.88;
}

.nav-link:hover {
  opacity: 1;
}

.nav-link.router-link-active {
  opacity: 1;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: var(--spacing-sm);
  right: var(--spacing-sm);
  height: 1px;
  background: var(--color-primary);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  cursor: pointer;
  margin-right: -12px;
}

.hamburger {
  width: 17px;
  height: 1px;
  background: var(--color-primary);
  position: relative;
  transition: var(--transition-fast);
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 17px;
  height: 1px;
  background: var(--color-primary);
  transition: var(--transition-fast);
}

.hamburger::before {
  top: -6px;
}

.hamburger::after {
  top: 6px;
}

/* Mobile styles */
@media (max-width: 768px) {
  .nav {
    padding: 0 var(--spacing-sm);
  }

  .nav-right {
    gap: 0;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 52px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: saturate(180%) blur(20px);
    flex-direction: column;
    padding: var(--spacing-sm) 0;
    gap: 0;
    border-bottom: 0.5px solid var(--color-border);
    box-shadow: var(--shadow-md);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [data-theme="dark"] .nav-menu {
    background: rgba(28, 28, 30, 0.92);
  }

  .nav-menu-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    justify-content: center;
    height: 44px;
    font-size: 17px;
  }

  .nav-link.router-link-active::after {
    display: none;
  }

  .nav-menu-open + .nav-toggle .hamburger {
    background: transparent;
  }

  .nav-menu-open + .nav-toggle .hamburger::before {
    transform: rotate(45deg);
    top: 0;
  }

  .nav-menu-open + .nav-toggle .hamburger::after {
    transform: rotate(-45deg);
    top: 0;
  }
}
</style>
