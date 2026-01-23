import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Joseeelv.github.io/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      '.trycloudflare.com',
      'localhost',
      '127.0.0.1',
    ],
    cors: true,
  },
})