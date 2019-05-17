/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// based on https://github.com/eslint/eslint/blob/master/lib/rules/object-property-newline.js
// - target import specifiers instead of object properties

/**
 * @fileoverview Rule to enforce placing import specifiers on separate lines.
 * @author Vitor Balocco
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "layout",

        docs: {
            description: "enforce placing import specifiers on separate lines",
            category: "Stylistic Issues",
            recommended: false
        },

        schema: [
            {
                type: "object",
                properties: {
                    allowAllSpecifiersOnSameLine: {
                        type: "boolean"
                    },
                    allowMultipleSpecifiersPerLine: { // Deprecated
                        type: "boolean"
                    }
                },
                additionalProperties: false
            }
        ],

        fixable: "whitespace"
    },

    create(context) {
        const allowSameLine = context.options[0] && (
            (Boolean(context.options[0].allowAllSpecifiersOnSameLine) || Boolean(context.options[0].allowMultipleSpecifiersPerLine)) // Deprecated
        );
        const errorMessage = allowSameLine
            ? "Import specifiers must go on a new line if they aren't all on the same line."
            : "Import specifiers must go on a new line.";

        const sourceCode = context.getSourceCode();

        return {
            ImportDeclaration(node) {
                if (node.specifiers.length === 0) {
                    // something like: import * from 'a';
                    return;
                }

                if (node.specifiers[0].type !== 'ImportSpecifier') {
                    // something not having list of specifiers
                    return;
                }

                if (allowSameLine) {
                    if (node.specifiers.length > 1) {
                        const firstTokenOfFirstSpecifier = sourceCode.getFirstToken(node.specifiers[0]);
                        const lastTokenOfLastSpecifier = sourceCode.getLastToken(node.specifiers[node.specifiers.length - 1]);

                        if (firstTokenOfFirstSpecifier.loc.end.line === lastTokenOfLastSpecifier.loc.start.line) {

                            // All keys and values are on the same line
                            return;
                        }
                    }
                }

                for (let i = 1; i < node.specifiers.length; i++) {
                    const lastTokenOfPreviousSpecifier = sourceCode.getLastToken(node.specifiers[i - 1]);
                    const firstTokenOfCurrentSpecifier = sourceCode.getFirstToken(node.specifiers[i]);

                    if (lastTokenOfPreviousSpecifier.loc.end.line === firstTokenOfCurrentSpecifier.loc.start.line) {
                        context.report({
                            node,
                            loc: firstTokenOfCurrentSpecifier.loc.start,
                            message: errorMessage,
                            fix(fixer) {
                                const comma = sourceCode.getTokenBefore(firstTokenOfCurrentSpecifier);
                                const rangeAfterComma = [comma.range[1], firstTokenOfCurrentSpecifier.range[0]];

                                // Don't perform a fix if there are any comments between the comma and the next property.
                                if (sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]).trim()) {
                                    return null;
                                }

                                return fixer.replaceTextRange(rangeAfterComma, "\n");
                            }
                        });
                    }
                }
            }
        };
    }
};
