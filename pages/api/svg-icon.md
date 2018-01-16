---
filename: /src/SvgIcon/SvgIcon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SvgIcon



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | node |  | Node passed into the SVG element. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'action', 'disabled', 'error', 'inherit', 'primary', 'secondary'<br> | 'inherit' | The color of the component. It's using the theme palette when that makes sense. You can use the `nativeColor` property to apply a color attribute to the SVG element. |
| nativeColor | string |  | Applies a color attribute to the SVG element. |
| titleAccess | string |  | Provides a human-readable title for the element that contains it. https://www.w3.org/TR/SVG-access/#Equivalent |
| viewBox | string | '0 0 24 24' | Allows you to redefine what the coordinates without units mean inside an SVG element. For example, if the SVG element is 500 (width) by 200 (height), and you pass viewBox="0 0 50 20", this means that the coordinates inside the SVG will go from the top left corner (0,0) to bottom right (50,20) and each unit will be worth 10px. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `colorPrimary`
- `colorSecondary`
- `colorAction`
- `colorDisabled`
- `colorError`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/SvgIcon/SvgIcon.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSvgIcon`.

## Demos

- [Icons](/style/icons)

