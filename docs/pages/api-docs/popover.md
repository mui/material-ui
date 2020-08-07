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



## Component name

The `MuiPopover` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">ref</span> |  | A ref for imperative actions. It currently only supports updatePosition() action. |
| <span class="prop-name">anchorEl</span> | <span class="prop-type">HTML element<br>&#124;&nbsp;func</span> |  | A HTML element, or a function that returns it. It's used to set the position of the popover. |
| <span class="prop-name">anchorOrigin</span> | <span class="prop-type">{ horizontal: 'center'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;number, vertical: 'bottom'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'top'<br>&#124;&nbsp;number }</span> | <span class="prop-default">{  vertical: 'top',  horizontal: 'left',}</span> | This is the point on the anchor where the popover's `anchorEl` will attach to. This is not used when the anchorReference is 'anchorPosition'.<br>Options: vertical: [top, center, bottom]; horizontal: [left, center, right]. |
| <span class="prop-name">anchorPosition</span> | <span class="prop-type">{ left: number, top: number }</span> |  | This is the position that may be used to set the position of the popover. The coordinates are relative to the application's client area. |
| <span class="prop-name">anchorReference</span> | <span class="prop-type">'anchorEl'<br>&#124;&nbsp;'anchorPosition'<br>&#124;&nbsp;'none'</span> | <span class="prop-default">'anchorEl'</span> | This determines which anchor prop to refer to to set the position of the popover. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">container</span> | <span class="prop-type">HTML element<br>&#124;&nbsp;React.Component<br>&#124;&nbsp;func</span> |  | A HTML element, component instance, or function that returns either. The `container` will passed to the Modal component.<br>By default, it uses the body of the anchorEl's top-level document object, so it's simply `document.body` most of the time. |
| <span class="prop-name">elevation</span> | <span class="prop-type">number</span> | <span class="prop-default">8</span> | The elevation of the popover. |
| <span class="prop-name">getContentAnchorEl</span> | <span class="prop-type">func</span> |  | This function is called in order to retrieve the content anchor element. It's the opposite of the `anchorEl` prop. The content anchor element should be an element inside the popover. It's used to correctly scroll and set the position of the popover. The positioning strategy tries to make the content anchor element just above the anchor element. |
| <span class="prop-name">marginThreshold</span> | <span class="prop-type">number</span> | <span class="prop-default">16</span> | Specifies how close to the edge of the window the popover can appear. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed. |
| <span class="prop-name">onEnter</span> | <span class="prop-type">func</span> |  | Callback fired before the component is entering. |
| <span class="prop-name">onEntered</span> | <span class="prop-type">func</span> |  | Callback fired when the component has entered. |
| <span class="prop-name">onEntering</span> | <span class="prop-type">func</span> |  | Callback fired when the component is entering. |
| <span class="prop-name">onExit</span> | <span class="prop-type">func</span> |  | Callback fired before the component is exiting. |
| <span class="prop-name">onExited</span> | <span class="prop-type">func</span> |  | Callback fired when the component has exited. |
| <span class="prop-name">onExiting</span> | <span class="prop-type">func</span> |  | Callback fired when the component is exiting. |
| <span class="prop-name required">open<abbr title="required">*</abbr></span> | <span class="prop-type">bool</span> |  | If `true`, the popover is visible. |
| <span class="prop-name">PaperProps</span> | <span class="prop-type">{ component?: element type }</span> | <span class="prop-default">{}</span> | Props applied to the [`Paper`](/api/paper/) element. |
| <span class="prop-name">transformOrigin</span> | <span class="prop-type">{ horizontal: 'center'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;number, vertical: 'bottom'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'top'<br>&#124;&nbsp;number }</span> | <span class="prop-default">{  vertical: 'top',  horizontal: 'left',}</span> | This is the point on the popover which will attach to the anchor's origin.<br>Options: vertical: [top, center, bottom, x(px)]; horizontal: [left, center, right, x(px)]. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Grow</span> | The component used for the transition. [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">'auto'<br>&#124;&nbsp;number<br>&#124;&nbsp;{ appear?: number, enter?: number, exit?: number }</span> | <span class="prop-default">'auto'</span> | Set to 'auto' to automatically calculate transition time based on height. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Modal](/api/modal/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiPopover-root</span> | Styles applied to the root element.
| <span class="prop-name">paper</span> | <span class="prop-name">.MuiPopover-paper</span> | Styles applied to the `Paper` component.

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

