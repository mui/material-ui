---
filename: /packages/material-ui/src/Tooltip/Tooltip.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tooltip API

<p class="description">The API documentation of the Tooltip React component. Learn more about the props and the CSS customization points.</p>

```js
import { Tooltip } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">element</span> |  | Tooltip reference element.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disableFocusListener</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to focus events. |
| <span class="prop-name">disableHoverListener</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to hover events. |
| <span class="prop-name">disableTouchListener</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to long press touch events. |
| <span class="prop-name">enterDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The number of milliseconds to wait before showing the tooltip. This prop won't impact the enter touch delay (`enterTouchDelay`). |
| <span class="prop-name">enterTouchDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">700</span> | The number of milliseconds a user must touch the element before showing the tooltip. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | The relationship between the tooltip and the wrapper component is not clear from the DOM. This prop is used with aria-describedby to solve the accessibility issue. If you don't provide this prop. It falls back to a randomly generated id. |
| <span class="prop-name">interactive</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Makes a tooltip interactive, i.e. will not close when the user hovers over the tooltip before the `leaveDelay` is expired. |
| <span class="prop-name">leaveDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The number of milliseconds to wait before hiding the tooltip. This prop won't impact the leave touch delay (`leaveTouchDelay`). |
| <span class="prop-name">leaveTouchDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">1500</span> | The number of milliseconds after the user stops touching an element before hiding the tooltip. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the tooltip requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">onOpen</span> | <span class="prop-type">func</span> |  | Callback fired when the tooltip requests to be open.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">open</span> | <span class="prop-type">bool</span> |  | If `true`, the tooltip is shown. |
| <span class="prop-name">placement</span> | <span class="prop-type">'bottom-end'<br>&#124;&nbsp;'bottom-start'<br>&#124;&nbsp;'bottom'<br>&#124;&nbsp;'left-end'<br>&#124;&nbsp;'left-start'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right-end'<br>&#124;&nbsp;'right-start'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'top-end'<br>&#124;&nbsp;'top-start'<br>&#124;&nbsp;'top'</span> | <span class="prop-default">'bottom'</span> | Tooltip placement. |
| <span class="prop-name">PopperProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Popper`](/api/popper/) element. |
| <span class="prop-name required">title&nbsp;*</span> | <span class="prop-type">node</span> |  | Tooltip title. Zero-length titles string are never displayed. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Grow</span> | The component used for the transition. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Props applied to the `Transition` element. |

The component cannot hold a ref.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTooltip`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">popper</span> | <span class="prop-name">MuiTooltip-popper</span> | Styles applied to the Popper component.
| <span class="prop-name">popperInteractive</span> | <span class="prop-name">MuiTooltip-popperInteractive</span> | Styles applied to the Popper component if `interactive={true}`.
| <span class="prop-name">tooltip</span> | <span class="prop-name">MuiTooltip-tooltip</span> | Styles applied to the tooltip (label wrapper) element.
| <span class="prop-name">touch</span> | <span class="prop-name">MuiTooltip-touch</span> | Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch.
| <span class="prop-name">tooltipPlacementLeft</span> | <span class="prop-name">MuiTooltip-tooltipPlacementLeft</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "left".
| <span class="prop-name">tooltipPlacementRight</span> | <span class="prop-name">MuiTooltip-tooltipPlacementRight</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "right".
| <span class="prop-name">tooltipPlacementTop</span> | <span class="prop-name">MuiTooltip-tooltipPlacementTop</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "top".
| <span class="prop-name">tooltipPlacementBottom</span> | <span class="prop-name">MuiTooltip-tooltipPlacementBottom</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom".

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tooltip/Tooltip.js) for more detail.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tooltips](/components/tooltips/)

