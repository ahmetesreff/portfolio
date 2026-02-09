import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        titleKey: 'seo.home.title',
        descriptionKey: 'seo.home.description',
        canonicalPath: '/'
      }
    },
    {
      path: '/hakkimda',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        titleKey: 'seo.about.title',
        descriptionKey: 'seo.about.description',
        canonicalPath: '/hakkimda'
      }
    },
    {
      path: '/iletisim',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        titleKey: 'seo.contact.title',
        descriptionKey: 'seo.contact.description',
        canonicalPath: '/iletisim'
      }
    },
    {
      path: '/araclar',
      name: 'tools',
      component: () => import('../views/ToolsView.vue'),
      meta: {
        titleKey: 'seo.tools.title',
        descriptionKey: 'seo.tools.description',
        canonicalPath: '/araclar'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top on page navigation
    return { top: 0 }
  }
})

// Disable browser's automatic scroll restoration
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

export default router
