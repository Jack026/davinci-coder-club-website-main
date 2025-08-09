/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Removed optimizeCss to avoid critters error in latest Next.js
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all remote images
      },
    ],
  },
  compress: true,
  poweredByHeader: false, // Removes the "X-Powered-By: Next.js" header
  trailingSlash: false,   // No trailing slash in URLs
  swcMinify: true,        // Use SWC for faster minification
};

module.exports = nextConfig;
