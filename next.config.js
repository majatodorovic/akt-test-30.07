/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    COMPANY: process.env.COMPANY,
    ADDRESS: process.env.ADDRESS,
    STREET: process.env.STREET,
    POSTCODE: process.env.POSTCODE,
    CITY: process.env.CITY,
    STATE: process.env.STATE,
    PIB: process.env.PIB,
    MB: process.env.MB,
    CODE: process.env.CODE,
    SITE: process.env.SITE,
    EMAIL: process.env.EMAIL,
    TELEPHONE: process.env.TELEPHONE,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
    GTM_ENABLED: process.env.GTM_ENABLED,
    GTM_ID: process.env.GTM_ID,
    INSTAGRAM_KEY: process.env.INSTAGRAM_KEY,
    SHOW_CHECKOUT_SHIPPING_FORM: process.env.SHOW_CHECKOUT_SHIPPING_FORM,
  },
  images: {
    minimumCacheTTL: 60 * 60 * 12 * 90,
    unoptimized: true,
    domains: [
      "api.akt.croonus.com",
      "scontent.cdninstagram.com",
      "video.cdninstagram.com",
      "api.staging.croonus.com",
      "192.168.1.223",
      "scontent-frx5-1.cdninstagram.com",
      "scontent-frt3-2.cdninstagram.com",
      "scontent-frt3-1.cdninstagram.com",
      "scontent-vie1-1.cdninstagram.com",
      "scontent-atl3-1.cdninstagram.com",
      "scontent-cgk1-1.cdninstagram.com",
      "scontent-fco2-1.cdninstagram.com",
      "scontent.cdninstagram.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.akt.croonus.com",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/sitemap/:path*",
        destination: "/api/sitemap",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/pomoc-pri-kupovini",
        destination: "/strana/pomoc-pri-kupovini",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/catalogsearch/advanced",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/sitemap.xml",
        destination: "/sitemap/sr-rs---193-index-1.xml",
        permanent: true,
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
