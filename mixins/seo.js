const rootUrl = 'https://whitenoisedeluxe.com';

export default {
  head() {
    return {
      title: this.seo.title,
      htmlAttrs: {
        lang: this.routeLanguage,
        dir: ['ar'].includes(this.routeLanguage) ? 'rtl' : 'ltr',
      },
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${rootUrl}${this.$route.path}`,
        },
        ...(this.seo?.locales || []),
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seo.description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.seo.keywords,
        },
        // OG
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.seo.title,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: this.seo.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.seo.description,
        },
        // Twitter
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.seo.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.seo.description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.seo.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.seo.description,
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: this.routeLanguage,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            this.seo.image || 'https://whitenoisedeluxe.com/og-image.jpg',
        },
        {
          hid: 'twitter:image:src',
          name: 'twitter:image:src',
          content:
            this.seo.image || 'https://whitenoisedeluxe.com/og-image.jpg',
        },
      ],
    };
  },

  computed: {},

  methods: {},
};
