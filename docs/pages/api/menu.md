---
filename: /packages/material-ui/src/Menu/Menu.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Menu API

<p class="description">The API documentation of the Menu React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Menu from '@material-ui/core/Menu';
// or
import { Menu } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--anchorEl"></a><a href="#props--anchorEl" class="prop-name">anchorEl</a> | <span class="prop-type">object<br>&#124;&nbsp;func</span> |  | The DOM element used to set the position of the menu. |
| <a class="anchor-link" id="props--autoFocus"></a><a href="#props--autoFocus" class="prop-name">autoFocus</a> | <span class="prop-type">bool</span> | <span class="prop-default">true</span> | If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled children are not focusable. If you set this prop to `false` focus will be placed on the parent modal container. This has severe accessibility implications and should only be considered if you manage focus otherwise. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | Menu contents, normally `MenuItem`s. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--disableAutoFocusItem"></a><a href="#props--disableAutoFocusItem" class="prop-name">disableAutoFocusItem</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | When opening the menu will not focus the active item but the `[role="menu"]` unless `autoFocus` is also set to `false`. Not using the default means not following WAI-ARIA authoring practices. Please be considerate about possible accessibility implications. |
| <a class="anchor-link" id="props--MenuListProps"></a><a href="#props--MenuListProps" class="prop-name">MenuListProps</a> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`MenuList`](/api/menu-list/) element. |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" class="prop-name">onClose</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be:`"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`. |
| <a class="anchor-link" id="props--onEnter"></a><a href="#props--onEnter" class="prop-name">onEnter</a> | <span class="prop-type">func</span> |  | Callback fired before the Menu enters. |
| <a class="anchor-link" id="props--onEntered"></a><a href="#props--onEntered" class="prop-name">onEntered</a> | <span class="prop-type">func</span> |  | Callback fired when the Menu has entered. |
| <a class="anchor-link" id="props--onEntering"></a><a href="#props--onEntering" class="prop-name">onEntering</a> | <span class="prop-type">func</span> |  | Callback fired when the Menu is entering. |
| <a class="anchor-link" id="props--onExit"></a><a href="#props--onExit" class="prop-name">onExit</a> | <span class="prop-type">func</span> |  | Callback fired before the Menu exits. |
| <a class="anchor-link" id="props--onExited"></a><a href="#props--onExited" class="prop-name">onExited</a> | <span class="prop-type">func</span> |  | Callback fired when the Menu has exited. |
| <a class="anchor-link" id="props--onExiting"></a><a href="#props--onExiting" class="prop-name">onExiting</a> | <span class="prop-type">func</span> |  | Callback fired when the Menu is exiting. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" class="prop-name required">open&nbsp;*</a> | <span class="prop-type">bool</span> |  | If `true`, the menu is visible. |
| <a class="anchor-link" id="props--PopoverClasses"></a><a href="#props--PopoverClasses" class="prop-name">PopoverClasses</a> | <span class="prop-type">object</span> |  | `classes` prop applied to the [`Popover`](/api/popover/) element. |
| <a class="anchor-link" id="props--transitionDuration"></a><a href="#props--transitionDuration" class="prop-name">transitionDuration</a> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }<br>&#124;&nbsp;'auto'</span> | <span class="prop-default">'auto'</span> | The length of the transition in `ms`, or 'auto' |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" class="prop-name">variant</a> | <span class="prop-type">'menu'<br>&#124;&nbsp;'selectedMenu'</span> | <span class="prop-default">'selectedMenu'</span> | The variant to use. Use `menu` to prevent selected items from impacting the initial focus and the vertical alignment relative to the anchor element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Popover](/api/popover/)).

## CSS

- Style sheet name: `MuiMenu`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--paper"></a><a href="#css--paper" class="prop-name">paper</a> | <span class="prop-name">.MuiMenu-paper</span> | Styles applied to the `Paper` component.
| <a class="anchor-link" id="css--list"></a><a href="#css--list" class="prop-name">list</a> | <span class="prop-name">.MuiMenu-list</span> | Styles applied to the `List` component via `MenuList`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Menu/Menu.js) for more detail.

## Inheritance

The props of the [Popover](/api/popover/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [App Bar](/components/app-bar/)
- [Menus](/components/menus/)

