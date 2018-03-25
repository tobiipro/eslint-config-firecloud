const eslint = require('eslint');
const rule = require('../rules/padding-line-import-multiple');

const ruleTester = new eslint.RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  }
});
const errorMessage = 'Expected an empty line before multiline import statement.';

ruleTester.run('padding-line-import-multiple', rule, {
  valid: [{
    code: 'import a from "b"'
  }, {
    code: [
      'import f from "d"',
      'import c from "a"'
    ].join('\n')
  }, {
    code: [
      'import {',
      'a',
      '} from "b"'
    ].join('\n')
  }, {
    code: [
      'import a from "b"',
      '',
      'import {c} from "b"'
    ].join('\n')
  }, {
    code: [
      'import {',
      'a',
      '} from "b"',
      '',
      'import {c} from "b"'
    ].join('\n')
  }, {
    code: [
      'import {a} from "b";',
      'import {c} from "b"'
    ].join('\n')
  }],

  invalid: [{
    code: [
      'import a from "b";',
      'import {b,', 'c} from "b"'
    ].join('\n'),
    errors: [{
      message: errorMessage
    }],
    output: [
      'import a from "b";',
      '',
      'import {b,',
      'c} from "b"'
    ].join('\n')
  }, {
    // don't fix if comment present
    code: [
      'import a from "b";',
      '//comment',
      'import {b,',
      'c} from "b"'
    ].join('\n'),
    errors: [{
      message: errorMessage
    }],
    output: [
      'import a from "b";',
      '//comment',
      'import {b,',
      'c} from "b"'
    ].join('\n')
  }]
});
