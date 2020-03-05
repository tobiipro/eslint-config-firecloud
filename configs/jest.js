// NOTE that this is an addon config. An eslint plugin needs to be installed manually.

let _pluginName = 'eslint-plugin-jest';
let _pluginVsn = '^22.17.0';
let _pluginActualVsn = require(`${_pluginName}/package.json`).version;
let _semver = require('semver');

// eslint-disable-next-line lodash/prefer-lodash-method
if (!_semver.satisfies(_pluginActualVsn.replace(/.*#semver:/, ''), _pluginVsn.replace(/.*#semver:/, ''))) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

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
    'jest/no-commented-out-tests': 'error',
    'jest/no-duplicate-hooks': 'error',
    'jest/no-empty-title': 'error',
    'jest/no-expect-resolves': 'error',
    'jest/no-export': 'error',
    'jest/no-hooks': 'off',
    'jest/no-if': 'error',
    'jest/no-jasmine-globals': 'error',
    'jest/no-large-snapshots': 'error',
    'jest/no-mocks-import': 'error',
    'jest/no-standalone-expect': 'error',
    'jest/no-test-callback': 'error',
    'jest/no-test-return-statement': 'error',
    'jest/no-truthy-falsy': 'error',
    'jest/no-try-expect': 'error',
    'jest/prefer-called-with': 'off',
    'jest/prefer-expect-assertions': 'off',
    'jest/prefer-inline-snapshots': 'off',
    'jest/prefer-spy-on': 'error',
    'jest/prefer-strict-equal': 'error',
    'jest/prefer-to-be-null': 'error',
    'jest/prefer-to-be-undefined': 'error',
    'jest/prefer-to-contain': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/require-top-level-describe': 'error',
    'jest/require-tothrow-message': 'off'
  }
};
