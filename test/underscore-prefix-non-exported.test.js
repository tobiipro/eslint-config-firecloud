
const rule = require("../rules/underscore-prefix-non-exported"),
RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015, sourceType: 'module' } });

ruleTester.run("underscore-prefix-non-exported", rule, {
  valid: [
    'let _a = 5;',
    'let {_b} = a',
    'var {b: _d} = a',
    'var {[yo]: _weird} = a;',
    'export let a = 4;',
    'export let _a = 5;',
    'function _f(b, c){let a = 3}',
    'export function f(b, c){let a = 3}'
  ],
  invalid: [
    { code: 'let a = 5', errors: 1 },
    { code: 'let {a} = 5', errors: 1 },
    { code: 'let {a:b} = 5', errors: 1 },
    { code: 'function a(b, c){let d = 5}', errors: 1 },
    { code: 'let {[b]:c}', errors: 1 }
  ]
});
