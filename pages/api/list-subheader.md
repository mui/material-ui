---
filename: /packages/material-ui/src/ListSubheader/ListSubheader.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListSubheader API

<p class="description">The API documentation of the ListSubheader React component. Learn more about the properties and the CSS customization points.</p>

```js
import ListSubheader from '@material-ui/core/ListSubheader';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'inherit'<br></span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disableGutters</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will not have gutters. |
| <span class="prop-name">disableSticky</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will not stick to the top during scroll. |
| <span class="prop-name">inset</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the List Subheader will be indented. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">gutters</span> | Styles applied to the inner `component` element if `disableGutters={false}`.
| <span class="prop-name">inset</span> | Styles applied to the root element if `inset={true}`.
| <span class="prop-name">sticky</span> | Styles applied to the root element if `disableSticky={false}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListSubheader/ListSubheader.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiListSubheader`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Grid List](/components/grid-list/)
- [Lists](/components/lists/)

