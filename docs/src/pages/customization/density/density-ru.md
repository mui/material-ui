# Density

<p class="description">How to apply density to Material-UI components.</p>

## Applying density

This section explains how to apply density. The Material design guidelines have a [comprehensive guide](https://material.io/design/layout/applying-density.html#typographic-density) covering these topics in more detail. It doesn't cover potential use cases, or considerations for using density in your application.

## Implementing density

Higher density can be applied to some components via props. The component pages have at least one example using the respective component with higher density applied.

Depending on the component, density is applied either via lower spacing, or simply by reducing the size.

The following components have props applying higher density:

- [Button](/api/button/)
- [Fab](/api/fab/)
- [FilledInput](/api/filled-input/)
- [FormControl](/api/form-control/)
- [FormHelperText](/api/form-helper-text/)
- [IconButton](/api/icon-button/)
- [InputBase](/api/input-base/)
- [InputLabel](/api/input-label/)
- [ListItem](/api/list-item/)
- [OutlinedInput](/api/outlined-input/)
- [Table (tаблица)](/api/table/)
- [Текстовое поля](/api/text-field/)
- [Toolbar](/api/toolbar/)

## Explore theme density

This tool allows you to apply density via spacing and component props. You can browse around and see how this applies to the overall feel of Material-UI components.

If you enable high density a custom theme is applied to the docs. This theme is only for demonstration purposes. You *should not* apply this theme to your whole application as this might negatively impact user experience. The [Material design guidelines](https://material.io/design/layout/applying-density.html#typographic-density) has examples for when not to apply density.

The theme is configured with the following options:

```js
const theme = createMuiTheme({
  props: {
    MuiButton: {
      size: 'small',
    },
    MuiFilledInput: {
      margin: 'dense',
    },
    MuiFormControl: {
      margin: 'dense',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {
      margin: 'dense',
    },
    MuiFab: {
      size: 'small',
    },
    MuiTable: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
    },
    MuiToolbar: {
      variant: 'dense',
    },
  },
  overrides: {
    MuiIconButton: {
      sizeSmall: {
        // Adjust spacing to reach minimal touch target hitbox
        marginLeft: 4,
        marginRight: 4,
        padding: 12,
      },
    },
  },
});
```

{{"demo": "pages/customization/density/DensityTool.js", "hideToolbar": true}}