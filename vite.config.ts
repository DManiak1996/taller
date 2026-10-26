/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// La web se publica en https://dmaniak1996.github.io/taller/
export default defineConfig({
  base: '/taller/',
  define: {
    // Se enseña en «Tus datos» para saber qué versión tiene cargada el iPhone.
    __VERSION__: JSON.stringify(new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'short', timeStyle: 'short' }).format(new Date())),
  },
  plugins: [
    react(),
    VitePWA({
      // La versión nueva toma el control en cuanto se descarga; src/actualizar.ts registra el service
      // worker y recarga la página solo en Inicio, nunca a mitad de un reto.
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Taller de programación',
        short_name: 'Taller',
        description: 'Un reto diario de 10 minutos para aprender a programar.',
        lang: 'es',
        start_url: '/taller/',
        scope: '/taller/',
        display: 'standalone',
        background_color: '#F3F4F7',
        theme_color: '#2950D9',
        icons: [
          { src: 'icono-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icono-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icono-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        importScripts: ['avisos-sw.js'],
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'fuentes', expiration: { maxEntries: 20 } },
          },
        ],
      },
    }),
  ],
  test: {
    include: ['test/**/*.test.ts'],
  },
})
