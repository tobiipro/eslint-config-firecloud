module.exports = {
  isNodeOnlyParamObject: function(node) {
    let isArgument =
          node.type === 'ObjectExpression' &&
          node.parent &&
          (
            node.parent.type === 'CallExpression' ||
            node.parent.type === 'NewExpression'
          );

    let isParam =
          node.type === 'ObjectPattern' &&
          node.parent &&
          (
            node.parent.type === 'ArrowFunctionExpression' ||
            node.parent.type === 'FunctionDeclaration' ||
            node.parent.type === 'FunctionExpression'
          );

    let isOnlyParam =
          (isArgument && node.parent.arguments.length === 1) ||
          (isParam && node.parent.params.length === 1);

    return isOnlyParam;
  }
};
