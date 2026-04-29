import { NextConfig } from "next";


const nextConfig :NextConfig= {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/",
      },
      {
        protocol: "https",
        hostname: "campusnumerique.auvergnerhonealpes.fr", // your fallback image
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
