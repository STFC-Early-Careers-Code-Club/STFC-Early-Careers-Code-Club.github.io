// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  $production: {
    app: {
      baseURL: '/stfc-early-careers-code-club/'
    },
    nitro: {
      preset: 'github-pages'
    }
  }
})