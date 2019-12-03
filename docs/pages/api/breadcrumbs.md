---
filename: /packages/material-ui/src/Breadcrumbs/Breadcrumbs.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Breadcrumbs API

<p class="description">The API documentation of the Breadcrumbs React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
// or
import { Breadcrumbs } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | The breadcrumb children. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'nav'</span> | The component used for the root node. Either a string to use a DOM element or a component. By default, it maps the variant to a good default headline component. |
| <a class="anchor-link" id="props--itemsAfterCollapse"></a><a href="#props--itemsAfterCollapse" class="prop-name">itemsAfterCollapse</a> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | If max items is exceeded, the number of items to show after the ellipsis. |
| <a class="anchor-link" id="props--itemsBeforeCollapse"></a><a href="#props--itemsBeforeCollapse" class="prop-name">itemsBeforeCollapse</a> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | If max items is exceeded, the number of items to show before the ellipsis. |
| <a class="anchor-link" id="props--maxItems"></a><a href="#props--maxItems" class="prop-name">maxItems</a> | <span class="prop-type">number</span> | <span class="prop-default">8</span> | Specifies the maximum number of breadcrumbs to display. When there are more than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse` will be shown, with an ellipsis in between. |
| <a class="anchor-link" id="props--separator"></a><a href="#props--separator" class="prop-name">separator</a> | <span class="prop-type">node</span> | <span class="prop-default">'/'</span> | Custom separator node. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiBreadcrumbs`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiBreadcrumbs-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--ol"></a><a href="#css--ol" class="prop-name">ol</a> | <span class="prop-name">.MuiBreadcrumbs-ol</span> | Styles applied to the ol element.
| <a class="anchor-link" id="css--li"></a><a href="#css--li" class="prop-name">li</a> | <span class="prop-name">.MuiBreadcrumbs-li</span> | Styles applied to the li element.
| <a class="anchor-link" id="css--separator"></a><a href="#css--separator" class="prop-name">separator</a> | <span class="prop-name">.MuiBreadcrumbs-separator</span> | Styles applied to the separator element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Breadcrumbs/Breadcrumbs.js) for more detail.

## Demos

- [Breadcrumbs](/components/breadcrumbs/)

