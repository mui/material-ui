---
title: Modal React component
components: Modal
---

# Modals

<p class="description">The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.</p>

The component renders its `children` node in front of a backdrop component.

The `Modal` offers a few helpful features over using just a [`Portal`](/utils/portal)
component and some styles:
- Manages dialog stacking when one-at-a-time just isn't enough.
- Creates a backdrop, for disabling interaction below the modal.
- It properly manages focus; moving to the modal content,
  and keeping it there until the modal is closed.
- It disables scrolling of the page content while open.
- Adds the appropriate ARIA roles are automatically.

This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).

## Simple modal

{{"demo": "pages/utils/modals/SimpleModal.js"}}
