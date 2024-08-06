/** @type {import('next').NextConfig} */

const nextConfig = {

    // 追加
    experimental: {
        ppr: 'incremental',
    },

};

export default nextConfig;
