---
filename: /packages/material-ui/src/Backdrop/Backdrop.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Backdrop API

<p class="description">The API documentation of the Backdrop React component. Learn more about the props and the CSS customization points.</p>

```js
import { Backdrop } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">invisible</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the backdrop is invisible. It can be used when rendering a popover or a custom select component. |
| <span class="prop-name required">open&nbsp;*</span> | <span class="prop-type">bool</span> |  | If `true`, the backdrop is open. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }</span> |  | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiBackdrop`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiBackdrop-root</span> | Styles applied to the root element.
| <span class="prop-name">invisible</span> | <span class="prop-name">MuiBackdrop-invisible</span> | Styles applied to the root element if `invisible={true}`.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Backdrop/Backdrop.js) for more detail.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

