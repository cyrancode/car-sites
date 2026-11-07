/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  env: { CLIENT: process.env.CLIENT || "reduction-automobile" },
};

export default nextConfig;
