/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/wedding",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
