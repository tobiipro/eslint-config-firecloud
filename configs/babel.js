let _ = require('lodash');
let _basic = require('./basic');

// see https://github.com/eslint/eslint/issues/12592
_basic = _.cloneDeep(_basic);

module.exports = {
  parser: 'babel-eslint',

  parserOptions: {
    sourceType: 'module'
  },

  plugins: [
    'babel'
  ],

  rules: {
    'new-cap': 'off',
    'babel/new-cap': _basic.rules['new-cap'],

    camelcase: 'off',
    'babel/camelcase': _basic.rules.camelcase,

    'no-invalid-this': 'off',
    'babel/no-invalid-this': _basic.rules['no-invalid-this'],

    'object-curly-spacing': 'off',
    'babel/object-curly-spacing': _basic.rules['object-curly-spacing'],

    quotes: 'off',
    'babel/quotes': _basic.rules.quotes,

    semi: 'off',
    'babel/semi': _basic.rules.semi,

    'no-unused-expressions': 'off',
    'babel/no-unused-expressions': _basic.rules['no-unused-expressions'],

    'valid-typeof': 'off',
    'babel/valid-typeof': _basic.rules['valid-typeof']
  }
};
