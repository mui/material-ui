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



## Component name

The `MuiBreadcrumbs` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The breadcrumb children. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'nav'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">expandText</span> | <span class="prop-type">string</span> | <span class="prop-default">'Show path'</span> | Override the default label for the expand button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name">itemsAfterCollapse</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | If max items is exceeded, the number of items to show after the ellipsis. |
| <span class="prop-name">itemsBeforeCollapse</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | If max items is exceeded, the number of items to show before the ellipsis. |
| <span class="prop-name">maxItems</span> | <span class="prop-type">number</span> | <span class="prop-default">8</span> | Specifies the maximum number of breadcrumbs to display. When there are more than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse` will be shown, with an ellipsis in between. |
| <span class="prop-name">separator</span> | <span class="prop-type">node</span> | <span class="prop-default">'/'</span> | Custom separator node. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiBreadcrumbs-root</span> | Styles applied to the root element.
| <span class="prop-name">ol</span> | <span class="prop-name">.MuiBreadcrumbs-ol</span> | Styles applied to the ol element.
| <span class="prop-name">li</span> | <span class="prop-name">.MuiBreadcrumbs-li</span> | Styles applied to the li element.
| <span class="prop-name">separator</span> | <span class="prop-name">.MuiBreadcrumbs-separator</span> | Styles applied to the separator element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Breadcrumbs/Breadcrumbs.js) for more detail.

## Demos

- [Breadcrumbs](/components/breadcrumbs/)

