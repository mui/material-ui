---
filename: /src/SpeedDial/SpeedDial.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SpeedDial



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| ButtonProps | object |  | Properties applied to the `Button` element. |
| <span style="color: #31a148">children *</span> | node |  | SpeedDialActions to display when the SpeedDial is `open`. |
| classes | object |  | Useful to extend the style applied to components. |
| hidden | bool | false | If `true`, the SpeedDial will be hidden. |
| icon | node |  | The Icon to display in the SpeedDial Floating Action Button. |
| <span style="color: #31a148">label *</span> | string |  | The aria-label of the `Button` element. Also used to provide an `id` for the `SpeedDial` element and its children; if more than one `SpeedDial` is mounted, their labels must be unique. |
| onClose | func |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object, key: string) => void`<br>*event:* The event source of the callback<br>*key:* The key pressed |
| open | bool | false | If `true`, the SpeedDial is open. |
| openIcon | node |  | The Icon to display in the SpeedDial Floating Action Button when the SpeedDial is open. |
| SpeedDialIconProps | object |  | Properties applied to the `SpeedDialIcon` element. |
| transition | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | Fade | Transition component. |
| transitionDuration | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}<br> | {  enter: duration.enteringScreen,  exit: duration.leavingScreen,} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## Demos

- [Buttons](/demos/buttons)

