---
filename: /src/Menu/Menu.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Menu



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| anchorEl | object |  | The DOM element used to set the position of the menu. |
| children | node |  | Menu contents, normally `MenuItem`s. |
| classes | object |  | Useful to extend the style applied to components. |
| MenuListProps | object |  | Properties applied to the `MenuList` element. |
| onClose | func |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| onEnter | func |  | Callback fired before the Menu enters. |
| onEntered | func |  | Callback fired when the Menu has entered. |
| onEntering | func |  | Callback fired when the Menu is entering. |
| onExit | func |  | Callback fired before the Menu exits. |
| onExited | func |  | Callback fired when the Menu has exited. |
| onExiting | func |  | Callback fired when the Menu is exiting. |
| <span style="color: #31a148">open *</span> | bool |  | If `true`, the menu is visible. |
| PopoverClasses | object |  | `classes` property applied to the `Popover` element. |
| transitionDuration | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br> | 'auto' | The length of the transition in `ms`, or 'auto' |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `paper`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Menu/Menu.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiMenu`.

## Inheritance

The properties of the [Popover](/api/popover) component are also available.

## Demos

- [Menus](/demos/menus)

