---
filename: /packages/material-ui/src/Badge/Badge.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Badge API

<p class="description">The API documentation of the Badge React component. Learn more about the properties and the CSS customization points.</p>

```js
import { Badge } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">badgeContent</span> | <span class="prop-type">node</span> |  | The content rendered within the badge. |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The badge will be added relative to this node. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'<br>&#124;&nbsp;'error'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">invisible</span> | <span class="prop-type">bool</span> |  | If `true`, the badge will be invisible. |
| <span class="prop-name">max</span> | <span class="prop-type">number</span> | <span class="prop-default">99</span> | Max count to show. |
| <span class="prop-name">showZero</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Controls whether the badge is hidden when `badgeContent` is zero. |
| <span class="prop-name">variant</span> | <span class="prop-type">'standard'<br>&#124;&nbsp;'dot'</span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiBadge`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiBadge-root</span> | Styles applied to the root element.
| <span class="prop-name">badge</span> | <span class="prop-name">MuiBadge-badge</span> | Styles applied to the badge `span` element.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">MuiBadge-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">MuiBadge-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">colorError</span> | <span class="prop-name">MuiBadge-colorError</span> | Styles applied to the root element if `color="error"`.
| <span class="prop-name">invisible</span> | <span class="prop-name">MuiBadge-invisible</span> | Styles applied to the badge `span` element if `invisible={true}`.
| <span class="prop-name">dot</span> | <span class="prop-name">MuiBadge-dot</span> | Styles applied to the root element if `variant="dot"`.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Badge/Badge.js) for more detail.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Badges](/components/badges/)

