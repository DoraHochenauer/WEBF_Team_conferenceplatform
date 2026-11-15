import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        // TO DO
      },

      
      workbox: {
        // ADR0006 App-Grundgerüst: Precache + Cache-First.
        // Alleas außer JSON
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

        // ADR0006 Mein Programm = kein eigener Cache
        // Jede Seitenanfrage (z. B. /mein-programm neu laden) bekommt die gespeicherte index.html
        navigateFallback: 'index.html',

        // Service Worker übernimmt sofort (Erstbesuch gleich gecacht)
        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
          {
            // ADR0006 Session-/Speakerdaten = Stale-While-Revalidate.
    
            urlPattern: ({ url }) => url.pathname.endsWith('/data/conference-data.json'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'conference-data' },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
