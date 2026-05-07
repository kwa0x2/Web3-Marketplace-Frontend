/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'gateway.pinata.cloud' },
      { protocol: 'https', hostname: '*.mypinata.cloud' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '*.s3.*.amazonaws.com' },
    ],
  },
};

export default nextConfig;
