// NOTE that this is an addon config. An eslint plugin needs to be installed manually.

let _pluginVsn = '^2.1.1';
let _pluginName = 'eslint-plugin-protractor';
let _pluginActualVsn = require(`${_pluginName}/package.json`).version;
let _semver = require('semver');

if (!_semver.satisfies(_pluginActualVsn, _pluginVsn)) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

module.exports = {
  extends: [
    'plugin:protractor/recommended'
  ],

  rules: {
    'protractor/empty-script': 'error',
    'protractor/no-describe-selectors': 2,
    'protractor/missing-perform': 'error',
    'protractor/no-browser-pause': 'error',
    'protractor/correct-chaining': 'error',
    'protractor/no-invalid-selectors': 'error',
    'protractor/no-array-finder-methods': 'error',
    'protractor/valid-locator-type': 'error',
    'protractor/no-compound-classes': 'error',
    'protractor/missing-wait-message': 'off',
    'protractor/no-browser-sleep': 'error',
    'protractor/no-by-xpath': 'error',
    'protractor/no-angular-classes': 'error',
    'protractor/no-bootstrap-classes': 'error',
    'protractor/use-angular-locators': 'error',
    'protractor/use-simple-repeaters': 'error',
    'protractor/no-shadowing': 'error',
    'protractor/use-first-last': 'error',
    'protractor/no-get-in-it': 'error',
    'protractor/array-callback-return': 'error',
    'protractor/no-absolute-url': 'error',
    'protractor/no-expect-in-po': 'error',
    'protractor/no-promise-in-if': 'error',
    'protractor/no-execute-script': 'error',
    'protractor/no-repetitive-locators': 'error',
    'protractor/no-repetitive-selectors': 'error',
    'protractor/no-get-inner-outer-html': 'error',
    'protractor/no-angular-attributes': 'error',
    'protractor/use-count-method': 'error',
    'protractor/valid-by-id': 'error',
    'protractor/valid-by-tagname': 'error',
    'protractor/use-promise-all': 'error',
    'protractor/by-css-shortcut': 'error',
    'protractor/no-browser-driver': 'error'
  },

  globals: {
    browser: false,
    protractor: false,
    by: false,
    By: false,
    element: false,
    $: false,
    $$: false,
    ExpectedConditions: false
  }
};
