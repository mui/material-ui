---
filename: /packages/material-ui/src/CardHeader/CardHeader.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# CardHeader API

<p class="description">The API documentation of the CardHeader React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import CardHeader from '@material-ui/core/CardHeader';
// or
import { CardHeader } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiCardHeader` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">node</span> |  | The action to display in the card header. |
| <span class="prop-name">avatar</span> | <span class="prop-type">node</span> |  | The Avatar for the Card Header. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">disableTypography</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, `subheader` and `title` won't be wrapped by a Typography component. This can be useful to render an alternative Typography variant by wrapping the `title` text, and optional `subheader` text with the Typography component. |
| <span class="prop-name">subheader</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">subheaderTypographyProps</span> | <span class="prop-type">object</span> |  | These props will be forwarded to the subheader (as long as disableTypography is not `true`). |
| <span class="prop-name">title</span> | <span class="prop-type">node</span> |  | The content of the Card Title. |
| <span class="prop-name">titleTypographyProps</span> | <span class="prop-type">object</span> |  | These props will be forwarded to the title (as long as disableTypography is not `true`). |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiCardHeader-root</span> | Styles applied to the root element.
| <span class="prop-name">avatar</span> | <span class="prop-name">.MuiCardHeader-avatar</span> | Styles applied to the avatar element.
| <span class="prop-name">action</span> | <span class="prop-name">.MuiCardHeader-action</span> | Styles applied to the action element.
| <span class="prop-name">content</span> | <span class="prop-name">.MuiCardHeader-content</span> | Styles applied to the content wrapper element.
| <span class="prop-name">title</span> | <span class="prop-name">.MuiCardHeader-title</span> | Styles applied to the title Typography element.
| <span class="prop-name">subheader</span> | <span class="prop-name">.MuiCardHeader-subheader</span> | Styles applied to the subheader Typography element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CardHeader/CardHeader.js) for more detail.

## Demos

- [Cards](/components/cards/)

