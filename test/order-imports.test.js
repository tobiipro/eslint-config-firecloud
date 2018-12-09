/* eslint-disable no-null/no-null, firecloud/underscore-prefix-non-exported */

/*
  Based on original tests for sort-imports rule
  https://github.com/eslint/eslint/blob/master/tests/lib/rules/sort-imports.js
*/

let eslint = require('eslint');
let rule = require('../rules/order-imports');

let _ruleTester = new eslint.RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  }
});
let _expectedError = {
  message: 'Imports should be sorted alphabetically.',
  type: 'ImportDeclaration'
};
let _ignoreCaseArgs = [{
  ignoreCase: true
}];

_ruleTester.run('order-imports', rule, {
  valid: [{
    code: [
      'import a from "foo.js";',
      'import b from "bar.js";',
      'import c from "baz.js";',
      ''
    ].join('\n')
  }, {
    code: [
      'import * as B from "foo.js";',
      'import A from "bar.js";'
    ].join('\n')
  }, {
    code: [
      'import * as B from "foo.js";',
      'import {a, b} from "bar.js";'
    ].join('\n')
  }, {
    code: [
      'import A from "foo.js";',
      'import {b, c} from "bar.js";',
      ''
    ].join('\n')
  }, {
    code: [
      'import A from "bar.js";',
      'import {b, c} from "foo.js";'
    ].join('\n'),
    options: [{
      memberSyntaxSortOrder: ['single', 'multiple', 'none', 'all'
      ]
    }]
  }, {
    code: [
      'import {a, b} from "bar.js";',
      'import {c, d} from "foo.js";'
    ].join('\n')
  }, {
    code: [
      'import A from "foo.js";',
      'import B from "bar.js";'
    ].join('\n')
  }, {
    code: [
      'import A from "foo.js";',
      'import a from "bar.js";'
    ].join('\n')
  }, {
    code: [
      'import a, * as b from "foo.js";',
      'import c from "bar.js";'
    ].join('\n')
  }, {
    code: [
      'import "foo.js";',
      ' import a from "bar.js";'
    ].join('\n')
  }, {
    code: [
      'import B from "foo.js";',
      'import a from "bar.js";'
    ].join('\n')
  }, {
    code: [
      'import a from "foo.js";',
      'import B from "bar.js";'
    ].join('\n'),
    options: _ignoreCaseArgs
  }, {
    code: 'import {a, b, c, d} from "foo.js";'
  }, {
    code: 'import {b, A, C, d} from "foo.js";',
    options: [{
      ignoreMemberSort: true
    }]
  }, {
    code: 'import {B, a, C, d} from "foo.js";',
    options: [{
      ignoreMemberSort: true
    }]
  }, {
    code: 'import {a, B, c, D} from "foo.js";',
    options: _ignoreCaseArgs
  }, {
    code: 'import a, * as b from "foo.js";'
  }, {
    code: [
      'import * as a from "foo.js";',
      '',
      'import b from "bar.js";'
    ].join('\n')
  }, {
    code: [
      'import * as bar from "bar.js";',
      'import * as foo from "foo.js";'
    ].join('\n')
  }, {
    // https://github.com/eslint/eslint/issues/5130
    code: [
      'import "foo";',
      'import bar from "bar";'
    ].join('\n'),
    options: _ignoreCaseArgs
  }, {
    // https://github.com/eslint/eslint/issues/5305
    code: 'import React, {Component} from "react";'
  }],

  invalid: [{
    code: [
      'import a from "foo.js";',
      'import A from "bar.js";'
    ].join('\n'),
    output: [
      'import A from "bar.js";',
      'import a from "foo.js";'
    ].join('\n'),
    errors: [
      _expectedError
    ]
  }, {
    code: [
      'import b from "foo.js";',
      'import a from "bar.js";'
    ].join('\n'),
    output: [
      'import a from "bar.js";',
      'import b from "foo.js";'
    ].join('\n'),
    errors: [
      _expectedError
    ]
  }, {
    code: [
      'import {b, c} from "foo.js";',
      'import {a, d} from "bar.js";'
    ].join('\n'),
    output: [
      'import {a, d} from "bar.js";',
      'import {b, c} from "foo.js";'
    ].join('\n'),
    errors: [
      _expectedError
    ]
  }, {
    code: [
      'import * as foo from "foo.js";',
      'import * as bar from "bar.js";'
    ].join('\n'),
    output: [
      'import * as bar from "bar.js";',
      'import * as foo from "foo.js";'
    ].join('\n'),
    errors: [
      _expectedError
    ]
  }, {
    code: [
      'import {b, c} from "bar.js";',
      'import a from "foo.js";'
    ].join('\n'),
    output: [
      'import a from "foo.js";',
      'import {b, c} from "bar.js";'
    ].join('\n'),
    errors: [{
      message: "Expected 'single' syntax before 'multiple' syntax.",
      type: 'ImportDeclaration'
    }]
  }, {
    code: [
      'import a from "foo.js";',
      'import * as b from "bar.js";'
    ].join('\n'),
    output: [
      'import * as b from "bar.js";',
      'import a from "foo.js";'
    ].join('\n'),
    errors: [{
      message: "Expected 'all' syntax before 'single' syntax.",
      type: 'ImportDeclaration'
    }]
  }, {
    code: [
      'import a from "foo.js";',
      'import "bar.js";'
    ].join('\n'),
    output: [
      'import "bar.js";',
      'import a from "foo.js";'
    ].join('\n'),
    errors: [{
      message: "Expected 'none' syntax before 'single' syntax.",
      type: 'ImportDeclaration'
    }]
  }, {
    code: [
      'import b from "bar.js";',
      'import * as a from "foo.js";'
    ].join('\n'),
    output: [
      'import * as a from "foo.js";',
      'import b from "bar.js";'
    ].join('\n'),
    options: [{
      memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'
      ]
    }],
    errors: [{
      message: "Expected 'all' syntax before 'single' syntax.",
      type: 'ImportDeclaration'
    }]
  }, {
    code: [
      '// this is a comment',
      'import a from "foo.js";',
      'import A from "bar.js";'
    ].join('\n'),
    output: null, // not fixed due to a comment
    errors: [
      _expectedError
    ]
  }, {
    code: [
      'import a from "foo.js";',
      '// this is a comment',
      'import A from "bar.js";'
    ].join('\n'),
    output: null, // not fixed due to a comment
    errors: [
      _expectedError
    ]
  }, {
    code: 'import {b, a, d, c} from "foo.js";',
    output: 'import {a, b, c, d} from "foo.js";',
    errors: [{
      message: "Member 'a' of the import declaration should be sorted alphabetically.",
      type: 'ImportSpecifier'
    }]
  }, {
    code: 'import {a, B, c, D} from "foo.js";',
    output: 'import {B, D, a, c} from "foo.js";',
    errors: [{
      message: "Member 'B' of the import declaration should be sorted alphabetically.",
      type: 'ImportSpecifier'
    }]
  }, {
    code: 'import {zzzzz, /* comment */ aaaaa} from "foo.js";',
    output: null, // not fixed due to comment
    errors: [{
      message: "Member 'aaaaa' of the import declaration should be sorted alphabetically.",
      type: 'ImportSpecifier'
    }]
  }, {
    code: 'import {zzzzz /* comment */, aaaaa} from "foo.js";',
    output: null, // not fixed due to comment
    errors: [{
      message: "Member 'aaaaa' of the import declaration should be sorted alphabetically.",
      type: 'ImportSpecifier'
    }]
  }, {
    code: 'import {/* comment */ zzzzz, aaaaa} from "foo.js";',
    output: null, // not fixed due to comment
    errors: [{
      message: "Member 'aaaaa' of the import declaration should be sorted alphabetically.",
      type: 'ImportSpecifier'
    }]
  }, {
    code: 'import {zzzzz, aaaaa /* comment */} from "foo.js";',
    output: null, // not fixed due to comment
    errors: [{
      message: "Member 'aaaaa' of the import declaration should be sorted alphabetically.",
      type: 'ImportSpecifier'
    }]
  }, {
    code: [
      'import {',
      'boop,',
      'foo,',
      'zoo,',
      'baz as qux,',
      'bar,',
      'beep',
      '} from "foo.js";'
    ].join('\n'),
    output: [
      'import {',
      'bar,',
      'beep,',
      'boop,',
      'foo,',
      'baz as qux,',
      'zoo',
      '} from "foo.js";'
    ].join('\n'),
    errors: [{
      message: "Member 'qux' of the import declaration should be sorted alphabetically.",
      type: 'ImportSpecifier'
    }]
  }]
});
