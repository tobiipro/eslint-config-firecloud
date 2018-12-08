// NOTE modification of https://github.com/jfmengels/eslint-plugin-fp/blob/8757d3c/rules/no-loops.js
// to allow for for...in, for...of, while and do...while

/* eslint eslint-comments/no-unlimited-disable: off */
/* eslint-disable */

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
    // ForInStatement: reportForLoop,
    // ForOfStatement: reportForLoop,

    // WhileStatement: reportWhileLoop,
    // DoWhileStatement: reportWhileLoop
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      // description: 'Forbid the use of loops.',
      description: 'Forbid the use of for loops.',
      recommended: 'error'
    }
  }
};
