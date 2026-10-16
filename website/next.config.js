/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: require('node:path').join(__dirname, '..'),
  async redirects() {
    return [
      { source: '/docs/api', destination: '/docs/api/core', permanent: true },
      {
        source: '/docs/quick-start',
        destination: '/docs/getting-started/quick-start',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
