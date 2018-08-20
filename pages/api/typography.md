---
filename: /packages/material-ui/src/Typography/Typography.js
title: Typography API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Typography

<p class="description">The API documentation of the Typography React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">align</span> | <span class="prop-type">enum:&nbsp;'inherit', 'left', 'center', 'right', 'justify'<br> | <span class="prop-default">'inherit'</span> | Set the text-align on the component. |
| <span class="prop-name">children</span> | <span class="prop-type">node |   | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'default', 'error', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary'<br> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> |   | The component used for the root node. Either a string to use a DOM element or a component. By default, it maps the variant to a good default headline component. |
| <span class="prop-name">gutterBottom</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the text will have a bottom margin. |
| <span class="prop-name">headlineMapping</span> | <span class="prop-type">object | <span class="prop-default">{  display4: 'h1',  display3: 'h1',  display2: 'h1',  display1: 'h1',  headline: 'h1',  title: 'h2',  subheading: 'h3',  body2: 'aside',  body1: 'p',}</span> | We are empirically mapping the variant property to a range of different DOM element types. For instance, h1 to h6. If you wish to change that mapping, you can provide your own. Alternatively, you can use the `component` property. |
| <span class="prop-name">noWrap</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the text will not wrap, but instead will truncate with an ellipsis. |
| <span class="prop-name">paragraph</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the text will have a bottom margin. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'<br> | <span class="prop-default">'body1'</span> | Applies the theme typography styles. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">display4</span> | Styles applied to the root element if `variant="display4"`.
| <span class="prop-name">display3</span> | Styles applied to the root element if `variant="display3"`.
| <span class="prop-name">display2</span> | Styles applied to the root element if `variant="display2"`.
| <span class="prop-name">display1</span> | Styles applied to the root element if `variant="display1"`.
| <span class="prop-name">headline</span> | Styles applied to the root element if `variant="headline"`.
| <span class="prop-name">title</span> | Styles applied to the root element if `variant="title"`.
| <span class="prop-name">subheading</span> | Styles applied to the root element if `variant="subheading"`.
| <span class="prop-name">body2</span> | Styles applied to the root element if `variant="body2"`.
| <span class="prop-name">body1</span> | Styles applied to the root element if `variant="body1"`.
| <span class="prop-name">caption</span> | Styles applied to the root element if `variant="caption"`.
| <span class="prop-name">button</span> | Styles applied to the root element if `variant="button"`.
| <span class="prop-name">alignLeft</span> | Styles applied to the root element if `align="left"`.
| <span class="prop-name">alignCenter</span> | Styles applied to the root element if `align="center"`.
| <span class="prop-name">alignRight</span> | Styles applied to the root element if `align="right"`.
| <span class="prop-name">alignJustify</span> | Styles applied to the root element if `align="justify"`.
| <span class="prop-name">noWrap</span> | Styles applied to the root element if `align="nowrap"`.
| <span class="prop-name">gutterBottom</span> | Styles applied to the root element if `gutterBottom={true}`.
| <span class="prop-name">paragraph</span> | Styles applied to the root element if `paragraph={true}`.
| <span class="prop-name">colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">colorTextPrimary</span> | Styles applied to the root element if `color="textPrimary"`.
| <span class="prop-name">colorTextSecondary</span> | Styles applied to the root element if `color="textSecondary"`.
| <span class="prop-name">colorError</span> | Styles applied to the root element if `color="error"`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Typography/Typography.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTypography`.

## Demos

- [Typography](/style/typography)

