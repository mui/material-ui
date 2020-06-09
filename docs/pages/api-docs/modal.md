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
| <span class="prop-name">BackdropComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">SimpleBackdrop</span> | A backdrop component. This prop enables custom backdrop rendering. |
| <span class="prop-name">BackdropProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Backdrop`](/api/backdrop/) element. |
| <span class="prop-name required">children<abbr title="required">*</abbr></span> | <span class="prop-type">element</span> |  | A single child content element.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <span class="prop-name">closeAfterTransition</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | When set to true the Modal waits until a nested Transition is completed before closing. |
| <span class="prop-name">container</span> | <span class="prop-type">HTML element<br>&#124;&nbsp;React.Component<br>&#124;&nbsp;func</span> |  | A HTML element, component instance, or function that returns either. The `container` will have the portal children appended to it.<br>By default, it uses the body of the top-level document object, so it's simply `document.body` most of the time. |
| <span class="prop-name">disableAutoFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not automatically shift focus to itself when it opens, and replace it to the last focused element when it closes. This also works correctly with any modal children that have the `disableAutoFocus` prop.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableBackdropClick</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clicking the backdrop will not fire `onClose`. |
| <span class="prop-name">disableEnforceFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not prevent focus from leaving the modal while open.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableEscapeKeyDown</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hitting escape will not fire `onClose`. |
| <span class="prop-name">disablePortal</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <span class="prop-name">disableRestoreFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not restore focus to previously focused element once modal is hidden. |
| <span class="prop-name">disableScrollLock</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the scroll lock behavior. |
| <span class="prop-name">hideBackdrop</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the backdrop is not rendered. |
| <span class="prop-name">keepMounted</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Always keep the children in the DOM. This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Modal. |
| <span class="prop-name">onBackdropClick</span> | <span class="prop-type">func</span> |  | Callback fired when the backdrop is clicked. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed. The `reason` parameter can optionally be used to control the response to `onClose`.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be: `"escapeKeyDown"`, `"backdropClick"`. |
| <span class="prop-name">onEscapeKeyDown</span> | <span class="prop-type">func</span> |  | Callback fired when the escape key is pressed, `disableEscapeKeyDown` is false and the modal is in focus. |
| <span class="prop-name">onRendered</span> | <span class="prop-type">func</span> |  | Callback fired once the children has been mounted into the `container`. It signals that the `open={true}` prop took effect.<br>This prop will be deprecated and removed in v5, the ref can be used instead. |
| <span class="prop-name required">open<abbr title="required">*</abbr></span> | <span class="prop-type">bool</span> |  | If `true`, the modal is open. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## Demos

- [Modal](/components/modal/)

