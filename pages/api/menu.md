---
filename: /packages/material-ui/src/Menu/Menu.js
title: Menu API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Menu

<p class="description">The API documentation of the Menu React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">anchorEl</span> | <span class="prop-type">union:&nbsp;object&nbsp;&#124;<br>&nbsp;func<br> |   | The DOM element used to set the position of the menu. |
| <span class="prop-name">children</span> | <span class="prop-type">node |   | Menu contents, normally `MenuItem`s. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">disableAutoFocusItem</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the selected / first menu item will not be auto focused. |
| <span class="prop-name">MenuListProps</span> | <span class="prop-type">object |   | Properties applied to the [`MenuList`](/api/menu-list) element. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func |   | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">onEnter</span> | <span class="prop-type">func |   | Callback fired before the Menu enters. |
| <span class="prop-name">onEntered</span> | <span class="prop-type">func |   | Callback fired when the Menu has entered. |
| <span class="prop-name">onEntering</span> | <span class="prop-type">func |   | Callback fired when the Menu is entering. |
| <span class="prop-name">onExit</span> | <span class="prop-type">func |   | Callback fired before the Menu exits. |
| <span class="prop-name">onExited</span> | <span class="prop-type">func |   | Callback fired when the Menu has exited. |
| <span class="prop-name">onExiting</span> | <span class="prop-type">func |   | Callback fired when the Menu is exiting. |
| <span class="prop-name required">open *</span> | <span class="prop-type">bool |   | If `true`, the menu is visible. |
| <span class="prop-name">PopoverClasses</span> | <span class="prop-type">object |   | `classes` property applied to the `Popover` element. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br> | <span class="prop-default">'auto'</span> | The length of the transition in `ms`, or 'auto' |

Any other properties supplied will be spread to the root element ([Popover](/api/popover)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">paper</span> | Styles applied to the `Paper` component.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Menu/Menu.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiMenu`.

## Inheritance

The properties of the [Popover](/api/popover) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Menus](/demos/menus)

