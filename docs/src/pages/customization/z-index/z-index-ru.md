# z-index

<p class="description">z-index is the CSS property that helps control layout by providing a third axis to arrange content.</p>

Several Material-UI components utilize `z-index`, employing a default z-index scale in Material-UI that has been designed to properly layer drawers, modals, snackbars, tooltips, and more.

[Эти значения](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/zIndex.js) начинаются с произвольного числа, достаточно высокого, чтобы в идеале избежать конфликтов.

- mobile stepper: 1000
- app bar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

Эти значения всегда можно изменить. You will find them in the theme under the [`zIndex`](/customization/default-theme/?expend-path=$.zIndex) key of the theme. Customization of individual values is discouraged; should you change one, you likely need to change them all.