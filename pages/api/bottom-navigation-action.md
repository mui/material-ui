---
filename: /packages/material-ui/src/BottomNavigation/BottomNavigationAction.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# BottomNavigationAction



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">icon</span> | <span class="prop-type">node |  | The icon element. |
| <span class="prop-name">label</span> | <span class="prop-type">node |  | The label element. |
| <span class="prop-name">showLabel</span> | <span class="prop-type">bool |  | If `true`, the BottomNavigationAction will show its label. |
| <span class="prop-name">value</span> | <span class="prop-type">any |  | You can provide your own value. Otherwise, we fallback to the child position index. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `selected`
- `iconOnly`
- `wrapper`
- `label`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui/src/BottomNavigation/BottomNavigationAction.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBottomNavigationAction`.

## Inheritance

The properties of the [ButtonBase](/api/button-base) component are also available.

## Demos

- [Bottom Navigation](/demos/bottom-navigation)

