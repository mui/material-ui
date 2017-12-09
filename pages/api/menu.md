---
filename: /src/Menu/Menu.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Menu



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| MenuListProps | Object |  | Properties applied to the `MenuList` element. |
| PopoverClasses | Object |  | `classes` property applied to the `Popover` element. |
| anchorEl | HTMLElement |  | The DOM element used to set the position of the menu. |
| children | Node |  | Menu contents, normally `MenuItem`s. |
| classes | Object |  | Useful to extend the style applied to components. |
| onClose | Function |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| onEnter | TransitionCallback |  | Callback fired before the Menu enters. |
| onEntered | TransitionCallback |  | Callback fired when the Menu has entered. |
| onEntering | TransitionCallback |  | Callback fired when the Menu is entering. |
| onExit | TransitionCallback |  | Callback fired before the Menu exits. |
| onExited | TransitionCallback |  | Callback fired when the Menu has exited. |
| onExiting | TransitionCallback |  | Callback fired when the Menu is exiting. |
| open | boolean | false | If `true`, the menu is visible. |
| transitionDuration | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }&nbsp;&#124;<br>&nbsp;'auto'<br> | 'auto' | The length of the transition in `ms`, or 'auto' |

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

The properties of the [&lt;Popover /&gt;](/api/popover) component are also available.

## Demos

- [Menus](/demos/menus)

