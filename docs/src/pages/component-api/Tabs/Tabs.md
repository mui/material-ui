Tabs
====



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| buttonClassName | string | | The CSS class name of the manual scroll buttons. |
| centered | bool | false | If `true`, the tabs will be centered. This property is intended for large views. |
| children | node |  | The content of the component. |
| className | string |  | The CSS class name of the root element. |
| fullWidth | bool | false | If `true`, the tabs will grow to use all the available space. This property is intended for small views. |
| index | number |  | The index of the currently selected `Tab`. |
| indicatorClassName | string |  | The CSS class name of the indicator element. |
| indicatorColor | union:&nbsp;[object Object]<br>&nbsp;string<br> | 'accent' | Determines the color of the indicator. |
| <span style="color: #31a148">onChange *</span> | function |  | Function called when the index change. |
| scrollable | bool | false | If `true`, then the tabs will be scrollable. |
| scrollButtons | enum:<br />&nbsp;`auto`<br />&nbsp;`on`<br />&nbsp;`off` | `auto` | `auto`: Scroll buttons will appear on larger views. <br />`on`: Scroll buttons will always appear.<br />`off`: Scroll buttons will never appear.
| textColor | enum:<br />&nbsp;`accent`<br />&nbsp;`inherit`<br />string | `inherit` | The text color of the `Tab` components. Choose from the following:<br />`accent`: Use accent theme color.<br />`inherit`: Inherit color from parent. <br />`color code`: CSS color. |

Any other properties supplied will be spread to the root element.
