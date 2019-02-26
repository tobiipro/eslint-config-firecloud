module.exports = {
  plugins: [
    'eslint-comments'
  ],

  rules: {
    'eslint-comments/disable-enable-pair': ['error', {
      allowWholeFile: true
    }],
    'eslint-comments/no-aggregating-enable': 'error',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unused-disable.html#known-limitations
    'eslint-comments/no-unused-disable': 'off',
    'eslint-comments/no-unused-enable': 'error',
    'eslint-comments/no-restricted-disable': 'off',
    'eslint-comments/no-use': ['error', {
      allow: [
        // 'eslint',
        'eslint-disable',
        // 'eslint-disable-line',
        'eslint-disable-next-line',
        'eslint-enable',
        'eslint-env',
        'exported',
        'global',
        'globals'
      ]
    }]
  }
};
