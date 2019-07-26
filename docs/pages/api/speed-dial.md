---
filename: /packages/material-ui-lab/src/SpeedDial/SpeedDial.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SpeedDial API

<p class="description">The API documentation of the SpeedDial React component. Learn more about the properties and the CSS customization points.</p>

```js
import { SpeedDial } from '@material-ui/lab';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">ariaLabel&nbsp;*</span> | <span class="prop-type">string</span> |  | The aria-label of the `Button` element. Also used to provide the `id` for the `SpeedDial` element and its children. |
| <span class="prop-name">ButtonProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Button`](/api/button/) element. |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | SpeedDialActions to display when the SpeedDial is `open`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">direction</span> | <span class="prop-type">enum:&nbsp;'up'&nbsp;&#124;<br>&nbsp;'down'&nbsp;&#124;<br>&nbsp;'left'&nbsp;&#124;<br>&nbsp;'right'<br></span> | <span class="prop-default">'up'</span> | The direction the actions open relative to the floating action button. |
| <span class="prop-name">hidden</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the SpeedDial will be hidden. |
| <span class="prop-name required">icon&nbsp;*</span> | <span class="prop-type">element</span> |  | The icon to display in the SpeedDial Floating Action Button. The `SpeedDialIcon` component provides a default Icon with animation. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object, key: string) => void`<br>*event:* The event source of the callback<br>*key:* The key pressed |
| <span class="prop-name required">open&nbsp;*</span> | <span class="prop-type">bool</span> |  | If `true`, the SpeedDial is open. |
| <span class="prop-name">openIcon</span> | <span class="prop-type">node</span> |  | The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Zoom</span> | The component used for the transition. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }<br></span> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Props applied to the `Transition` element. |

The component cannot hold a ref.

Any other properties supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiSpeedDial`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiSpeedDial-root</span> | Styles applied to the root element.
| <span class="prop-name">fab</span> | <span class="prop-name">MuiSpeedDial-fab</span> | Styles applied to the Button component.
| <span class="prop-name">directionUp</span> | <span class="prop-name">MuiSpeedDial-directionUp</span> | Styles applied to the root and action container elements when direction="up"
| <span class="prop-name">directionDown</span> | <span class="prop-name">MuiSpeedDial-directionDown</span> | Styles applied to the root and action container elements when direction="down"
| <span class="prop-name">directionLeft</span> | <span class="prop-name">MuiSpeedDial-directionLeft</span> | Styles applied to the root and action container elements when direction="left"
| <span class="prop-name">directionRight</span> | <span class="prop-name">MuiSpeedDial-directionRight</span> | Styles applied to the root and action container elements when direction="right"
| <span class="prop-name">actions</span> | <span class="prop-name">MuiSpeedDial-actions</span> | Styles applied to the actions (`children` wrapper) element.
| <span class="prop-name">actionsClosed</span> | <span class="prop-name">MuiSpeedDial-actionsClosed</span> | Styles applied to the actions (`children` wrapper) element if `open={false}`.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/SpeedDial/SpeedDial.js) for more detail.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Speed Dial](/components/speed-dial/)

