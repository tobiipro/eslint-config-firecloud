// note that this is an addon
// please update README.md with required version of the eslint plugin
// when introducing breaking changes

let _basic = require('./basic');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],

  rules: {
    // 'no-var' is broken atm for typescript, but it will be fixed in a the next version
    // see https://github.com/eslint/eslint/pull/11443
    'no-var': 'off',

    // rules in tslint
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', 'array'],
    // '@typescript-eslint/await-thenable': 'error', // tslint:await-promise
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-types': 'off',

    '@typescript-eslint/no-type-alias': 'error', // tslint:interface-over-type-literal
    '@typescript-eslint/prefer-interface': 'error', // tslint:interface-over-type-literal

    '@typescript-eslint/explicit-member-accessibility': 'off', // tslint:member-access
    '@typescript-eslint/generic-type-naming': 'error',
    '@typescript-eslint/interface-name-prefix': 'error', // tslint:interface-name
    '@typescript-eslint/member-ordering': ['error', {
      order: 'fields-first'
    }],
    '@typescript-eslint/no-angle-bracket-type-assertion': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'off', // tslint:no-any
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-object-literal-type-assertion': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',
    // typescript specific but not marked typescriptOnly
    '@typescript-eslint/no-triple-slash-reference': 'error', // tslint:no-reference
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/prefer-function-type': 'error', // tslint:callable-types
    '@typescript-eslint/prefer-namespace-keyword': 'error', // tslint:no-internal-module
    '@typescript-eslint/promise-function-async': 'error', // requiresTypeInfo
    '@typescript-eslint/restrict-plus-operands': 'error', // requiresTypeInfo
    '@typescript-eslint/type-annotation-spacing': ['error', { // tslint:typedef-whitespace
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
    // '@typescript-eslint/unbound-method': 'error', // tslint:no-unbound-method
    '@typescript-eslint/unified-signatures': 'error',

    // -------------------------------------------------------------------------

    // rules not in tslint, typescript specific
    '@typescript-eslint/member-delimiter-style': 'off', // 'error', // FIXME
    '@typescript-eslint/member-naming': ['error', {
      private: '^_'
    }],

    // -------------------------------------------------------------------------

    // not typescript specific

    camelcase: 'off',
    '@typescript-eslint/camelcase': _basic.rules.camelcase,

    // 'class-name': undefined, @typescript-eslint/class-name-casing
    // @typescript-eslint/explicit-function-return-type

    indent: 'off',
    '@typescript-eslint/indent': _basic.rules.indent,

    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': _basic.rules['no-array-constructor'],

    // 'no-unnecessary-class': undefined, // @typescript-eslint/no-extraneous-class

    'global-require': 'off',
    '@typescript-eslint/no-require-imports': _basic.rules['global-require'],

    'consistent-this': 'off',
    '@typescript-eslint/no-this-alias': _basic.rules['consistent-this'], // tslint:no-this-assignment

    // marked as, but not really typescriptOnly
    // '@typescript-eslint/no-var-requires': 'error',

    // marked as, but not really typescriptOnly
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': _basic.rules['no-use-before-define'], // tslint:no-use-before-declare

    // marked as, but not really typescriptOnly
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': _basic.rules['no-unused-vars'], // tslint:no-unused-variable

    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': _basic.rules['no-useless-constructor']

    // @typescript-eslint/prefer-for-of
  }
};
