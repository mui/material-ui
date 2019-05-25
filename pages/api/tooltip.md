---
filename: /packages/material-ui/src/Tooltip/Tooltip.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tooltip API

<p class="description">The API documentation of the Tooltip React component. Learn more about the properties and the CSS customization points.</p>

```js
import Tooltip from '@material-ui/core/Tooltip';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">element</span> |  | Tooltip reference element.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disableFocusListener</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to focus events. |
| <span class="prop-name">disableHoverListener</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to hover events. |
| <span class="prop-name">disableTouchListener</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to long press touch events. |
| <span class="prop-name">enterDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The number of milliseconds to wait before showing the tooltip. This property won't impact the enter touch delay (`enterTouchDelay`). |
| <span class="prop-name">enterTouchDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">700</span> | The number of milliseconds a user must touch the element before showing the tooltip. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | The relationship between the tooltip and the wrapper component is not clear from the DOM. This property is used with aria-describedby to solve the accessibility issue. If you don't provide this property. It falls back to a randomly generated id. |
| <span class="prop-name">interactive</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Makes a tooltip interactive, i.e. will not close when the user hovers over the tooltip before the `leaveDelay` is expired. |
| <span class="prop-name">leaveDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The number of milliseconds to wait before hiding the tooltip. This property won't impact the leave touch delay (`leaveTouchDelay`). |
| <span class="prop-name">leaveTouchDelay</span> | <span class="prop-type">number</span> | <span class="prop-default">1500</span> | The number of milliseconds after the user stops touching an element before hiding the tooltip. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the tooltip requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">onOpen</span> | <span class="prop-type">func</span> |  | Callback fired when the tooltip requests to be open.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">open</span> | <span class="prop-type">bool</span> |  | If `true`, the tooltip is shown. |
| <span class="prop-name">placement</span> | <span class="prop-type">enum:&nbsp;'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'<br></span> | <span class="prop-default">'bottom'</span> | Tooltip placement. |
| <span class="prop-name">PopperProps</span> | <span class="prop-type">object</span> |  | Properties applied to the [`Popper`](/api/popper/) element. |
| <span class="prop-name required">title&nbsp;*</span> | <span class="prop-type">node</span> |  | Tooltip title. Zero-length titles string are never displayed. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Grow</span> | The component used for the transition. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Properties applied to the `Transition` element. |

The component cannot hold a ref.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">popper</span> | Styles applied to the Popper component.
| <span class="prop-name">popperInteractive</span> | Styles applied to the Popper component if `interactive={true}`.
| <span class="prop-name">tooltip</span> | Styles applied to the tooltip (label wrapper) element.
| <span class="prop-name">touch</span> | Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch.
| <span class="prop-name">tooltipPlacementLeft</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "left".
| <span class="prop-name">tooltipPlacementRight</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "right".
| <span class="prop-name">tooltipPlacementTop</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "top".
| <span class="prop-name">tooltipPlacementBottom</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom".

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tooltip/Tooltip.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiTooltip`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tooltips](/components/tooltips/)

