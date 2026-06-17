/** @type {import('next').NextConfig} */
const nextConfig = {
  // Read-only viewer. Every page is rendered to static HTML at build time
  // (see `export const dynamic = "force-static"` in each page), so the desk's
  // markdown is baked in at build and no file reads happen at runtime. New
  // briefings reach the phone via a push -> rebuild on Vercel.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
