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
| <a class="anchor-link" id="props--anchorOrigin"></a><a href="#props--anchorOrigin" title="link to the prop on this page" class="prop-name">anchorOrigin</a> | <span class="prop-type">{ horizontal: 'left'<br>&#124;&nbsp;'right', vertical: 'bottom'<br>&#124;&nbsp;'top' }</span> | <span class="prop-default">{  vertical: 'top',  horizontal: 'right',}</span> | The anchor of the badge. |
| <a class="anchor-link" id="props--badgeContent"></a><a href="#props--badgeContent" title="link to the prop on this page" class="prop-name">badgeContent</a> | <span class="prop-type">node</span> |  | The content rendered within the badge. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The badge will be added relative to this node. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'error'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--invisible"></a><a href="#props--invisible" title="link to the prop on this page" class="prop-name">invisible</a> | <span class="prop-type">bool</span> |  | If `true`, the badge will be invisible. |
| <a class="anchor-link" id="props--max"></a><a href="#props--max" title="link to the prop on this page" class="prop-name">max</a> | <span class="prop-type">number</span> | <span class="prop-default">99</span> | Max count to show. |
| <a class="anchor-link" id="props--overlap"></a><a href="#props--overlap" title="link to the prop on this page" class="prop-name">overlap</a> | <span class="prop-type">'circle'<br>&#124;&nbsp;'rectangle'</span> | <span class="prop-default">'rectangle'</span> | Wrapped shape the badge should overlap. |
| <a class="anchor-link" id="props--showZero"></a><a href="#props--showZero" title="link to the prop on this page" class="prop-name">showZero</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Controls whether the badge is hidden when `badgeContent` is zero. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'dot'<br>&#124;&nbsp;'standard'</span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiBadge`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiBadge-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--badge"></a><a href="#css--badge" class="prop-name">badge</a> | <span class="prop-name">.MuiBadge-badge</span> | Styles applied to the badge `span` element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiBadge-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiBadge-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorError"></a><a href="#css--colorError" class="prop-name">colorError</a> | <span class="prop-name">.MuiBadge-colorError</span> | Styles applied to the root element if `color="error"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dot"></a><a href="#css--dot" class="prop-name">dot</a> | <span class="prop-name">.MuiBadge-dot</span> | Styles applied to the root element if `variant="dot"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--anchorOriginTopRightRectangle"></a><a href="#css--anchorOriginTopRightRectangle" class="prop-name">anchorOriginTopRightRectangle</a> | <span class="prop-name">.MuiBadge-anchorOriginTopRightRectangle</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangle"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--anchorOriginBottomRightRectangle"></a><a href="#css--anchorOriginBottomRightRectangle" class="prop-name">anchorOriginBottomRightRectangle</a> | <span class="prop-name">.MuiBadge-anchorOriginBottomRightRectangle</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangle"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--anchorOriginTopLeftRectangle"></a><a href="#css--anchorOriginTopLeftRectangle" class="prop-name">anchorOriginTopLeftRectangle</a> | <span class="prop-name">.MuiBadge-anchorOriginTopLeftRectangle</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangle"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--anchorOriginBottomLeftRectangle"></a><a href="#css--anchorOriginBottomLeftRectangle" class="prop-name">anchorOriginBottomLeftRectangle</a> | <span class="prop-name">.MuiBadge-anchorOriginBottomLeftRectangle</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangle"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--anchorOriginTopRightCircle"></a><a href="#css--anchorOriginTopRightCircle" class="prop-name">anchorOriginTopRightCircle</a> | <span class="prop-name">.MuiBadge-anchorOriginTopRightCircle</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="circle"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--anchorOriginBottomRightCircle"></a><a href="#css--anchorOriginBottomRightCircle" class="prop-name">anchorOriginBottomRightCircle</a> | <span class="prop-name">.MuiBadge-anchorOriginBottomRightCircle</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circle"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--anchorOriginTopLeftCircle"></a><a href="#css--anchorOriginTopLeftCircle" class="prop-name">anchorOriginTopLeftCircle</a> | <span class="prop-name">.MuiBadge-anchorOriginTopLeftCircle</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="circle"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--anchorOriginBottomLeftCircle"></a><a href="#css--anchorOriginBottomLeftCircle" class="prop-name">anchorOriginBottomLeftCircle</a> | <span class="prop-name">.MuiBadge-anchorOriginBottomLeftCircle</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circle"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--invisible"></a><a href="#css--invisible" class="prop-name">invisible</a> | <span class="prop-name">.MuiBadge-invisible</span> | Pseudo-class to the badge `span` element if `invisible={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Badge/Badge.js) for more detail.

## Demos

- [Badges](/components/badges/)

