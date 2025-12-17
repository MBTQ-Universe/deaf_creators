/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static HTML export for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/deaf_creators' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable features not supported in static export
  trailingSlash: true,
}

export default nextConfig
