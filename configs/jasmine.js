// NOTE that this is an addon config. An eslint plugin needs to be installed manually.

let _pluginName = 'eslint-plugin-jasmine';
let _pluginVsn = '^2.10.1';
let _pluginActualVsn = require(`${_pluginName}/package.json`).version;
let _semver = require('semver');

// eslint-disable-next-line lodash/prefer-lodash-method
if (!_semver.satisfies(_pluginActualVsn.replace(/.*#semver:/, ''), _pluginVsn.replace(/.*#semver:/, ''))) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

module.exports = {
  extends: [
    'plugin:jasmine/recommended'
  ],

  env: {
    jasmine: true
  },

  plugins: [
    'jasmine'
  ],

  rules: {
    'class-methods-use-this': 'off',
    // 'jasmine/no-disabled-tests': 'warn',
    // 'jasmine/no-focused-tests': 'warn',
    // 'jasmine/valid-expect': 'off',
    'max-classes-per-file': 'off'
  }
};
