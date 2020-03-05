// NOTE that this is an addon config. An eslint plugin needs to be installed manually.

let _pluginName = 'eslint-plugin-mocha';
let _pluginVsn = '^6.1.1';
let _pluginActualVsn = require(`${_pluginName}/package.json`).version;
let _semver = require('semver');

if (!_semver.satisfies(_pluginActualVsn.replace(/.*#semver:/, ''), _pluginVsn.replace(/.*#semver:/, ''))) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

module.exports = {
  extends: [
    'plugin:mocha/recommended'
  ],

  // not set by 'plugin:mocha/recommended'
  env: {
    mocha: true
  },

  // not set by 'plugin:mocha/recommended'
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
    'mocha/ no-return-from-async': 'error',
    'mocha/no-async-describe': 'error',
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
