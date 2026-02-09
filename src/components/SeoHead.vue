<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { siteConfig, personSchema } from '../seo'

const route = useRoute()
const { t, locale } = useI18n()

const title = computed(() => {
  const key = route.meta?.titleKey || 'seo.home.title'
  return t(key)
})

const description = computed(() => {
  const key = route.meta?.descriptionKey || 'seo.home.description'
  return t(key)
})

const canonicalUrl = computed(() => {
  const path = route.meta?.canonicalPath || route.path || '/'
  return `${siteConfig.baseUrl}${path}`
})

const ogImageUrl = computed(() => `${siteConfig.baseUrl}${siteConfig.ogImage}`)

const setMeta = (selector, attrs) => {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

const setLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

const setJsonLd = (id, json) => {
  let element = document.head.querySelector(`script[data-seo="${id}"]`)
  if (!element) {
    element = document.createElement('script')
    element.setAttribute('type', 'application/ld+json')
    element.setAttribute('data-seo', id)
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify(json)
}

const applyHead = () => {
  document.title = title.value
  document.documentElement.setAttribute('lang', locale.value || 'tr')

  setMeta('meta[name="description"]', { name: 'description', content: description.value })
  setMeta('meta[name="author"]', { name: 'author', content: siteConfig.author })
  setMeta('meta[name="keywords"]', {
    name: 'keywords',
    content: 'Backend Developer, NestJS, PostgreSQL, Docker, Redis, API Developer, Trabzon, Türkiye, IT Management, Web Developer'
  })
  setMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' })
  setMeta('meta[name="googlebot"]', { name: 'googlebot', content: 'index, follow' })

  setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl.value })
  setMeta('meta[property="og:title"]', { property: 'og:title', content: title.value })
  setMeta('meta[property="og:description"]', { property: 'og:description', content: description.value })
  setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteConfig.siteName })
  setMeta('meta[property="og:locale"]', { property: 'og:locale', content: siteConfig.locale })
  setMeta('meta[property="og:image"]', { property: 'og:image', content: ogImageUrl.value })

  setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  setMeta('meta[name="twitter:url"]', { name: 'twitter:url', content: canonicalUrl.value })
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title.value })
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description.value })
  setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImageUrl.value })

  setLink('canonical', canonicalUrl.value)

  setJsonLd('person', personSchema)
  setJsonLd('website', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.baseUrl,
    description: t('seo.site.description')
  })
  setJsonLd('webpage', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title.value,
    url: canonicalUrl.value,
    description: description.value
  })
}

onMounted(applyHead)
watch([() => route.fullPath, () => locale.value], applyHead)
</script>

<template>
  <div aria-hidden="true" style="display:none;"></div>
</template>
