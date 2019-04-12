// note that this is an addon
// please update README.md with required version of the eslint plugin
// when introducing breaking changes

let _basic = require('./basic');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],

  rules: {
    // rules in tslint
    '@typescript-eslint/adjacent-overload-signatures': true,
    '@typescript-eslint/array-type': [true, 'array'],
    '@typescript-eslint/await-thenable': true, // tslint:await-promise
    '@typescript-eslint/ban-ts-ignore': false,
    '@typescript-eslint/ban-types': false,

    '@typescript-eslint/no-type-alias': true, // tslint:interface-over-type-literal
    '@typescript-eslint/prefer-interface': true, // tslint:interface-over-type-literal

    '@typescript-eslint/explicit-member-accessibility': false, // tslint:member-access
    '@typescript-eslint/generic-type-naming': true,
    '@typescript-eslint/interface-name-prefix': true, // tslint:interface-name
    '@typescript-eslint/member-ordering': [true, {
      order: 'fields-first'
    }],
    '@typescript-eslint/no-angle-bracket-type-assertion': true,
    '@typescript-eslint/no-empty-interface': true,
    '@typescript-eslint/no-explicit-any': false, // tslint:no-any
    '@typescript-eslint/no-inferrable-types': false,
    '@typescript-eslint/no-misused-new': true,
    '@typescript-eslint/no-namespace': true,
    '@typescript-eslint/no-non-null-assertion': true,
    '@typescript-eslint/no-object-literal-type-assertion': true,
    '@typescript-eslint/no-parameter-properties': true,
    // typescript specific but not marked typescriptOnly
    '@typescript-eslint/no-triple-slash-reference': true, // tslint:no-reference
    '@typescript-eslint/no-unnecessary-qualifier': true,
    '@typescript-eslint/no-unnecessary-type-assertion': true,
    // ignored, not really typescriptOnly
    // '@typescript-eslint/no-var-requires': true,
    // ignored, not really requiresTypeInfo
    // '@typescript-eslint/no-use-before-define': true, // requiresTypeInfo, tslint:no-use-before-declare
    // ignored, not really typescriptOnly
    // '@typescript-eslint/no-unused-vars': true, // tslint:no-unused-variables
    '@typescript-eslint/prefer-function-type': true, // tslint:callable-types
    '@typescript-eslint/prefer-namespace-keyword': true, // tslint:no-internal-module
    '@typescript-eslint/promise-function-async': true, // requiresTypeInfo
    '@typescript-eslint/restrict-plus-operands': true, // requiresTypeInfo
    '@typescript-eslint/type-annotation-spacing': [true, { // tslint:typedef-whitespace
      'call-signature': 'nospace',
      'index-signature': 'nospace',
      parameter: 'nospace',
      'property-declaration': 'nospace',
      'variable-declaration': 'nospace'
    }, {
      'call-signature': 'onespace',
      'index-signature': 'onespace',
      parameter: 'onespace',
      'property-declaration': 'onespace',
      'variable-declaration': 'onespace'
    }],
    '@typescript-eslint/unbound-method': true, // tslint:no-unbound-method
    '@typescript-eslint/unified-signatures': true,

    // -------------------------------------------------------------------------

    // rules not in tslint, typescript specific
    '@typescript-eslint/member-delimiter-style': true,
    '@typescript-eslint/member-naming': [true, {
      private: '^_'
    }],

    // -------------------------------------------------------------------------

    // not typescript specific

    '@typescript-eslint/camelcase': _basic.rules.camelcase,
    // 'class-name': undefined, @typescript-eslint/class-name-casing
    // @typescript-eslint/explicit-function-return-type
    '@typescript-eslint/indent': _basic.rules.indent,
    '@typescript-eslint/no-array-constructor': _basic.rules['no-array-constructor'],
    // 'no-unnecessary-class': undefined, // @typescript-eslint/no-extraneous-class
    '@typescript-eslint/no-require-imports': _basic.rules['global-require'],
    '@typescript-eslint/no-this-alias': _basic.rules['consistent-this'], // tslint:no-this-assignment
    '@typescript-eslint/no-unused-vars': _basic.rules['no-unused-vars'], // tslint:no-unused-variable
    '@typescript-eslint/no-useless-constructor': _basic.rules['no-useless-constructor']
    // @typescript-eslint/prefer-for-of
  }
};
