/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    dynamicIO: true,
  },
  skipMiddlewareUrlNormalization: true,
};

export default nextConfig;
