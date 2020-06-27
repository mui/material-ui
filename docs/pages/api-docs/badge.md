---
filename: /packages/material-ui/src/Badge/Badge.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Badge API

<p class="description">The API documentation of the Badge React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Badge from '@material-ui/core/Badge';
// or
import { Badge } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiBadge` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">anchorOrigin</span> | <span class="prop-type">{ horizontal: 'left'<br>&#124;&nbsp;'right', vertical: 'bottom'<br>&#124;&nbsp;'top' }</span> | <span class="prop-default">{  vertical: 'top',  horizontal: 'right',}</span> | The anchor of the badge. |
| <span class="prop-name">badgeContent</span> | <span class="prop-type">node</span> |  | The content rendered within the badge. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The badge will be added relative to this node. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'error'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">invisible</span> | <span class="prop-type">bool</span> |  | If `true`, the badge will be invisible. |
| <span class="prop-name">max</span> | <span class="prop-type">number</span> | <span class="prop-default">99</span> | Max count to show. |
| <span class="prop-name">overlap</span> | <span class="prop-type">'circle'<br>&#124;&nbsp;'rectangle'</span> | <span class="prop-default">'rectangle'</span> | Wrapped shape the badge should overlap. |
| <span class="prop-name">showZero</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Controls whether the badge is hidden when `badgeContent` is zero. |
| <span class="prop-name">variant</span> | <span class="prop-type">'dot'<br>&#124;&nbsp;'standard'</span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiBadge-root</span> | Styles applied to the root element.
| <span class="prop-name">badge</span> | <span class="prop-name">.MuiBadge-badge</span> | Styles applied to the badge `span` element.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiBadge-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiBadge-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">colorError</span> | <span class="prop-name">.MuiBadge-colorError</span> | Styles applied to the root element if `color="error"`.
| <span class="prop-name">dot</span> | <span class="prop-name">.MuiBadge-dot</span> | Styles applied to the root element if `variant="dot"`.
| <span class="prop-name">anchorOriginTopRightRectangle</span> | <span class="prop-name">.MuiBadge-anchorOriginTopRightRectangle</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangle"`.
| <span class="prop-name">anchorOriginBottomRightRectangle</span> | <span class="prop-name">.MuiBadge-anchorOriginBottomRightRectangle</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangle"`.
| <span class="prop-name">anchorOriginTopLeftRectangle</span> | <span class="prop-name">.MuiBadge-anchorOriginTopLeftRectangle</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangle"`.
| <span class="prop-name">anchorOriginBottomLeftRectangle</span> | <span class="prop-name">.MuiBadge-anchorOriginBottomLeftRectangle</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangle"`.
| <span class="prop-name">anchorOriginTopRightCircle</span> | <span class="prop-name">.MuiBadge-anchorOriginTopRightCircle</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="circle"`.
| <span class="prop-name">anchorOriginBottomRightCircle</span> | <span class="prop-name">.MuiBadge-anchorOriginBottomRightCircle</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circle"`.
| <span class="prop-name">anchorOriginTopLeftCircle</span> | <span class="prop-name">.MuiBadge-anchorOriginTopLeftCircle</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="circle"`.
| <span class="prop-name">anchorOriginBottomLeftCircle</span> | <span class="prop-name">.MuiBadge-anchorOriginBottomLeftCircle</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circle"`.
| <span class="prop-name">invisible</span> | <span class="prop-name">.MuiBadge-invisible</span> | Pseudo-class to the badge `span` element if `invisible={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Badge/Badge.js) for more detail.

## Demos

- [Avatars](/components/avatars/)
- [Badges](/components/badges/)

