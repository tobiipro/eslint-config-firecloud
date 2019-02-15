module.exports = {
  // eslint-disable-next-line complexity
  isNodeOnlyParamObject: function(node) {
    let isArgument =
        node.type === 'ObjectExpression' &&
        node.parent &&
        (
          node.parent.type === 'CallExpression' ||
          node.parent.type === 'NewExpression'
        );

    let isOnlyArgument =
        isArgument &&
        node.parent.arguments &&
        node.parent.arguments.length === 1;

    let isParam =
        node.type === 'ObjectPattern' &&
        node.parent &&
        (
          node.parent.type === 'ArrowFunctionExpression' ||
          node.parent.type === 'FunctionDeclaration' ||
          node.parent.type === 'FunctionExpression' ||
          (
            node.parent.type === 'AssignmentPattern' &&
            node.parent.parent &&
            (
              node.parent.parent.type === 'ArrowFunctionExpression' ||
              node.parent.parent.type === 'FunctionDeclaration' ||
              node.parent.parent.type === 'FunctionExpression'
            )
          )
        );

    let isOnlyParam =
        isParam &&
        (
          (
            node.parent.type === 'AssignmentPattern' &&
            node.parent.parent.params &&
            node.parent.parent.params.length === 1
          ) ||
          (
            node.parent.params &&
            node.parent.params.length === 1
          )
        );

    return isOnlyArgument || isOnlyParam;
  }
};
