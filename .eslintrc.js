module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    // 'import/no-webpack-loader-syntax': 'off',
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'vue/multi-word-component-names': 0,
    // quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        editorConfig: true,
      },
    ],
    'vue/valid-v-slot': ['off'],
  },
};
