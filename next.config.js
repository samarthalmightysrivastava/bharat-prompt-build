/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // You can keep this if you don't need Next/Image optimization
  images: {
    unoptimized: true,
  },

  // ❌ IMPORTANT: do NOT use static export on Vercel
  // output: 'export',                <-- removed
  // trailingSlash: true,             <-- remove to avoid odd route behavior
  // skipTrailingSlashRedirect: true, <-- remove; let Next handle redirects
};

module.exports = nextConfig;
