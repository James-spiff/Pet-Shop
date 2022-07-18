/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: []//['pages', 'utils'],
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
