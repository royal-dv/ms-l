import { defineNuxtConfig } from 'nuxt'

import { Buffer } from 'buffer'
import inject from '@rollup/plugin-inject'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  vite: {
    define: {
      global: {},
    },
    // plugins: [
    //   inject({
    //     Buffer: ['buffer', 'Buffer'],
    //   }),
    // ],
  },
  buildModules: ['@pinia/nuxt'],
})
