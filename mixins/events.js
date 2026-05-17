export default {
  methods: {
    onOpenApp(source) {
      this.$gtag('event', 'open_app', {
        source,
      });
    },

    // remarketingEvent() {
    //   this.$gtag('event', 'conversion', {
    //     send_to: 'AW-123456733/AnExaMPleC0Nv3rS10nLaBel',
    //     aw_remarketing_only: true,
    //   });
    // },
  },
};
 