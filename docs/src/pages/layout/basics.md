# Basics

## Responsive UI

[Responsive layouts](https://material.io/guidelines/layout/responsive-ui.html) in Material Design adapt to any possible screen size.

### Breakpoints

For optimal user experience, material design interfaces need to be able to adapt their layout at various breakpoints.
Material-UI uses a **simplified** implementation of the original [specification](https://material.io/guidelines/layout/responsive-ui.html#responsive-ui-breakpoints).

Each breakpoint matches with a *fixed* screen width:
- **xs**, extra-small: 0px or larger
- **sm**, small: 600px or larger
- **md**, medium: 960px or larger
- **lg**, large: 1280px or larger
- **xl**, xlarge: 1920px or larger

These values can always be customized.
You will find them in the theme, in the [`breakpoints.values`](/customization/theme-default?expend-path=$.breakpoints.values) object.

The breakpoints are used internally in various components to make them responsive,
but you can also take advantage of them
for controlling the layout of your application through the [Grid](/layout/grid) and
[Hidden](/layout/hidden) components.

## z-index

Several Material-UI components utilize `z-index`, the CSS property that helps control layout by providing a third axis to arrange content.
We utilize a default z-index scale in Material-UI that's been designed to properly layer drawers,
modals, snackbars, tooltips, and more.

These values start at an arbitrary number, high and specific enough to ideally avoid conflicts.

- mobile stepper: 1000
- app bar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

These values can always be customized.
You will find them in the theme under the [`zIndex`](/customization/theme-default?expend-path=$.zIndex) key.
We don’t encourage customization of individual values; should you change one, you likely need to change them all.
