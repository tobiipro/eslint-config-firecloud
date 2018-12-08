let _ = require('lodash');

// based on https://github.com/eslint/eslint/blob/master/lib/rules/sort-imports.js
module.exports = {
  meta: {
    docs: {
      description: 'enforce sorted import declarations within modules',
      category: 'ECMAScript 6',
      recommended: false
    },

    schema: [
      {
        type: 'object',
        properties: {
          ignoreCase: {
            type: 'boolean'
          },
          memberSyntaxSortOrder: {
            type: 'array',
            items: {
              enum: ['none', 'all', 'single', 'multiple']
            },
            uniqueItems: true,
            minItems: 4,
            maxItems: 4
          },
          ignoreMemberSort: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ],

    fixable: 'code'
  },

  create(context) {
    let configuration = context.options[0] || {};
    let ignoreCase = configuration.ignoreCase || false;
    let ignoreMemberSort = configuration.ignoreMemberSort || false;
    let memberSyntaxSortOrder = configuration.memberSyntaxSortOrder || ['none', 'all', 'single', 'multiple'];
    let sourceCode = context.getSourceCode();

    let previousDeclaration;

    /**
      * Gets the used member syntax style.
      *
      * import "my-module.js" --> none
      * import * as myModule from "my-module.js" --> all
      * import myMember from "my-module.js" --> single
      * import {foo, bar} from  "my-module.js" --> multiple
      *
      * @param {ASTNode} node - the ImportDeclaration node.
      * @returns {string} used member parameter style, ["all", "multiple", "single"]
      */
    let usedMemberSyntax = function(node) {
      if (node.specifiers.length === 0) {
        return 'none';
      }
      if (node.specifiers[0].type === 'ImportNamespaceSpecifier') {
        return 'all';
      }
      if (node.specifiers[0].type === 'ImportDefaultSpecifier') {
        return 'single';
      }
      return 'multiple';
    };

    /**
      * Gets the group by member parameter index for given declaration.
      * @param {ASTNode} node - the ImportDeclaration node.
      * @returns {number} the declaration group by member index.
      */
    let getMemberParameterGroupIndex = function(node) {
      return memberSyntaxSortOrder.indexOf(usedMemberSyntax(node));
    };

    /**
      * Gets the local name of the first imported module.
      * @param {ASTNode} node - the ImportDeclaration node.
      * @returns {?string} the local name of the first imported module.
      */
    let getFirstLocalMemberName = function(node) {
      if (node.specifiers[0]) {
        return node.specifiers[0].local.name;
      }
    };

    /**
    * Gets if the node has comments before or after it.
    * @param {ASTNode} node - the AST node.
    * @returns {bool} if there are comments around the node.
    */
    let hasCommentsAround = function(node) {
      let before = sourceCode.getCommentsBefore(node);
      let after = sourceCode.getCommentsAfter(node);

      // checking if 'before' comment is on the same line or a line above
      if (_.some(before, (comment) => {
        return comment.loc.end.line + 1 >= node.loc.start.line;
      })) {
        return true;
      }

      // checking if 'after comment is on the same line or a line below
      if (_.some(after, (comment) => {
        return comment.loc.start.line - 1 <= node.loc.end.line;
      })) {
        return true;
      }

      return false;
    };

    /**
    * Swaps nodes using given fixer.
    * @param {Fixer} fixer - the fixer to create fixes.
    * @param {ASTNode} a - first node.
    * @param {ASTNode} b - second node.
    * @returns {?Array} - array of fixings or null if fixes are not possible.
    */
    let swapNodes = function(fixer, a, b) {
      if (hasCommentsAround(a) || hasCommentsAround(b)) {
        return;
      }

      let fixes = [];
      fixes.push(fixer.replaceText(b, sourceCode.getText().slice(a.start, a.end)));
      fixes.push(fixer.replaceText(a, sourceCode.getText().slice(b.start, b.end)));
      return fixes;
    };

    return {
      ImportDeclaration(node) {
        if (previousDeclaration) {
          let currentMemberSyntaxGroupIndex = getMemberParameterGroupIndex(node);
          let previousMemberSyntaxGroupIndex = getMemberParameterGroupIndex(previousDeclaration);
          let currentLocalMemberName = getFirstLocalMemberName(node);
          let previousLocalMemberName = getFirstLocalMemberName(previousDeclaration);

          if (ignoreCase) {
            previousLocalMemberName = previousLocalMemberName && _.toLower(previousLocalMemberName);
            currentLocalMemberName = currentLocalMemberName && _.toLower(currentLocalMemberName);
          }

          /*
            * When the current declaration uses a different member syntax,
            * then check if the ordering is correct.
            * Otherwise, make a default string compare (like rule sort-vars to be consistent)
            * of the first used local member name.
            */
          if (currentMemberSyntaxGroupIndex !== previousMemberSyntaxGroupIndex) {
            if (currentMemberSyntaxGroupIndex < previousMemberSyntaxGroupIndex) {
              context.report({
                node,
                message: "Expected '{{syntaxA}}' syntax before '{{syntaxB}}' syntax.",
                data: {
                  syntaxA: memberSyntaxSortOrder[currentMemberSyntaxGroupIndex],
                  syntaxB: memberSyntaxSortOrder[previousMemberSyntaxGroupIndex]
                },
                fix(fixer) {
                  return swapNodes(fixer, node, previousDeclaration);
                }
              });
            }
          } else if (previousLocalMemberName &&
                          currentLocalMemberName &&
                          currentLocalMemberName < previousLocalMemberName
          ) {
            context.report({
              node,
              message: 'Imports should be sorted alphabetically.',
              fix(fixer) {
                return swapNodes(fixer, node, previousDeclaration);
              }
            });
          }
        }

        if (!ignoreMemberSort) {
          let importSpecifiers = _.filter(node.specifiers, (specifier) => {
            return specifier.type === 'ImportSpecifier';
          });
          let getSortableName = ignoreCase ? (specifier) => {
            return _.toLower(specifier.local.name);
          } : (specifier) => {
            return specifier.local.name;
          };
          let firstUnsortedIndex = _.findIndex(_.map(importSpecifiers, getSortableName), (name, index, array) => {
            return array[index - 1] > name;
          });

          if (firstUnsortedIndex !== -1) {
            context.report({
              node: importSpecifiers[firstUnsortedIndex],
              message: "Member '{{memberName}}' of the import declaration should be sorted alphabetically.",
              data: {memberName: importSpecifiers[firstUnsortedIndex].local.name},
              fix(fixer) {
                if (_.some(importSpecifiers, hasCommentsAround)) {
                  // If there are comments in the ImportSpecifier list, don't rearrange the specifiers.
                  return;
                }

                return fixer.replaceTextRange(
                  [importSpecifiers[0].range[0], importSpecifiers[importSpecifiers.length - 1].range[1]],
                  // eslint-disable-next-line lodash/chaining
                  _.chain(importSpecifiers)
                    .clone()
                    .sort((specifierA, specifierB) => {
                      let aName = getSortableName(specifierA);
                      let bName = getSortableName(specifierB);

                      return aName > bName ? 1 : -1;
                    })
                    .reduce((sourceText, specifier, index) => {
                      let textAfterSpecifier = '';
                      if (index !== importSpecifiers.length - 1) {
                        textAfterSpecifier = sourceCode.getText()
                          .slice(importSpecifiers[index].range[1], importSpecifiers[index + 1].range[0]);
                      }

                      return sourceText + sourceCode.getText(specifier) + textAfterSpecifier;
                    }, '').value()
                );
              }
            });
          }
        }

        previousDeclaration = node;
      }
    };
  }
};
