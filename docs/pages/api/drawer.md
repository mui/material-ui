---
filename: /packages/material-ui/src/Drawer/Drawer.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Drawer API

<p class="description">The API documentation of the Drawer React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Drawer from '@material-ui/core/Drawer';
// or
import { Drawer } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

The props of the [Modal](/api/modal/) component are available
when `variant="temporary"` is set.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--anchor"></a><a href="#props--anchor" title="link to the prop on this page" class="prop-name">anchor</a> | <span class="prop-type">'left'<br>&#124;&nbsp;'top'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'bottom'</span> | <span class="prop-default">'left'</span> | Side from which the drawer will appear. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The contents of the drawer. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--elevation"></a><a href="#props--elevation" title="link to the prop on this page" class="prop-name">elevation</a> | <span class="prop-type">number</span> | <span class="prop-default">16</span> | The elevation of the drawer. |
| <a class="anchor-link" id="props--ModalProps"></a><a href="#props--ModalProps" title="link to the prop on this page" class="prop-name">ModalProps</a> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Modal`](/api/modal/) element. |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" title="link to the prop on this page" class="prop-name">onClose</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" title="link to the prop on this page" class="prop-name">open</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the drawer is open. |
| <a class="anchor-link" id="props--PaperProps"></a><a href="#props--PaperProps" title="link to the prop on this page" class="prop-name">PaperProps</a> | <span class="prop-type">object</span> |  | Props applied to the [`Paper`](/api/paper/) element. |
| <a class="anchor-link" id="props--SlideProps"></a><a href="#props--SlideProps" title="link to the prop on this page" class="prop-name">SlideProps</a> | <span class="prop-type">object</span> |  | Props applied to the [`Slide`](/api/slide/) element. |
| <a class="anchor-link" id="props--transitionDuration"></a><a href="#props--transitionDuration" title="link to the prop on this page" class="prop-name">transitionDuration</a> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }</span> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'permanent'<br>&#124;&nbsp;'persistent'<br>&#124;&nbsp;'temporary'</span> | <span class="prop-default">'temporary'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiDrawer`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiDrawer-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--docked"></a><a href="#css--docked" class="prop-name">docked</a> | <span class="prop-name">.MuiDrawer-docked</span> | Styles applied to the root element if `variant="permanent or persistent"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paper"></a><a href="#css--paper" class="prop-name">paper</a> | <span class="prop-name">.MuiDrawer-paper</span> | Styles applied to the `Paper` component.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperAnchorLeft"></a><a href="#css--paperAnchorLeft" class="prop-name">paperAnchorLeft</a> | <span class="prop-name">.MuiDrawer-paperAnchorLeft</span> | Styles applied to the `Paper` component if `anchor="left"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperAnchorRight"></a><a href="#css--paperAnchorRight" class="prop-name">paperAnchorRight</a> | <span class="prop-name">.MuiDrawer-paperAnchorRight</span> | Styles applied to the `Paper` component if `anchor="right"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperAnchorTop"></a><a href="#css--paperAnchorTop" class="prop-name">paperAnchorTop</a> | <span class="prop-name">.MuiDrawer-paperAnchorTop</span> | Styles applied to the `Paper` component if `anchor="top"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperAnchorBottom"></a><a href="#css--paperAnchorBottom" class="prop-name">paperAnchorBottom</a> | <span class="prop-name">.MuiDrawer-paperAnchorBottom</span> | Styles applied to the `Paper` component if `anchor="bottom"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperAnchorDockedLeft"></a><a href="#css--paperAnchorDockedLeft" class="prop-name">paperAnchorDockedLeft</a> | <span class="prop-name">.MuiDrawer-paperAnchorDockedLeft</span> | Styles applied to the `Paper` component if `anchor="left"` and `variant` is not "temporary".
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperAnchorDockedTop"></a><a href="#css--paperAnchorDockedTop" class="prop-name">paperAnchorDockedTop</a> | <span class="prop-name">.MuiDrawer-paperAnchorDockedTop</span> | Styles applied to the `Paper` component if `anchor="top"` and `variant` is not "temporary".
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperAnchorDockedRight"></a><a href="#css--paperAnchorDockedRight" class="prop-name">paperAnchorDockedRight</a> | <span class="prop-name">.MuiDrawer-paperAnchorDockedRight</span> | Styles applied to the `Paper` component if `anchor="right"` and `variant` is not "temporary".
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperAnchorDockedBottom"></a><a href="#css--paperAnchorDockedBottom" class="prop-name">paperAnchorDockedBottom</a> | <span class="prop-name">.MuiDrawer-paperAnchorDockedBottom</span> | Styles applied to the `Paper` component if `anchor="bottom"` and `variant` is not "temporary".
| <a class="anchor-link" title="link to the rule name on this page" id="css--modal"></a><a href="#css--modal" class="prop-name">modal</a> | <span class="prop-name">.MuiDrawer-modal</span> | Styles applied to the `Modal` component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Drawer/Drawer.js) for more detail.

## Demos

- [Drawers](/components/drawers/)

