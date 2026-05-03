/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: [],
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;