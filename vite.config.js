import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    allowedHosts: [
      'pungent-kimberley-unportionable.ngrok-free.dev',
      'localhost',
      '.ngrok-free.dev'
    ]
  }
})
