module.exports = {
  plugins: [
    '@getify/proper-arrows'
  ],

  rules: {
    // OFF because AsyncFunctionExpressions are handled by max-params, no-unused-vars
    '@getify/proper-arrows/params': 'off',
    // OFF because it doesn't support 'never'
    '@getify/proper-arrows/names': 'off',
    '@getify/proper-arrows/where': ['error', {
      global: true,
      property: true,
      export: true,
      trivial: true
    }],
    '@getify/proper-arrows/return': ['error', {
      object: true,
      ternatry: true,
      chained: true,
      sequence: true,
      trivial: true
    }],
    '@getify/proper-arrows/this': ['error', 'nested', {
      'no-global': true,
      trivial: true
    }]
  }
};
