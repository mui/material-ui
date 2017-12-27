---
filename: /src/Snackbar/Snackbar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Snackbar



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| action | node |  | The action to display. |
| anchorOrigin | shape | {  vertical: 'bottom',  horizontal: 'center',} | The anchor of the `Snackbar`. |
| autoHideDuration | number |  | The number of milliseconds to wait before automatically calling the `onClose` function. `onClose` should then set the state of the `open` prop to hide the Snackbar. This behavior is disabled by default with the `null` value. |
| children | element |  | If you wish the take control over the children of the component you can use this property. When used, you replace the `SnackbarContent` component with the children. |
| classes | object |  | Useful to extend the style applied to components. |
| key | any |  | When displaying multiple consecutive Snackbars from a parent rendering a single &lt;Snackbar/>, add the key property to ensure independent treatment of each message. e.g. &lt;Snackbar key={message} />, otherwise, the message may update-in-place and features such as autoHideDuration may be canceled. |
| message | node |  | The message to display. |
| onClose | func |  | Callback fired when the component requests to be closed. Typically `onClose` is used to set state in the parent component, which is used to control the `Snackbar` `open` prop. The `reason` parameter can optionally be used to control the response to `onClose`, for example ignoring `clickaway`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback<br>*reason:* Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"` |
| onEnter | func |  | Callback fired before the transition is entering. |
| onEntered | func |  | Callback fired when the transition has entered. |
| onEntering | func |  | Callback fired when the transition is entering. |
| onExit | func |  | Callback fired before the transition is exiting. |
| onExited | func |  | Callback fired when the transition has exited. |
| onExiting | func |  | Callback fired when the transition is exiting. |
| open | bool |  | If true, `Snackbar` is open. |
| resumeHideDuration | number |  | The number of milliseconds to wait before dismissing after user interaction. If `autoHideDuration` property isn't specified, it does nothing. If `autoHideDuration` property is specified but `resumeHideDuration` isn't, we default to `autoHideDuration / 2` ms. |
| SnackbarContentProps | object |  | Properties applied to the `SnackbarContent` element. |
| transition | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> |  | Transition component. |
| transitionDuration | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}<br> | {  enter: duration.enteringScreen,  exit: duration.leavingScreen,} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

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

