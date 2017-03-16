Snackbar
====



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| action | node | null | The label for the action on the snackbar |
| autoHideDuration | number | null | The number of milliseconds to wait before automatically dismissing. If no value is specified, the snackbar can only be dismissed with a click away.|
| className | string | null | The css class name of the root element.|
| message | node | null | The message to be displayed. |
| open | bool |  | Controls whether the Snackbar is opened or not. |
| onRequestClose | function |  |  Fired when the `Snackbar` is requested to be closed by a click outside the `Snackbar`, or after the `autoHideDuration` timer expires. Typically `onRequestClose` is used to set state in the parent component, which is used to control the `Snackbar` open prop. The reason parameter can optionally be used to control the response to `onRequestClose`, for example ignoring clickaway.<br><br>**Signature:**<br> `function(reason: string) => void` reason: Can be:"timeout" (`autoHideDuration` expired) or: "clickaway". |

Any other properties supplied will be spread to the root element.
