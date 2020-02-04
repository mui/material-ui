---
title: Speed Dial React component
components: SpeedDial, SpeedDialAction, SpeedDialIcon
---

# Speed Dial

<p class="description">When pressed, a floating action button can display three to six related actions in the form of a speed dial.</p>

If more than six actions are needed, something other than a FAB should be used to present them.

## Simple Speed Dial

The floating action button can display related actions.

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## Custom close icon

You can provide an alternate icon for the closed and open states using the `icon` and `openIcon` props
of the `SpeedDialIcon` component.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## Persistent action tooltips

The SpeedDialActions tooltips can be be displayed persistently so that users don't have to long-press in order to see the tooltip on touch devices.

It is enabled here across all devices for demo purposes, but in production it could use the `isTouch` logic to conditionally set the property.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}
