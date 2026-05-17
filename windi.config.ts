import { defineConfig } from '@windicss/plugin-utils';

export default defineConfig({
  /**
   * Write windi classes in html attributes.
   * @see https://windicss.org/features/attributify.html
   */
  attributify: true,
  theme: {
    extend: {
      minHeight: {
        fullwh: '100vh',
      },
      fontSize: {
        xsss: '10px',
        xss: '11px',
        label: '13px',
        s: '14px',
        xlm: '22px',
      },
      fontFamily: {
        roboto: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
});
