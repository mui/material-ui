---
filename: /packages/material-ui/src/Drawer/Drawer.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Drawer

The properties of the [Modal](/api/modal) component are available
when `variant="temporary"` is set.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">anchor</span> | <span class="prop-type">enum:&nbsp;'left'&nbsp;&#124;<br>&nbsp;'top'&nbsp;&#124;<br>&nbsp;'right'&nbsp;&#124;<br>&nbsp;'bottom'<br> | <span class="prop-default">'left'</span> | Side from which the drawer will appear. |
| <span class="prop-name">children</span> | <span class="prop-type">node |  | The contents of the drawer. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">elevation</span> | <span class="prop-type">number | <span class="prop-default">16</span> | The elevation of the drawer. |
| <span class="prop-name">ModalProps</span> | <span class="prop-type">object |  | Properties applied to the `Modal` element. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">open</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the drawer is open. |
| <span class="prop-name">PaperProps</span> | <span class="prop-type">object |  | Properties applied to the `Paper` element. |
| <span class="prop-name">SlideProps</span> | <span class="prop-type">object |  | Properties applied to the `Slide` element. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}<br> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'permanent'&nbsp;&#124;<br>&nbsp;'persistent'&nbsp;&#124;<br>&nbsp;'temporary'<br> | <span class="prop-default">'temporary'</span> | The variant of drawer. |

Any other properties supplied will be spread to the root element (native element).

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
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Drawer/Drawer.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiDrawer`.

## Demos

- [Drawers](/demos/drawers)

