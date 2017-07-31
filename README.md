# eslint-config-firecloud

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

In order to install the required peer dependencies,
you can run `node_modules/eslint-config-firecloud/npm-install-peer-dependencies`.


## Bundles

Common bundles are provided as following:

- Node.js: `firecloud/node.js`
- Browser: `firecloud/browser.js`
- no IDE: `firecloud/no-ide.js`


## No IDE checks

Some rules are stricter and on `warn` level, targeting IDEs.

When running `eslint` from the CLI/CI, you can turn these off,
to lower the noise level, via
`eslint -c node_modules/eslint-config-firecloud/no-ide.js`.

**NOTE 2017-07-31** this is active by default, until https://github.com/eslint/eslint/issues/7549 is fixed. When it is fixed, remove this note and remove no-ide extension from `browser.js` and `node.js`


## License

[UNLICENSE](UNLICENSE)
