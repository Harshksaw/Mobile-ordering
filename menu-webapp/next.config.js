/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dhzerr2qe/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig; 