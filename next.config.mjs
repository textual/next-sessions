// /** @type {import('next').NextConfig} */
// const nextConfig = { crossOrigin: "use-credentials" };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'use-credentials',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

// module.exports = nextConfig;
export default nextConfig;
