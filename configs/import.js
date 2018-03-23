module.exports = {
  plugins: [
    'import'
  ],

  settings: {
    'import/ignore': [
      '\\.json$',
      'node_modules'
    ]
  },

  rules: {
    'import/export': 'error',
    'import/exports-last': 'off',
    'import/extensions': ['error', {
      js: 'never',
      json: 'always'
    }],
    'import/group-exports': 'off',
    'import/imports-first': 'error',
    'import/max-dependencies': 'off',
    'import/named': 'error',
    'import/namespace': ['error', {
      allowComputed: true
    }],
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-commonjs': 'off',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-namespace': 'off',
    'import/no-nodejs-modules': 'off',
    'import/no-restricted-paths': 'off',
    'import/no-self-import': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': 'error',
    'import/order': 'off',
    'import/prefer-default-export': 'warn'
  }
};
