<!--- This documentation is automatically generated, do not try to edit it. -->

# Tabs

Notice that this Component is incompatible with server side rendering.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| buttonClassName | string |  | The CSS class name of the scroll button elements. |
| centered | boolean | false | If `true`, the tabs will be centered. This property is intended for large views. |
| children | $ReadOnlyArray |  | The content of the component. |
| classes | Object |  | Useful to extend the style applied to components. |
| fullWidth | boolean | false | If `true`, the tabs will grow to use all the available space. This property is intended for small views. |
| indicatorClassName | string |  | The CSS class name of the indicator element. |
| indicatorColor | union:&nbsp;'accent'<br>&nbsp;'primary'<br>&nbsp;string<br> | 'accent' | Determines the color of the indicator. |
| <span style="color: #31a148">onChange *</span> | Function |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: number) => void`<br>*event:* The event source of the callback<br>*value:* We default to the index of the child |
| scrollButtons | union:&nbsp;'auto'<br>&nbsp;'on'<br>&nbsp;'off'<br> | 'auto' | Determine behavior of scroll buttons when tabs are set to scroll `auto` will only present them on medium and larger viewports `on` will always present them `off` will never present them |
| scrollable | boolean | false | True invokes scrolling properties and allow for horizontally scrolling (or swiping) the tab bar. |
| textColor | union:&nbsp;'accent'<br>&nbsp;'primary'<br>&nbsp;'inherit'<br> | 'inherit' | Determines the color of the `Tab`. |
| <span style="color: #31a148">value *</span> | any |  | The value of the currently selected `Tab`. If you don't want any selected `Tab`, you can set this property to `false`. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `flexContainer`
- `scrollingContainer`
- `fixed`
- `scrollable`
- `centered`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTabs`.

## Demos

- [Tabs](/demos/tabs)

