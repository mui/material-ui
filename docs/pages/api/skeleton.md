---
filename: /packages/material-ui-lab/src/Skeleton/Skeleton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Skeleton API

<p class="description">The API documentation of the Skeleton React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Skeleton from '@material-ui/lab/Skeleton';
// or
import { Skeleton } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--disableAnimate"></a><a href="#props--disableAnimate" title="link to the prop on this page" class="prop-name">disableAnimate</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true` the animation effect is disabled. |
| <a class="anchor-link" id="props--height"></a><a href="#props--height" title="link to the prop on this page" class="prop-name">height</a> | <span class="prop-type">number<br>&#124;&nbsp;string</span> |  | Height of the skeleton. Useful when you don't want to adapt the skeleton to a text element but for instance a card. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'text'<br>&#124;&nbsp;'rect'<br>&#124;&nbsp;'circle'</span> | <span class="prop-default">'text'</span> | The type of content that will be rendered. |
| <a class="anchor-link" id="props--width"></a><a href="#props--width" title="link to the prop on this page" class="prop-name">width</a> | <span class="prop-type">number<br>&#124;&nbsp;string</span> |  | Width of the skeleton. Useful when the skeleton is inside an inline element with no width of its own. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiSkeleton`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiSkeleton-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--text"></a><a href="#css--text" class="prop-name">text</a> | <span class="prop-name">.MuiSkeleton-text</span> | Styles applied to the root element if `variant="text"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--rect"></a><a href="#css--rect" class="prop-name">rect</a> | <span class="prop-name">.MuiSkeleton-rect</span> | Styles applied to the root element if `variant="rect"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--circle"></a><a href="#css--circle" class="prop-name">circle</a> | <span class="prop-name">.MuiSkeleton-circle</span> | Styles applied to the root element if `variant="circle"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--animate"></a><a href="#css--animate" class="prop-name">animate</a> | <span class="prop-name">.MuiSkeleton-animate</span> | Styles applied to the root element if `disabledAnimate={false}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Skeleton/Skeleton.js) for more detail.

## Demos

- [Skeleton](/components/skeleton/)

