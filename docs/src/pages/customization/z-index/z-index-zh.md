# z-index

<p class="description">z-index 是 CSS 的属性，它通过第三个轴(third axis) 来对内容进行排列以达到帮助控制布局的目的。</p>

在 Material-UI 中一些组件利用 `z-index` 来应用默认的 z-index 比例尺， 它被用来将 layer drawers, modals, snackbars, tooltips 等等组件正确地进行分层。

[这些值](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/zIndex.js)从任意数字开始，足够大和特别来避免冲突。

- mobile stepper（移动设备起步）: 1000
- speed dial: 1050
- app bar（应用栏）：1100
- drawer（抽屉）：1200
- modal（浮层）：1300
- snackbar：1400
- tooltip（提示）：1500

这些值可以自定义。 你可以在主题的 [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) 键(key) 下找到它们。 不鼓励自定义单个值；如果你更改了其中一个值，那么则可能需要把其他的所有值都全部更改。