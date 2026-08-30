import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    modulePreload: {
      resolveDependencies(filename, deps) {
        return deps.filter((d) => !d.includes('/three-'))
      }
    },
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'motion': ['framer-motion']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: false
  }
})
