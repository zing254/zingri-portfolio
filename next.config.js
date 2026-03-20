/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
  },
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;
