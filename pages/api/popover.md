<!--- This documentation is automatically generated, do not try to edit it. -->

# Popover



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| PaperProps | Object |  | Properties applied to the `Paper` element. |
| anchorEl | Object |  | This is the DOM element that will be used to set the position of the popover. |
| <span style="color: #31a148">anchorOrigin *</span> | signature | {  vertical: 'top',  horizontal: 'left',} | This is the point on the anchor where the popover's `anchorEl` will attach to.<br>Options: vertical: [top, center, bottom]; horizontal: [left, center, right]. |
| <span style="color: #31a148">children *</span> | Node |  | The content of the component. |
| classes | Object |  | Useful to extend the style applied to components. |
| elevation | number | 8 | The elevation of the popover. |
| enteredClassName | string |  | The CSS class name applied while the component is entering |
| enteringClassName | string |  | The CSS class name applied while the component is entering |
| exitedClassName | string |  | The CSS class name applied when the component is exited |
| exitingClassName | string |  | The CSS class name applied while the component is exiting |
| modal | boolean | true | If `true`, the Popover will be rendered as a modal with scroll locking, focus trapping and a clickaway layer beneath |
| onEnter | TransitionCallback |  | Callback fired before the component is entering |
| onEntered | TransitionCallback |  | Callback fired when the component has entered |
| onEntering | TransitionCallback |  | Callback fired when the component is entering |
| onExit | TransitionCallback |  | Callback fired before the component is exiting |
| onExited | TransitionCallback |  | Callback fired when the component has exited |
| onExiting | TransitionCallback |  | Callback fired when the component is exiting |
| onRequestClose | Function |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| open | boolean | false | If `true`, the popover is visible. |
| <span style="color: #31a148">transformOrigin *</span> | signature | {  vertical: 'top',  horizontal: 'left',} | This is the point on the popover which will attach to the anchor's origin.<br>Options: vertical: [top, center, bottom, x(px)]; horizontal: [left, center, right, x(px)]. |
| transitionDuration | union:&nbsp;number<br>&nbsp;'auto'<br> | 'auto' | Set to 'auto' to automatically calculate transition time based on height |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `paper`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiPopover`.

