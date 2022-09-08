# z-index

<p class="description">z-index 是 CSS 的属性，它通过第三个轴（third axis）来对内容进行排列，这样能够帮助控制布局。</p>

在 Material-UI 中一些组件利用 `z-index` 来应用默认的 z-index 比例尺，我们将其设计为将抽屉（drawers），模态框（modals），消息条（snackbars），工具提示（tooltips）等组件正确地分层。

`z-index` 值的起点是一个任意的数字，最好提供一个具体的大数值以免发生冲突。

- mobile stepper（移动设备的步骤条）：1000
- fab: 1050
- speed dial: 1050
- app bar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

这些值是可以自定义的。 You will find them in the theme under the [`zIndex`](/material-ui/customization/default-theme/?expand-path=$.zIndex) key of the theme. 我们不鼓励自定义单个值；如果你更改了其中一个值，那么则可能需要把其他的所有值都更改一遍。
