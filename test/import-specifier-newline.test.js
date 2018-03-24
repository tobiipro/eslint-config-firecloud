
const rule = require("../rules/import-specifier-newline"),
RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015, sourceType: 'module' } });
const errorMessageAllowMultiple =
  'Import specifiers must go on a new line if they are not all on the same line.';
const errorMessage = 'Import specifiers must go on a new line.';

ruleTester.run("import-specifier-newline", rule, {
  valid: [
    {
      code: 'import {a} from "b"',
      options: [{allowMultiplePerLine: false}]
    },
    {
      code: 'import {\na\n} from "b"',
      options: [{allowMultiplePerLine: false}]
    },
    {
      code: 'import {\na,\nb\n} from "b"',
      options: [{allowMultiplePerLine: false}]
    },
    {
      code: 'import {a,\nb} from "b"',
      options: [{allowMultiplePerLine: false}]
    },

    {
      code: 'import {a} from "b"',
      options: [{allowMultiplePerLine: true}]
    },
    {
      code: 'import {a,b,c} from "b"',
      options: [{allowMultiplePerLine: true}]
    },
    {
      code: 'import {a,\nb,\nc} from "b"',
      options: [{allowMultiplePerLine: true}]
    },
  ],
  invalid: [
    {
      code: 'import {a,b} from "b"',
      options: [{allowMultiplePerLine: false}],
      errors: [
        { message: errorMessage }
      ],
      output: 'import {a,\nb} from "b"'
    },
    {
      code: 'import {a,\nb,c} from "b"',
      options: [{allowMultiplePerLine: false}],
      errors: [
        { message: errorMessage }
      ],
      output: 'import {a,\nb,\nc} from "b"'
    },

    {
      code: 'import {a,b,\nc} from "b"',
      options: [{allowMultiplePerLine: true}],
      errors: [
        { message: errorMessageAllowMultiple }
      ],
      output: 'import {a,\nb,\nc} from "b"'
    },

    // no fixes if comments are present
    {
      code: 'import {a,/*a comment*/b,\nc} from "b"',
      options: [{allowMultiplePerLine: true}],
      errors: [
        { message: errorMessageAllowMultiple }
      ],
      output: 'import {a,/*a comment*/b,\nc} from "b"'
    }
  ]
});
