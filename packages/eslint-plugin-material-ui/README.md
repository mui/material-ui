# eslint-plugin-material-ui

Custom eslint rules for Material-UI.

## List of supported rules

- `disallow-active-element-as-key-event-target`
- `docgen-ignore-before-comment`
- `no-hardcoded-labels`
- ~~`restricted-path-imports`~~

### disallow-active-element-as-key-event-target

Prevent `fireEvent.keyDown(document.activeElement)`. The implementation
we use already verifies that the passed target can be the target of a
`keydown` event. Passing the target explicitly (e.g. `fireEvent.keyDown(getByRole('tab', { selected: true }))`) makes the test more readable.

### docgen-ignore-before-comment

Enforce correct usage of `@ignore` in the prop-types block comments.

### no-hardcoded-labels

Prevent the usage of hardcoded labels.
The docs are translated via crowdin, we prefer to use `t` from the redux store.

### restricted-path-imports

Removed in favor of [`no-restricted-imports`](https://eslint.org/docs/rules/no-restricted-imports) using the following configuration:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@material-ui/*/*/*", "!@material-ui/core/test-utils/*"]
      }
    ]
  }
}
```
