/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
  },
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/zingri-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/zingri-portfolio/' : '',
};

module.exports = nextConfig;
