const eslint = require('eslint');
const rule = require('../rules/underscore-prefix-non-exported');

const _ruleTester = new eslint.RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  }
});

_ruleTester.run('underscore-prefix-non-exported', rule, {
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
    code: 'let {a} = 5',
    errors: 1
  }, {
    code: 'let {a:b} = 5',
    errors: 1
  }, {
    code: 'function a(b, c){let d = 5}',
    errors: 1
  }, {
    code: 'let {[b]:c}',
    errors: 1
  }]
});
