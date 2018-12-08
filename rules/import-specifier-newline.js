let _ = require('lodash');

// based on https://github.com/eslint/eslint/blob/master/lib/rules/object-property-newline.js
module.exports = {
  meta: {
    docs: {
      description: 'enforce placing import specifiers on separate lines',
      category: 'Stylistic Issues',
      recommended: false
    },

    schema: [
      {
        type: 'object',
        properties: {
          allowMultiplePerLine: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ],

    fixable: 'whitespace'
  },

  create(context) {
    let allowSameLine = context.options[0] && Boolean(context.options[0].allowMultiplePerLine);
    let errorMessage = allowSameLine ?
      'Import specifiers must go on a new line if they are not all on the same line.' :
      'Import specifiers must go on a new line.';

    let sourceCode = context.getSourceCode();

    return {
      ImportDeclaration(node) {
        let {specifiers} = node;
        if (specifiers.length === 0) {
          // something like: import * from 'a';
          return;
        }

        if (specifiers[0].type !== 'ImportSpecifier') {
          // something not having list of specifiers
          return;
        }

        if (allowSameLine) {
          if (specifiers.length > 1) {
            let firstTokenOfFirstSpecifier = sourceCode.getFirstToken(specifiers[0]);
            let lastTokenOfLastSpecifier = sourceCode.getLastToken(specifiers[specifiers.length - 1]);

            if (firstTokenOfFirstSpecifier.loc.end.line === lastTokenOfLastSpecifier.loc.start.line) {
              // All keys and values are on the same line
              return;
            }
          }
        }

        for (let i of _.range(1, specifiers.length)) {
          let lastTokenOfPreviousSpecifier = sourceCode.getLastToken(specifiers[i - 1]);
          let firstTokenOfCurrentSpecifier = sourceCode.getFirstToken(specifiers[i]);

          if (lastTokenOfPreviousSpecifier.loc.end.line === firstTokenOfCurrentSpecifier.loc.start.line) {
            context.report({
              node,
              loc: firstTokenOfCurrentSpecifier.loc.start,
              message: errorMessage,
              fix(fixer) {
                let comma = sourceCode.getTokenBefore(firstTokenOfCurrentSpecifier);
                let rangeAfterComma = [comma.range[1], firstTokenOfCurrentSpecifier.range[0]];

                // Don't perform a fix if there are any comments between the comma and the next property.
                if (_.trim(sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]))) {
                  return undefined;
                }

                return fixer.replaceTextRange(rangeAfterComma, '\n');
              }
            });
          }
        }
      }
    };
  }
};
