let _pluginName = 'eslint-plugin-lodash';
let _pluginVsn = require('../package.json').peerDependencies[_pluginName];
let _pluginActualVsn = require(`${_pluginName}/package.json`).version;
let _semver = require('semver');

if (!_semver.satisfies(_pluginActualVsn, _pluginVsn)) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

module.exports = {
  extends: [
    'plugin:lodash/recommended'
  ],

  settings: {
    lodash: {
      pragma: '_',
      version: 4
    }
  },

  rules: {
    'lodash/chain-style': ['error', 'explicit'],
    'lodash/chaining': ['error', 'never'],
    'lodash/consistent-compose': ['error', 'flowRight'],
    'lodash/import-scope': ['error', 'full'],
    'lodash/matches-prop-shorthand': 'off',
    'lodash/matches-shorthand': ['error', 'always'],
    'lodash/prefer-compact': 'off',
    'lodash/prefer-constant': 'off',
    'lodash/prefer-filter': 'error',
    'lodash/prefer-flat-map': 'off',
    'lodash/prefer-get': 'error',
    'lodash/prefer-invoke-map': 'off',
    'lodash/prefer-map': 'off',
    'lodash/prefer-over-quantifier': 'off',
    'lodash/prefer-reject': 'off',
    'lodash/prefer-thru': 'off',
    'lodash/prop-shorthand': 'error'
  }
};
