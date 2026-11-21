/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Matches the old WordPress URLs (/birth-certificate/), so those stay valid.
  trailingSlash: true,
  images: { unoptimized: true },
  // Hides the dev-mode corner badge (Next.js logo, bottom left). Dev only; a static
  // export never ships it regardless.
  devIndicators: false,
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
