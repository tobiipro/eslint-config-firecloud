module.exports = {
  plugins: [
    'firecloud'
  ],

  rules: {
    'firecloud/import-specifier-newline': ['warn', {
      allowMultiplePerLine: false
    }],
    'firecloud/order-imports': 'warn',
    'firecloud/padding-line-import-multiple': 'error',
    'firecloud/no-underscore-prefix-exported': 'off',
    'firecloud/underscore-prefix-non-exported': 'off'
  }
};
