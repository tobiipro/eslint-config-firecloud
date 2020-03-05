let _pluginName = 'eslint-plugin-eslint-comments';
let _pluginVsn = require('../package.json').peerDependencies[_pluginName];

let _pluginActualVsn = require(`${_pluginName}/package.json`).version;
let _semver = require('semver');

// eslint-disable-next-line lodash/prefer-lodash-method
if (!_semver.satisfies(_pluginActualVsn.replace(/.*#semver:/, ''), _pluginVsn.replace(/.*#semver:/, ''))) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

module.exports = {
  plugins: [
    'eslint-comments'
  ],

  rules: {
    'eslint-comments/disable-enable-pair': ['error', {
      allowWholeFile: true
    }],
    'eslint-comments/no-aggregating-enable': 'error',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unused-disable.html#known-limitations
    'eslint-comments/no-unused-disable': 'off', // 'error', // off because it's a hack
    'eslint-comments/no-unused-enable': 'error',
    'eslint-comments/no-restricted-disable': 'off',
    'eslint-comments/no-use': ['error', {
      allow: [
        // 'eslint',
        'eslint-disable',
        // 'eslint-disable-line',
        'eslint-disable-next-line',
        'eslint-enable',
        'eslint-env',
        'exported',
        'global',
        'globals'
      ]
    }]
  }
};
