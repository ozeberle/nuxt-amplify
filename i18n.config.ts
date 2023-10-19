export default defineI18nConfig(() => ({
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
}))
