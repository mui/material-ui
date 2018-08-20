---
filename: /packages/material-ui/src/Modal/Modal.js
title: Modal API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Modal

<p class="description">The API documentation of the Modal React component.</p>

This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">BackdropComponent</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">Backdrop</span> | A backdrop component. This property enables custom backdrop rendering. |
| <span class="prop-name">BackdropProps</span> | <span class="prop-type">object |   | Properties applied to the [`Backdrop`](/api/backdrop) element. |
| <span class="prop-name">children</span> | <span class="prop-type">element |   | A single child content element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">container</span> | <span class="prop-type">union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br> |   | A node, component instance, or function that returns either. The `container` will have the portal children appended to it. |
| <span class="prop-name">disableAutoFocus</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the modal will not automatically shift focus to itself when it opens, and replace it to the last focused element when it closes. This also works correctly with any modal children that have the `disableAutoFocus` prop.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableBackdropClick</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, clicking the backdrop will not fire any callback. |
| <span class="prop-name">disableEnforceFocus</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the modal will not prevent focus from leaving the modal while open.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableEscapeKeyDown</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, hitting escape will not fire any callback. |
| <span class="prop-name">disablePortal</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <span class="prop-name">disableRestoreFocus</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the modal will not restore focus to previously focused element once modal is hidden. |
| <span class="prop-name">hideBackdrop</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the backdrop is not rendered. |
| <span class="prop-name">keepMounted</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Always keep the children in the DOM. This property can be useful in SEO situation or when you want to maximize the responsiveness of the Modal. |
| <span class="prop-name">manager</span> | <span class="prop-type">object | <span class="prop-default">new ModalManager()</span> | A modal manager used to track and manage the state of open Modals. This enables customizing how modals interact within a container. |
| <span class="prop-name">onBackdropClick</span> | <span class="prop-type">func |   | Callback fired when the backdrop is clicked. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func |   | Callback fired when the component requests to be closed. The `reason` parameter can optionally be used to control the response to `onClose`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback<br>*reason:* Can be:`"escapeKeyDown"`, `"backdropClick"` |
| <span class="prop-name">onEscapeKeyDown</span> | <span class="prop-type">func |   | Callback fired when the escape key is pressed, `disableEscapeKeyDown` is false and the modal is in focus. |
| <span class="prop-name">onRendered</span> | <span class="prop-type">func |   | Callback fired once the children has been mounted into the `container`. It signals that the `open={true}` property took effect. |
| <span class="prop-name required">open *</span> | <span class="prop-type">bool |   | If `true`, the modal is open. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">hidden</span> | Styles applied to the root element if the `Modal` has exited.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Modal/Modal.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiModal`.

## Demos

- [Modal](/utils/modal)

