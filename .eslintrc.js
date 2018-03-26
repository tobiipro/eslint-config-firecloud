module.exports = {
  root: true,

  extends: [
    './node.js'
  ],

  rules: {
    // no import syntax via babel in this repo
    'global-require': 'off'
  }
};
