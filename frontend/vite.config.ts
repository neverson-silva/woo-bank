import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Unfonts from 'unplugin-fonts/vite'
import relay from 'vite-plugin-relay'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    react(),
    relay,
    Unfonts({
      google: {
        families: [
          {
            name: 'Plus Jakarta Sans',
            styles: 'wght@200;300;400;500;600;700;800',
            defer: true,
          },
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
            defer: true,
          },
          {
            name: 'Inter',
            styles: 'wght@100;200;300;400;500;600;700;800;900',
            defer: true,
          },
          {
            name: 'Montserrat',
            styles: 'wght@100;200;300;400;500;600;700;800;900',
            defer: true,
          },
          {
            name: 'Poppins',
            styles: 'wght@100;200;300;400;500;600;700;800;900',
            defer: true,
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
