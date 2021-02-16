const _restoreBasicOverrides = require('./typescript-eslint-recommended');

jest.mock('@typescript-eslint/eslint-plugin/dist/configs/recommended.json', () => {
  return {
    rules: {
      '@typescript-eslint/remove-this-rule': 'error',
      'keep-this-rule': 'recommended-value',
      'recommended-specific-rule': 'recommended-value',
  }
  }
}, {virtual: true})

jest.mock('./basic', () => {
  return {
    rules: {
      'keep-this-rule': 'basic-value',
      'basic-specific-rule': 'basic-value'
    }
  }
})

describe('typescript-eslint-recommended', () => {
  it('should remove all rules in the recommended file which starts with @typescript-eslint', () => {
    expect(_restoreBasicOverrides.rules).toStrictEqual(
      expect.not.objectContaining({'@typescript-eslint/remove-this-rule': 'error'})
    )
  })

  it('should change the value of rules which exist in both recommended and basic to using the value in basic', () => {
    expect(_restoreBasicOverrides.rules).toStrictEqual(
      expect.objectContaining({'keep-this-rule': 'basic-value'})
    )
  })

  it('should remove the value of rules which only exist in recommended and not in basic', () => {
    expect(_restoreBasicOverrides.rules).toStrictEqual(
      expect.objectContaining({'recommended-specific-rule': undefined})
    )
  })
})
