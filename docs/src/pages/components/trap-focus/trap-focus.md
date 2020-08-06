---
title: Trap Focus React component
components: Unstable_TrapFocus
---

# Trap Focus

<p class="description">Trap focus within a DOM node.</p>

`TrapFocus` is a utility component that manages focus for its descendants.
This is useful when implementing overlays like modal dialogs, which should not allow focus to escape while open.

When `open={true}` the trap is enabled, and pressing <kbd>Tab</kbd> or <kbd>Shift+Tab</kbd> will rotate focus within the inner focusable elements of the component.

- 📦 [1.5 kB gzipped](https://material-ui.com/size-snapshot).
- ⚛️ Support portals

## Example

{{"demo": "pages/components/trap-focus/BasicTrapFocus.js"}}

## Disable enforce focus

Clicks within the focus trap behave normally; but clicks outside the focus trap are blocked.

You can disable the behavior with the `disableEnforceFocus` prop.

{{"demo": "pages/components/trap-focus/DisableEnforceFocus.js"}}

## Disable restore focus

The component restores the focus back to the previously focused element when it deactivates, for example back to the button which opened a dialog.

You can disable this behavior with the `disableRestoreFocus` prop.

{{"demo": "pages/components/trap-focus/DisableRestoreFocus.js"}}

## Lazy activation

By default, the component moves the focus to its descendants as soon as it opens: `open={true}`.

You can disable this behavior and make it lazy with the `disableAutoFocus` prop.

{{"demo": "pages/components/trap-focus/LazyTrapFocus.js"}}

## Portal

The following demo uses [`Portal`](/components/portal/) to render a part of the trap focus into a new "subtree" outside of the current DOM hierarchy.

{{"demo": "pages/components/trap-focus/PortalTrapFocus.js"}}
