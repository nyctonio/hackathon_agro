/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['s2.svgbox.net'],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};
