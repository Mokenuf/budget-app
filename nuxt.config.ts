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
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
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
