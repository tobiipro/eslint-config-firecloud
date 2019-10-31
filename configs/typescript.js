// NOTE that this is an addon config. An eslint plugin needs to be installed manually.

let _pluginVsn = '^1.6.0';
let _pluginName = '@typescript-eslint/eslint-plugin';
let _pluginActualVsn = require(`${_pluginName}/package.json`).version;
let _semver = require('semver');

if (!_semver.satisfies(_pluginActualVsn, _pluginVsn)) {
  throw new Error(`Expected ${_pluginName}@${_pluginVsn} but found version ${_pluginActualVsn} installed.`);
}

let _ = require('lodash');
let _basic = require('./basic');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],

  parserOptions: {
    project: './tsconfig.json'
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: [
          // default + react
          '.js',
          '.json',
          '.jsx',
          '.mjs',
          // typescript + react
          '.ts',
          '.tsx'
        ]
      }
    }
  },

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

    '@typescript-eslint/no-type-alias': 'off', // tslint:interface-over-type-literal
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
    '@typescript-eslint/prefer-function-type': 'off', // tslint:callable-types
    '@typescript-eslint/prefer-namespace-keyword': 'error', // tslint:no-internal-module
    '@typescript-eslint/promise-function-async': ['error', {
      allowAny: true
    }], // requiresTypeInfo
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

    '@typescript-eslint/class-name-casing': 'error', // tslint:class-name

    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true
    }],

    indent: 'off',
    // eslint-disable-next-line no-sparse-arrays
    '@typescript-eslint/indent': _.merge([,, {
      // maintain eslint defaults
      SwitchCase: 0,
      flatTernaryExpressions: false
    }, _basic.rules.indent]),

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
    '@typescript-eslint/no-useless-constructor': _basic.rules['no-useless-constructor'],

    // @typescript-eslint/prefer-for-of

    // -------------------------------------------------------------------------

    // bad for typescript, lowers type inference
    // NOTE we assume eslint-plugin-lodash is still loaded

    'lodash/prop-shorthand': ['error', 'never'],
    'lodash/prefer-lodash-method': 'off',

    // -------------------------------------------------------------------------

    // jsdoc types are redundant

    // eslint-disable-next-line no-sparse-arrays
    'valid-jsdoc': _.merge([, {}], _basic.rules['valid-jsdoc'], [, {
      requireParamType: false,
      requireReturnType: false
    }])
  }
};
