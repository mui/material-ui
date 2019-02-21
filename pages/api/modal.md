---
filename: /packages/material-ui/src/Modal/Modal.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Modal API

<p class="description">The API documentation of the Modal React component. Learn more about the properties and the CSS customization points.</p>

```js
import Modal from '@material-ui/core/Modal';
```

Modal is a lower-level construct that is leveraged by the following components:

- [Dialog](/api/dialog/)
- [Drawer](/api/drawer/)
- [Menu](/api/menu/)
- [Popover](/api/popover/)

If you are creating a modal dialog, you probably want to use the [Dialog](/api/dialog/) component
rather than directly using Modal.

This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">BackdropComponent</span> | <span class="prop-type">element type</span> | <span class="prop-default">Backdrop</span> | A backdrop component. This property enables custom backdrop rendering. |
| <span class="prop-name">BackdropProps</span> | <span class="prop-type">object</span> |   | Properties applied to the [`Backdrop`](/api/backdrop/) element. |
| <span class="prop-name required">children *</span> | <span class="prop-type">element</span> |   | A single child content element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">closeAfterTransition</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | When set to true the Modal waits until a nested Transition is completed before closing. |
| <span class="prop-name">container</span> | <span class="prop-type">union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br></span> |   | A node, component instance, or function that returns either. The `container` will have the portal children appended to it. |
| <span class="prop-name">disableAutoFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not automatically shift focus to itself when it opens, and replace it to the last focused element when it closes. This also works correctly with any modal children that have the `disableAutoFocus` prop.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableBackdropClick</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clicking the backdrop will not fire any callback. |
| <span class="prop-name">disableEnforceFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not prevent focus from leaving the modal while open.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableEscapeKeyDown</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hitting escape will not fire any callback. |
| <span class="prop-name">disablePortal</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <span class="prop-name">disableRestoreFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not restore focus to previously focused element once modal is hidden. |
| <span class="prop-name">hideBackdrop</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the backdrop is not rendered. |
| <span class="prop-name">keepMounted</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Always keep the children in the DOM. This property can be useful in SEO situation or when you want to maximize the responsiveness of the Modal. |
| <span class="prop-name">onBackdropClick</span> | <span class="prop-type">func</span> |   | Callback fired when the backdrop is clicked. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |   | Callback fired when the component requests to be closed. The `reason` parameter can optionally be used to control the response to `onClose`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback<br>*reason:* Can be:`"escapeKeyDown"`, `"backdropClick"` |
| <span class="prop-name">onEscapeKeyDown</span> | <span class="prop-type">func</span> |   | Callback fired when the escape key is pressed, `disableEscapeKeyDown` is false and the modal is in focus. |
| <span class="prop-name">onRendered</span> | <span class="prop-type">func</span> |   | Callback fired once the children has been mounted into the `container`. It signals that the `open={true}` property took effect. |
| <span class="prop-name required">open *</span> | <span class="prop-type">bool</span> |   | If `true`, the modal is open. |

Any other properties supplied will be spread to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">hidden</span> | Styles applied to the root element if the `Modal` has exited.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Modal/Modal.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiModal`.

## Demos

- [Modal](/utils/modal/)

