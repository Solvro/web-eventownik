import nextRoutes from "nextjs-routes/config";

const withRoutes = nextRoutes();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "cms.solvro.pl",
      },
    ],
  },
};

export default withRoutes(nextConfig);
