# eslint-config-firecloud [![Build Status][2]][1]

The ESLint config used within Tobii Cloud Services.

In your project's `.eslintrc.js`

```js
module.exports = {
  extends: [
    'firecloud/node'
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
    'firecloud/node',
    'firecloud/configs/jest'
  ],
  rules: {
    'override-some-rule': error
  }
}
```

and running `npm install --dev eslint-plugin-jest`.


## Bundles

Common bundles are provided as following:

- Node.js: `firecloud/node`
- Browser: `firecloud/browser`

These addons require you to install the plugin manually:

- `@typescript-eslint/eslint-plugin`: `firecloud/configs/typescript`
- `eslint-plugin-jasmine`: `firecloud/configs/jasmine`
- `eslint-plugin-jest`: `firecloud/configs/jest`
- `eslint-plugin-mocha` (with Chai): `firecloud/configs/mocha`
- `eslint-plugin-protractor`: `firecloud/configs/protractor`
- `eslint-plugin-vue`: `firecloud/configs/vue`


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


## References to conventions that cannot/will not be put into eslint rules

* https://www.robinwieruch.de/javascript-naming-conventions
* Not strictly related to eslint/style, but when writing TypeScript, see [our guideline](typescript.md).


## License

[UNLICENSE](UNLICENSE)


  [1]: https://travis-ci.com/tobiipro/eslint-config-firecloud
  [2]: https://travis-ci.com/tobiipro/eslint-config-firecloud.svg?branch=master
