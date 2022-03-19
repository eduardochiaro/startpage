/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.BASE_PATH || '',
  images: {
    domains: ['tailwindui.com'],
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
}

module.exports = nextConfig
