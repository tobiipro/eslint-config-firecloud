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
    'handle-done-callback': 'error',
    'max-top-level-suites': ['error', {
      limit: 1
    }],
    'no-exclusive-tests': 'error',
    'no-global-tests': 'error',
    'no-hooks': 'off',
    'no-hooks-for-single-case': 'off',
    'no-identical-title': 'error',
    'no-mocha-arrows': 'error',
    'no-nested-tests': 'error',
    'no-pending-tests': 'error',
    'no-return-and-callback': 'error',
    'no-sibling-hooks': 'error',
    'no-skipped-tests': 'warn',
    'no-synchronous-tests': 'off',
    'no-top-level-hooks': 'error',
    'valid-suite-description': 'off',
    'valid-test-description': 'off'
  }
};
