---
filename: /packages/material-ui/src/Breadcrumbs/Breadcrumbs.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Breadcrumbs API

<p class="description">The API documentation of the Breadcrumbs React component. Learn more about the props and the CSS customization points.</p>

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

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiBreadcrumbs`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiBreadcrumbs-root</span> | Styles applied to the root element.
| <span class="prop-name">ol</span> | <span class="prop-name">MuiBreadcrumbs-ol</span> | Styles applied to the ol element.
| <span class="prop-name">li</span> | <span class="prop-name">MuiBreadcrumbs-li</span> | Styles applied to the li element.
| <span class="prop-name">separator</span> | <span class="prop-name">MuiBreadcrumbs-separator</span> | Styles applied to the separator element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Breadcrumbs/Breadcrumbs.js) for more detail.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Breadcrumbs](/components/breadcrumbs/)

