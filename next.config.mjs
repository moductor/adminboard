/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(tsx|ts)$/,
      exclude: /node_modules/,
      loader: "ts-loader",
    });
    config.resolve.extensions = [".tsx", ".ts", ".js"];

    return config;
  },
};

export default nextConfig;
