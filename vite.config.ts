import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()],
  base:"",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          configData: ['./src/config.json']
        }
      }
    }
  }
})
