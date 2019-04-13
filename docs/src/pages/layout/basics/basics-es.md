# Fundamentos

<p class="description">Material Design layouts encourage consistency across platforms, environments, and screen sizes by using uniform elements and spacing.</p>

## Responsive UI

[Responsive layouts](https://material.io/design/layout/responsive-layout-grid.html) in Material Design adapt to any possible screen size. We provide the following helpers to make the UI responsive:

- [Grid](/layout/grid/): The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.
- [Container](/layout/container/): The container centers your content horizontally. It's the most basic layout element.
- [Breakpoints](/layout/breakpoints/): API that enables the use of breakpoints in a wide variety of contexts.
- [useMediaQuery](/layout/use-media-query/): This is a CSS media query hook for React. It listens for matches to a CSS media query.
- [Hidden](/layout/hidden/): Quickly and responsively toggle the visibility value of components and more with our hidden utilities.

## z-index

Several Material-UI components utilize `z-index`, the CSS property that helps control layout by providing a third axis to arrange content. We utilize a default z-index scale in Material-UI that's been designed to properly layer drawers, modals, snackbars, tooltips, and more.

[These values](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/zIndex.js) start at an arbitrary number, high and specific enough to ideally avoid conflicts.

- mobile stepper: 1000
- app bar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

These values can always be customized. You will find them in the theme under the [`zIndex`](/customization/default-theme/?expend-path=$.zIndex) key. We don’t encourage customization of individual values; should you change one, you likely need to change them all.