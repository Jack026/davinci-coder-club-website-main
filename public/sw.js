// Simple service worker for Da-Vinci Coder Club
const CACHE_NAME = 'davinci-coder-club-v1';

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
});

self.addEventListener('fetch', (event) => {
  // Let the browser handle all fetch requests normally
  return;
});