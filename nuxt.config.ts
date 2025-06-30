import type { NuxtPage } from 'nuxt/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Budget Tool',
      meta: [{ name: 'description', content: 'Budget Tool' }],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  hooks: {
    'pages:extend'(pages) {
      function applyMiddleware(pages: NuxtPage[]) {
        pages.forEach((page) => {
          const path = page?.file

          // Apply middleware to private pages
          if (path?.includes('panel')) {
            page.meta ||= {}
            page.meta.middleware = 'private'
            page.meta.layout = 'private'
          }

          // Apply middleware to auth pages
          if (path?.includes('auth')) {
            page.meta ||= {}
            page.meta.middleware = 'auth'
            page.meta.layout = 'auth'
          }

          // Recursively apply middleware to children pages
          if (page.children) {
            applyMiddleware(page.children)
          }
        })
      }
      applyMiddleware(pages)
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/image',
  ],
  css: ['~/assets/css/main.css'],
  i18n: {
    defaultLocale: 'es',
    locales: [{ code: 'es', name: 'Español', file: 'es.json' }],
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  supabase: {
    redirect: false,
  },
})
