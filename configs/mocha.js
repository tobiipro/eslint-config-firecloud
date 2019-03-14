// required dev dependency
// "eslint-plugin-mocha": "^5.2.0",

module.exports = {
  env: {
    mocha: true
  },

  plugins: [
    'mocha'
  ],

  settings: {
    'import/core-modules': [
      'chai'
    ]
  },

  rules: {
    'mocha/handle-done-callback': 'error',
    'mocha/max-top-level-suites': ['error', {
      limit: 1
    }],
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-global-tests': 'error',
    'mocha/no-hooks': 'off',
    'mocha/no-hooks-for-single-case': 'off',
    'mocha/no-identical-title': 'error',
    'mocha/no-mocha-arrows': 'error',
    'mocha/no-nested-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-return-and-callback': 'error',
    'mocha/no-sibling-hooks': 'error',
    'mocha/no-skipped-tests': 'warn',
    'mocha/no-synchronous-tests': 'off',
    'mocha/no-top-level-hooks': 'error',
    'mocha/prefer-arrow-callback': 'off',
    'mocha/valid-suite-description': 'off',
    'mocha/valid-test-description': 'off'
  }
};
