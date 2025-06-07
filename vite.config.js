import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Sense Check',
        short_name: 'Sense Check',
        description: 'Aplikasi untuk mendiagnosa Penyakit Indra, seperti pendengaran pengelihatan, pengecapan, penciuman dan perabaan.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d6efd',
        icons: [
          {
            src: 'logoBaru-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logoBaru-512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ],
        screenshots: [
          {
            src: 'Screenshot2.png',
            sizes: '540x720',
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: 'Screenshot1.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            }
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'style' ||
              request.destination === 'script' ||
              request.destination === 'worker',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 minggu
              }
            }
          },
          {
            urlPattern: /\/api\/.*$/, // ini penting!
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 hari
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
      
    })
  ],
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
