/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Temporarily disabled due to Turnstile double-render issue
  // output: 'export', // Removed - incompatible with Server Actions
  images: {
    unoptimized: true,
    // formats not needed when unoptimized is true
    // Next.js automatically supports .gif, .webp, .png, .jpg, .ico, etc.
  },
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
  
  // Optimize build for Cloudflare Pages memory limits
  experimental: {
    // Reduce memory usage during build
    optimizePackageImports: ['plotly.js-basic-dist', 'react-plotly.js'],
  },
  
  webpack: (config, { isServer }) => {
    // Reduce memory pressure during build
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Optimize large dependencies
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          plotly: {
            test: /[\\/]node_modules[\\/](plotly\.js|react-plotly\.js)[\\/]/,
            name: 'plotly',
            priority: 10,
          },
          default: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      },
    };
    
    return config;
  },
}

module.exports = nextConfig