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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--action"></a><a href="#props--action" class="prop-name">action</a> | <span class="prop-type">node</span> |  | The action to display. |
| <a class="anchor-link" id="props--anchorOrigin"></a><a href="#props--anchorOrigin" class="prop-name">anchorOrigin</a> | <span class="prop-type">{ horizontal: 'left'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'right', vertical: 'top'<br>&#124;&nbsp;'bottom' }</span> | <span class="prop-default">{ vertical: 'bottom', horizontal: 'center' }</span> | The anchor of the `Snackbar`. |
| <a class="anchor-link" id="props--autoHideDuration"></a><a href="#props--autoHideDuration" class="prop-name">autoHideDuration</a> | <span class="prop-type">number</span> |  | The number of milliseconds to wait before automatically calling the `onClose` function. `onClose` should then set the state of the `open` prop to hide the Snackbar. This behavior is disabled by default with the `null` value. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">element</span> |  | Replace the `SnackbarContent` component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--ClickAwayListenerProps"></a><a href="#props--ClickAwayListenerProps" class="prop-name">ClickAwayListenerProps</a> | <span class="prop-type">object</span> |  | Props applied to the `ClickAwayListener` element. |
| <a class="anchor-link" id="props--ContentProps"></a><a href="#props--ContentProps" class="prop-name">ContentProps</a> | <span class="prop-type">object</span> |  | Props applied to the [`SnackbarContent`](/api/snackbar-content/) element. |
| <a class="anchor-link" id="props--disableWindowBlurListener"></a><a href="#props--disableWindowBlurListener" class="prop-name">disableWindowBlurListener</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the `autoHideDuration` timer will expire even if the window is not focused. |
| <a class="anchor-link" id="props--key"></a><a href="#props--key" class="prop-name">key</a> | <span class="prop-type">any</span> |  | When displaying multiple consecutive Snackbars from a parent rendering a single &lt;Snackbar/>, add the key prop to ensure independent treatment of each message. e.g. &lt;Snackbar key={message} />, otherwise, the message may update-in-place and features such as autoHideDuration may be canceled. |
| <a class="anchor-link" id="props--message"></a><a href="#props--message" class="prop-name">message</a> | <span class="prop-type">node</span> |  | The message to display. |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" class="prop-name">onClose</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed. Typically `onClose` is used to set state in the parent component, which is used to control the `Snackbar` `open` prop. The `reason` parameter can optionally be used to control the response to `onClose`, for example ignoring `clickaway`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`. |
| <a class="anchor-link" id="props--onEnter"></a><a href="#props--onEnter" class="prop-name">onEnter</a> | <span class="prop-type">func</span> |  | Callback fired before the transition is entering. |
| <a class="anchor-link" id="props--onEntered"></a><a href="#props--onEntered" class="prop-name">onEntered</a> | <span class="prop-type">func</span> |  | Callback fired when the transition has entered. |
| <a class="anchor-link" id="props--onEntering"></a><a href="#props--onEntering" class="prop-name">onEntering</a> | <span class="prop-type">func</span> |  | Callback fired when the transition is entering. |
| <a class="anchor-link" id="props--onExit"></a><a href="#props--onExit" class="prop-name">onExit</a> | <span class="prop-type">func</span> |  | Callback fired before the transition is exiting. |
| <a class="anchor-link" id="props--onExited"></a><a href="#props--onExited" class="prop-name">onExited</a> | <span class="prop-type">func</span> |  | Callback fired when the transition has exited. |
| <a class="anchor-link" id="props--onExiting"></a><a href="#props--onExiting" class="prop-name">onExiting</a> | <span class="prop-type">func</span> |  | Callback fired when the transition is exiting. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" class="prop-name">open</a> | <span class="prop-type">bool</span> |  | If `true`, `Snackbar` is open. |
| <a class="anchor-link" id="props--resumeHideDuration"></a><a href="#props--resumeHideDuration" class="prop-name">resumeHideDuration</a> | <span class="prop-type">number</span> |  | The number of milliseconds to wait before dismissing after user interaction. If `autoHideDuration` prop isn't specified, it does nothing. If `autoHideDuration` prop is specified but `resumeHideDuration` isn't, we default to `autoHideDuration / 2` ms. |
| <a class="anchor-link" id="props--TransitionComponent"></a><a href="#props--TransitionComponent" class="prop-name">TransitionComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Grow</span> | The component used for the transition. |
| <a class="anchor-link" id="props--transitionDuration"></a><a href="#props--transitionDuration" class="prop-name">transitionDuration</a> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }</span> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <a class="anchor-link" id="props--TransitionProps"></a><a href="#props--TransitionProps" class="prop-name">TransitionProps</a> | <span class="prop-type">object</span> |  | Props applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiSnackbar`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiSnackbar-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--anchorOriginTopCenter"></a><a href="#css--anchorOriginTopCenter" class="prop-name">anchorOriginTopCenter</a> | <span class="prop-name">.MuiSnackbar-anchorOriginTopCenter</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'center' }}`.
| <a class="anchor-link" id="css--anchorOriginBottomCenter"></a><a href="#css--anchorOriginBottomCenter" class="prop-name">anchorOriginBottomCenter</a> | <span class="prop-name">.MuiSnackbar-anchorOriginBottomCenter</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'center' }}`.
| <a class="anchor-link" id="css--anchorOriginTopRight"></a><a href="#css--anchorOriginTopRight" class="prop-name">anchorOriginTopRight</a> | <span class="prop-name">.MuiSnackbar-anchorOriginTopRight</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }}`.
| <a class="anchor-link" id="css--anchorOriginBottomRight"></a><a href="#css--anchorOriginBottomRight" class="prop-name">anchorOriginBottomRight</a> | <span class="prop-name">.MuiSnackbar-anchorOriginBottomRight</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }}`.
| <a class="anchor-link" id="css--anchorOriginTopLeft"></a><a href="#css--anchorOriginTopLeft" class="prop-name">anchorOriginTopLeft</a> | <span class="prop-name">.MuiSnackbar-anchorOriginTopLeft</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }}`.
| <a class="anchor-link" id="css--anchorOriginBottomLeft"></a><a href="#css--anchorOriginBottomLeft" class="prop-name">anchorOriginBottomLeft</a> | <span class="prop-name">.MuiSnackbar-anchorOriginBottomLeft</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Snackbar/Snackbar.js) for more detail.

## Demos

- [Snackbars](/components/snackbars/)

