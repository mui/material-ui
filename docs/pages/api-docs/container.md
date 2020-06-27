---
filename: /packages/material-ui/src/Container/Container.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Container API

<p class="description">The API documentation of the Container React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Container from '@material-ui/core/Container';
// or
import { Container } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiContainer` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">disableGutters</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the left and right padding is removed. |
| <span class="prop-name">fixed</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Set the max-width to match the min-width of the current breakpoint. This is useful if you'd prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport. It's fluid by default. |
| <span class="prop-name">maxWidth</span> | <span class="prop-type">'lg'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'xl'<br>&#124;&nbsp;'xs'<br>&#124;&nbsp;false</span> | <span class="prop-default">'lg'</span> | Determine the max-width of the container. The container width grows with the size of the screen. Set to `false` to disable `maxWidth`. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiContainer-root</span> | Styles applied to the root element.
| <span class="prop-name">disableGutters</span> | <span class="prop-name">.MuiContainer-disableGutters</span> | Styles applied to the root element if `disableGutters={true}`.
| <span class="prop-name">fixed</span> | <span class="prop-name">.MuiContainer-fixed</span> | Styles applied to the root element if `fixed={true}`.
| <span class="prop-name">maxWidthXs</span> | <span class="prop-name">.MuiContainer-maxWidthXs</span> | Styles applied to the root element if `maxWidth="xs"`.
| <span class="prop-name">maxWidthSm</span> | <span class="prop-name">.MuiContainer-maxWidthSm</span> | Styles applied to the root element if `maxWidth="sm"`.
| <span class="prop-name">maxWidthMd</span> | <span class="prop-name">.MuiContainer-maxWidthMd</span> | Styles applied to the root element if `maxWidth="md"`.
| <span class="prop-name">maxWidthLg</span> | <span class="prop-name">.MuiContainer-maxWidthLg</span> | Styles applied to the root element if `maxWidth="lg"`.
| <span class="prop-name">maxWidthXl</span> | <span class="prop-name">.MuiContainer-maxWidthXl</span> | Styles applied to the root element if `maxWidth="xl"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Container/Container.js) for more detail.

## Demos

- [Container](/components/container/)

