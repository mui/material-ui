<!--- This documentation is automatically generated, do not try to edit it. -->

# BottomNavigation



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| onChange | function |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* We default to the index of the child |
| showLabels | bool | false | If `true`, all `BottomNavigationButton`s will show their labels. By default only the selected `BottomNavigationButton` will show its label. |
| <span style="color: #31a148">value *</span> | any |  | The value of the currently selected `BottomNavigationButton`. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBottomNavigation`.

## Demos

- [Bottom Navigation](/demos/bottom-navigation)

