const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [],
  },
  // 禁用 source maps 以修复 404 错误
  productionBrowserSourceMaps: false,
};

export default nextConfig;
