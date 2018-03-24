const rule = require("../rules/no-underscore-prefix-exported");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015, sourceType: 'module' } });

ruleTester.run("no-underscore-prefix-exported", rule, {
  valid: [
    'export let a = 4;',
    'export let {b} = a;',
    'export function f(b, c){let a = 3}',
    'export var {[yo]: weird} = a;',
    'let _a = 5;',
    'let {b} = a',
    'var {b: d} = a',
    'function _f(b, c){let a = 3}'
  ],
  invalid: [
    { code: 'export let _a = 5', errors: 1 },
    { code: 'export let {_a} = 5', errors: 1 },
    { code: 'export let {a:_b} = 5', errors: 1 },
    { code: 'export function _a(b, c){let d = 5}', errors: 1 },
    { code: 'export let {[b]:_c}', errors: 1 }
  ]
});
