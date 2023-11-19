/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "wallpaperset.com",
      },
    ],
  },
  env: {
    NEXT_GOOGLE_CLIENT_SECRET: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
    NEXT_MONGODB_URI: process.env.NEXT_MONGODB_URI,
    NEXT_MONGODB_PASSWORD: process.env.NEXT_MONGODB_PASSWORD,
    NEXT_MONGODB_USERNAME: process.env.NEXT_MONGODB_USERNAME,
    NEXT_PUBLIC_SANITY_BASE_PATH: process.env.NEXT_PUBLIC_SANITY_BASE_PATH,
    NEXT_AUTH_ENVIRONMENT: process.env.NEXT_AUTH_ENVIRONMENT,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_STRIPE_SECRET_KEY: process.env.NEXT_STRIPE_SECRET_KEY,
    NEXT_SANITY_TOKEN: process.env.NEXT_SANITY_TOKEN,
  },
};

module.exports = nextConfig;
