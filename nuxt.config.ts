// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    'vue3-openlayers/dist/vue3-openlayers.css',
    'v-calendar/dist/style.css',
  ],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  ],
  build: {
    transpile: ['vuetify', 'openlayers', 'v-calendar'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  ssr: false,
  experimental: {
    payloadExtraction: false,
  },
  router: {
    base:
      process.env.NODE_ENV === 'development'
        ? '/'
        : '/apps/dss.test/',
  },
  runtimeConfig: {
    public: {
      baseURL: 'https://effis.jrc.ec.europa.eu/apps/dss.test',
      // USAGE: $config.public.baseURL
   }
  }
});
