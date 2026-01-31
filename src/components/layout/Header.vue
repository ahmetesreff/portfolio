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
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
  padding: 0;
  z-index: var(--z-index-header);
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

.logo-text {
  font-size: 21px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  transition: var(--transition-fast);
  letter-spacing: -0.01em;
}

.logo:hover .logo-text {
  opacity: 0.7;
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
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
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
