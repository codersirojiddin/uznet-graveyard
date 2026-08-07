/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/graveyard",
        destination: "/muzey",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
