/* eslint-disable */
/**
 * @fileoverview Tests for sort-keys rule.
 * @author Toru Nagashima
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../rules/sort-object-pattern"),
    RuleTester = require("eslint/lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("sort-keys", rule, {
    valid: [

        // default (asc)
        { code: "var {_, a, b} = obj; // default", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, b, c} = obj;", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, b, b_} = obj;", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var {C, b_, c} = obj;", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var {$, A, _, a} = obj;", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var {1: _1, '11': _2, 2: _3, A} = obj;", options: [], parserOptions: { ecmaVersion: 6 } },
        { code: "var {'#': _1, 'Z': _2, À: _3, è: _4} = obj;", options: [], parserOptions: { ecmaVersion: 6 } },

        // ignore non-simple computed properties.
        { code: "var {a, b, [a + b]: _1, c} = obj;", options: [], parserOptions: { ecmaVersion: 6 } },

        // nested
        { code: "var {a, b:{x, y}, c} = obj;", options: [], parserOptions: { ecmaVersion: 6 } },

        // asc
        { code: "var {_, a, b} = obj; // asc", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, b, c} = obj;", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, b, b_} = obj;", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {C, b_, c} = obj;", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {$, A, _, a} = obj;", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {1: _1, '11': _2, 2: _3, A} = obj;", options: ["asc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {'#': _1, 'Z': _2, À: _3, è: _4} = obj;", options: ["asc"], parserOptions: { ecmaVersion: 6 } },

        // asc, insensitive
        { code: "var {_, a, b} = obj; // asc, insensitive", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, b, c} = obj;", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, b, b_} = obj;", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {b_, C, c} = obj;", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {b_, c, C} = obj;", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {$, _, A, a} = obj;", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {1: _1, '11': _2, 2: _3, A} = obj;", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {'#': _1, 'Z': _2, À: _3, è: _4} = obj;", options: ["asc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },

        // asc, natural
        { code: "var {_, a, b} = obj; // asc, natural", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, b, c} = obj;", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, b, b_} = obj;", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {C, b_, c} = obj;", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {$, _, A, a} = obj;", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {1: _1, 2: _2, '11': _3, A} = obj;", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {'#': _1, 'Z': _2, À: _3, è: _4} = obj;", options: ["asc", { natural: true }], parserOptions: { ecmaVersion: 6 } },

        // asc, natural, insensitive
        { code: "var {_, a, b} = obj; // asc, natural, insensitive", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, b, c} = obj;", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, b, b_} = obj;", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {b_, C, c} = obj;", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {b_, c, C} = obj;", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {$, _, A, a} = obj;", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {1: _1, 2: _2, '11': _3, A} = obj;", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {'#': _1, 'Z': _2, À: _3, è: _4} = obj;", options: ["asc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },

        // desc
        { code: "var {b, a, _} = obj; // desc", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {c, b, a} = obj;", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {b_, b, a} = obj;", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {c, b_, C} = obj;", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, _, A, $} = obj;", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {A, 2: _1, '11': _2, 1: _3} = obj;", options: ["desc"], parserOptions: { ecmaVersion: 6 } },
        { code: "var {è: _1, À: _2, 'Z': _3, '#': _4} = obj;", options: ["desc"], parserOptions: { ecmaVersion: 6 } },

        // desc, insensitive
        { code: "var {b, a, _} = obj; // desc, insensitive", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {c, b, a} = obj;", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {b_, b, a} = obj;", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {c, C, b_} = obj;", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {C, c, b_} = obj;", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, A, _, $} = obj;", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {A, 2: _1, '11': _2, 1: _3} = obj;", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {è: _1, À: _2, 'Z': _3, '#': _4} = obj;", options: ["desc", { caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },

        // desc, natural
        { code: "var {b, a, _} = obj; // desc, natural", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {c, b, a} = obj;", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {b_, b, a} = obj;", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {c, b_, C} = obj;", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, A, _, $} = obj;", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {A, '11': _1, 2: _2, 1: _3} = obj;", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {è: _1, À: _2, 'Z': _3, '#': _4} = obj;", options: ["desc", { natural: true }], parserOptions: { ecmaVersion: 6 } },

        // desc, natural, insensitive
        { code: "var {b, a, _} = obj; // desc, natural, insensitive", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {c, b, a} = obj;", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {b_, b, a} = obj;", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {c, C, b_} = obj;", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {C, c, b_} = obj;", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {a, A, _, $} = obj;", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {A, '11': _1, 2: _2, 1: _3} = obj;", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } },
        { code: "var {è: _1, À: _2, 'Z': _3, '#': _4} = obj;", options: ["desc", { natural: true, caseSensitive: false }], parserOptions: { ecmaVersion: 6 } }
    ],
    invalid: [

        // default (asc)
        {
            code: "var {a, _, b} = obj; // default",
            parserOptions: { ecmaVersion: 6 },
            errors: ["Expected object keys to be in ascending order. '_' should be before 'a'."]
        },
        {
            code: "var {a, c, b} = obj;",
            parserOptions: { ecmaVersion: 6 },
            errors: ["Expected object keys to be in ascending order. 'b' should be before 'c'."]
        },
        {
            code: "var {b_, a, b} = obj;",
            parserOptions: { ecmaVersion: 6 },
            errors: ["Expected object keys to be in ascending order. 'a' should be before 'b_'."]
        },
        {
            code: "var {b_, c, C} = obj;",
            parserOptions: { ecmaVersion: 6 },
            errors: ["Expected object keys to be in ascending order. 'C' should be before 'c'."]
        },
        {
            code: "var {$, _, A, a} = obj;",
            parserOptions: { ecmaVersion: 6 },
            errors: ["Expected object keys to be in ascending order. 'A' should be before '_'."]
        },
        {
            code: "var {1: _1, 2: _2, A, '11': _3} = obj;",
            parserOptions: { ecmaVersion: 6 },
            errors: ["Expected object keys to be in ascending order. '11' should be before 'A'."]
        },
        {
            code: "var {'#': _1, À: _2, 'Z': _3, è: _4} = obj;",
            parserOptions: { ecmaVersion: 6 },
            errors: ["Expected object keys to be in ascending order. 'Z' should be before 'À'."]
        },

        // not ignore simple computed properties.
        {
            code: "var {a, b, [a]: _1, c} = obj;",
            parserOptions: { ecmaVersion: 6 },
            errors: ["Expected object keys to be in ascending order. 'a' should be before 'b'."]
        },

        // nested
        {
            code: "var {a, c:{y, x}, b} = obj;",
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in ascending order. 'x' should be before 'y'.",
                "Expected object keys to be in ascending order. 'b' should be before 'c'."
            ]
        },

        // asc
        {
            code: "var {a, _, b} = obj; // asc",
            options: ["asc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in ascending order. '_' should be before 'a'."
            ]
        },
        {
            code: "var {a, c, b} = obj;",
            options: ["asc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in ascending order. 'b' should be before 'c'."
            ]
        },
        {
            code: "var {b_, a, b} = obj;",
            options: ["asc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in ascending order. 'a' should be before 'b_'."
            ]
        },
        {
            code: "var {b_, c, C} = obj;",
            options: ["asc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in ascending order. 'C' should be before 'c'."
            ]
        },
        {
            code: "var {$, _, A, a} = obj;",
            options: ["asc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in ascending order. 'A' should be before '_'."
            ]
        },
        {
            code: "var {1: _1, 2: _2, A, '11': _3} = obj;",
            options: ["asc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in ascending order. '11' should be before 'A'."
            ]
        },
        {
            code: "var {'#': _1, À: _2, 'Z': _3, è: _4} = obj;",
            options: ["asc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in ascending order. 'Z' should be before 'À'."
            ]
        },

        // asc, insensitive
        {
            code: "var {a, _, b} = obj; // asc, insensitive",
            options: ["asc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive ascending order. '_' should be before 'a'."
            ]
        },
        {
            code: "var {a, c, b} = obj;",
            options: ["asc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive ascending order. 'b' should be before 'c'."
            ]
        },
        {
            code: "var {b_, a, b} = obj;",
            options: ["asc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive ascending order. 'a' should be before 'b_'."
            ]
        },
        {
            code: "var {$, A, _, a} = obj;",
            options: ["asc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive ascending order. '_' should be before 'A'."
            ]
        },
        {
            code: "var {1: _1, 2: _2, A: _3, '11': _4} = obj;",
            options: ["asc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive ascending order. '11' should be before 'A'."
            ]
        },
        {
            code: "var {'#': _1, À: _2, 'Z': _3, è: _4} = obj;",
            options: ["asc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive ascending order. 'Z' should be before 'À'."
            ]
        },

        // asc, natural
        {
            code: "var {a, _, b} = obj; // asc, natural",
            options: ["asc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural ascending order. '_' should be before 'a'."
            ]
        },
        {
            code: "var {a, c, b} = obj;",
            options: ["asc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural ascending order. 'b' should be before 'c'."
            ]
        },
        {
            code: "var {b_, a, b} = obj;",
            options: ["asc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural ascending order. 'a' should be before 'b_'."
            ]
        },
        {
            code: "var {b_, c, C} = obj;",
            options: ["asc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural ascending order. 'C' should be before 'c'."
            ]
        },
        {
            code: "var {$, A, _, a} = obj;",
            options: ["asc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural ascending order. '_' should be before 'A'."
            ]
        },
        {
            code: "var {1: _1, 2: _2, A, '11': _3} = obj;",
            options: ["asc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural ascending order. '11' should be before 'A'."
            ]
        },
        {
            code: "var {'#': _1, À: _2, 'Z': _3, è: _4} = obj;",
            options: ["asc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural ascending order. 'Z' should be before 'À'."
            ]
        },

        // asc, natural, insensitive
        {
            code: "var {a, _, b} = obj; // asc, natural, insensitive",
            options: ["asc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive ascending order. '_' should be before 'a'."
            ]
        },
        {
            code: "var {a, c, b} = obj;",
            options: ["asc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive ascending order. 'b' should be before 'c'."
            ]
        },
        {
            code: "var {b_, a, b} = obj;",
            options: ["asc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive ascending order. 'a' should be before 'b_'."
            ]
        },
        {
            code: "var {$, A, _, a} = obj;",
            options: ["asc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive ascending order. '_' should be before 'A'."
            ]
        },
        {
            code: "var {1: _1, '11': _2, 2: _3, A} = obj;",
            options: ["asc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive ascending order. '2' should be before '11'."
            ]
        },
        {
            code: "var {'#': _1, À: _2, 'Z': _3, è: _4} = obj;",
            options: ["asc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive ascending order. 'Z' should be before 'À'."
            ]
        },

        // desc
        {
            code: "var {a, _, b} = obj; // desc",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in descending order. 'b' should be before '_'."
            ]
        },
        {
            code: "var {a, c, b} = obj;",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in descending order. 'c' should be before 'a'."
            ]
        },
        {
            code: "var {b_, a, b} = obj;",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in descending order. 'b' should be before 'a'."
            ]
        },
        {
            code: "var {b_, c, C} = obj;",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in descending order. 'c' should be before 'b_'."
            ]
        },
        {
            code: "var {$, _, A, a} = obj;",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in descending order. '_' should be before '$'.",
                "Expected object keys to be in descending order. 'a' should be before 'A'."
            ]
        },
        {
            code: "var {1: _1, 2: _2, A, '11': _3} = obj;",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in descending order. '2' should be before '1'.",
                "Expected object keys to be in descending order. 'A' should be before '2'."
            ]
        },
        {
            code: "var {'#': _1, À: _2, 'Z': _3, è: _4} = obj;",
            options: ["desc"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in descending order. 'À' should be before '#'.",
                "Expected object keys to be in descending order. 'è' should be before 'Z'."
            ]
        },

        // desc, insensitive
        {
            code: "var {a, _, b} = obj; // desc, insensitive",
            options: ["desc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive descending order. 'b' should be before '_'."
            ]
        },
        {
            code: "var {a, c, b} = obj;",
            options: ["desc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive descending order. 'c' should be before 'a'."
            ]
        },
        {
            code: "var {b_, a, b} = obj;",
            options: ["desc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive descending order. 'b' should be before 'a'."
            ]
        },
        {
            code: "var {b_, c, C} = obj;",
            options: ["desc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive descending order. 'c' should be before 'b_'."
            ]
        },
        {
            code: "var {$, _, A, a} = obj;",
            options: ["desc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive descending order. '_' should be before '$'.",
                "Expected object keys to be in insensitive descending order. 'A' should be before '_'."
            ]
        },
        {
            code: "var {1: _1, 2: _2, A, '11': _3} = obj;",
            options: ["desc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive descending order. '2' should be before '1'.",
                "Expected object keys to be in insensitive descending order. 'A' should be before '2'."
            ]
        },
        {
            code: "var {'#': _1, À: _2, 'Z': _3, è: _4} = obj;",
            options: ["desc", { caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in insensitive descending order. 'À' should be before '#'.",
                "Expected object keys to be in insensitive descending order. 'è' should be before 'Z'."
            ]
        },

        // desc, natural
        {
            code: "var {a, _, b} = obj; // desc, natural",
            options: ["desc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural descending order. 'b' should be before '_'."
            ]
        },
        {
            code: "var {a, c, b} = obj;",
            options: ["desc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural descending order. 'c' should be before 'a'."
            ]
        },
        {
            code: "var {b_, a, b} = obj;",
            options: ["desc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural descending order. 'b' should be before 'a'."
            ]
        },
        {
            code: "var {b_, c, C} = obj;",
            options: ["desc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural descending order. 'c' should be before 'b_'."
            ]
        },
        {
            code: "var {$, _, A, a} = obj;",
            options: ["desc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural descending order. '_' should be before '$'.",
                "Expected object keys to be in natural descending order. 'A' should be before '_'.",
                "Expected object keys to be in natural descending order. 'a' should be before 'A'."
            ]
        },
        {
            code: "var {1: _1, 2: _2, A, '11': _3} = obj;",
            options: ["desc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural descending order. '2' should be before '1'.",
                "Expected object keys to be in natural descending order. 'A' should be before '2'."
            ]
        },
        {
            code: "var {'#': _1, À: _2, 'Z': _3, è: _4} = obj;",
            options: ["desc", { natural: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural descending order. 'À' should be before '#'.",
                "Expected object keys to be in natural descending order. 'è' should be before 'Z'."
            ]
        },

        // desc, natural, insensitive
        {
            code: "var {a, _, b} = obj; // desc, natural, insensitive",
            options: ["desc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive descending order. 'b' should be before '_'."
            ]
        },
        {
            code: "var {a, c, b} = obj;",
            options: ["desc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive descending order. 'c' should be before 'a'."
            ]
        },
        {
            code: "var {b_, a, b} = obj;",
            options: ["desc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive descending order. 'b' should be before 'a'."
            ]
        },
        {
            code: "var {b_, c, C} = obj;",
            options: ["desc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive descending order. 'c' should be before 'b_'."
            ]
        },
        {
            code: "var {$, _, A, a} = obj;",
            options: ["desc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive descending order. '_' should be before '$'.",
                "Expected object keys to be in natural insensitive descending order. 'A' should be before '_'."
            ]
        },
        {
            code: "var {1: _1, 2: _2, '11': _3, A} = obj;",
            options: ["desc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive descending order. '2' should be before '1'.",
                "Expected object keys to be in natural insensitive descending order. '11' should be before '2'.",
                "Expected object keys to be in natural insensitive descending order. 'A' should be before '11'."
            ]
        },
        {
            code: "var {'#': _1, À: _2, 'Z': _3, è: _4} = obj;",
            options: ["desc", { natural: true, caseSensitive: false }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                "Expected object keys to be in natural insensitive descending order. 'À' should be before '#'.",
                "Expected object keys to be in natural insensitive descending order. 'è' should be before 'Z'."
            ]
        }
    ]
});
