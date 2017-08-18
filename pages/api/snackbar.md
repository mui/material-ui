<!--- This documentation is automatically generated, do not try to edit it. -->

# Snackbar



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| SnackbarContentProps | Object |  | Properties applied to the `SnackbarContent` element. |
| action | Element |  | The action to display. |
| anchorOrigin | signature | { vertical: 'bottom', horizontal: 'center' } | The anchor of the `Snackbar`. |
| autoHideDuration | number | null | The number of milliseconds to wait before automatically dismissing. This behavior is disabled by default with the `null` value. |
| children | Element |  | If you wish the take control over the children of the component you can use that property. When using it, no `SnackbarContent` component will be rendered. |
| classes | Object | {} | Useful to extend the style applied to components. |
| enterTransitionDuration | number | duration.enteringScreen | Customizes duration of enter animation (ms) |
| key | any |  | When displaying multiple consecutive Snackbars from a parent rendering a single <Snackbar/>, add the key property to ensure independent treatment of each message. e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and features such as autoHideDuration may be canceled. |
| leaveTransitionDuration | number | duration.leavingScreen | Customizes duration of leave animation (ms) |
| message | Element |  | The message to display. |
| onEnter | TransitionCallback |  | Callback fired before the transition is entering. |
| onEntered | TransitionCallback |  | Callback fired when the transition has entered. |
| onEntering | TransitionCallback |  | Callback fired when the transition is entering. |
| onExit | TransitionCallback |  | Callback fired before the transition is exiting. |
| onExited | TransitionCallback |  | Callback fired when the transition has exited. |
| onExiting | TransitionCallback |  | Callback fired when the transition is exiting. |
| onRequestClose | signature |  | Callback fired when the component requests to be closed.<br>Typically `onRequestClose` is used to set state in the parent component, which is used to control the `Snackbar` `open` prop.<br>The `reason` parameter can optionally be used to control the response to `onRequestClose`, for example ignoring `clickaway`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback<br>*reason:* Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"` |
| <span style="color: #31a148">open *</span> | boolean |  | If true, `Snackbar` is open. |
| transition | union:&nbsp;Function<br>&nbsp;Element<*><br> |  | Object with Transition component, props & create Fn. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `anchorTopCenter`
- `anchorBottomCenter`
- `anchorTopRight`
- `anchorBottomRight`
- `anchorTopLeft`
- `anchorBottomLeft`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSnackbar`.

## Demos

- [Snackbars](/demos/snackbars)

