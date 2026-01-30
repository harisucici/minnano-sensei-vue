import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true // Automatically open the browser
  },
  build: {
    outDir: 'dist'
  },
  envPrefix: 'VUE_APP_', // Ensure VUE_APP_ prefixed variables are exposed
})