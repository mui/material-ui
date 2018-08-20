---
filename: /packages/material-ui/src/Snackbar/Snackbar.js
title: Snackbar API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Snackbar

<p class="description">The API documentation of the Snackbar React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">node |   | The action to display. |
| <span class="prop-name">anchorOrigin</span> | <span class="prop-type">{ horizontal: enum:&nbsp;'left'&nbsp;&#124;<br>&nbsp;'center'&nbsp;&#124;<br>&nbsp;'right'<br>, vertical: enum:&nbsp;'top'&nbsp;&#124;<br>&nbsp;'center'&nbsp;&#124;<br>&nbsp;'bottom'<br> } | <span class="prop-default">{  vertical: 'bottom',  horizontal: 'center',}</span> | The anchor of the `Snackbar`. |
| <span class="prop-name">autoHideDuration</span> | <span class="prop-type">number |   | The number of milliseconds to wait before automatically calling the `onClose` function. `onClose` should then set the state of the `open` prop to hide the Snackbar. This behavior is disabled by default with the `null` value. |
| <span class="prop-name">children</span> | <span class="prop-type">element |   | If you wish the take control over the children of the component you can use this property. When used, you replace the `SnackbarContent` component with the children. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">ContentProps</span> | <span class="prop-type">object |   | Properties applied to the [`SnackbarContent`](/api/snackbar-content) element. |
| <span class="prop-name">disableWindowBlurListener</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the `autoHideDuration` timer will expire even if the window is not focused. |
| <span class="prop-name">key</span> | <span class="prop-type">any |   | When displaying multiple consecutive Snackbars from a parent rendering a single &lt;Snackbar/>, add the key property to ensure independent treatment of each message. e.g. &lt;Snackbar key={message} />, otherwise, the message may update-in-place and features such as autoHideDuration may be canceled. |
| <span class="prop-name">message</span> | <span class="prop-type">node |   | The message to display. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func |   | Callback fired when the component requests to be closed. Typically `onClose` is used to set state in the parent component, which is used to control the `Snackbar` `open` prop. The `reason` parameter can optionally be used to control the response to `onClose`, for example ignoring `clickaway`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback<br>*reason:* Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"` |
| <span class="prop-name">onEnter</span> | <span class="prop-type">func |   | Callback fired before the transition is entering. |
| <span class="prop-name">onEntered</span> | <span class="prop-type">func |   | Callback fired when the transition has entered. |
| <span class="prop-name">onEntering</span> | <span class="prop-type">func |   | Callback fired when the transition is entering. |
| <span class="prop-name">onExit</span> | <span class="prop-type">func |   | Callback fired before the transition is exiting. |
| <span class="prop-name">onExited</span> | <span class="prop-type">func |   | Callback fired when the transition has exited. |
| <span class="prop-name">onExiting</span> | <span class="prop-type">func |   | Callback fired when the transition is exiting. |
| <span class="prop-name">open</span> | <span class="prop-type">bool |   | If true, `Snackbar` is open. |
| <span class="prop-name">resumeHideDuration</span> | <span class="prop-type">number |   | The number of milliseconds to wait before dismissing after user interaction. If `autoHideDuration` property isn't specified, it does nothing. If `autoHideDuration` property is specified but `resumeHideDuration` isn't, we default to `autoHideDuration / 2` ms. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">Slide</span> | Transition component. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }<br> | <span class="prop-default">{  enter: duration.enteringScreen,  exit: duration.leavingScreen,}</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object |   | Properties applied to the `Transition` element. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">anchorOriginTopCenter</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'center' }}`.
| <span class="prop-name">anchorOriginBottomCenter</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'center' }}`.
| <span class="prop-name">anchorOriginTopRight</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }}`.
| <span class="prop-name">anchorOriginBottomRight</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }}`.
| <span class="prop-name">anchorOriginTopLeft</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }}`.
| <span class="prop-name">anchorOriginBottomLeft</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Snackbar/Snackbar.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSnackbar`.

## Demos

- [Snackbars](/demos/snackbars)

