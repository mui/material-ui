---
filename: /src/Snackbar/Snackbar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Snackbar



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| SnackbarContentProps | Object |  | Properties applied to the `SnackbarContent` element. |
| action | Node |  | The action to display. |
| anchorOrigin | signature | {  vertical: 'bottom',  horizontal: 'center'} | The anchor of the `Snackbar`. |
| autoHideDuration | number |  | The number of milliseconds to wait before automatically dismissing. This behavior is disabled by default with the `null` value. |
| children | Element |  | If you wish the take control over the children of the component you can use that property. When using it, no `SnackbarContent` component will be rendered. |
| classes | Object |  | Useful to extend the style applied to components. |
| key | any |  | When displaying multiple consecutive Snackbars from a parent rendering a single &lt;Snackbar/>, add the key property to ensure independent treatment of each message. e.g. &lt;Snackbar key={message} />, otherwise, the message may update-in-place and features such as autoHideDuration may be canceled. |
| message | Node |  | The message to display. |
| onClose | signature |  | Callback fired when the component requests to be closed.<br>Typically `onClose` is used to set state in the parent component, which is used to control the `Snackbar` `open` prop.<br>The `reason` parameter can optionally be used to control the response to `onClose`, for example ignoring `clickaway`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback<br>*reason:* Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"` |
| onEnter | TransitionCallback |  | Callback fired before the transition is entering. |
| onEntered | TransitionCallback |  | Callback fired when the transition has entered. |
| onEntering | TransitionCallback |  | Callback fired when the transition is entering. |
| onExit | TransitionCallback |  | Callback fired before the transition is exiting. |
| onExited | TransitionCallback |  | Callback fired when the transition has exited. |
| onExiting | TransitionCallback |  | Callback fired when the transition is exiting. |
| <span style="color: #31a148">open *</span> | boolean |  | If true, `Snackbar` is open. |
| resumeHideDuration | number |  | The number of milliseconds to wait before dismissing after user interaction. If `autoHideDuration` property isn't specified, it does nothing. If `autoHideDuration` property is specified but `resumeHideDuration` isn't, we default to `autoHideDuration / 2` ms. |
| transition | ComponentType |  | Transition component. |
| transitionDuration | TransitionDuration | {  enter: duration.enteringScreen,  exit: duration.leavingScreen} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `anchorTopCenter`
- `anchorBottomCenter`
- `anchorTopRight`
- `anchorBottomRight`
- `anchorTopLeft`
- `anchorBottomLeft`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Snackbar/Snackbar.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSnackbar`.

## Demos

- [Snackbars](/demos/snackbars)

