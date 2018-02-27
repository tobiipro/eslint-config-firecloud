module.exports = {
  env: {
    jest: true
  },

  plugins: [
    'jest'
  ],

  rules: {
    'jest/lowercase-name': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-hooks': 'off',
    'jest/no-identical-title': 'error',
    'jest/no-large-snapshots': 'error',
    'jest/consistent-test-it': ['error', {
      fn: 'it'
    }],
    'jest/valid-describe': 'error',
    'jest/no-test-prefixes': 'error',
    'jest/prefer-expect-assertions': 'off',
    'jest/prefer-to-be-null': 'error',
    'jest/prefer-to-be-undefined': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/valid-expect': 'error',
    'jest/valid-expect-in-promise': 'error'
  }
}
