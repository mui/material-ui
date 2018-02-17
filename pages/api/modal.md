---
filename: /src/Modal/Modal.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Modal



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| BackdropComponent | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | Backdrop | A backdrop component. Useful for custom backdrop rendering. |
| BackdropProps | object |  | Properties applied to the `Backdrop` element. |
| children | element |  | A single child content element. |
| classes | object |  | Useful to extend the style applied to components. |
| container | union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br> |  | A node, component instance, or function that returns either. The `container` will have the portal children appended to it. |
| disableAutoFocus | bool | false | If `true`, the modal will not automatically shift focus to itself when it opens, and replace it to the last focused element when it closes. This also works correctly with any modal children that have the `disableAutoFocus` prop.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| disableBackdropClick | bool | false | If `true`, clicking the backdrop will not fire any callback. |
| disableEnforceFocus | bool | false | If `true`, the modal will not prevent focus from leaving the modal while open.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| disableEscapeKeyDown | bool | false | If `true`, hitting escape will not fire any callback. |
| disableRestoreFocus | bool | false | If `true`, the modal will not restore focus to previously focused element once modal is hidden. |
| hideBackdrop | bool | false | If `true`, the backdrop is not rendered. |
| keepMounted | bool | false | Always keep the children in the DOM. This property can be useful in SEO situation or when you want to maximize the responsiveness of the Modal. |
| manager | object | new ModalManager() | A modal manager used to track and manage the state of open Modals. Useful when customizing how modals interact within a container. |
| onBackdropClick | func |  | Callback fired when the backdrop is clicked. |
| onClose | func |  | Callback fired when the component requests to be closed. The `reason` parameter can optionally be used to control the response to `onClose`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback<br>*reason:* Can be:`"escapeKeyDown"`, `"backdropClick"` |
| onEscapeKeyDown | func |  | Callback fired when the escape key is pressed, `disableEscapeKeyDown` is false and the modal is in focus. |
| onRendered | func |  | Callback fired once the children has been mounted into the `container`. It signals that the `open={true}` property took effect. |
| <span style="color: #31a148">open *</span> | bool |  | If `true`, the modal is open. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `hidden`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Modal/Modal.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiModal`.

## Inheritance

The properties of the [Portal](/api/portal) component are also available.

## Demos

- [Modals](/utils/modals)

