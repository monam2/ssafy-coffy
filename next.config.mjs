import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // assetPrefix: '.',
  transpilePackages: ["jotai-devtools"],
  exclude: ["src_legacy"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "composecoffee.com",
        port: "",
        pathname: "/files/thumbnails/**",
      },
    ],
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
