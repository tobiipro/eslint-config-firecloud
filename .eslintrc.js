module.exports = {
  root: true,

  extends: [
    './node.js'
  ],

  parserOptions: {
    ecmaVersion: 'ES2015',
    sourceType: 'script',
    ecmaFeatures: {
      impliedStrict: true
    }
  },

  rules: {
    // no import syntax via babel in this repo
    'global-require': 'off'
  }
};
