/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
/* eslint-enable eslint-comments/no-unlimited-disable */
// based on https://github.com/jfmengels/eslint-plugin-fp/blob/8757d3c/rules/no-loops.js
// - target only for loops

'use strict';

const create = function (context) {
  function reportForLoop(node) {
    context.report({
      node,
      message: 'Unallowed use of `for` loop'
    });
  }

  function reportWhileLoop(node) {
    context.report({
      node,
      message: 'Unallowed use of `while` loop. Use recursion instead'
    });
  }

  return {
    ForStatement: reportForLoop
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of for loops.',
      recommended: 'error'
    }
  }
};
