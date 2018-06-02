---
filename: /packages/material-ui/src/Tabs/Tabs.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tabs



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">func |   | Callback fired when the component mounts. This is useful when you want to trigger an action programmatically. It currently only supports `updateIndicator()` action.<br><br>**Signature:**<br>`function(actions: object) => void`<br>*actions:* This object contains all possible actions that can be triggered programmatically. |
| <span class="prop-name">centered</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the tabs will be centered. This property is intended for large views. |
| <span class="prop-name">children</span> | <span class="prop-type">node |   | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the tabs will grow to use all the available space. This property is intended for small views, like on mobile. |
| <span class="prop-name">indicatorColor</span> | <span class="prop-type">enum:&nbsp;'secondary'&nbsp;&#124;<br>&nbsp;'primary'<br> | <span class="prop-default">'secondary'</span> | Determines the color of the indicator. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func |   | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: number) => void`<br>*event:* The event source of the callback<br>*value:* We default to the index of the child |
| <span class="prop-name">scrollable</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | True invokes scrolling properties and allow for horizontally scrolling (or swiping) the tab bar. |
| <span class="prop-name">ScrollButtonComponent</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | <span class="prop-default">TabScrollButton</span> | The component used to render the scroll buttons. |
| <span class="prop-name">scrollButtons</span> | <span class="prop-type">enum:&nbsp;'auto'&nbsp;&#124;<br>&nbsp;'on'&nbsp;&#124;<br>&nbsp;'off'<br> | <span class="prop-default">'auto'</span> | Determine behavior of scroll buttons when tabs are set to scroll `auto` will only present them on medium and larger viewports `on` will always present them `off` will never present them |
| <span class="prop-name">TabIndicatorProps</span> | <span class="prop-type">object |   | Properties applied to the `TabIndicator` element. |
| <span class="prop-name">textColor</span> | <span class="prop-type">enum:&nbsp;'secondary'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'inherit'<br> | <span class="prop-default">'inherit'</span> | Determines the color of the `Tab`. |
| <span class="prop-name">value</span> | <span class="prop-type">any |   | The value of the currently selected `Tab`. If you don't want any selected `Tab`, you can set this property to `false`. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `flexContainer`
- `scroller`
- `fixed`
- `scrollable`
- `centered`
- `scrollButtons`
- `scrollButtonsAuto`
- `indicator`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Tabs/Tabs.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTabs`.

## Demos

- [Tabs](/demos/tabs)

