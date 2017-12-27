# Basics

## Responsive UI

[Responsive layouts](https://material.io/guidelines/layout/responsive-ui.html) in Material Design adapt to any possible screen size.

### Breakpoints

For optimal user experience, material design interfaces need to be able to adapt their layout at various breakpoints.
Material-UI uses a **simplified** implementation of the original [specification](https://material.io/guidelines/layout/responsive-ui.html#responsive-ui-breakpoints).

Each breakpoint matches with a *fixed* screen width:
- **xs**, extra-small: 0dp or larger
- **sm**, small: 600dp or larger
- **md**, medium: 960dp or larger
- **lg**, large: 1280dp or larger
- **xl**, xlarge: 1920dp or larger

## z-index

Several Material-UI components utilize `z-index`, the CSS property that helps control layout by providing a third axis to arrange content.
We utilize a default z-index scale in Material-UI that's been designed to properly layer drawers,
modals, snackbars, tooltips, and more.
