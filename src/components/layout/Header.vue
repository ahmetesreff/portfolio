<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="logo">
          <span class="logo-text">Portfolio</span>
        </router-link>

        <div class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
          <router-link
            to="/"
            class="nav-link"
            @click="closeMenu"
          >
            Hakkımda
          </router-link>
          <router-link
            to="/iletisim"
            class="nav-link"
            @click="closeMenu"
          >
            İletişim
          </router-link>
        </div>

        <button
          class="nav-toggle"
          @click="toggleMenu"
          aria-label="Menu"
        >
          <span class="hamburger"></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

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
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-sm) 0;
  z-index: var(--z-index-header);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  transition: var(--transition-fast);
}

.logo:hover .logo-text {
  color: var(--color-secondary);
}

.nav-menu {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.nav-link {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--color-secondary);
  background: var(--color-surface);
}

.nav-link.router-link-active {
  color: var(--color-secondary);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: var(--spacing-sm);
  right: var(--spacing-sm);
  height: 2px;
  background: var(--color-secondary);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.hamburger {
  width: 24px;
  height: 2px;
  background: var(--color-primary);
  position: relative;
  transition: var(--transition);
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: var(--color-primary);
  transition: var(--transition);
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  top: 8px;
}

/* Mobile styles */
@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 73px;
    left: 0;
    right: 0;
    background: var(--color-background);
    flex-direction: column;
    padding: var(--spacing-md);
    gap: var(--spacing-sm);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-menu-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    width: 100%;
    text-align: center;
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
