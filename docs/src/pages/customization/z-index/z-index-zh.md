# z-index

<p class="description">z-index is the CSS property that helps control layout by providing a third axis to arrange content.</p>

Several Material-UI components utilize `z-index`, employing a default z-index scale in Material-UI that has been designed to properly layer drawers, modals, snackbars, tooltips, and more.

[这些值](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/zIndex.js)从任意数字开始，足够大和特别来避免冲突。

- mobile stepper（移动设备起步）: 1000
- app bar（应用栏）：1100
- drawer（抽屉）：1200
- modal（浮层）：1300
- snackbar：1400
- tooltip（提示）：1500

这些值可以自定义。 You will find them in the theme under the [`zIndex`](/customization/default-theme/?expend-path=$.zIndex) key of the theme. Customization of individual values is discouraged; should you change one, you likely need to change them all.