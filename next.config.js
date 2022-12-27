/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig