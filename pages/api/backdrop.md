---
filename: /src/Modal/Backdrop.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Backdrop



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | object |  | Useful to extend the style applied to components. |
| invisible | bool | false | If `true`, the backdrop is invisible. It can be used when rendering a popover or a custom select component. |
| <span style="color: #31a148">open *</span> | bool |  | If `true`, the backdrop is open. |
| transitionDuration | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}<br> |  | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `invisible`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Modal/Backdrop.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBackdrop`.

