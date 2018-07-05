---
title: Speed Dial React component
components: SpeedDial, SpeedDialAction, SpeedDialIcon
---

# Speed Dial

<p class="description">When pressed, a floating action button can display three to six related actions in the form of a speed dial.</p>

If more than six actions are needed, something other than a FAB should be used to present them.

## Simple Speed Dial

The floating action button can display related actions.

{{"demo": "pages/lab/speed-dial/SpeedDials.js"}}

## Custom close icon

You can provide an alternate icon for the closed and open states using the `icon` and `openIcon` props
of the `SpeedDialIcon` component.

{{"demo": "pages/lab/speed-dial/OpenIconSpeedDial.js"}}
