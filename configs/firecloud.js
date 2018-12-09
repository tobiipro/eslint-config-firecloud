module.exports = {
  plugins: [
    'firecloud'
  ],

  rules: {
    'firecloud/import-specifier-newline': ['error', {
      allowMultiplePerLine: false
    }],
    'firecloud/no-for': 'error',
    'firecloud/no-underscore-prefix-exported': 'error',
    'firecloud/order-imports': 'error',
    'firecloud/padding-line-import-multiple': 'error',
    'firecloud/underscore-prefix-non-exported': 'error'
  }
};
