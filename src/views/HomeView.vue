<template>
  <div class="home-view">
    <!-- Parallax Background Shapes -->
    <div class="parallax-shapes">
      <div class="shape shape-1" v-parallax="{ speed: 0.3, direction: 'up' }"></div>
      <div class="shape shape-2" v-parallax="{ speed: 0.5, direction: 'down' }"></div>
      <div class="shape shape-3" v-parallax="{ speed: 0.4, direction: 'up' }"></div>
    </div>

    <section class="hero-section">
      <div class="container">
        <div v-scroll-reveal="{ type: 'fade-up', duration: 800 }">
          <ProfileCard />
        </div>
      </div>
    </section>

    <section class="terminal-section">
      <div class="container">
        <div v-scroll-reveal="{ type: 'fade-scale', delay: 100 }">
          <Terminal />
        </div>
      </div>
    </section>

    <div v-scroll-reveal="{ type: 'fade-up', delay: 100 }">
      <Skills />
    </div>

    <section class="about-section">
      <div class="container">
        <div v-scroll-reveal="{ type: 'fade-up', delay: 150 }">
          <AboutText />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ProfileCard from '../components/about/ProfileCard.vue'
import AboutText from '../components/about/AboutText.vue'
import Skills from '../components/about/Skills.vue'
import Terminal from '../components/Terminal.vue'
</script>

<style scoped>
.home-view {
  flex: 1;
  background: var(--color-background);
  position: relative;
  overflow: hidden;
}

/* Parallax Background Shapes */
.parallax-shapes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.03;
  background: var(--color-secondary);
  filter: blur(60px);
}

.shape-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -200px;
}

.shape-2 {
  width: 400px;
  height: 400px;
  top: 50%;
  left: -150px;
}

.shape-3 {
  width: 500px;
  height: 500px;
  bottom: -100px;
  right: 10%;
}

/* Dark mode shape adjustments */
[data-theme="dark"] .shape {
  opacity: 0.05;
  background: var(--color-secondary);
}

.hero-section {
  background: var(--color-background);
  padding: var(--spacing-2xl) 0 var(--spacing-xl) 0;
  position: relative;
  z-index: 1;
}

.about-section {
  padding: var(--spacing-3xl) 0;
  background: var(--color-background);
  position: relative;
  z-index: 1;
}

.terminal-section {
  padding: var(--spacing-3xl) 0;
  background: var(--color-surface);
  position: relative;
  z-index: 1;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--spacing-xl) 0 var(--spacing-lg) 0;
  }

  .about-section {
    padding: var(--spacing-xl) 0;
  }

  .terminal-section {
    padding: var(--spacing-xl) 0;
  }
}
</style>
