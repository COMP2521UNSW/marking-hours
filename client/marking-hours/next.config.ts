import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: undefined, // overwritten during installation
  trailingSlash: true,
  experimental: {
    workerThreads: false,
    cpus: 4, // needed for `npm run build` to work on CSE
  },
};

export default nextConfig;
