# z-index

<p class="description">z-index 是 CSS 的属性，它通过第三个轴（third axis）来对内容进行排列，这样能够帮助控制布局。</p>

Several MUI components utilize `z-index`, employing a default z-index scale in MUI that has been designed to properly layer drawers, modals, snackbars, tooltips, and more.

`z-index` 值的起点是一个任意的数字，最好提供一个具体的大数值以免发生冲突。

- mobile stepper（移动设备的步骤条）：1000
- speed dial（快速拨号）: 1050
- app bar（应用栏）：1100
- drawer（抽屉）：1200
- modal（模态框）：1300
- snackbar（消息条）：1400
- tooltip（工具提示）：1500

这些值是可以自定义的。 你可以在主题的 [`zIndex`](/customization/default-theme/?expand-path=$.zIndex) 键（key）下找到它们。 我们不鼓励自定义单个值；如果你更改了其中一个值，那么则可能需要把其他的所有值都更改一遍。
