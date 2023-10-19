import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~/assets/css/global.css'
  ],
  devtools: { enabled: true },
  routeRules: {
    // Enable stale-while-revalidate
    '/**': { swr: 60 }
  },
  typescript: {
    typeCheck: true,
    strict: true
  },
  ssr: true,
  runtimeConfig: {
    contentfulAPIBaseUrl: process.env.CONTENTFUL_API_BASE_URL,
    contentfulAPIEndpoint: process.env.CONTENTFUL_API_ENDPOINT,
    contentfulSpaceID: process.env.CONTENTFUL_SPACE_ID,
    contentfulEnvironment: process.env.CONTENTFUL_ENVIRONMENT,
    contentfulDeliveryAccessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
    weatherAPIBaseUrl: process.env.WEATHER_API_BASE_URL,
    weatherAPIKey: process.env.WEATHER_API_KEY
  },
  alias: {
    '@customTypes': fileURLToPath(new URL('./types', import.meta.url))
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo', 'nuxt-lodash', '@nuxtjs/i18n'],
  i18n: {
    legacy: false,
    strategy: 'prefix_except_default',
    // Adding English-Canada and Arabic-Egypt
    // as our supported locales. You can add as
    // many locales as you want here.
    locales: ['en-US', 'es-AR'],
    // Used when active locale is not explicitly defined
    defaultLocale: 'en-US',
    // Disabling automatic locale detection (see below)
    detectBrowserLanguage: false,
    messages: {
      'en-US': {
        welcome: 'Welcome'
      },
      'es-AR': {
        welcome: 'Bienvenue'
      }
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  nitro: {
    preset: 'aws-lambda',
    inlineDynamicImports: true,
    serveStatic: true
  }
})
