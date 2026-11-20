import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // Endereço da versão anterior, com apenas um perfil.
      { source: "/diagnostico", destination: "/empresa/diagnostico", permanent: false },
    ];
  },
};

export default nextConfig;
