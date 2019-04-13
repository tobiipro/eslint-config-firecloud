module.exports = {
  plugins: [
    'firecloud'
  ],

  rules: {
    'array-bracket-newline': 'off',
    'firecloud/array-bracket-newline': ['error', {
      multiline: true,
      minItems: 1,
      allowObjectCurly: true
    }],

    'array-element-newline': 'off',
    'firecloud/array-element-newline': ['error', {
      multiline: true,
      minItems: 1,
      allowObjectCurly: true
    }],

    'firecloud/import-specifier-newline': 'error',
    'firecloud/no-const': 'error',
    'firecloud/no-for': 'error',
    'firecloud/no-underscore-prefix-exported': 'error',

    'object-curly-newline': 'off',
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

    'object-property-newline': 'off',
    'firecloud/object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: false,
      allowOnlyParamOnSameLine: true
    }],

    'firecloud/order-imports': 'error',
    'firecloud/padding-line-import-multiple': 'error',
    'firecloud/underscore-prefix-non-exported': 'error'
  }
};
