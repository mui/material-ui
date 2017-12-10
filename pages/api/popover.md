---
filename: /src/Popover/Popover.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Popover



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| PaperProps | Object |  | Properties applied to the `Paper` element. |
| anchorEl | HTMLElement |  | This is the DOM element that may be used to set the position of the popover. |
| anchorOrigin | signature | {  vertical: 'top',  horizontal: 'left',} | This is the point on the anchor where the popover's `anchorEl` will attach to. This is not used when the anchorReference is 'anchorPosition'.<br>Options: vertical: [top, center, bottom]; horizontal: [left, center, right]. |
| anchorPosition | signature |  | This is the position that may be used to set the position of the popover. The coordinates are relative to the application's client area. |
| anchorReference | union:&nbsp;'anchorEl'&nbsp;&#124;<br>&nbsp;'anchorPosition'<br> | 'anchorEl' |  |
| <span style="color: #31a148">children *</span> | Node |  | The content of the component. |
| classes | Object |  | Useful to extend the style applied to components. |
| elevation | number | 8 | The elevation of the popover. |
| getContentAnchorEl | Function |  | This function is called in order to retrieve the content anchor element. It's the opposite of the `anchorEl` property. The content anchor element should be an element inside the popover. It's used to correctly scroll and set the position of the popover. The positioning strategy tries to make the content anchor element just above the anchor element. |
| marginThreshold | number | 16 | Specifies how close to the edge of the window the popover can appear. |
| onClose | Function |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| onEnter | TransitionCallback |  | Callback fired before the component is entering. |
| onEntered | TransitionCallback |  | Callback fired when the component has entered. |
| onEntering | TransitionCallback |  | Callback fired when the component is entering. |
| onExit | TransitionCallback |  | Callback fired before the component is exiting. |
| onExited | TransitionCallback |  | Callback fired when the component has exited. |
| onExiting | TransitionCallback |  | Callback fired when the component is exiting. |
| <span style="color: #31a148">open *</span> | boolean |  | If `true`, the popover is visible. |
| transformOrigin | signature | {  vertical: 'top',  horizontal: 'left',} | This is the point on the popover which will attach to the anchor's origin.<br>Options: vertical: [top, center, bottom, x(px)]; horizontal: [left, center, right, x(px)]. |
| transitionClasses | TransitionClasses |  | The animation classNames applied to the component as it enters or exits. This property is a direct binding to [`CSSTransition.classNames`](https://reactcommunity.org/react-transition-group/#CSSTransition-prop-classNames). |
| transitionDuration | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }&nbsp;&#124;<br>&nbsp;'auto'<br> | 'auto' | Set to 'auto' to automatically calculate transition time based on height. |

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

The properties of the [&lt;Modal /&gt;](/api/modal) component are also available.

## Demos

- [Popovers](/demos/popovers)

