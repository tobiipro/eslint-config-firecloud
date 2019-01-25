module.exports = {
  plugins: [
    'firecloud'
  ],

  rules: {
    'firecloud/array-bracket-newline': ['error', {
      multiline: true,
      minItems: 1,
      allowObjectCurly: true
    }],
    'firecloud/array-element-newline': ['error', {
      multiline: true,
      minItems: 1,
      notIfLastItemIsAnObject: true
    }],
    'firecloud/import-specifier-newline': 'error',
    'firecloud/no-const': 'error',
    'firecloud/no-for': 'error',
    'firecloud/no-underscore-prefix-exported': 'error',
    'firecloud/object-curly-newline': ['error', {
      OnlyParam: {
        multiline: true,
        minProperties: 0, // aka disable
        consistent: true
      },
      ObjectExpression: {
        multiline: true,
        minProperties: 1,
        consistent: true
      },
      ObjectPattern: {
        multiline: true,
        minProperties: 1,
        consistent: true
      },
      ImportDeclaration: {
        multiline: true,
        minProperties: 1,
        consistent: true
      },
      ExportDeclaration: {
        multiline: true,
        minProperties: 1,
        consistent: true
      }
    }],

    'firecloud/order-imports': 'error',
    'firecloud/padding-line-import-multiple': 'error',
    'firecloud/underscore-prefix-non-exported': 'error'
  }
};
