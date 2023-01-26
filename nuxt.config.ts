// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    'vue3-openlayers/dist/vue3-openlayers.css',
    '@vuepic/vue-datepicker/dist/main.css',
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
    transpile: ['vuetify', 'openlayers', '@vuepic/vue-datepicker'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  ssr: false,
});
