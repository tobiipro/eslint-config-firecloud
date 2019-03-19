// note that this is an addon
// please update README.md with required version of the eslint plugin
// when introducing breaking changes

let _basic = require('./basic');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],

  rules: {
    '@typescript-eslint/camelcase': _basic.rules.camelcase,
    '@typescript-eslint/indent': _basic.rules.indent,
    '@typescript-eslint/no-unused-vars': _basic.rules['no-unused-vars']
  }
};
