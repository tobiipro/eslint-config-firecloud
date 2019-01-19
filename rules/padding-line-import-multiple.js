let _ = require('lodash');

module.exports = {
  meta: {
    docs: {
      description: 'enforce empty lines before import declarations spanned on multiple lines',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: 'whitespace',
    schema: [{
      type: 'object',
      additionalProperties: false
    }]
  },

  create(context) {
    let sourceCode = context.getSourceCode();

    return {
      ImportDeclaration(node) {
        if (node.loc.start.line === node.loc.end.line) {
          return;
        }

        let prev = sourceCode.getTokenBefore(node);
        if (!prev) {
          // probably first statement
          return;
        }

        if (_.includes(sourceCode.getText().slice(prev.end, node.start), '\n\n')) {
          // contains empty line between prev token and node
          return;
        }

        context.report({
          node,
          loc: node.loc.start,
          message: 'Expected an empty line before multiline import statement.',
          fix(fixer) {
            if (sourceCode.commentsExistBetween(prev, node)) {
              return;
            }

            return fixer.insertTextBefore(node, '\n');
          }
        });
      }
    };
  }
};
