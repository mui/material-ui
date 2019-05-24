---
filename: /packages/material-ui/src/List/List.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# List API

<p class="description">The API documentation of the List React component. Learn more about the properties and the CSS customization points.</p>

```js
import List from '@material-ui/core/List';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'ul'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">dense</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, compact vertical padding designed for keyboard and mouse input will be used for the list and list items. The property is available to descendant components as the `dense` context. |
| <span class="prop-name">disablePadding</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, vertical padding will be removed from the list. |
| <span class="prop-name">subheader</span> | <span class="prop-type">node</span> |  | The content of the subheader, normally `ListSubheader`. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">padding</span> | Styles applied to the root element if `disablePadding={false}`.
| <span class="prop-name">dense</span> | Styles applied to the root element if dense.
| <span class="prop-name">subheader</span> | Styles applied to the root element if a `subheader` is provided.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/List/List.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiList`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Lists](/components/lists/)
- [Transfer List](/components/transfer-list/)

