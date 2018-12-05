module.exports = {
  plugins: [
    'lodash'
  ],

  settings: {
    lodash: {
      pragma: '_',
      version: 4
    }
  },

  rules: {
    // possible errors
    'lodash/callback-binding': 'error',
    'lodash/collection-method-value': 'error',
    'lodash/collection-return': 'error',
    'lodash/no-double-unwrap': 'error',
    'lodash/no-extra-args': 'error',
    'lodash/no-unbound-this': 'error',
    'lodash/unwrap': 'error',

    // stylistic issues
    'lodash/chain-style': [
      'error',
      'explicit'
    ],
    'lodash/chaining': [
      'error',
      'never'
    ],
    'lodash/consistent-compose': [
      'error',
      'flowRight'
    ],
    'lodash/identity-shorthand': [
      'error',
      'always'
    ],
    'lodash/import-scope': [
      'error',
      'full'
    ],
    'lodash/matches-prop-shorthand': 'off',
    'lodash/matches-shorthand': [
      'error',
      'always'
    ],
    'lodash/no-commit': 'error',
    'lodash/path-style': [
      'error',
      'string'
    ],
    'lodash/prefer-compact': 'off',
    'lodash/prefer-find': 'error',
    'lodash/prefer-filter': 'error',
    'lodash/prefer-flat-map': 'off',
    'lodash/prefer-invoke-map': 'off',
    'lodash/prefer-map': 'error',
    'lodash/prefer-reject': 'off',
    'lodash/prefer-thru': 'off',
    'lodash/prefer-wrapper-method': 'error',
    'lodash/preferred-alias': 'error',
    'lodash/prop-shorthand': 'error',

    // preference over native
    'lodash/prefer-constant': 'off',
    'lodash/prefer-get': 'error',
    'lodash/prefer-includes': [
      'error',
      {includeNative: true}
    ],
    'lodash/prefer-immutable-method': 'warn',
    'lodash/prefer-is-nil': 'error',
    'lodash/prefer-lodash-chain': 'error',
    'lodash/prefer-lodash-method': 'error',
    'lodash/prefer-lodash-typecheck': 'error',
    'lodash/prefer-matches': 'error',
    'lodash/prefer-noop': 'error',
    'lodash/prefer-over-quantifier': 'off',
    'lodash/prefer-some': [
      'error',
      {includeNative: true}
    ],
    'lodash/prefer-startswith': 'error',
    'lodash/prefer-times': 'error'
  }
};
