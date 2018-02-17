---
filename: /src/Popover/Popover.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Popover



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| action | func |  | This is callback property. It's called by the component on mount. This is useful when you want to trigger an action programmatically. It currently only supports updatePosition() action.<br><br>**Signature:**<br>`function(actions: object) => void`<br>*actions:* This object contains all posible actions that can be triggered programmatically. |
| anchorEl | object |  | This is the DOM element that may be used to set the position of the popover. |
| anchorOrigin | {horizontal?: union:&nbsp;number&nbsp;&#124;<br>&nbsp;enum:&nbsp;'left'&nbsp;&#124;<br>&nbsp;'center'&nbsp;&#124;<br>&nbsp;'right'<br><br>, vertical?: union:&nbsp;number&nbsp;&#124;<br>&nbsp;enum:&nbsp;'top'&nbsp;&#124;<br>&nbsp;'center'&nbsp;&#124;<br>&nbsp;'bottom'<br><br>} | {  vertical: 'top',  horizontal: 'left',} | This is the point on the anchor where the popover's `anchorEl` will attach to. This is not used when the anchorReference is 'anchorPosition'.<br>Options: vertical: [top, center, bottom]; horizontal: [left, center, right]. |
| anchorPosition | {top?: number, left?: number} |  | This is the position that may be used to set the position of the popover. The coordinates are relative to the application's client area. |
| anchorReference | enum:&nbsp;'anchorEl'&nbsp;&#124;<br>&nbsp;'anchorPosition'<br> | 'anchorEl' |  |
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| container | union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br> |  | A node, component instance, or function that returns either. The `container` will passed to the Modal component. By default, it's using the body of the anchorEl's top-level document object, so it's simply `document.body` most of the time. |
| elevation | number | 8 | The elevation of the popover. |
| getContentAnchorEl | func |  | This function is called in order to retrieve the content anchor element. It's the opposite of the `anchorEl` property. The content anchor element should be an element inside the popover. It's used to correctly scroll and set the position of the popover. The positioning strategy tries to make the content anchor element just above the anchor element. |
| marginThreshold | number | 16 | Specifies how close to the edge of the window the popover can appear. |
| onClose | func |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| onEnter | func |  | Callback fired before the component is entering. |
| onEntered | func |  | Callback fired when the component has entered. |
| onEntering | func |  | Callback fired when the component is entering. |
| onExit | func |  | Callback fired before the component is exiting. |
| onExited | func |  | Callback fired when the component has exited. |
| onExiting | func |  | Callback fired when the component is exiting. |
| <span style="color: #31a148">open *</span> | bool |  | If `true`, the popover is visible. |
| PaperProps | object |  | Properties applied to the `Paper` element. |
| transformOrigin | {horizontal?: union:&nbsp;number&nbsp;&#124;<br>&nbsp;enum:&nbsp;'left'&nbsp;&#124;<br>&nbsp;'center'&nbsp;&#124;<br>&nbsp;'right'<br><br>, vertical?: union:&nbsp;number&nbsp;&#124;<br>&nbsp;enum:&nbsp;'top'&nbsp;&#124;<br>&nbsp;'center'&nbsp;&#124;<br>&nbsp;'bottom'<br><br>} | {  vertical: 'top',  horizontal: 'left',} | This is the point on the popover which will attach to the anchor's origin.<br>Options: vertical: [top, center, bottom, x(px)]; horizontal: [left, center, right, x(px)]. |
| transition | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | Grow | Transition component. |
| transitionDuration | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br> | 'auto' | Set to 'auto' to automatically calculate transition time based on height. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `paper`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Popover/Popover.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiPopover`.

## Inheritance

The properties of the [Modal](/api/modal) component are also available.

## Demos

- [Popovers](/utils/popovers)

