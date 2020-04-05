---
filename: /packages/material-ui/src/Card/Card.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Card API

<p class="description">The API documentation of the Card React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Card from '@material-ui/core/Card';
// or
import { Card } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiCard` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">raised</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the card will use raised styling. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiCard-root</span> | Styles applied to the root element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Card/Card.js) for more detail.

## Inheritance

The props of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Cards](/components/cards/)

