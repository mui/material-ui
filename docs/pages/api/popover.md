---
filename: /packages/material-ui/src/Popover/Popover.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Popover API

<p class="description">The API documentation of the Popover React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Popover from '@material-ui/core/Popover';
// or
import { Popover } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--action"></a><a href="#props--action" class="prop-name">action</a> | <span class="prop-type">ref</span> |  | A ref for imperative actions. It currently only supports updatePosition() action. |
| <a class="anchor-link" id="props--anchorEl"></a><a href="#props--anchorEl" class="prop-name">anchorEl</a> | <span class="prop-type">object<br>&#124;&nbsp;func</span> |  | This is the DOM element, or a function that returns the DOM element, that may be used to set the position of the popover. |
| <a class="anchor-link" id="props--anchorOrigin"></a><a href="#props--anchorOrigin" class="prop-name">anchorOrigin</a> | <span class="prop-type">{ horizontal: number<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'right', vertical: number<br>&#124;&nbsp;'top'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'bottom' }</span> | <span class="prop-default">{  vertical: 'top',  horizontal: 'left',}</span> | This is the point on the anchor where the popover's `anchorEl` will attach to. This is not used when the anchorReference is 'anchorPosition'.<br>Options: vertical: [top, center, bottom]; horizontal: [left, center, right]. |
| <a class="anchor-link" id="props--anchorPosition"></a><a href="#props--anchorPosition" class="prop-name">anchorPosition</a> | <span class="prop-type">{ left: number, top: number }</span> |  | This is the position that may be used to set the position of the popover. The coordinates are relative to the application's client area. |
| <a class="anchor-link" id="props--anchorReference"></a><a href="#props--anchorReference" class="prop-name">anchorReference</a> | <span class="prop-type">'anchorEl'<br>&#124;&nbsp;'anchorPosition'<br>&#124;&nbsp;'none'</span> | <span class="prop-default">'anchorEl'</span> |  |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--container"></a><a href="#props--container" class="prop-name">container</a> | <span class="prop-type">object<br>&#124;&nbsp;func</span> |  | A node, component instance, or function that returns either. The `container` will passed to the Modal component. By default, it uses the body of the anchorEl's top-level document object, so it's simply `document.body` most of the time. |
| <a class="anchor-link" id="props--elevation"></a><a href="#props--elevation" class="prop-name">elevation</a> | <span class="prop-type">number</span> | <span class="prop-default">8</span> | The elevation of the popover. |
| <a class="anchor-link" id="props--getContentAnchorEl"></a><a href="#props--getContentAnchorEl" class="prop-name">getContentAnchorEl</a> | <span class="prop-type">func</span> |  | This function is called in order to retrieve the content anchor element. It's the opposite of the `anchorEl` prop. The content anchor element should be an element inside the popover. It's used to correctly scroll and set the position of the popover. The positioning strategy tries to make the content anchor element just above the anchor element. |
| <a class="anchor-link" id="props--marginThreshold"></a><a href="#props--marginThreshold" class="prop-name">marginThreshold</a> | <span class="prop-type">number</span> | <span class="prop-default">16</span> | Specifies how close to the edge of the window the popover can appear. |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" class="prop-name">onClose</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be:`"escapeKeyDown"`, `"backdropClick"` |
| <a class="anchor-link" id="props--onEnter"></a><a href="#props--onEnter" class="prop-name">onEnter</a> | <span class="prop-type">func</span> |  | Callback fired before the component is entering. |
| <a class="anchor-link" id="props--onEntered"></a><a href="#props--onEntered" class="prop-name">onEntered</a> | <span class="prop-type">func</span> |  | Callback fired when the component has entered. |
| <a class="anchor-link" id="props--onEntering"></a><a href="#props--onEntering" class="prop-name">onEntering</a> | <span class="prop-type">func</span> |  | Callback fired when the component is entering. |
| <a class="anchor-link" id="props--onExit"></a><a href="#props--onExit" class="prop-name">onExit</a> | <span class="prop-type">func</span> |  | Callback fired before the component is exiting. |
| <a class="anchor-link" id="props--onExited"></a><a href="#props--onExited" class="prop-name">onExited</a> | <span class="prop-type">func</span> |  | Callback fired when the component has exited. |
| <a class="anchor-link" id="props--onExiting"></a><a href="#props--onExiting" class="prop-name">onExiting</a> | <span class="prop-type">func</span> |  | Callback fired when the component is exiting. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" class="prop-name required">open&nbsp;*</a> | <span class="prop-type">bool</span> |  | If `true`, the popover is visible. |
| <a class="anchor-link" id="props--PaperProps"></a><a href="#props--PaperProps" class="prop-name">PaperProps</a> | <span class="prop-type">{ component?: element type }</span> | <span class="prop-default">{}</span> | Props applied to the [`Paper`](/api/paper/) element. |
| <a class="anchor-link" id="props--transformOrigin"></a><a href="#props--transformOrigin" class="prop-name">transformOrigin</a> | <span class="prop-type">{ horizontal: number<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'right', vertical: number<br>&#124;&nbsp;'top'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'bottom' }</span> | <span class="prop-default">{  vertical: 'top',  horizontal: 'left',}</span> | This is the point on the popover which will attach to the anchor's origin.<br>Options: vertical: [top, center, bottom, x(px)]; horizontal: [left, center, right, x(px)]. |
| <a class="anchor-link" id="props--TransitionComponent"></a><a href="#props--TransitionComponent" class="prop-name">TransitionComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Grow</span> | The component used for the transition. |
| <a class="anchor-link" id="props--transitionDuration"></a><a href="#props--transitionDuration" class="prop-name">transitionDuration</a> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }<br>&#124;&nbsp;'auto'</span> | <span class="prop-default">'auto'</span> | Set to 'auto' to automatically calculate transition time based on height. |
| <a class="anchor-link" id="props--TransitionProps"></a><a href="#props--TransitionProps" class="prop-name">TransitionProps</a> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Modal](/api/modal/)).

## CSS

- Style sheet name: `MuiPopover`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiPopover-root</span> | Styles applied to the root element
| <a class="anchor-link" id="css--paper"></a><a href="#css--paper" class="prop-name">paper</a> | <span class="prop-name">.MuiPopover-paper</span> | Styles applied to the `Paper` component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Popover/Popover.js) for more detail.

## Inheritance

The props of the [Modal](/api/modal/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Menus](/components/menus/)
- [Popover](/components/popover/)

