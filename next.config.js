/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "mir-s3-cdn-cf.behance.net",
      "img.evbuc.com",
      "assets.artville.rw",
      "d3q18hub7qkw59.cloudfront.net",
    ],
  },
};

module.exports = nextConfig;
