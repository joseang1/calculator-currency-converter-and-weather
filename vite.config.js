import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173
  },
  test: {
    enviroment: 'happy-dom',
    globals: true,
    include: ['tests/unit/**/*.spec.js']
  }
})