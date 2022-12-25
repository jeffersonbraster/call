/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: [
    'page.tsx',
    'page.ts',
    'page.jsx',
    'page.js',
    'api.ts',
    'api.tsx',
  ],
}

module.exports = nextConfig
