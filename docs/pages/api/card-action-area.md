---
filename: /packages/material-ui/src/CardActionArea/CardActionArea.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CardActionArea API

<p class="description">The API documentation of the CardActionArea React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import CardActionArea from '@material-ui/core/CardActionArea';
// or
import { CardActionArea } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiCardActionArea`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiCardActionArea-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--focusVisible"></a><a href="#css--focusVisible" class="prop-name">focusVisible</a> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the ButtonBase root element if the action area is keyboard focused.
| <a class="anchor-link" title="link to the rule name on this page" id="css--focusHighlight"></a><a href="#css--focusHighlight" class="prop-name">focusHighlight</a> | <span class="prop-name">.MuiCardActionArea-focusHighlight</span> | Styles applied to the overlay that covers the action area when it is keyboard focused.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CardActionArea/CardActionArea.js) for more detail.

## Inheritance

The props of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Cards](/components/cards/)

