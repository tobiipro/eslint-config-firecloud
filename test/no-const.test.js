let eslint = require('eslint');
let rule = require('../rules/no-const');

let _ruleTester = new eslint.RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  }
});

_ruleTester.run('no-const', rule, {
  valid: [{
    code: 'var a;'
  }, {
    code: "var b = {a: 'value'}; var {a} = b;"
  }, {
    code: 'var a;'
  }, {
    code: "let b = {a: 'value'}; let {a} = b;"
  }],

  invalid: [{
    code: 'const a;',
    errors: 1
  }, {
    code: "const b = {a: 'value'}; const {a} = b;",
    errors: 2
  }]
});
