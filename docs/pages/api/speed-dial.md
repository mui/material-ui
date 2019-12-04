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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--ariaLabel"></a><a href="#props--ariaLabel" title="link to the prop on this page" class="prop-name required">ariaLabel&nbsp;*</a> | <span class="prop-type">string</span> |  | The aria-label of the button element. Also used to provide the `id` for the `SpeedDial` element and its children. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | SpeedDialActions to display when the SpeedDial is `open`. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--direction"></a><a href="#props--direction" title="link to the prop on this page" class="prop-name">direction</a> | <span class="prop-type">'down'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'up'</span> | <span class="prop-default">'up'</span> | The direction the actions open relative to the floating action button. |
| <a class="anchor-link" id="props--FabProps"></a><a href="#props--FabProps" title="link to the prop on this page" class="prop-name">FabProps</a> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Fab`](/api/fab/) element. |
| <a class="anchor-link" id="props--hidden"></a><a href="#props--hidden" title="link to the prop on this page" class="prop-name">hidden</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the SpeedDial will be hidden. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" title="link to the prop on this page" class="prop-name">icon</a> | <span class="prop-type">node</span> |  | The icon to display in the SpeedDial Fab. The `SpeedDialIcon` component provides a default Icon with animation. |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" title="link to the prop on this page" class="prop-name">onClose</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be:`"toggle"`, `"blur"`, `"mouseLeave"`, `"escapeKeyDown"`. |
| <a class="anchor-link" id="props--onOpen"></a><a href="#props--onOpen" title="link to the prop on this page" class="prop-name">onOpen</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be open.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be:`"toggle"`, `"focus"`, `"mouseEnter"`. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" title="link to the prop on this page" class="prop-name required">open&nbsp;*</a> | <span class="prop-type">bool</span> |  | If `true`, the SpeedDial is open. |
| <a class="anchor-link" id="props--openIcon"></a><a href="#props--openIcon" title="link to the prop on this page" class="prop-name">openIcon</a> | <span class="prop-type">node</span> |  | The icon to display in the SpeedDial Fab when the SpeedDial is open. |
| <a class="anchor-link" id="props--TransitionComponent"></a><a href="#props--TransitionComponent" title="link to the prop on this page" class="prop-name">TransitionComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Zoom</span> | The component used for the transition. |
| <a class="anchor-link" id="props--transitionDuration"></a><a href="#props--transitionDuration" title="link to the prop on this page" class="prop-name">transitionDuration</a> | <span class="prop-type">number<br>&#124;&nbsp;{ appear?: number, enter?: number, exit?: number }</span> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <a class="anchor-link" id="props--TransitionProps"></a><a href="#props--TransitionProps" title="link to the prop on this page" class="prop-name">TransitionProps</a> | <span class="prop-type">object</span> |  | Props applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiSpeedDial`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiSpeedDial-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--fab"></a><a href="#css--fab" class="prop-name">fab</a> | <span class="prop-name">.MuiSpeedDial-fab</span> | Styles applied to the Fab component.
| <a class="anchor-link" title="link to the rule name on this page" id="css--directionUp"></a><a href="#css--directionUp" class="prop-name">directionUp</a> | <span class="prop-name">.MuiSpeedDial-directionUp</span> | Styles applied to the root if direction="up"
| <a class="anchor-link" title="link to the rule name on this page" id="css--directionDown"></a><a href="#css--directionDown" class="prop-name">directionDown</a> | <span class="prop-name">.MuiSpeedDial-directionDown</span> | Styles applied to the root if direction="down"
| <a class="anchor-link" title="link to the rule name on this page" id="css--directionLeft"></a><a href="#css--directionLeft" class="prop-name">directionLeft</a> | <span class="prop-name">.MuiSpeedDial-directionLeft</span> | Styles applied to the root if direction="left"
| <a class="anchor-link" title="link to the rule name on this page" id="css--directionRight"></a><a href="#css--directionRight" class="prop-name">directionRight</a> | <span class="prop-name">.MuiSpeedDial-directionRight</span> | Styles applied to the root if direction="right"
| <a class="anchor-link" title="link to the rule name on this page" id="css--actions"></a><a href="#css--actions" class="prop-name">actions</a> | <span class="prop-name">.MuiSpeedDial-actions</span> | Styles applied to the actions (`children` wrapper) element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--actionsClosed"></a><a href="#css--actionsClosed" class="prop-name">actionsClosed</a> | <span class="prop-name">.MuiSpeedDial-actionsClosed</span> | Styles applied to the actions (`children` wrapper) element if `open={false}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/SpeedDial/SpeedDial.js) for more detail.

## Demos

- [Speed Dial](/components/speed-dial/)

