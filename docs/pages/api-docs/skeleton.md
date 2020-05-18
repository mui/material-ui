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



## Component name

The `MuiSkeleton` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">animation</span> | <span class="prop-type">'pulse'<br>&#124;&nbsp;'wave'<br>&#124;&nbsp;false</span> | <span class="prop-default">'pulse'</span> | The animation. If `false` the animation effect is disabled. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Optional children to infer width and height from. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">height</span> | <span class="prop-type">number<br>&#124;&nbsp;string</span> |  | Height of the skeleton. Useful when you don't want to adapt the skeleton to a text element but for instance a card. |
| <span class="prop-name">variant</span> | <span class="prop-type">'text'<br>&#124;&nbsp;'rect'<br>&#124;&nbsp;'circle'</span> | <span class="prop-default">'text'</span> | The type of content that will be rendered. |
| <span class="prop-name">width</span> | <span class="prop-type">number<br>&#124;&nbsp;string</span> |  | Width of the skeleton. Useful when the skeleton is inside an inline element with no width of its own. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiSkeleton-root</span> | Styles applied to the root element.
| <span class="prop-name">text</span> | <span class="prop-name">.MuiSkeleton-text</span> | Styles applied to the root element if `variant="text"`.
| <span class="prop-name">rect</span> | <span class="prop-name">.MuiSkeleton-rect</span> | Styles applied to the root element if `variant="rect"`.
| <span class="prop-name">circle</span> | <span class="prop-name">.MuiSkeleton-circle</span> | Styles applied to the root element if `variant="circle"`.
| <span class="prop-name">pulse</span> | <span class="prop-name">.MuiSkeleton-pulse</span> | Styles applied to the root element if `animation="pulse"`.
| <span class="prop-name">wave</span> | <span class="prop-name">.MuiSkeleton-wave</span> | Styles applied to the root element if `animation="wave"`.
| <span class="prop-name">withChildren</span> | <span class="prop-name">.MuiSkeleton-withChildren</span> | Styles applied when the component is passed children.
| <span class="prop-name">fitContent</span> | <span class="prop-name">.MuiSkeleton-fitContent</span> | Styles applied when the component is passed children and no width.
| <span class="prop-name">heightAuto</span> | <span class="prop-name">.MuiSkeleton-heightAuto</span> | Styles applied when the component is passed children and no height.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Skeleton/Skeleton.js) for more detail.

## Demos

- [Skeleton](/components/skeleton/)

