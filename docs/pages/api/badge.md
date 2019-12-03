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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--anchorOrigin"></a><a href="#props--anchorOrigin" class="prop-name">anchorOrigin</a> | <span class="prop-type">{ horizontal: 'left'<br>&#124;&nbsp;'right', vertical: 'bottom'<br>&#124;&nbsp;'top' }</span> | <span class="prop-default">{  vertical: 'top',  horizontal: 'right',}</span> | The anchor of the badge. |
| <a class="anchor-link" id="props--badgeContent"></a><a href="#props--badgeContent" class="prop-name">badgeContent</a> | <span class="prop-type">node</span> |  | The content rendered within the badge. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The badge will be added relative to this node. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" class="prop-name">color</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'error'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--invisible"></a><a href="#props--invisible" class="prop-name">invisible</a> | <span class="prop-type">bool</span> |  | If `true`, the badge will be invisible. |
| <a class="anchor-link" id="props--max"></a><a href="#props--max" class="prop-name">max</a> | <span class="prop-type">number</span> | <span class="prop-default">99</span> | Max count to show. |
| <a class="anchor-link" id="props--overlap"></a><a href="#props--overlap" class="prop-name">overlap</a> | <span class="prop-type">'circle'<br>&#124;&nbsp;'rectangle'</span> | <span class="prop-default">'rectangle'</span> | Wrapped shape the badge should overlap. |
| <a class="anchor-link" id="props--showZero"></a><a href="#props--showZero" class="prop-name">showZero</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Controls whether the badge is hidden when `badgeContent` is zero. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" class="prop-name">variant</a> | <span class="prop-type">'dot'<br>&#124;&nbsp;'standard'</span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiBadge`.
- Style sheet details:

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

- [Badges](/components/badges/)

