import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/NotMyClass.js',
        destination: '/NotMyClass.js/index.html',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
