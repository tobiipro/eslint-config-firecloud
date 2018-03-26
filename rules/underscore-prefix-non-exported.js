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

      // making an exception for 'require' call in the right hand side
      let definition = variable.defs[0].node;
      if (definition.type === 'VariableDeclarator' &&
          definition.init.type === 'CallExpression' &&
          definition.init.callee.name === 'require') {
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

      let vars = context.getDeclaredVariables(node);
      _.forEach(vars, checkVariable);
    };

    return {
      VariableDeclaration: checkDeclaration,
      FunctionDeclaration: checkDeclaration
    };
  }
};
