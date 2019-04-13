// Rationalé (Andrei Neculau)
//
// From eslint's prefer-const rule description:
// > If a variable is never reassigned, using the const declaration is better.
// > const declaration tells readers, “this variable is never reassigned,”
// > reducing cognitive load and improving maintainability.
//
// 1. const is about the binding being immutable, not the value.
//    Is this what you expect when you see "const" ? NOT! Thus increased cognitive load.
// 2. while we agree that var is suboptimal, and you should go with let or const (scoped declarations),
//    having to always choose between let and const, or remembering that a var can or cannot be reassigned
//    is suboptimal in itself. You only increase the cognitive load.
// 2. if today you have a const variable, and tomorrow you need to reassign it, you will
//    - probably fail an eslint test in a jiffy
//    - add a fix by changing const to let a few lines above.
//    Thus more changes, not necessarily grouped together. Thus increased cognitive load for everyone
//    and bonus a scattered changeset.
//
// If we had syntax that create immutable variables (by value), I would be the first to ban using let and const.
// The lack of one means one thing and one thing only: take JavaScript for what it (currently) is. A mutative language.

// -----------------------------------------------------------------------------
// Further reading

// A. from https://github.com/eslint/eslint/issues/4536
// > The current const (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/const)
// > implementation only protects variable from overwriting a reference.
// > It does not make it immutable.
// > For this reason I would like to avoid in my codebase.

// B. from https://medium.com/podiihq/javascript-variables-should-you-use-let-var-or-const-394f7645c88f
// > The const does not make the variable immutable hence the dog.age will change the age property of the dog object.

// C. from https://softwareengineering.stackexchange.com/questions/278652#comment736809_309321
// > I think the (only?) problem with const is that it's called const.
// > It's a dumb name (in javascript) that confuses many (all?) developers at first.

// D. from https://softwareengineering.stackexchange.com/questions/278652#comment806977_309321
// > I get it but why call it that? It is creating a huge amount of confusion as this page demonstrates.

// E. from https://softwareengineering.stackexchange.com/questions/278652#answer-278691

module.exports = {
  meta: {
    docs: {
      description: "forbid the use of 'const' since it makes only the binding immutable, not the value",
      category: 'ECMAScript 6',
      recommended: false
    },

    fixable: 'code'
  },

  create(context) {
    let sourceCode = context.getSourceCode();

    return {
      'VariableDeclaration:exit'(node) {
        if (node.kind !== 'const') {
          return;
        }

        // support typescript AST
        // see https://github.com/typescript-eslint/typescript-eslint/issues/410#issuecomment-480414829
        let constToken = sourceCode.getFirstToken(node, {
          filter: function(token) {
            return token.value === node.kind;
          }
        });

        context.report({
          node,
          message: 'Unexpected const, use let instead.',
          fix: function(fixer) {
            return fixer.replaceText(constToken, 'let');
          }
        });
      }
    };
  }
};
