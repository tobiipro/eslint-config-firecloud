let _pluginName = 'eslint-plugin-fp';
let _pluginVsn = require('../package.json').peerDependencies[_pluginName];
let _pluginActualVsn = require(`${_pluginName}/package.json`).version;
let _semver = require('semver');

if (!_semver.satisfies(_pluginActualVsn.replace(/.*#semver:/, ''), _pluginVsn.replace(/.*#semver:/, ''))) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

module.exports = {
  plugins: [
    'fp'
  ],
  rules: {
    'fp/no-arguments': 'error',
    'fp/no-class': 'off',
    'fp/no-delete': 'off',
    'fp/no-events': 'off',
    'fp/no-get-set': 'error',
    'fp/no-let': 'off',
    'fp/no-loops': 'off',
    'fp/no-mutating-assign': 'error',
    'fp/no-mutating-methods': 'off',
    'fp/no-mutation': 'off',
    'fp/no-nil': 'off',
    'fp/no-proxy': 'error',
    'fp/no-rest-parameters': 'off',
    'fp/no-this': 'off',
    'fp/no-throw': 'off',
    'fp/no-unused-expression': 'off',
    'fp/no-valueof-field': 'error'
  }
};
