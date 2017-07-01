# BottomNavigation



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| index | number |  | The index of the currently selected `BottomNavigationButton`. |
| onChange | function |  | Function called when the index changes. |
| showLabels | bool | false | If `true`, all `BottomNavigationButton`s will show their labels. By default only the selected `BottomNavigationButton` will show its label. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBottomNavigation`.
