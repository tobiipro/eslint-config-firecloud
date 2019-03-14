// required dev dependency
// "eslint-plugin-vue": "^5.2.2"

module.exports = {
  extends: [
    'plugin:vue/recommended'
  ],

  plugins: [
    'vue'
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
