/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['s2.svgbox.net', 'images.unsplash.com'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};
