/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Temporarily disabled due to Turnstile double-render issue
  // output: 'export', // Removed - incompatible with Server Actions
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig