/* eslint-disable */
// based on https://github.com/eslint/eslint/blob/master/lib/rules/sort-imports.js
// - add a fixer
// - handle default imports

/**
 * @fileoverview Rule to require sorting of import declarations
 * @author Christian Schuller
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "enforce sorted import declarations within modules",
            category: "ECMAScript 6",
            recommended: false
        },

        schema: [
            {
                type: "object",
                properties: {
                    ignoreCase: {
                        type: "boolean"
                    },
                    memberSyntaxSortOrder: {
                        type: "array",
                        items: {
                            enum: ["none", "all", "default", "single", "multiple"]
                        },
                        uniqueItems: true,
                        minItems: 5,
                        maxItems: 5
                    },
                    ignoreDeclarationSort: {
                        type: "boolean"
                    },
                    ignoreMemberSort: {
                        type: "boolean"
                    }
                },
                additionalProperties: false
            }
        ],

        fixable: "code"
    },

    create(context) {

        const configuration = context.options[0] || {},
            ignoreCase = configuration.ignoreCase || false,
            ignoreDeclarationSort = configuration.ignoreDeclarationSort || false,
            ignoreMemberSort = configuration.ignoreMemberSort || false,
            memberSyntaxSortOrder = configuration.memberSyntaxSortOrder || ["none", "all", "default", "single", "multiple"],
            sourceCode = context.getSourceCode();
        let previousDeclaration = null;

        /**
         * Gets the used member syntax style.
         *
         * import "my-module.js" --> none
         * import myModule from "my-module.js" --> default
         * import * as myModule from "my-module.js" --> all
         * import {myMember} from "my-module.js" --> single
         * import {foo, bar} from  "my-module.js" --> multiple
         *
         * @param {ASTNode} node - the ImportDeclaration node.
         * @returns {string} used member parameter style, ["all", "default", "multiple", "single"]
         */
        function usedMemberSyntax(node) {
            if (node.specifiers.length === 0) {
                return "none";
            }
            if (node.specifiers[0].type === "ImportDefaultSpecifier") {
                return "default";
            }
            if (node.specifiers[0].type === "ImportNamespaceSpecifier") {
                return "all";
            }
            if (node.specifiers.length === 1) {
                return "single";
            }
            return "multiple";

        }

        /**
         * Gets the group by member parameter index for given declaration.
         * @param {ASTNode} node - the ImportDeclaration node.
         * @returns {number} the declaration group by member index.
         */
        function getMemberParameterGroupIndex(node) {
            return memberSyntaxSortOrder.indexOf(usedMemberSyntax(node));
        }

        /**
         * Gets the local name of the first imported module.
         * @param {ASTNode} node - the ImportDeclaration node.
         * @returns {?string} the local name of the first imported module.
         */
        function getFirstLocalMemberName(node) {
            if (node.specifiers[0]) {
                return node.specifiers[0].local.name;
            }
            return null;

        }

        /**
         * Gets if the node has comments before or after it.
         * @param {ASTNode} node - the AST node.
         * @returns {bool} if there are comments around the node.
         */
        let hasCommentsAround = function(node) {
            let before = sourceCode.getCommentsBefore(node);
            let after = sourceCode.getCommentsAfter(node);

            // checking if 'before' comment is on the same line or a line above
            if (before.some((comment) => {
                return comment.loc.end.line + 1 >= node.loc.start.line;
            })) {
                return true;
            }

            // checking if 'after comment is on the same line or a line below
            if (after.some((comment) => {
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
                if (!ignoreDeclarationSort) {
                    if (previousDeclaration) {
                        const currentMemberSyntaxGroupIndex = getMemberParameterGroupIndex(node),
                            previousMemberSyntaxGroupIndex = getMemberParameterGroupIndex(previousDeclaration);
                        let currentLocalMemberName = getFirstLocalMemberName(node),
                            previousLocalMemberName = getFirstLocalMemberName(previousDeclaration);

                        if (ignoreCase) {
                            previousLocalMemberName = previousLocalMemberName && previousLocalMemberName.toLowerCase();
                            currentLocalMemberName = currentLocalMemberName && currentLocalMemberName.toLowerCase();
                        }

                        /*
                         * When the current declaration uses a different member syntax,
                         * then check if the ordering is correct.
                         * Otherwise, make a default string compare (like rule sort-vars to be consistent) of the first used local member name.
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
                        } else {
                            if (previousLocalMemberName &&
                                currentLocalMemberName &&
                                currentLocalMemberName < previousLocalMemberName
                            ) {
                                context.report({
                                    node,
                                    message: "Imports should be sorted alphabetically.",
                                    fix(fixer) {
                                        return swapNodes(fixer, node, previousDeclaration);
                                    }
                                });
                            }
                        }
                    }

                    previousDeclaration = node;
                }

                if (!ignoreMemberSort) {
                    const importSpecifiers = node.specifiers.filter(specifier => specifier.type === "ImportSpecifier");
                    const getSortableName = ignoreCase ? specifier => specifier.local.name.toLowerCase() : specifier => specifier.local.name;
                    const firstUnsortedIndex = importSpecifiers.map(getSortableName).findIndex((name, index, array) => array[index - 1] > name);

                    if (firstUnsortedIndex !== -1) {
                        context.report({
                            node: importSpecifiers[firstUnsortedIndex],
                            message: "Member '{{memberName}}' of the import declaration should be sorted alphabetically.",
                            data: { memberName: importSpecifiers[firstUnsortedIndex].local.name },
                            fix(fixer) {
                                if (importSpecifiers.some(specifier =>
                                    sourceCode.getCommentsBefore(specifier).length || sourceCode.getCommentsAfter(specifier).length)) {

                                    // If there are comments in the ImportSpecifier list, don't rearrange the specifiers.
                                    return null;
                                }

                                return fixer.replaceTextRange(
                                    [importSpecifiers[0].range[0], importSpecifiers[importSpecifiers.length - 1].range[1]],
                                    importSpecifiers

                                        // Clone the importSpecifiers array to avoid mutating it
                                        .slice()

                                        // Sort the array into the desired order
                                        .sort((specifierA, specifierB) => {
                                            const aName = getSortableName(specifierA);
                                            const bName = getSortableName(specifierB);

                                            return aName > bName ? 1 : -1;
                                        })

                                        // Build a string out of the sorted list of import specifiers and the text between the originals
                                        .reduce((sourceText, specifier, index) => {
                                            const textAfterSpecifier = index === importSpecifiers.length - 1
                                                ? ""
                                                : sourceCode.getText().slice(importSpecifiers[index].range[1], importSpecifiers[index + 1].range[0]);

                                            return sourceText + sourceCode.getText(specifier) + textAfterSpecifier;
                                        }, "")
                                );
                            }
                        });
                    }
                }
            }
        };
    }
};
