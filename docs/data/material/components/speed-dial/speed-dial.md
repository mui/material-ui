---
product: material-ui
title: React Speed Dial component
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'component: speed dial'
materialDesign: https://m2.material.io/components/buttons-floating-action-button#types-of-transitions
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
---

# Speed Dial

<p class="description">When pressed, a floating action button can display three to six related actions in the form of a Speed Dial.</p>

If more than six actions are needed, something other than a FAB should be used to present them.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic speed dial

The floating action button can display related actions.

{{"demo": "BasicSpeedDial.js"}}

## Playground

{{"demo": "PlaygroundSpeedDial.js"}}

## Controlled speed dial

The open state of the component can be controlled with the `open`/`onOpen`/`onClose` props.

{{"demo": "ControlledOpenSpeedDial.js"}}

## Custom close icon

You can provide an alternate icon for the closed and open states using the `icon` and `openIcon` props
of the `SpeedDialIcon` component.

{{"demo": "OpenIconSpeedDial.js"}}

## Persistent action tooltips

The SpeedDialActions tooltips can be displayed persistently so that users don't have to long-press to see the tooltip on touch devices.

It is enabled here across all devices for demo purposes, but in production it could use the `isTouch` logic to conditionally set the prop.

{{"demo": "SpeedDialTooltipOpen.js"}}

## Accessibility

### ARIA

#### Required

- You should provide an `ariaLabel` for the speed dial component.
- You should provide a `tooltipTitle` for each speed dial action.

#### Provided

- The Fab has `aria-haspopup`, `aria-expanded` and `aria-controls` attributes.
- The speed dial actions container has `role="menu"` and `aria-orientation` set according to the direction.
- The speed dial actions have `role="menuitem"`, and an `aria-describedby` attribute that references the associated tooltip.

### Keyboard

- The speed dial opens on focus.
- The Space and Enter keys trigger the selected speed dial action, and toggle the speed dial open state.
- The cursor keys move focus to the next or previous speed dial action. (Note that any cursor direction can be used initially to open the speed dial. This enables the expected behavior for the actual or perceived orientation of the speed dial, for example for a screen reader user who perceives the speed dial as a drop-down menu.)
- The Escape key closes the speed dial and, if a speed dial action was focused, returns focus to the Fab.
