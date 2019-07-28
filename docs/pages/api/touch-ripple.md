---
filename: /packages/material-ui/src/ButtonBase/TouchRipple.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TouchRipple API

<p class="description">The API documentation of the TouchRipple React component. Learn more about the props and the CSS customization points.</p>

```js
import { TouchRipple } from '@material-ui/core/ButtonBase/TouchRipple.js';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">center</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the ripple starts at the center of the component rather than at the point of interaction. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is attached to an Imperative Handle. Have a look at the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ButtonBase/TouchRipple.js) for more detail.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTouchRipple`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiTouchRipple-root</span> | Styles applied to the root element.
| <span class="prop-name">ripple</span> | <span class="prop-name">MuiTouchRipple-ripple</span> | Styles applied to the internal `Ripple` components `ripple` class.
| <span class="prop-name">rippleVisible</span> | <span class="prop-name">MuiTouchRipple-rippleVisible</span> | Styles applied to the internal `Ripple` components `rippleVisible` class.
| <span class="prop-name">ripplePulsate</span> | <span class="prop-name">MuiTouchRipple-ripplePulsate</span> | Styles applied to the internal `Ripple` components `ripplePulsate` class.
| <span class="prop-name">child</span> | <span class="prop-name">MuiTouchRipple-child</span> | Styles applied to the internal `Ripple` components `child` class.
| <span class="prop-name">childLeaving</span> | <span class="prop-name">MuiTouchRipple-childLeaving</span> | Styles applied to the internal `Ripple` components `childLeaving` class.
| <span class="prop-name">childPulsate</span> | <span class="prop-name">MuiTouchRipple-childPulsate</span> | Styles applied to the internal `Ripple` components `childPulsate` class.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ButtonBase/TouchRipple.js) for more detail.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

