// note that this is an addon
// please update README.md with required version of the eslint plugin
// when introducing breaking changes

module.exports = {
  extends: [
    'plugin:jest/recommended'
  ],

  rules: {
    'jest/consistent-test-it': ['error', {
      fn: 'it'
    }],
    'jest/expect-expect': 'error',
    'jest/lowercase-name': 'error',
    'jest/no-alias-methods': 'error',
    'jest/no-empty-title': 'error',
    'jest/no-hooks': 'off',
    'jest/no-jasmine-globals': 'error',
    'jest/no-large-snapshots': 'error',
    'jest/no-test-callback': 'error',
    'jest/no-test-return-statement': 'error',
    'jest/no-truthy-falsy': 'error',
    'jest/prefer-called-with': 'off',
    'jest/prefer-expect-assertions': 'off',
    'jest/prefer-inline-snapshots': 'off',
    'jest/prefer-spy-on': 'error',
    'jest/prefer-strict-equal': 'error',
    'jest/prefer-to-be-null': 'error',
    'jest/prefer-to-be-undefined': 'error',
    'jest/prefer-to-contain': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/require-tothrow-message': 'off'
  }
};
