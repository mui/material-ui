# eslint-plugin-material-ui

Custom eslint rules for Material-UI.

## List of supported rules

- `docgen-ignore-before-comment`
- `no-hardcoded-labels`
- `restricted-path-imports`

### docgen-ignore-before-comment

Enforce correct usage of `@ignore` in the prop-types block comments.

### no-hardcoded-labels

Prevent the usage of hardcoded labels.
The docs are translated via crowdin, we prefer to use `t` from the redux store.

### restricted-path-imports

Prevent the import of modules at a level depth strictly over 1.
