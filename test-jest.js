module.exports = {
  env: {
    jest: true
  },

  plugins: [
    'jest'
  ],

  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/no-large-snapshots': 'error',
    'jest/prefer-expect-assertions': 'off',
    'jest/prefer-to-be-null': 'error',
    'jest/prefer-to-be-undefined': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/valid-expect': 'error'
  }
}
