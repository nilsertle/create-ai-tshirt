/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: [
      "create-image-upload.fra1.digitaloceanspaces.com",
      "oaidalleapiprodscus.blob.core.windows.net",
    ],
  },
};

module.exports = nextConfig;
