let _pluginName = 'eslint-plugin-no-null';
let _pluginVsn = require('../package.json').peerDependencies[_pluginName];
let _pluginActualVsn = require(`${_pluginName}/package.json`).version;
let _semver = require('semver');

if (!_semver.satisfies(_pluginActualVsn.replace(/.*#semver:/, ''), _pluginVsn.replace(/.*#semver:/, ''))) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

module.exports = {
  plugins: [
    'no-null'
  ],

  rules: {
    'no-null/no-null': 'error'
  }
};
