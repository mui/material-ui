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

## Component name

The `MuiDrawer` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">anchor</span> | <span class="prop-type">'bottom'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'top'</span> | <span class="prop-default">'left'</span> | Side from which the drawer will appear. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The contents of the drawer. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">elevation</span> | <span class="prop-type">number</span> | <span class="prop-default">16</span> | The elevation of the drawer. |
| <span class="prop-name">ModalProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Modal`](/api/modal/) element. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">open</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the drawer is open. |
| <span class="prop-name">PaperProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Paper`](/api/paper/) element. |
| <span class="prop-name">SlideProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Slide`](/api/slide/) element. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">number<br>&#124;&nbsp;{ appear?: number, enter?: number, exit?: number }</span> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <span class="prop-name">variant</span> | <span class="prop-type">'permanent'<br>&#124;&nbsp;'persistent'<br>&#124;&nbsp;'temporary'</span> | <span class="prop-default">'temporary'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiDrawer-root</span> | Styles applied to the root element.
| <span class="prop-name">docked</span> | <span class="prop-name">.MuiDrawer-docked</span> | Styles applied to the root element if `variant="permanent or persistent"`.
| <span class="prop-name">paper</span> | <span class="prop-name">.MuiDrawer-paper</span> | Styles applied to the `Paper` component.
| <span class="prop-name">paperAnchorLeft</span> | <span class="prop-name">.MuiDrawer-paperAnchorLeft</span> | Styles applied to the `Paper` component if `anchor="left"`.
| <span class="prop-name">paperAnchorRight</span> | <span class="prop-name">.MuiDrawer-paperAnchorRight</span> | Styles applied to the `Paper` component if `anchor="right"`.
| <span class="prop-name">paperAnchorTop</span> | <span class="prop-name">.MuiDrawer-paperAnchorTop</span> | Styles applied to the `Paper` component if `anchor="top"`.
| <span class="prop-name">paperAnchorBottom</span> | <span class="prop-name">.MuiDrawer-paperAnchorBottom</span> | Styles applied to the `Paper` component if `anchor="bottom"`.
| <span class="prop-name">paperAnchorDockedLeft</span> | <span class="prop-name">.MuiDrawer-paperAnchorDockedLeft</span> | Styles applied to the `Paper` component if `anchor="left"` and `variant` is not "temporary".
| <span class="prop-name">paperAnchorDockedTop</span> | <span class="prop-name">.MuiDrawer-paperAnchorDockedTop</span> | Styles applied to the `Paper` component if `anchor="top"` and `variant` is not "temporary".
| <span class="prop-name">paperAnchorDockedRight</span> | <span class="prop-name">.MuiDrawer-paperAnchorDockedRight</span> | Styles applied to the `Paper` component if `anchor="right"` and `variant` is not "temporary".
| <span class="prop-name">paperAnchorDockedBottom</span> | <span class="prop-name">.MuiDrawer-paperAnchorDockedBottom</span> | Styles applied to the `Paper` component if `anchor="bottom"` and `variant` is not "temporary".
| <span class="prop-name">modal</span> | <span class="prop-name">.MuiDrawer-modal</span> | Styles applied to the `Modal` component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Drawer/Drawer.js) for more detail.

## Demos

- [Drawers](/components/drawers/)

