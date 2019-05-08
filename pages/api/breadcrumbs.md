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

## Demos

- [Breadcrumbs](/components/breadcrumbs/)

