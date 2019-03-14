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

If you want to use an addon, it's as easy as doing this in `.eslintrc.js`:

```js
module.exports = {
  extends: [
    'firecloud/node.js',
    'firecloud/jest.js'
  ],
  rules: {
    'override-some-rule': error
  }
}
```

and running `npm install --dev eslint-plugin-jest@^X.X.X`
(take the `X.X.X` version from the Bundles section below)


## Bundles

Common bundles are provided as following:

- Node.js: `firecloud/node.js`
- Browser: `firecloud/browser.js`

along with these addons that require you to install the plugin manually (semver can be found in `configs` folder):

- `@typescript/eslint-plugin@^1.4.2`: `firecloud/typescript.js`
- `eslint-plugin-jest@^22.1.0`: `firecloud/jest.js`
- `eslint-plugin-mocha@^5.2.0` (with Chai): `firecloud/mocha.js`
- `eslint-plugin-vue@^5.2.2`: `firecloud/vue.js`


## Guiding Principles

"I (don't) like/want ..." is no argument in this codebase.
Instead, we follow a few guiding principles
that have concrete consequences on daily work.

### 1. Keep It Short
  * lines
  * functions
  * modules
### 2. Reduce Merge Conflicts
  * do less on the same line
  * break array/object expressions/patterns
  * break import specifiers
  * break conditions
### 3. Reduce Cognitive Load (via explicit code)
  * even if code becomes more verbose
### 4. Reduce Dependency (on specific ecma versions)
  * use a transpiler like babel (for syntax)
  * use a utility library like lodash-firecloud (for functionality)
### 5. Increase Consistency
  * don't use arrow functions when you don't need them
  * don't use template literals when you don't need them


## License

[UNLICENSE](UNLICENSE)


  [1]: https://travis-ci.com/tobiipro/eslint-config-firecloud
  [2]: https://travis-ci.com/tobiipro/eslint-config-firecloud.svg?branch=master
