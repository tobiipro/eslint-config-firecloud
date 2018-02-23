module.exports = {
  plugins: [
    'firecloud'
  ],

  rules: {
    'firecloud/order-imports': 'warn',
    'firecloud/import-specifier-newline': ['warn', {
      allowMultiplePerLine: false
    }],

    'firecloud/import-specifier-curly-newline': ['error', {
      allowOneLineIfSingle: false
    }],

    'firecloud/padding-line-import-multiple': 'error',
  }
};
