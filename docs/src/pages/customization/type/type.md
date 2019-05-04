# Type (light /dark theme)

<p class="description">Material-UI comes with two theme variants, light (the default) and dark.</p>

You can make the theme dark by setting `type` to `dark`.
While it's only a single property value change, internally it modifies the value of the following keys:

- `palette.text`
- `palette.divider`
- `palette.background`
- `palette.action`

```js
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
```

{{"demo": "pages/customization/type/DarkTheme.js", "hideEditButton": true}}
