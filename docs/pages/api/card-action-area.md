---
filename: /packages/material-ui/src/CardActionArea/CardActionArea.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CardActionArea API

<p class="description">The API documentation of the CardActionArea React component. Learn more about the properties and the CSS customization points.</p>

```js
import { CardActionArea } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

- Style sheet name: `MuiCardActionArea`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiCardActionArea-root</span> | Styles applied to the root element.
| <span class="prop-name">focusVisible</span> | <span class="prop-name">Mui-focusVisible</span> | Pseudo-class applied to the ButtonBase root element if the action area is keyboard focused.
| <span class="prop-name">focusHighlight</span> | <span class="prop-name">MuiCardActionArea-focusHighlight</span> | Styles applied to the overlay that covers the action area when it is keyboard focused.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CardActionArea/CardActionArea.js) for more detail.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Cards](/components/cards/)

