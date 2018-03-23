# eslint-config-firecloud [![Build Status][2]][1]

The ESLint config used within Tobii Cloud Services.

In your project's `.eslintrc.js`

```js
module.exports = {
  extends: [
    'firecloud/node.js'
  ],
  rules: {
    'override-some-rule': error
  }
}
```

Optionally, you can run `node_modules/eslint-config-firecloud/npm-install-peer-dependencies`
in order to install the required peer dependencies.


## Bundles

Common bundles are provided as following:

- Node.js: `firecloud/node.js`
- Browser: `firecloud/browser.js`

- Node.js test with Jest: `firecloud/test-jest.js`
- Node.js test with Mocha&Chai: `firecloud/test-mocha-chai.js`


## License

[UNLICENSE](UNLICENSE)


  [1]: https://travis-ci.org/tobiipro/eslint-config-firecloud
  [2]: https://travis-ci.org/tobiipro/eslint-config-firecloud.svg?branch=master
