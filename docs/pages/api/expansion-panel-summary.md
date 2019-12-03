---
filename: /packages/material-ui/src/ExpansionPanelSummary/ExpansionPanelSummary.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ExpansionPanelSummary API

<p class="description">The API documentation of the ExpansionPanelSummary React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// or
import { ExpansionPanelSummary } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the expansion panel summary. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--expandIcon"></a><a href="#props--expandIcon" class="prop-name">expandIcon</a> | <span class="prop-type">node</span> |  | The icon to display as the expand indicator. |
| <a class="anchor-link" id="props--IconButtonProps"></a><a href="#props--IconButtonProps" class="prop-name">IconButtonProps</a> | <span class="prop-type">object</span> |  | Props applied to the `IconButton` element wrapping the expand icon. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiExpansionPanelSummary`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiExpansionPanelSummary-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--expanded"></a><a href="#css--expanded" class="prop-name">expanded</a> | <span class="prop-name">.Mui-expanded</span> | Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`.
| <a class="anchor-link" id="css--focused"></a><a href="#css--focused" class="prop-name">focused</a> | <span class="prop-name">.Mui-focused</span> | Pseudo-class applied to the root element if `focused={true}`.
| <a class="anchor-link" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" id="css--content"></a><a href="#css--content" class="prop-name">content</a> | <span class="prop-name">.MuiExpansionPanelSummary-content</span> | Styles applied to the children wrapper element.
| <a class="anchor-link" id="css--expandIcon"></a><a href="#css--expandIcon" class="prop-name">expandIcon</a> | <span class="prop-name">.MuiExpansionPanelSummary-expandIcon</span> | Styles applied to the `IconButton` component when `expandIcon` is supplied.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ExpansionPanelSummary/ExpansionPanelSummary.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Expansion Panels](/components/expansion-panels/)

