/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://cryptoprices.cc/:path*', // Proxy to cryptoprices.cc
        },
      ];
    },
  };

export default nextConfig;