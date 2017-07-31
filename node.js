module.exports = {
  extends: [
    './configs/basic.js',
    './configs/babel.js',
    './configs/async-await.js',
    './configs/dependencies.js',
    './configs/import.js',
    './configs/no-null.js',
    './configs/max-len-2.js',
    './configs/node.js',
    './no-ide.js' // REMOVE after https://github.com/eslint/eslint/issues/7549
  ]
};
