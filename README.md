# eslint-config-firecloud

In your project's `.eslintrc.yaml`

```yaml
extends:
  - firecloud/node.yaml
rules:
  - override-some-rule: error
```

In order to install the required peer dependencies,
you can run `node_modules/eslint-config-firecloud/npm-install-peer-dependencies`.


## Bundles

Common bundles are provided as following:

- Node.js: `firecloud/node.yaml`
- Browser: `firecloud/browser.yaml`
- no IDE: `firecloud/no-ide.yaml`


## No IDE checks

Some rules are stricter and on `warn` level, targeting IDEs.

When running `eslint` from the CLI/CI, you can turn these off,
to lower the noise level, via
`eslint -c node_modules/eslint-config-firecloud/no-idea.yaml`.


## License

[UNLICENSE](UNLICENSE)
