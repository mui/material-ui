---
filename: /packages/material-ui/src/Breadcrumbs/Breadcrumbs.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Breadcrumbs API

<p class="description">The API documentation of the Breadcrumbs React component. Learn more about the properties and the CSS customization points.</p>

```js
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The breadcrumb children. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'nav'</span> | The component used for the root node. Either a string to use a DOM element or a component. By default, it maps the variant to a good default headline component. |
| <span class="prop-name">itemsAfterCollapse</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | If max items is exceeded, the number of items to show after the ellipsis. |
| <span class="prop-name">itemsBeforeCollapse</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | If max items is exceeded, the number of items to show before the ellipsis. |
| <span class="prop-name">maxItems</span> | <span class="prop-type">number</span> | <span class="prop-default">8</span> | Specifies the maximum number of breadcrumbs to display. When there are more than the maximum number, only the first and last will be shown, with an ellipsis in between. |
| <span class="prop-name">separator</span> | <span class="prop-type">node</span> | <span class="prop-default">'/'</span> | Custom separator node. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">ol</span> | Styles applied to the ol element.
| <span class="prop-name">li</span> | Styles applied to the li element.
| <span class="prop-name">separator</span> | Styles applied to the separator element.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Breadcrumbs/Breadcrumbs.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiBreadcrumbs`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Breadcrumbs](/components/breadcrumbs/)

