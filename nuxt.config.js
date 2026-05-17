
const IS_DEV = process.env.NODE_ENV !== 'production';
const DEPLOY_TARGET = process.env.NUXT_DEPLOY_TARGET || 'server';
const url = 'https://whitenoisedeluxe.com';

export default {
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  target: DEPLOY_TARGET,
  // target: 'static', // 'server', 'static'
  // ssr: true,
  dev: IS_DEV,
  debug: IS_DEV,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'White Noise Deluxe',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'apple-itunes-app',
        content: 'app-id=1626279143',
      },
      {
        name: 'viewport',
        // content: 'width=920',
        content: 'width=device-width, initial-scale=1, maximum-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Sleep Sounds to Fall Asleep to',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      // OG
      {
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'White Noise Deluxe',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'White Noise Deluxe: Sleep Club',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Sleep Sounds to Fall Asleep to',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${url}/og-image.jpg`,
      },
      {
        property: 'og:image:width',
        content: '968',
      },
      {
        property: 'og:image:height',
        content: '504',
      },
      // Meta Twitter
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'White Noise Deluxe: Sleep Club',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Sleep Sounds to Fall Asleep to',
      },
      {
        hid: 'twitter:image:src',
        name: 'twitter:image:src',
        content: `${url}/og-image.jpg`,
      },
    ],
    link: [
      // <!-- Backwards compatability -->
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: '16x16 24x24 32x32 64x64',
      },
      // <!-- All other browsers -->
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-32x32.png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-16x16.png',
        sizes: '16x16',
      },
      // <!-- Google Search and Android Chrome -->
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-48x48.png',
        sizes: '48x48',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-192x192.png',
        sizes: '192x192',
      },
      //<!-- iPhone -->
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: '/favicon-180x180.png',
        sizes: '180x180',
      },
      // <!-- iPad Retina -->
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: '/favicon-167x167.png',
        sizes: '167x167',
      },
      // <!-- Other iPads -->
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: '/favicon-152x152.png',
        sizes: '152x152',
      },
      // <!-- Web application manifest -->
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  },

  css: ['~/assets/css/main.scss'],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxtjs/google-fonts',
    '@nuxt/typescript-build',
    'nuxt-windicss',
  ],

  modules: [
    '@nuxtjs/router',
    '@nuxtjs/svg-sprite',
  ],

  build: {},

  googleFonts: {
    download: true,
    prefetch: true,
    families: {
      Roboto: [400, 600],
    },
  },

  loading: {
    color: 'purple',
    height: '1px',
  },
};
