module.exports = {
  extends: [
    'plugin:jsdoc/recommended'
  ],

  rules: {
    'jsdoc/check-syntax': 'error',
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-hyphen-before-param-description': ['error', 'never'],
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-description': 'off'
  }
};
