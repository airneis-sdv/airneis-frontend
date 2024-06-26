/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c1bb0d8a5f1d.airneis.net',
        pathname: '/medias/serve/**',
      },
      {
        protocol: 'https',
        hostname: '*.airneis.store',
        pathname: '/medias/serve/**',
      },
      { hostname: 'localhost' },
      {
        protocol: 'https',
        hostname: 'readymadeui.com',
        
      }
    ]
  }
};

export default nextConfig;
