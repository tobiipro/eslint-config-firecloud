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
    const allowSameLine = context.options[0] && Boolean(context.options[0].allowMultiplePerLine);
    const errorMessage = allowSameLine ?
      "Import specifiers must go on a new line if they aren't all on the same line." :
      'Import specifiers must go on a new line.';

    const sourceCode = context.getSourceCode();

    return {
      ImportDeclaration(node) {
        const {specifiers} = node;
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
            const firstTokenOfFirstSpecifier = sourceCode.getFirstToken(specifiers[0]);
            const lastTokenOfLastSpecifier = sourceCode.getLastToken(specifiers[specifiers.length - 1]);

            if (firstTokenOfFirstSpecifier.loc.end.line === lastTokenOfLastSpecifier.loc.start.line) {
              // All keys and values are on the same line
              return;
            }
          }
        }

        /* eslint-disable better/no-fors, fp/no-loops, no-plusplus */
        for (let i = 1; i < specifiers.length; i++) {
          const lastTokenOfPreviousSpecifier = sourceCode.getLastToken(specifiers[i - 1]);
          const firstTokenOfCurrentSpecifier = sourceCode.getFirstToken(specifiers[i]);

          if (lastTokenOfPreviousSpecifier.loc.end.line === firstTokenOfCurrentSpecifier.loc.start.line) {
            context.report({
              node,
              loc: firstTokenOfCurrentSpecifier.loc.start,
              message: errorMessage,
              fix(fixer) {
                const comma = sourceCode.getTokenBefore(firstTokenOfCurrentSpecifier);
                const rangeAfterComma = [comma.range[1], firstTokenOfCurrentSpecifier.range[0]];

                // Don't perform a fix if there are any comments between the comma and the next property.
                if (_.trim(sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]))) {
                  return undefined;
                }

                return fixer.replaceTextRange(rangeAfterComma, '\n');
              }
            });
          }
        }
        /* eslint-enable better/no-fors, fp/no-loops, no-plusplus */
      }
    };
  }
};
