# z-index

<p class="description">z-index 是 CSS 的属性，它通过第三个轴（third axis）来对内容进行排列，这样能够帮助控制布局。</p>

在 Material-UI 中一些组件利用 `z-index` 来应用默认的 z-index 比例尺，我们将其设计为将抽屉（drawers），模态框（modals），消息条（snackbars），工具提示（tooltips）等组件正确地分层。

[这些值](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/zIndex.js) 从一个任意数字开始，设置为足够大和足够特殊来避免冲突。

- mobile stepper（移动设备的步骤条）：1000
- speed dial（快速拨号）: 1050 
- app bar（应用栏）：1100
- drawer（抽屉）：1200
- modal（模态框）：1300
- snackbar（消息条）：1400
- tooltip（工具提示）：1500

这些值是可以自定义的。 你可以在主题的 [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) 键（key）下找到它们。 我们不鼓励自定义单个值；如果你更改了其中一个值，那么则可能需要把其他的所有值都更改一遍。