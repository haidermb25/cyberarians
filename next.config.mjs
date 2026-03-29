import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Fix: use this project as Turbopack root (avoids wrong root when multiple lockfiles exist)
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
