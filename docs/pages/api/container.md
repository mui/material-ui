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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  |  |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--fixed"></a><a href="#props--fixed" title="link to the prop on this page" class="prop-name">fixed</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Set the max-width to match the min-width of the current breakpoint. This is useful if you'd prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport. It's fluid by default. |
| <a class="anchor-link" id="props--maxWidth"></a><a href="#props--maxWidth" title="link to the prop on this page" class="prop-name">maxWidth</a> | <span class="prop-type">'xs'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'lg'<br>&#124;&nbsp;'xl'<br>&#124;&nbsp;false</span> | <span class="prop-default">'lg'</span> | Determine the max-width of the container. The container width grows with the size of the screen. Set to `false` to disable `maxWidth`. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiContainer`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiContainer-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--fixed"></a><a href="#css--fixed" class="prop-name">fixed</a> | <span class="prop-name">.MuiContainer-fixed</span> | Styles applied to the root element if `fixed={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--maxWidthXs"></a><a href="#css--maxWidthXs" class="prop-name">maxWidthXs</a> | <span class="prop-name">.MuiContainer-maxWidthXs</span> | Styles applied to the root element if `maxWidth="xs"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--maxWidthSm"></a><a href="#css--maxWidthSm" class="prop-name">maxWidthSm</a> | <span class="prop-name">.MuiContainer-maxWidthSm</span> | Styles applied to the root element if `maxWidth="sm"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--maxWidthMd"></a><a href="#css--maxWidthMd" class="prop-name">maxWidthMd</a> | <span class="prop-name">.MuiContainer-maxWidthMd</span> | Styles applied to the root element if `maxWidth="md"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--maxWidthLg"></a><a href="#css--maxWidthLg" class="prop-name">maxWidthLg</a> | <span class="prop-name">.MuiContainer-maxWidthLg</span> | Styles applied to the root element if `maxWidth="lg"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--maxWidthXl"></a><a href="#css--maxWidthXl" class="prop-name">maxWidthXl</a> | <span class="prop-name">.MuiContainer-maxWidthXl</span> | Styles applied to the root element if `maxWidth="xl"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Container/Container.js) for more detail.

## Demos

- [Container](/components/container/)

