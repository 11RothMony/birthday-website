// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   productionBrowserSourceMaps: true,
//   distDir: process.env.DIST_DIR || '.next',  typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.pexels.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.pixabay.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'img.rocket.new',
//       },
//     ],
//   },
//   async redirects() {
//     return [
//       {
//         source: '/',
//         destination: '/dashboard-hub',
//         permanent: false,
//       },
//     ];
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.(jsx|tsx)$/,
//       exclude: [/node_modules/],
//       use: [{
//         loader: '@dhiwise/component-tagger/nextLoader',
//       }],
//     });
//     return config;
//   },
// };

// export default nextConfig;

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  // Your existing Next.js config
  reactStrictMode: true,
  swcMinify: true,
});
