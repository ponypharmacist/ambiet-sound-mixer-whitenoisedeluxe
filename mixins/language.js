// Language Definitions for Multilanguage support
import definitions from '../languages/definitions';
import list from '../languages/list';

function plural(numberp) {
  let form;
  const number = Math.abs(numberp);
  const mod10 = number % 10;
  const mod100 = number % 100;

  if (mod10 === 1 && mod100 !== 11) form = 0;
  else if (mod10 >= 2 && mod10 <= 4 && !(mod100 > 10 && mod100 < 20)) form = 1;
  else form = 2;

  return form;
}

export default {
  data: () => ({
    language: 'ru',
    default: 'ru',
    definitions,
    languages: list,
  }),

  computed: {
    languageCodes() {
      return this.languages.map((_) => _.code);
    },

    routeLanguage() {
      const code =
        this.$route.name
          .split('-')
          .filter((chunk) => this.languageCodes.includes(chunk))[0] ?? 'ru';

      return code;
    },
  },

  methods: {
    lng(alias) {
      if (!alias) return '';

      const code = this.routeLanguage;
      const translation = this.definitions[code || this.default][alias];
      const errors = `⚠️ No translation for: ${alias} ⚠️`;

      return translation || errors;
    },

    lngWithCode(alias, code) {
      const translation = this.definitions?.[code]?.[alias];
      const errors = `⚠️ No translation for: ${alias} , code: ${code} ⚠️`;

      return translation || errors;
    },

    lngIcon(alias) {
      if (!alias) return '';

      const code = this.routeLanguage;
      const translation =
        this.definitions[code || this.default][`icon_${alias}`];
      const errors = `⚠️ lngIcon error ${alias}`;

      return translation || errors;
    },

    lngPlural([count, alias]) {
      const code = this.routeLanguage;
      const list = this.definitions[code || this.default][alias];

      if (list?.length === 2) {
        if (count === 1) return list[0];
        else return list[1];
      }

      if (list?.length === 3) {
        return list[plural(count)];
      }

      return '⚠️ lngPlural error';
    },

    lngDigits(number) {
      if (['ar'].includes(this.routeLanguage)) {
        return this.numbersToArabic(`${number}`);
      } else {
        return this.separateThousands(number);
      }
    },

    numbersToArabic(string) {
      return string.replace(/[0-9]/g, (w) => '۰۱۲۳۴۵۶۷۸۹'[+w]);
    },

    lngVar(alias, variables) {
      let string = this.lng(alias);

      Object.keys(variables).forEach((key) => {
        string = string.replace(`{${key}}`, variables[key] || '');
      });

      return string;
    },

    aliasToRouteName(alias) {
      if (this.routeLanguage === 'ru') return alias;
      else return `${alias}-${this.routeLanguage}`;
    },

    separateThousands(num) {
      const prefix = num < 0 ? '-' : '';

      if (typeof num !== 'number') return num;

      if (typeof num === 'number' && !Number.isInteger(num)) return num;
      if (num === 0) return '0';
      if (num !== null)
        return `${prefix}${Math.abs(num)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}`;
      return '-';
    },
  },
};
