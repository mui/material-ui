---
filename: /src/Typography/Typography.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Typography



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| align | enum:&nbsp;'inherit', 'left', 'center', 'right', 'justify'<br> | 'inherit' | Set the text-align on the component. |
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'inherit', 'primary', 'secondary', 'accent', 'error', 'default'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |
| component | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> |  | The component used for the root node. Either a string to use a DOM element or a component. By default, it maps the type to a good default headline component. |
| gutterBottom | bool | false | If `true`, the text will have a bottom margin. |
| headlineMapping | object | {  display4: 'h1',  display3: 'h1',  display2: 'h1',  display1: 'h1',  headline: 'h1',  title: 'h2',  subheading: 'h3',  body2: 'aside',  body1: 'p',} | We are empirically mapping the type property to a range of different DOM element type. For instance, h1 to h6. If you wish to change that mapping, you can provide your own. Alternatively, you can use the `component` property. |
| noWrap | bool | false | If `true`, the text will not wrap, but instead will truncate with an ellipsis. |
| paragraph | bool | false | If `true`, the text will have a bottom margin. |
| type | enum:&nbsp;'display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'<br> | 'body1' | Applies the theme typography styles. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `display4`
- `display3`
- `display2`
- `display1`
- `headline`
- `title`
- `subheading`
- `body2`
- `body1`
- `caption`
- `button`
- `alignLeft`
- `alignCenter`
- `alignRight`
- `alignJustify`
- `noWrap`
- `gutterBottom`
- `paragraph`
- `colorInherit`
- `colorPrimary`
- `colorSecondary`
- `colorAccent`
- `colorError`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Typography/Typography.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTypography`.

## Demos

- [Typography](/style/typography)

