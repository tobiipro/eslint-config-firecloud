# eslint-config-firecloud [![Build Status][2]][1]

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
- no IDE: `firecloud/no-ide.js`

- Node.js test with Mocha&Chai: `test-mocha-chai.js`


## No IDE checks

Some rules are stricter, though set to `warn` level only, targeting IDEs.

When running `eslint` from the CLI/CI, you can turn these off,
to lower the noise level, via `eslint -c node_modules/eslint-config-firecloud/no-ide.js`.

**NOTE 2017-07-31** these are off by default now until https://github.com/eslint/eslint/issues/7549 is fixed.
When it is fixed, remove this note and remove the no-ide extension from `browser.js` and `node.js`.


## License

[UNLICENSE](UNLICENSE)


  [1]: https://travis-ci.org/tobiipro/eslint-config-firecloud
  [2]: https://travis-ci.org/tobiipro/eslint-config-firecloud.svg?branch=master
