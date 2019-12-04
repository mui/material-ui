---
filename: /packages/material-ui/src/Modal/Modal.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Modal API

<p class="description">The API documentation of the Modal React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Modal from '@material-ui/core/Modal';
// or
import { Modal } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

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
| <a class="anchor-link" id="props--BackdropComponent"></a><a href="#props--BackdropComponent" title="link to the prop on this page" class="prop-name">BackdropComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">SimpleBackdrop</span> | A backdrop component. This prop enables custom backdrop rendering. |
| <a class="anchor-link" id="props--BackdropProps"></a><a href="#props--BackdropProps" title="link to the prop on this page" class="prop-name">BackdropProps</a> | <span class="prop-type">object</span> |  | Props applied to the [`Backdrop`](/api/backdrop/) element. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">element</span> |  | A single child content element.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <a class="anchor-link" id="props--closeAfterTransition"></a><a href="#props--closeAfterTransition" title="link to the prop on this page" class="prop-name">closeAfterTransition</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | When set to true the Modal waits until a nested Transition is completed before closing. |
| <a class="anchor-link" id="props--container"></a><a href="#props--container" title="link to the prop on this page" class="prop-name">container</a> | <span class="prop-type">object<br>&#124;&nbsp;func</span> |  | A node, component instance, or function that returns either. The `container` will have the portal children appended to it. |
| <a class="anchor-link" id="props--disableAutoFocus"></a><a href="#props--disableAutoFocus" title="link to the prop on this page" class="prop-name">disableAutoFocus</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not automatically shift focus to itself when it opens, and replace it to the last focused element when it closes. This also works correctly with any modal children that have the `disableAutoFocus` prop.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <a class="anchor-link" id="props--disableBackdropClick"></a><a href="#props--disableBackdropClick" title="link to the prop on this page" class="prop-name">disableBackdropClick</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clicking the backdrop will not fire any callback. |
| <a class="anchor-link" id="props--disableEnforceFocus"></a><a href="#props--disableEnforceFocus" title="link to the prop on this page" class="prop-name">disableEnforceFocus</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not prevent focus from leaving the modal while open.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <a class="anchor-link" id="props--disableEscapeKeyDown"></a><a href="#props--disableEscapeKeyDown" title="link to the prop on this page" class="prop-name">disableEscapeKeyDown</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hitting escape will not fire any callback. |
| <a class="anchor-link" id="props--disablePortal"></a><a href="#props--disablePortal" title="link to the prop on this page" class="prop-name">disablePortal</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <a class="anchor-link" id="props--disableRestoreFocus"></a><a href="#props--disableRestoreFocus" title="link to the prop on this page" class="prop-name">disableRestoreFocus</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not restore focus to previously focused element once modal is hidden. |
| <a class="anchor-link" id="props--disableScrollLock"></a><a href="#props--disableScrollLock" title="link to the prop on this page" class="prop-name">disableScrollLock</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the scroll lock behavior. |
| <a class="anchor-link" id="props--hideBackdrop"></a><a href="#props--hideBackdrop" title="link to the prop on this page" class="prop-name">hideBackdrop</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the backdrop is not rendered. |
| <a class="anchor-link" id="props--keepMounted"></a><a href="#props--keepMounted" title="link to the prop on this page" class="prop-name">keepMounted</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Always keep the children in the DOM. This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Modal. |
| <a class="anchor-link" id="props--onBackdropClick"></a><a href="#props--onBackdropClick" title="link to the prop on this page" class="prop-name">onBackdropClick</a> | <span class="prop-type">func</span> |  | Callback fired when the backdrop is clicked. |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" title="link to the prop on this page" class="prop-name">onClose</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed. The `reason` parameter can optionally be used to control the response to `onClose`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be:`"escapeKeyDown"`, `"backdropClick"`. |
| <a class="anchor-link" id="props--onEscapeKeyDown"></a><a href="#props--onEscapeKeyDown" title="link to the prop on this page" class="prop-name">onEscapeKeyDown</a> | <span class="prop-type">func</span> |  | Callback fired when the escape key is pressed, `disableEscapeKeyDown` is false and the modal is in focus. |
| <a class="anchor-link" id="props--onRendered"></a><a href="#props--onRendered" title="link to the prop on this page" class="prop-name">onRendered</a> | <span class="prop-type">func</span> |  | Callback fired once the children has been mounted into the `container`. It signals that the `open={true}` prop took effect.<br>This prop will be deprecated and removed in v5, the ref can be used instead. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" title="link to the prop on this page" class="prop-name required">open&nbsp;*</a> | <span class="prop-type">bool</span> |  | If `true`, the modal is open. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## Demos

- [Modal](/components/modal/)

