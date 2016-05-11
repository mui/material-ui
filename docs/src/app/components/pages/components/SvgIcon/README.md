## SVG Icon

The `SvgIcon` component takes an SVG `path` element as its child, and converts it to a React component which displays
the path and allows the icon to be styled and respond to mouse events.

The resulting icon can be used as is, or included as a child for other Material-UI components that use icons, such
as [Icon Button](/#/components/icon-button).

### Material icons

For convenience, the full set of google [Material icons](https://design.google.com/icons/) are available in Material-UI
as pre-built SVG Icon components. Each icon path is already wrapped with `SvgIcon`, and can be imported and used
directly as a React component. Any properties supplied are passed to `SvgIcon`.

The import path for each _Material icons_ component includes the category and icon name, with spaces substituted with
dashes. For example to use the [3d rotation](https://design.google.com/icons/#ic_3d_rotation) icon component, import
`material-ui/svg-icons/action/3d-rotation`.

### Examples
