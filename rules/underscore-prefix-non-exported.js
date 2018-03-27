let _ = require('lodash');

module.exports = {
  meta: {
    docs: {
      description: 'enforce top-level non-exported (private) variables to be prefixed with underscore',
      category: 'Stylistic Issues',
      recommended: false
    },

    schema: [
      {
        type: 'object',
        additionalProperties: false
      }
    ]
  },

  create(context) {
    let checkVariable = function(variable) {
      let scope = variable.scope.type;
      if (scope !== 'module' && scope !== 'global') {
        // not top-level scope
        return;
      }

      if (_.startsWith(variable.name, '_')) {
        return;
      }

      context.report({
        node: variable.defs[0].name,
        message: 'Top-level not exported variables should be prefixed with "_"'
      });
    };

    let checkDeclaration = function(node) {
      if (node.parent.type === 'ExportNamedDeclaration') {
        // exported variable
        return;
      }

      let top = context.getAncestors()[0];
      if (!_.some(top.body, function(topNode) {
        return topNode.type === 'ExportNamedDeclaration' ||
              topNode.type === 'ExportAllDeclaration' ||
              topNode.type === 'ExportDefaultDeclaration';
      })) {
        // not checking files which dont't export anything, i.e. simple scripts
        return;
      }

      let vars = context.getDeclaredVariables(node);
      _.forEach(vars, checkVariable);
    };

    return {
      VariableDeclaration: checkDeclaration,
      FunctionDeclaration: checkDeclaration
    };
  }
};
