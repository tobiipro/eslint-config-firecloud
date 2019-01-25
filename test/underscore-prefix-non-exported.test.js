let _ = require('lodash');
let eslint = require('eslint');
let rule = require('../rules/underscore-prefix-non-exported');

let _ruleTester = new eslint.RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  }
});

let _whileExporting = {
  valid: [{
    code: 'let _a = 5;'
  }, {
    code: 'let {_b} = a'
  }, {
    code: 'var {b: _d} = a'
  }, {
    code: 'var {[yo]: _weird} = a;'
  }, {
    code: 'export let a = 4;'
  }, {
    code: 'export let _a = 5;'
  }, {
    code: 'function _f(b, c){let a = 3}'
  }, {
    code: 'export function f(b, c){let a = 3}'
  }],

  invalid: [{
    code: 'let a = 5',
    errors: 1
  }, {
    code: 'let {a} = b',
    errors: 1
  }, {
    code: 'let {a:b} = c',
    errors: 1
  }, {
    code: 'function a(b, c){let d = 5}',
    errors: 1
  }, {
    code: 'let {[b]:c}',
    errors: 1
  }]
};

_.forEach([
  'valid',
  'invalid'
], function(prop) {
  _.forEach(_whileExporting[prop], function(test) {
    test.code = `${test.code}\nexport default exports;`;
  });
});

_ruleTester.run('underscore-prefix-non-exported', rule, _whileExporting);


let _nothingExported = {
  // allowing to have underscore prefix in the files which do not use 'export' syntax
  valid: [{
    code: 'let a = 5;'
  }, {
    code: 'let {b} = a'
  }, {
    code: 'var {b: d} = a'
  }, {
    code: 'var {[yo]: weird} = a;'
  }, {
    code: 'function f(b, c){let a = 3}'
  }],

  // testing with all possible export syntaxes, which activate the rule
  invalid: [{
    code: [
      'let a = 5',
      'export default exports'
    ].join('\n'),
    errors: 1
  }, {
    code: [
      'let {a} = b',
      'export let c = 1'
    ].join('\n'),
    errors: 1
  }, {
    code: [
      'let {a:b} = 5',
      'export * from "c"'
    ].join('\n'),
    errors: 1
  }]
};

_ruleTester.run('underscore-prefix-non-exported', rule, _nothingExported);
