---
filename: /packages/material-ui-lab/src/SpeedDial/SpeedDial.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SpeedDial API

<p class="description">The API documentation of the SpeedDial React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import SpeedDial from '@material-ui/lab/SpeedDial';
// or
import { SpeedDial } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiSpeedDial` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">ariaLabel<abbr title="required">*</abbr></span> | <span class="prop-type">string</span> |  | The aria-label of the button element. Also used to provide the `id` for the `SpeedDial` element and its children. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | SpeedDialActions to display when the SpeedDial is `open`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">direction</span> | <span class="prop-type">'down'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'up'</span> | <span class="prop-default">'up'</span> | The direction the actions open relative to the floating action button. |
| <span class="prop-name">FabProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Fab`](/api/fab/) element. |
| <span class="prop-name">hidden</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the SpeedDial will be hidden. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon to display in the SpeedDial Fab. The `SpeedDialIcon` component provides a default Icon with animation. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be: `"toggle"`, `"blur"`, `"mouseLeave"`, `"escapeKeyDown"`. |
| <span class="prop-name">onOpen</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be open.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be: `"toggle"`, `"focus"`, `"mouseEnter"`. |
| <span class="prop-name required">open<abbr title="required">*</abbr></span> | <span class="prop-type">bool</span> |  | If `true`, the SpeedDial is open. |
| <span class="prop-name">openIcon</span> | <span class="prop-type">node</span> |  | The icon to display in the SpeedDial Fab when the SpeedDial is open. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Zoom</span> | The component used for the transition. [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">number<br>&#124;&nbsp;{ appear?: number, enter?: number, exit?: number }</span> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiSpeedDial-root</span> | Styles applied to the root element.
| <span class="prop-name">fab</span> | <span class="prop-name">.MuiSpeedDial-fab</span> | Styles applied to the Fab component.
| <span class="prop-name">directionUp</span> | <span class="prop-name">.MuiSpeedDial-directionUp</span> | Styles applied to the root if direction="up"
| <span class="prop-name">directionDown</span> | <span class="prop-name">.MuiSpeedDial-directionDown</span> | Styles applied to the root if direction="down"
| <span class="prop-name">directionLeft</span> | <span class="prop-name">.MuiSpeedDial-directionLeft</span> | Styles applied to the root if direction="left"
| <span class="prop-name">directionRight</span> | <span class="prop-name">.MuiSpeedDial-directionRight</span> | Styles applied to the root if direction="right"
| <span class="prop-name">actions</span> | <span class="prop-name">.MuiSpeedDial-actions</span> | Styles applied to the actions (`children` wrapper) element.
| <span class="prop-name">actionsClosed</span> | <span class="prop-name">.MuiSpeedDial-actionsClosed</span> | Styles applied to the actions (`children` wrapper) element if `open={false}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/SpeedDial/SpeedDial.js) for more detail.

## Demos

- [Speed Dial](/components/speed-dial/)

