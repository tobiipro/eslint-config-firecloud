module.exports = {
  plugins: [
    'firecloud'
  ],

  rules: {
    'firecloud/import-specifier-newline': ['warn', {
      allowMultiplePerLine: false
    }],
    'firecloud/no-underscore-prefix-exported': 'error',
    'firecloud/order-imports': 'warn',
    'firecloud/padding-line-import-multiple': 'error',
    'firecloud/underscore-prefix-non-exported': 'error'
  }
};
