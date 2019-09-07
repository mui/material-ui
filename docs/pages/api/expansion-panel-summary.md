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
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the expansion panel summary. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">expandIcon</span> | <span class="prop-type">node</span> |  | The icon to display as the expand indicator. |
| <span class="prop-name">IconButtonProps</span> | <span class="prop-type">object</span> |  | Props applied to the `IconButton` element wrapping the expand icon. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiExpansionPanelSummary`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiExpansionPanelSummary-root</span> | Styles applied to the root element.
| <span class="prop-name">expanded</span> | <span class="prop-name">Mui-expanded</span> | Styles applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`.
| <span class="prop-name">focused</span> | <span class="prop-name">Mui-focused</span> | Styles applied to the root and children wrapper elements when focused.
| <span class="prop-name">disabled</span> | <span class="prop-name">Mui-disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">content</span> | <span class="prop-name">MuiExpansionPanelSummary-content</span> | Styles applied to the children wrapper element.
| <span class="prop-name">expandIcon</span> | <span class="prop-name">MuiExpansionPanelSummary-expandIcon</span> | Styles applied to the `IconButton` component when `expandIcon` is supplied.

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

