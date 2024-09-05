import { withContentlayer } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    domains: ["images.unsplash.com"], // Add this line
  },
  experimental: {
    mdxRs: true,
  },
};

export default withContentlayer(nextConfig);
