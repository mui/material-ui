---
filename: /packages/material-ui/src/Snackbar/Snackbar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Snackbar API

<p class="description">The API documentation of the Snackbar React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Snackbar from '@material-ui/core/Snackbar';
// or
import { Snackbar } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiSnackbar` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">node</span> |  | The action to display. It renders after the message, at the end of the snackbar. |
| <span class="prop-name">anchorOrigin</span> | <span class="prop-type">{ horizontal: 'center'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right', vertical: 'bottom'<br>&#124;&nbsp;'top' }</span> | <span class="prop-default">{ vertical: 'bottom', horizontal: 'center' }</span> | The anchor of the `Snackbar`. |
| <span class="prop-name">autoHideDuration</span> | <span class="prop-type">number</span> | <span class="prop-default">null</span> | The number of milliseconds to wait before automatically calling the `onClose` function. `onClose` should then set the state of the `open` prop to hide the Snackbar. This behavior is disabled by default with the `null` value. |
| <span class="prop-name">children</span> | <span class="prop-type">element</span> |  | Replace the `SnackbarContent` component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">ClickAwayListenerProps</span> | <span class="prop-type">object</span> |  | Props applied to the `ClickAwayListener` element. |
| <span class="prop-name">ContentProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`SnackbarContent`](/api/snackbar-content/) element. |
| <span class="prop-name">disableWindowBlurListener</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the `autoHideDuration` timer will expire even if the window is not focused. |
| <span class="prop-name">key</span> | <span class="prop-type">any</span> |  | When displaying multiple consecutive Snackbars from a parent rendering a single &lt;Snackbar/>, add the key prop to ensure independent treatment of each message. e.g. &lt;Snackbar key={message} />, otherwise, the message may update-in-place and features such as autoHideDuration may be canceled. |
| <span class="prop-name">message</span> | <span class="prop-type">node</span> |  | The message to display. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed. Typically `onClose` is used to set state in the parent component, which is used to control the `Snackbar` `open` prop. The `reason` parameter can optionally be used to control the response to `onClose`, for example ignoring `clickaway`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`. |
| <span class="prop-name">onEnter</span> | <span class="prop-type">func</span> |  | Callback fired before the transition is entering. |
| <span class="prop-name">onEntered</span> | <span class="prop-type">func</span> |  | Callback fired when the transition has entered. |
| <span class="prop-name">onEntering</span> | <span class="prop-type">func</span> |  | Callback fired when the transition is entering. |
| <span class="prop-name">onExit</span> | <span class="prop-type">func</span> |  | Callback fired before the transition is exiting. |
| <span class="prop-name">onExited</span> | <span class="prop-type">func</span> |  | Callback fired when the transition has exited. |
| <span class="prop-name">onExiting</span> | <span class="prop-type">func</span> |  | Callback fired when the transition is exiting. |
| <span class="prop-name">open</span> | <span class="prop-type">bool</span> |  | If `true`, `Snackbar` is open. |
| <span class="prop-name">resumeHideDuration</span> | <span class="prop-type">number</span> |  | The number of milliseconds to wait before dismissing after user interaction. If `autoHideDuration` prop isn't specified, it does nothing. If `autoHideDuration` prop is specified but `resumeHideDuration` isn't, we default to `autoHideDuration / 2` ms. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Grow</span> | The component used for the transition. [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">number<br>&#124;&nbsp;{ appear?: number, enter?: number, exit?: number }</span> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiSnackbar-root</span> | Styles applied to the root element.
| <span class="prop-name">anchorOriginTopCenter</span> | <span class="prop-name">.MuiSnackbar-anchorOriginTopCenter</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'center' }}`.
| <span class="prop-name">anchorOriginBottomCenter</span> | <span class="prop-name">.MuiSnackbar-anchorOriginBottomCenter</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'center' }}`.
| <span class="prop-name">anchorOriginTopRight</span> | <span class="prop-name">.MuiSnackbar-anchorOriginTopRight</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }}`.
| <span class="prop-name">anchorOriginBottomRight</span> | <span class="prop-name">.MuiSnackbar-anchorOriginBottomRight</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }}`.
| <span class="prop-name">anchorOriginTopLeft</span> | <span class="prop-name">.MuiSnackbar-anchorOriginTopLeft</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }}`.
| <span class="prop-name">anchorOriginBottomLeft</span> | <span class="prop-name">.MuiSnackbar-anchorOriginBottomLeft</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Snackbar/Snackbar.js) for more detail.

## Demos

- [Snackbars](/components/snackbars/)

