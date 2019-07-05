# Density

<p class="description">We explain how to apply density to Material-UI components</p>

## Applying density

We won't cover possible use cases or considerations for density in your applications.
The Material design guidelines have a [comprehensive guide](https://material.io/design/layout/applying-density.html#typographic-density) covering those topics in more detail.

## Implementing density

Higher density can be applied to some components via props. The component pages
have at least one example using the respective component with higher density applied.

Depending on the component density is applied either via lower spacing or simply by
reducing the size.

If you want apply density across your whole application you can create a custom
theme with higher density by using a theme created with `dense` set to `true` e.g.
`createMuiTheme({ dense: true })`. See [Themes](/customization/themes) for how
to use a custom theme for your application.

The following components apply a higher density if this option is used:

- [Button](/api/button)
- [Fab](/api/fab)
- [FilledInput](/api/filled-input)
- [FormControl](/api/form-control)
- [FormHelperText](/api/form-helper-text)
- [IconButton](/api/icon-button)
- [InputBase](/api/input-base)
- [InputLabel](/api/input-label)
- [ListItem](/api/list-item)
- [OutlinedInput](/api/outlined-input)
- [Table](/api/table)
- [TextField](/api/text-field)
- [Toolbar](/api/toolbar)

## Explore theme density

This tool allows you to apply density via spacing and the `dense` option for the
theme used for this website. You can browse around and see how this applies to the
overall feel of Material-UI components.

If you set `dense` to `true` we apply additional padding to `IconButton` to reach
the [touch hit target](https://material.io/design/layout/applying-density.html#touch-click-targets) for those buttons.

{{"demo": "pages/customization/density/DensityTool.js", "hideHeader": true}}
