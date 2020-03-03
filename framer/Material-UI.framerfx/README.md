# Material-UI

This is the official resource for Material-UI React components in Framer.

## Supported components

The following components are currently supported:

- App bar
- Avatar
- Badge
- Bottom navigation
- Button
- Checkbox
- Chip
- Circular progress
- Floating action button (Fab)
- Icon (all 1100+ Material Icons in 5 themes, plus social icons)
- Icon button (with optional badge)
- Linear progress
- List
- List item
- Media card
- Paper
- Radio
- Radio group
- Slider
- Snackbar content
- Switch
- Tabs
- Text field
- Theme (to globally set primary, secondary and error colors)
- Typography

## Usage

### Icons

Icons can be specified using either snake_case (as documented on material.io),
or PascalCase, as used in [the Material-UI documentation](https://material-ui.com/components/material-icons/).
Simply type the icon name in the appropriate property control.

The icon theme can be chosen from the related select field.

### Children

Where a component (such as Avatar) accepts a variety of child types, these can be configured through Framer property controls.
If multiple options are supplied, they take the following priority:

- Local image
- Image URL
- Icon
- Text

## Resources

- [Material-UI documentation](https://material-ui.com/)
- [GitHub repo](https://github.com/mui-org/material-ui/tree/master/framer)

## Releases

### 1.1.0 2020-02-21

- Add support for Framer shared colors to the Theme component.
- Add Info, Success and Warning colors to the Theme component.
- Add variant (circle, rounded or square) to the Avatar component.
- Add disable elevation (to remove the drop shadow) to the Button component.
- Add size (medium or small) to the Checkbox and Radio and TextField components.
- Add variant (elevation or outlined) to the Paper component.
- Add color (primary or secondary) to the TextField component.
- Fix an issue that caused the Material-UI Framer package to appear to have no components,
and existing projects using Material-UI to break.

### 1.0.0 2019-11-11

- Initial release.
