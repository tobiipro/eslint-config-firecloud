// based on https://raw.githubusercontent.com/eslint/eslint/master/lib/rules/object-curly-newline.js
module.exports = {
  meta: {
    docs: {
      description: 'enforce line breaks for curly braces inside import specifiers list',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: 'whitespace',
    schema: [
      {
        type: 'object',
        properties: {
          allowOneLineIfSingle: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }]
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const allowOneLineIfSingle = context.options[0] && Boolean(context.options[0].allowOneLineIfSingle);

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

        const openBrace = sourceCode.getFirstToken(node, (token) => {
          return token.value === '{';
        });
        const closeBrace = sourceCode.getLastToken(node, (token) => {
          return token.value === '}';
        });

        // checking if single and everything is across the same line
        if (allowOneLineIfSingle && specifiers.length === 1) {
          const singleSpecifierLoc = specifiers[0].loc;

          if (singleSpecifierLoc.end.line === openBrace.loc.end.line &&
              singleSpecifierLoc.start.line === closeBrace.loc.start.line) {
            // single specifier is on the same line and it's allowed
            return;
          }
        }

        if (openBrace.loc.end.line === specifiers[0].loc.start.line) {
          context.report({
            node,
            loc: openBrace.loc.start,
            message: 'Expected a line break after this opening brace.',
            fix(fixer) {
              return fixer.insertTextAfter(openBrace, '\n');
            }
          });
        }

        if (closeBrace.loc.start.line === specifiers[specifiers.length - 1].loc.end.line) {
          context.report({
            node,
            loc: closeBrace.loc.start,
            message: 'Expected a line break before this closing brace.',
            fix(fixer) {
              return fixer.insertTextBefore(closeBrace, '\n');
            }
          });
        }
      }
    };
  }
}
