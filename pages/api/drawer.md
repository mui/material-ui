---
filename: /src/Drawer/Drawer.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Drawer



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| ModalProps | Object |  | Properties applied to the `Modal` element. |
| SlideProps | Object |  | Properties applied to the `Slide` element. |
| <span style="color: #31a148">anchor *</span> | union:&nbsp;'left'&nbsp;&#124;<br>&nbsp;'top'&nbsp;&#124;<br>&nbsp;'right'&nbsp;&#124;<br>&nbsp;'bottom'<br> | 'left' | Side from which the drawer will appear. |
| <span style="color: #31a148">children *</span> | Node |  | The contents of the drawer. |
| classes | Object |  | Useful to extend the style applied to components. |
| <span style="color: #31a148">elevation *</span> | number | 16 | The elevation of the drawer. |
| onRequestClose | Function |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span style="color: #31a148">open *</span> | boolean | false | If `true`, the drawer is open. |
| <span style="color: #31a148">transitionDuration *</span> | TransitionDuration | {  enter: duration.enteringScreen,  exit: duration.leavingScreen,} | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <span style="color: #31a148">type *</span> | union:&nbsp;'permanent'&nbsp;&#124;<br>&nbsp;'persistent'&nbsp;&#124;<br>&nbsp;'temporary'<br> | 'temporary' | The type of drawer. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `docked`
- `paper`
- `paperAnchorLeft`
- `paperAnchorRight`
- `paperAnchorTop`
- `paperAnchorBottom`
- `paperAnchorDockedLeft`
- `paperAnchorDockedTop`
- `paperAnchorDockedRight`
- `paperAnchorDockedBottom`
- `modal`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/callemall/material-ui/tree/v1-beta/src/Drawer/Drawer.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiDrawer`.

## Inheritance

The properties of the [&lt;Modal /&gt;](/api/modal) component are also available.

## Demos

- [Drawers](/demos/drawers)

