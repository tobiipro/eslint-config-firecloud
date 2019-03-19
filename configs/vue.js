// note that this is an addon
// please update README.md with required version of the eslint plugin
// when introducing breaking changes

module.exports = {
  extends: [
    'plugin:vue/recommended'
  ],

  rules: {
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always'
    }],
    'vue/singleline-html-element-content-newline': ['error', {
      ignoreWhenEmpty: true,
      ignores: [
        'code',
        'pre',
        'textarea'
      ]
    }]
  }
};
