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
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Override or extend the styles applied to the component. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'error'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">components</span> | <span class="prop-type">{ Badge?: elementType, Root?: elementType }</span> | <span class="prop-default">{}</span> | The components used for each slot inside the Badge. Either a string to use a HTML element or a component. |
| <span class="prop-name">componentsProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | The props used for each slot inside the Badge. |
| <span class="prop-name">invisible</span> | <span class="prop-type">bool</span> |  | If `true`, the badge is invisible. |
| <span class="prop-name">max</span> | <span class="prop-type">number</span> | <span class="prop-default">99</span> | Max count to show. |
| <span class="prop-name">overlap</span> | <span class="prop-type">'circular'<br>&#124;&nbsp;'rectangular'</span> | <span class="prop-default">'rectangular'</span> | Wrapped shape the badge should overlap. |
| <span class="prop-name">showZero</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Controls whether the badge is hidden when `badgeContent` is zero. |
| <span class="prop-name">sx</span> | <span class="prop-type">object</span> |  | The system prop that allows defining system overrides as well as additional CSS styles. |
| <span class="prop-name">variant</span> | <span class="prop-type">'dot'<br>&#124;&nbsp;'standard'<br>&#124;&nbsp;string</span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([BadgeUnstyled](/api/badge-unstyled/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiBadge-root</span> | Styles applied to the root element.
| <span class="prop-name">badge</span> | <span class="prop-name">.MuiBadge-badge</span> | Styles applied to the badge `span` element.
| <span class="prop-name">dot</span> | <span class="prop-name">.MuiBadge-dot</span> | Styles applied to the root element if `variant="dot"`.
| <span class="prop-name">standard</span> | <span class="prop-name">.MuiBadge-standard</span> | Styles applied to the root element if `variant="standard"`.
| <span class="prop-name">anchorOriginTopRightRectangular</span> | <span class="prop-name">.MuiBadge-anchorOriginTopRightRectangular</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangular"`.
| <span class="prop-name">anchorOriginBottomRightRectangular</span> | <span class="prop-name">.MuiBadge-anchorOriginBottomRightRectangular</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangular"`.
| <span class="prop-name">anchorOriginTopLeftRectangular</span> | <span class="prop-name">.MuiBadge-anchorOriginTopLeftRectangular</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangular"`.
| <span class="prop-name">anchorOriginBottomLeftRectangular</span> | <span class="prop-name">.MuiBadge-anchorOriginBottomLeftRectangular</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangular"`.
| <span class="prop-name">anchorOriginTopRightCircular</span> | <span class="prop-name">.MuiBadge-anchorOriginTopRightCircular</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="circular"`.
| <span class="prop-name">anchorOriginBottomRightCircular</span> | <span class="prop-name">.MuiBadge-anchorOriginBottomRightCircular</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circular"`.
| <span class="prop-name">anchorOriginTopLeftCircular</span> | <span class="prop-name">.MuiBadge-anchorOriginTopLeftCircular</span> | Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="circular"`.
| <span class="prop-name">anchorOriginBottomLeftCircular</span> | <span class="prop-name">.MuiBadge-anchorOriginBottomLeftCircular</span> | Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circular"`.
| <span class="prop-name">invisible</span> | <span class="prop-name">.MuiBadge-invisible</span> | Pseudo-class to the badge `span` element if `invisible={true}`.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiBadge-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiBadge-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">colorError</span> | <span class="prop-name">.MuiBadge-colorError</span> | Styles applied to the root element if `color="error"`.

You can override the style of the component thanks to one of these customization points:

- With a [global class name](/guides/interoperability/#global-css).
- With a rule name as part of the component's [`styleOverrides` property](/customization/components/#global-theme-override) in a custom theme.

## Inheritance

The props of the [BadgeUnstyled](/api/badge-unstyled/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Avatars](/components/avatars/)
- [Badges](/components/badges/)

