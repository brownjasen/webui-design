import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react() as Plugin[], tailwindcss() as Plugin[]].flat(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'vendor-react'
            if (id.includes('framer-motion')) return 'vendor-animation'
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-3d'
            if (id.includes('recharts') || id.includes('d3')) return 'vendor-viz'
          }
        },
      },
    },
  },
})
