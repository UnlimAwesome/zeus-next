/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fraufluger.ru',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
};

export default nextConfig;
