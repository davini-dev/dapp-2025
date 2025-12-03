/** @type {import('next').NextConfig} */
const nextConfig = {
  // <CHANGE> Habilitando Cache Components (novo no Next.js 16)
  cacheComponents: true,
  
  // <CHANGE> Habilitando React Compiler (estável no Next.js 16)
  reactCompiler: true,
  
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
