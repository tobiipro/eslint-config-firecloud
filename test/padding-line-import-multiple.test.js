const rule = require("../rules/padding-line-import-multiple");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015, sourceType: 'module' } });
const errorMessage = 'Expected an empty line before multiline import statement.';

ruleTester.run("padding-line-import-multiple", rule, {
  valid: [
    'import a from "b"',
    'import f from "d"\nimport c from "a"',
    'import {\na\n} from "b"',
    'import a from "b"\n\nimport {c} from "b"',
    'import {\na\n} from "b"\n\nimport {c} from "b"',
    'import {a} from "b";\nimport {c} from "b"'
  ],
  invalid: [
    {
      code: 'import a from "b";\nimport {b,\nc} from "b"',
      errors: [
        { message: errorMessage }
      ],
      output: 'import a from "b";\n\nimport {b,\nc} from "b"'
    },

    // don't fix if comment present
    {
      code: 'import a from "b";\n//comment\nimport {b,\nc} from "b"',
      errors: [
        { message: errorMessage }
      ],
      output: 'import a from "b";\n//comment\nimport {b,\nc} from "b"'
    }
  ]
});
