---
filename: /src/IconButton/IconButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# IconButton

Refer to the [Icons](/style/icons) section of the documentation
regarding the available icon options.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| buttonRef | func |  | Use that property to pass a ref callback to the native button component. |
| children | node |  | The icon element. If a string is provided, it will be used as an icon font ligature. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |
| disabled | bool | false | If `true`, the button will be disabled. |
| disableRipple | bool | false | If `true`, the ripple will be disabled. |
| rootRef | func |  | Use that property to pass a ref callback to the root component. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `colorInherit`
- `colorPrimary`
- `colorSecondary`
- `disabled`
- `label`
- `icon`
- `keyboardFocused`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/IconButton/IconButton.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiIconButton`.

## Inheritance

The properties of the [&lt;ButtonBase /&gt;](/api/button-base) component are also available.

## Demos

- [Buttons](/demos/buttons)
- [Grid List](/demos/grid-list)

