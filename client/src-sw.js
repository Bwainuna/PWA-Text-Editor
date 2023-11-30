// client/src-sw.js
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { registerRoute } = require('workbox-routing');
const { CacheFirst } = require('workbox-strategies');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache CSS and JS assets with CacheFirst strategy
registerRoute(
  /\.(css|js)$/,
  new CacheFirst({
    cacheName: 'static-assets',
  })
);

// Cache images with StaleWhileRevalidate strategy
registerRoute(
  /\.(png|jpg|jpeg|gif|svg)$/,
  new CacheFirst({
    cacheName: 'images',
  })
);
