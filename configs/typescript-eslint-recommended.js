/* eslint-disable lodash/prefer-lodash-method */

let _basic = require('./basic');
let _recommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json');

// poor man's _.cloneDeep
let _restoreBasicOverrides = JSON.parse(JSON.stringify(_recommended));

let filterObject = function(obj, predicate) {
  // eslint-disable-next-line fp/no-mutating-assign
  return Object.assign(...Object.keys(obj).filter(function(key) {
    return predicate(obj[key], key);
  }).map(function(key) {
    return {
      [key]: obj[key]
    };
  }));
};

let mapObjectValues = function(obj, predicate) {
  // eslint-disable-next-line fp/no-mutating-assign
  return Object.assign(...Object.keys(obj).map(function(key) {
    return {
      [key]: predicate(obj[key], key)
    };
  }));
};

_restoreBasicOverrides.rules = filterObject(_restoreBasicOverrides.rules, function(_value, key) {
  return !/^@typescript-eslint/.test(key);
});

_restoreBasicOverrides.rules = mapObjectValues(_restoreBasicOverrides.rules, function(_value, key) {
  return _basic.rules[key];
});

module.exports = _restoreBasicOverrides;
