import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist'
  },
  server: {
    host: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '*.ngrok.io',
      '*.ngrok-free.dev',
      'pungent-kimberley-unportionable.ngrok-free.dev'
    ]
  }
})
