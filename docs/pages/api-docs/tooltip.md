---
filename: /packages/material-ui/src/Tooltip/Tooltip.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tooltip API

<p class="description">The API documentation of the Tooltip React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Tooltip from '@material-ui/core/Tooltip';
// or
import { Tooltip } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiTooltip` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">arrow</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, adds an arrow to the tooltip. |
| <span class="prop-name required">children<abbr title="required">*</abbr></span> | <span class="prop-type">element</span> |  | Tooltip reference element.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disableFocusListener</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to focus events. |
| <span class="prop-name">disableHoverListener</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to hover events. |
| <span class="prop-name">disableTouchListener</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to long press touch events. |
| <span class="prop-name">enterDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">100</span> | The number of milliseconds to wait before showing the tooltip. This prop won't impact the enter touch delay (`enterTouchDelay`). |
| <span class="prop-name">enterNextDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The number of milliseconds to wait before showing the tooltip when one was already recently opened. |
| <span class="prop-name">enterTouchDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">700</span> | The number of milliseconds a user must touch the element before showing the tooltip. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id. |
| <span class="prop-name">interactive</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Makes a tooltip interactive, i.e. will not close when the user hovers over the tooltip before the `leaveDelay` is expired. |
| <span class="prop-name">leaveDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The number of milliseconds to wait before hiding the tooltip. This prop won't impact the leave touch delay (`leaveTouchDelay`). |
| <span class="prop-name">leaveTouchDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">1500</span> | The number of milliseconds after the user stops touching an element before hiding the tooltip. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">onOpen</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be open.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">open</span> | <span class="prop-type">bool</span> |  | If `true`, the tooltip is shown. |
| <span class="prop-name">placement</span> | <span class="prop-type">'bottom-end'<br>&#124;&nbsp;'bottom-start'<br>&#124;&nbsp;'bottom'<br>&#124;&nbsp;'left-end'<br>&#124;&nbsp;'left-start'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right-end'<br>&#124;&nbsp;'right-start'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'top-end'<br>&#124;&nbsp;'top-start'<br>&#124;&nbsp;'top'</span> | <span class="prop-default">'bottom'</span> | Tooltip placement. |
| <span class="prop-name">PopperComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Popper</span> | The component used for the popper. |
| <span class="prop-name">PopperProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Popper`](/api/popper/) element. |
| <span class="prop-name required">title<abbr title="required">*</abbr></span> | <span class="prop-type">node</span> |  | Tooltip title. Zero-length titles string are never displayed. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Grow</span> | The component used for the transition. [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">popper</span> | <span class="prop-name">.MuiTooltip-popper</span> | Styles applied to the Popper component.
| <span class="prop-name">popperInteractive</span> | <span class="prop-name">.MuiTooltip-popperInteractive</span> | Styles applied to the Popper component if `interactive={true}`.
| <span class="prop-name">popperArrow</span> | <span class="prop-name">.MuiTooltip-popperArrow</span> | Styles applied to the Popper component if `arrow={true}`.
| <span class="prop-name">tooltip</span> | <span class="prop-name">.MuiTooltip-tooltip</span> | Styles applied to the tooltip (label wrapper) element.
| <span class="prop-name">tooltipArrow</span> | <span class="prop-name">.MuiTooltip-tooltipArrow</span> | Styles applied to the tooltip (label wrapper) element if `arrow={true}`.
| <span class="prop-name">arrow</span> | <span class="prop-name">.MuiTooltip-arrow</span> | Styles applied to the arrow element.
| <span class="prop-name">touch</span> | <span class="prop-name">.MuiTooltip-touch</span> | Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch.
| <span class="prop-name">tooltipPlacementLeft</span> | <span class="prop-name">.MuiTooltip-tooltipPlacementLeft</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "left".
| <span class="prop-name">tooltipPlacementRight</span> | <span class="prop-name">.MuiTooltip-tooltipPlacementRight</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "right".
| <span class="prop-name">tooltipPlacementTop</span> | <span class="prop-name">.MuiTooltip-tooltipPlacementTop</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "top".
| <span class="prop-name">tooltipPlacementBottom</span> | <span class="prop-name">.MuiTooltip-tooltipPlacementBottom</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom".

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tooltip/Tooltip.js) for more detail.

## Demos

- [Tooltips](/components/tooltips/)

