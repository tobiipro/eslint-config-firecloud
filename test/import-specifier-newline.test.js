/* eslint-disable firecloud/underscore-prefix-non-exported */
let eslint = require('eslint');
let rule = require('../rules/import-specifier-newline');

let _ruleTester = new eslint.RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  }
});

let _errorMessageallowAllSpecifiersOnSameLine =
  'Import specifiers must go on a new line if they aren\'t all on the same line.';

let _errorMessage = 'Import specifiers must go on a new line.';

_ruleTester.run('import-specifier-newline', rule, {
  valid: [{
    code: 'import {a} from "b"',
    options: [{
      allowAllSpecifiersOnSameLine: false
    }]
  }, {
    code: [
      'import {',
      'a',
      '} from "b"'
    ].join('\n'),
    options: [{
      allowAllSpecifiersOnSameLine: false
    }]
  }, {
    code: [
      'import {',
      'a,',
      'b',
      '} from "b"'
    ].join('\n'),
    options: [{
      allowAllSpecifiersOnSameLine: false
    }]
  }, {
    code: [
      'import {a,',
      'b} from "b"'
    ].join('\n'),
    options: [{
      allowAllSpecifiersOnSameLine: false
    }]
  }, {
    code: 'import {a} from "b"',
    options: [{
      allowAllSpecifiersOnSameLine: true
    }]
  }, {
    code: 'import {a,b,c} from "b"',
    options: [{
      allowAllSpecifiersOnSameLine: true
    }]
  }, {
    code: [
      'import {a,',
      'b,',
      'c} from "b"'
    ].join('\n'),
    options: [{
      allowAllSpecifiersOnSameLine: true
    }]
  }],

  invalid: [{
    code: 'import {a,b} from "b"',
    options: [{
      allowAllSpecifiersOnSameLine: false
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
      allowAllSpecifiersOnSameLine: false
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
      allowAllSpecifiersOnSameLine: true
    }],
    errors: [{
      message: _errorMessageallowAllSpecifiersOnSameLine
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
      allowAllSpecifiersOnSameLine: true
    }],
    errors: [{
      message: _errorMessageallowAllSpecifiersOnSameLine
    }],
    output: [
      'import {a,/*a comment*/b,',
      'c} from "b"'
    ].join('\n')
  }]
});
