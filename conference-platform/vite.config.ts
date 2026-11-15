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
      injectRegister: 'auto',


      manifest: {
        name: 'ConFlare – Konferenzplattform',
        short_name: 'ConFlare',
        description: 'Programm, Speaker und Mein Programm der Konferenz – auch offline',
        lang: 'de',

        // Tokens: --color-brand-primary (= --color-blue-800), färbt Statusleiste und Titelzeile
        theme_color: '#253c6d',
        // Tokens: --color-background (= --color-gray-50), Hintergrund des Startbildschirms
        background_color: '#f7f8fb',

        display: 'standalone',
        start_url: '/',
        scope: '/',

        icons: [
          { src: '/icons/Pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/Pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ],

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
