/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove this line that's causing the critters error
    // optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  swcMinify: true,
}

module.exports = nextConfig
