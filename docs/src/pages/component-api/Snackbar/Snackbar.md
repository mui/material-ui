# Snackbar



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| SnackbarContentProps | object |  | Properties applied to the `SnackbarContent` element. |
| action | node |  | The action to display. |
| anchorOrigin | customPropTypes.origin | { vertical: 'bottom', horizontal: 'center' } | The anchor of the `Snackbar`. |
| autoHideDuration | number | null | The number of milliseconds to wait before automatically dismissing. This behavior is disabled by default with the `null` value. |
| children | node |  | If you wish the take control over the children of the component you can use that property. When using it, no `SnackbarContent` component will be rendered. |
| classes | object |  | Useful to extend the style applied to components. |
| enterTransitionDuration | number | duration.enteringScreen | Customizes duration of enter animation (ms) |
| leaveTransitionDuration | number | duration.leavingScreen | Customizes duration of leave animation (ms) |
| message | node |  | The message to display. |
| onRequestClose | function |  | Callback fired when the component requests to be closed.<br>Typically `onRequestClose` is used to set state in the parent component, which is used to control the `Snackbar` `open` prop.<br>The `reason` parameter can optionally be used to control the response to `onRequestClose`, for example ignoring `clickaway`.<br><br>**Signature:**<br>`function(event: event, reason: string) => void`<br>*event:* The event that triggered the close request<br>*reason:* Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"` |
| <span style="color: #31a148">open *</span> | bool |  | If true, `Snackbar` is open. |
| transition | union:&nbsp;func<br>&nbsp;element<br> |  | Object with Transition component, props & create Fn. |

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

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSnackbar`.
