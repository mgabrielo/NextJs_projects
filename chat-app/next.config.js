/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        swcPlugins: [
            "next-superjson-plugin", {}
        ]
    },
    images: {
        domains: [
            "res.cloudinary.com"
        ]
    }
}

module.exports = nextConfig
