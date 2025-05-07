# eslint-plugin-material-ui

Custom eslint rules for MUI.

## List of supported rules

- `disallow-active-element-as-key-event-target`
- `docgen-ignore-before-comment`
- `mui-name-matches-component-name`
- `no-hardcoded-labels`
- `rules-of-use-theme-variants`
- ~~`restricted-path-imports`~~

### disallow-active-element-as-key-event-target

Prevent `fireEvent.keyDown(document.activeElement)`. The implementation
we use already verifies that the passed target can be the target of a
`keydown` event. Passing the target explicitly (for example `fireEvent.keyDown(getByRole('tab', { selected: true }))`) makes the test more readable.

### docgen-ignore-before-comment

Enforce correct usage of `@ignore` in the prop-types block comments.

### mui-name-matches-component-name

Enforce that the name passed to the `useThemeProps` and `useDefaultProps` hooks matches the component name.

### no-hardcoded-labels

Prevent the usage of hardcoded labels.
The docs are translated via Crowdin, we prefer to use `t` from the redux store.

### rules-of-use-theme-variants

Ensures correct usage of `useThemeVariants` so that all props are passed as well
as their resolved default values.

### ~~restricted-path-imports~~

Removed in favor of [`no-restricted-imports`](https://eslint.org/docs/latest/rules/no-restricted-imports) using the following configuration:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@mui/*/*/*"]
      }
    ]
  }
}
```
