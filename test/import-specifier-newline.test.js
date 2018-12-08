/* eslint-disable firecloud/underscore-prefix-non-exported */
let eslint = require('eslint');
let rule = require('../rules/import-specifier-newline');

let _ruleTester = new eslint.RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  }
});
let _errorMessageAllowMultiple =
  'Import specifiers must go on a new line if they are not all on the same line.';
let _errorMessage = 'Import specifiers must go on a new line.';

_ruleTester.run('import-specifier-newline', rule, {
  valid: [{
    code: 'import {a} from "b"',
    options: [{
      allowMultiplePerLine: false
    }]
  }, {
    code: [
      'import {',
      'a',
      '} from "b"'
    ].join('\n'),
    options: [{
      allowMultiplePerLine: false
    }]
  }, {
    code: [
      'import {',
      'a,',
      'b',
      '} from "b"'
    ].join('\n'),
    options: [{
      allowMultiplePerLine: false
    }]
  }, {
    code: [
      'import {a,',
      'b} from "b"'
    ].join('\n'),
    options: [{
      allowMultiplePerLine: false
    }]
  }, {
    code: 'import {a} from "b"',
    options: [{
      allowMultiplePerLine: true
    }]
  }, {
    code: 'import {a,b,c} from "b"',
    options: [{
      allowMultiplePerLine: true
    }]
  }, {
    code: [
      'import {a,',
      'b,',
      'c} from "b"'
    ].join('\n'),
    options: [{
      allowMultiplePerLine: true
    }]
  }],

  invalid: [{
    code: 'import {a,b} from "b"',
    options: [{
      allowMultiplePerLine: false
    }],
    errors: [{
      message: _errorMessage
    }],
    output: [
      'import {a,',
      'b} from "b"'
    ].join('\n')
  }, {
    code: [
      'import {a,',
      'b,c} from "b"'
    ].join('\n'),
    options: [{
      allowMultiplePerLine: false
    }],
    errors: [{
      message: _errorMessage
    }],
    output: [
      'import {a,',
      'b,',
      'c} from "b"'
    ].join('\n')
  }, {
    code: [
      'import {a,b,',
      'c} from "b"'
    ].join('\n'),
    options: [{
      allowMultiplePerLine: true
    }],
    errors: [{
      message: _errorMessageAllowMultiple
    }],
    output: [
      'import {a,',
      'b,',
      'c} from "b"'
    ].join('\n')
  }, {
    // no fixes if comments are present
    code: [
      'import {a,/*a comment*/b,',
      'c} from "b"'
    ].join('\n'),
    options: [{
      allowMultiplePerLine: true
    }],
    errors: [{
      message: _errorMessageAllowMultiple
    }],
    output: [
      'import {a,/*a comment*/b,',
      'c} from "b"'
    ].join('\n')
  }]
});
