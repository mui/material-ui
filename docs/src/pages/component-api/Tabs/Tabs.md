<!--- This documentation is automatically generated, do not try to edit it. -->

# Tabs

Notice that this Component is incompatible with server side rendering.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| buttonClassName | string |  | The CSS class name of the scroll button elements. |
| centered | bool | false | If `true`, the tabs will be centered. This property is intended for large views. |
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| fullWidth | bool | false | If `true`, the tabs will grow to use all the available space. This property is intended for small views. |
| <span style="color: #31a148">index *</span> | union:&nbsp;[object Object]<br>&nbsp;number<br> |  | The index of the currently selected `Tab`. If you don't want any selected `Tab`, you can set this property to `false`. |
| indicatorClassName | string |  | The CSS class name of the indicator element. |
| indicatorColor | union:&nbsp;[object Object],[object Object]<br>&nbsp;string<br> | 'accent' | Determines the color of the indicator. |
| <span style="color: #31a148">onChange *</span> | function |  | Function called when the index change. |
| scrollButtons | enum:&nbsp;'auto'<br>&nbsp;'on'<br>&nbsp;'off'<br> | 'auto' | Determine behavior of scroll buttons when tabs are set to scroll `auto` will only present them on medium and larger viewports `on` will always present them `off` will never present them |
| scrollable | bool | false | True invokes scrolling properties and allow for horizontally scrolling (or swiping) the tab bar. |
| textColor | union:&nbsp;[object Object],[object Object],[object Object]<br>&nbsp;string<br> | 'inherit' | Determines the color of the `Tab`. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `flexContainer`
- `scrollingContainer`
- `fixed`
- `scrollable`
- `centered`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTabs`.
