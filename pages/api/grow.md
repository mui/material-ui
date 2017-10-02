<!--- This documentation is automatically generated, do not try to edit it. -->

---
filename: /src/transitions/Grow.js
---

# Grow

Grow transition used by popovers such as Menu.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | A single child content element. |
| onEnter | TransitionCallback |  | Callback fired before the component is entering |
| onEntered | TransitionCallback |  | Callback fired when the component has entered |
| onEntering | TransitionCallback |  | Callback fired when the component is entering |
| onExit | TransitionCallback |  | Callback fired before the component is exiting |
| onExited | TransitionCallback |  | Callback fired when the component has exited |
| onExiting | TransitionCallback |  | Callback fired when the component is exiting |
| rootRef | Function |  | Use that property to pass a ref callback to the root component. |
| transitionDuration | union:&nbsp;number<br>&nbsp;{ enter?: number, exit?: number }<br>&nbsp;'auto'<br> | 'auto' | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.<br>Set to 'auto' to automatically calculate transition time based on height. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

