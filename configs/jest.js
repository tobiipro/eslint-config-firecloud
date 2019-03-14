// required dev dependencies
// "eslint-plugin-jest": "^22.1.0",

module.exports = {
  env: {
    jest: true
  },

  plugins: [
    'jest'
  ],

  rules: {
    'jest/consistent-test-it': ['error', {
      fn: 'it'
    }],
    'jest/expect-expect': 'error',
    'jest/lowercase-name': 'error',
    'jest/no-alias-methods': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-hooks': 'off',
    'jest/no-identical-title': 'error',
    'jest/no-jasmine-globals': 'error',
    'jest/no-jest-import': 'error',
    'jest/no-large-snapshots': 'error',
    'jest/no-test-callback': 'error',
    'jest/no-test-prefixes': 'error',
    'jest/no-test-return-statement': 'error',
    'jest/no-truthy-falsy': 'error',
    'jest/prefer-expect-assertions': 'off',
    'jest/prefer-inline-snapshots': 'off',
    'jest/prefer-spy-on': 'error',
    'jest/prefer-strict-equal': 'error',
    'jest/prefer-to-be-null': 'error',
    'jest/prefer-to-be-undefined': 'error',
    'jest/prefer-to-contain': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/require-tothrow-message': 'off',
    'jest/valid-describe': 'error',
    'jest/valid-expect': 'error',
    'jest/valid-expect-in-promise': 'error'
  }
};
