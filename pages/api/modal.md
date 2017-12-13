---
filename: /src/Modal/Modal.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Modal

The modal component provides a solid foundation for creating dialogs,
popovers, or whatever else.
The component renders its `children` node in front of a backdrop component.

The `Modal` offers a few helpful features over using just a `Portal` component and some styles:
- Manages dialog stacking when one-at-a-time just isn't enough.
- Creates a backdrop, for disabling interaction below the modal.
- It properly manages focus; moving to the modal content,
  and keeping it there until the modal is closed.
- It disables scrolling of the page content while open.
- Adds the appropriate ARIA roles are automatically.

This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| BackdropClassName | string |  | The CSS class name of the backdrop element. |
| BackdropComponent | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | Backdrop | Pass a component class to use as the backdrop. |
| BackdropInvisible | bool | false | If `true`, the backdrop is invisible. |
| BackdropTransitionDuration | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}<br> | 300 | The duration for the backdrop transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| children | element |  | A single child content element. |
| classes | object |  | Useful to extend the style applied to components. |
| disableBackdrop | bool | false | If `true`, the backdrop is disabled. |
| ignoreBackdropClick | bool | false | If `true`, clicking the backdrop will not fire the `onClose` callback. |
| ignoreEscapeKeyUp | bool | false | If `true`, hitting escape will not fire the `onClose` callback. |
| keepMounted | bool | false | Always keep the children in the DOM. This property can be useful in SEO situation or when you want to maximize the responsiveness of the Modal. |
| modalManager | object | createModalManager() | Instance of the modal manager. |
| onBackdropClick | func |  | Callback fires when the backdrop is clicked on. |
| onClose | func |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| onEnter | func |  | Callback fired before the modal is entering. |
| onEntered | func |  | Callback fired when the modal has entered. |
| onEntering | func |  | Callback fired when the modal is entering. |
| onEscapeKeyUp | func |  | Callback fires when the escape key is pressed and the modal is in focus. |
| onExit | func |  | Callback fired before the modal is exiting. |
| onExited | func |  | Callback fired when the modal has exited. |
| onExiting | func |  | Callback fired when the modal is exiting. |
| show | bool |  | If `true`, the Modal is visible. |

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

