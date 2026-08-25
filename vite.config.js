import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/calculator-currency-converter-and-weather/',
  plugins: [vue()],
  server: {
    port: 5173
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/unit/**/*.spec.js']
  }
})