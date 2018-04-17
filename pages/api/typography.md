---
filename: /packages/material-ui/src/Typography/Typography.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Typography



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">align</span> | <span class="prop-type">enum:&nbsp;'inherit', 'left', 'center', 'right', 'justify'<br> | <span class="prop-default">'inherit'</span> | Set the text-align on the component. |
| <span class="prop-name">children</span> | <span class="prop-type">node |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'inherit', 'primary', 'textSecondary', 'secondary', 'error', 'default'<br> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> |  | The component used for the root node. Either a string to use a DOM element or a component. By default, it maps the variant to a good default headline component. |
| <span class="prop-name">gutterBottom</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the text will have a bottom margin. |
| <span class="prop-name">headlineMapping</span> | <span class="prop-type">object | <span class="prop-default">{  display4: 'h1',  display3: 'h1',  display2: 'h1',  display1: 'h1',  headline: 'h1',  title: 'h2',  subheading: 'h3',  body2: 'aside',  body1: 'p',}</span> | We are empirically mapping the variant property to a range of different DOM element types. For instance, h1 to h6. If you wish to change that mapping, you can provide your own. Alternatively, you can use the `component` property. |
| <span class="prop-name">noWrap</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the text will not wrap, but instead will truncate with an ellipsis. |
| <span class="prop-name">paragraph</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the text will have a bottom margin. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'<br> | <span class="prop-default">'body1'</span> | Applies the theme typography styles. |

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
- `colorTextSecondary`
- `colorError`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui/src/Typography/Typography.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTypography`.

## Demos

- [Typography](/style/typography)

