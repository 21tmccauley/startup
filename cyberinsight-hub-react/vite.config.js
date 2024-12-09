import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:4000'
          : 'https://startup.tatemccauley.click',
        changeOrigin: true,
      },
      '/ws': {
        target: process.env.NODE_ENV === 'development'
          ? 'ws://localhost:4000'
          : 'wss://startup.tatemccauley.click',
        ws: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})