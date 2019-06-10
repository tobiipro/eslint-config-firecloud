let _ = require('lodash');
let ecfTypescript = require('eslint-config-firecloud/configs/typescript');
let tsEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json');
let tsEslintBase = require('@typescript-eslint/eslint-plugin/dist/configs/base.json');

let ecfTypescriptOmitExtends = _.omit(ecfTypescript, [
  'extends'
]);
let tsEslintRecommendedOmitExtends = _.omit(tsEslintRecommended, [
  'extends'
]);
let tsEslintBaseOmitExtends = _.omit(tsEslintBase, [
  'extends'
]);

let _merge = function(...objs) {
  let keys = _.reduce(objs, function(acc, obj, _index) {
    acc = _.concat(acc, _.keys(obj));
    acc = _.uniq(acc);
    return acc;
  }, []);

  let result = _.reduce(keys, function(acc, key, _index) {
    let objsKey = _.map(objs, key);

    if (_.some(objsKey, _.isPlainObject)) {
      acc[key] = _.defaults({}, ...objsKey);
    } else {
      acc[key] = _.find(objsKey, function(value) {
        return !_.isUndefined(value);
      });
    }

    return acc;
  }, {});

  return result;
};

// temporary and naïve workaround because overrides doesn't allow extends (yet!)
// see https://github.com/eslint/eslint/issues/8813#issuecomment-456034732
// see https://github.com/eslint/eslint/pull/11554

let makeTsConfig = function(tsConfig) {
  if (tsConfig.extends.length !== 1 || tsConfig.extends[0] !== 'firecloud/configs/typescript') {
    throw new Error(`tsConfig should only extend 'firecloud/configs/typescript'. Found ${tsConfig.extends}.`);
  }

  let tsConfigOmitExtends = _.omit(tsConfig, [
    'extends'
  ]);

  let configs = [
    tsConfigOmitExtends,
    ecfTypescriptOmitExtends,
    tsEslintRecommendedOmitExtends,
    tsEslintBaseOmitExtends
  ];
  return _merge(...configs);
};

module.exports = {
  makeTsConfig
};
