/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Updated to use remotePatterns instead of deprecated domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Keep the old domains for backward compatibility if needed
    domains: ['res.cloudinary.com'],
  },
  // Removed experimental.appDir as it's no longer needed in Next.js 13.4+
  // App directory is now stable and doesn't need experimental flag
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

module.exports = nextConfig