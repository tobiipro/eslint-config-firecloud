// note that this is an addon
// please update README.md with required version of the eslint plugin
// when introducing breaking changes

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],

  rules: [
    // should be in sync with basic.js
    '@typescript-eslint/camelcase': ['warn', {
      properties: 'never'
    }],
    '@typescript-eslint/indent': ['error', 2, {
      VariableDeclarator: {
        var: 2,
        let: 2,
        const: 3
      }
    }],
    '@typescript-eslint/no-unused-vars': ['error', {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      ignoreRestSiblings: true,
      vars: 'all',
      varsIgnorePattern: '^_'
    }]
  ]
};
