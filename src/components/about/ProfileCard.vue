<template>
  <div class="profile-card">
    <div class="profile-content">
      <div class="profile-image-wrapper">
        <div class="image-container">
          <img
            :src="profileImage"
            alt="Profil Fotoğrafı"
            class="profile-image"
          />
        </div>
      </div>

      <div class="profile-info">
        <h1 class="profile-name">{{ name }}</h1>
        <p class="profile-title">{{ title }}</p>
        <p class="profile-bio">{{ bio }}</p>

        <div class="profile-actions">
          <a
            href="/assets/cv.pdf"
            download
            class="btn btn-primary"
          >
            CV İndir
          </a>
          <a
            href="#contact"
            class="btn btn-outline"
          >
            İletişim
          </a>
        </div>

        <div class="social-links">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            :aria-label="link.name"
          >
            <component :is="link.icon" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

const name = 'Ahmet Eşref Karabulut'
const title = 'Backend Developer & IT Management Experience'
const bio = 'Backend sistemler geliştirirken aynı zamanda kurumsal IT altyapısı ve operasyon süreçleri konusunda tecrübeye sahibim.'
const profileImage = 'https://via.placeholder.com/400x400/0071e3/ffffff?text=AEK'

// SVG icon components
const GitHubIcon = () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' })
])

const LinkedInIcon = () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' })
])

const TwitterIcon = () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' })
])

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: GitHubIcon },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: LinkedInIcon },
  { name: 'Twitter', url: 'https://twitter.com', icon: TwitterIcon },
]
</script>

<style scoped>
.profile-card {
  width: 100%;
  animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-md);
}

.profile-image-wrapper {
  margin-bottom: var(--spacing-xl);
}

.image-container {
  position: relative;
  border-radius: var(--border-radius-full);
  padding: 4px;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-hover));
  box-shadow: var(--shadow-lg);
}

.profile-image {
  width: 160px;
  height: 160px;
  border-radius: var(--border-radius-full);
  object-fit: cover;
  display: block;
  border: 4px solid var(--color-background);
}

.profile-info {
  width: 100%;
}

.profile-name {
  font-size: var(--font-size-h1);
  margin-bottom: var(--spacing-xs);
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.03em;
}

.profile-title {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

.profile-bio {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
}

.profile-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  padding-top: var(--spacing-lg);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-full);
  color: var(--color-text-secondary);
  transition: var(--transition-fast);
  background: transparent;
}

.social-link:hover {
  color: var(--color-secondary);
  background: var(--color-accent);
  transform: translateY(-2px);
}

.social-link:active {
  transform: translateY(0) scale(0.95);
}

@media (max-width: 768px) {
  .profile-content {
    padding: var(--spacing-xl) var(--spacing-sm);
  }

  .profile-name {
    font-size: var(--font-size-h2);
  }

  .profile-title {
    font-size: var(--font-size-lg);
  }

  .profile-bio {
    font-size: var(--font-size-md);
  }

  .profile-image {
    width: 140px;
    height: 140px;
  }

  .profile-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}
</style>
