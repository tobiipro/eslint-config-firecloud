module.exports = {
  plugins: [
    'dependencies'
  ],

  rules: {
    'dependencies/case-sensitive': 'error',
    'dependencies/no-cycles': ['error', {
      types: true
    }],
    'dependencies/no-unresolved': 'error',
    'dependencies/require-json-ext': 'error'
  }
};
