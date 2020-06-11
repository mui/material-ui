---
filename: /packages/material-ui-lab/src/Timeline/Timeline.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Timeline API

<p class="description">The API documentation of the Timeline React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Timeline from '@material-ui/lab/Timeline';
// or
import { Timeline } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiTimeline` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">align</span> | <span class="prop-type">'alternate'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right'</span> | <span class="prop-default">'left'</span> | The position where the timeline's content should appear. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiTimeline-root</span> | Styles applied to the root element.
| <span class="prop-name">alignLeft</span> | <span class="prop-name">.MuiTimeline-alignLeft</span> | Styles applied to the root element if `align="left"`.
| <span class="prop-name">alignRight</span> | <span class="prop-name">.MuiTimeline-alignRight</span> | Styles applied to the root element if `align="right"`.
| <span class="prop-name">alignAlternate</span> | <span class="prop-name">.MuiTimeline-alignAlternate</span> | Styles applied to the root element if `align="alternate"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Timeline/Timeline.js) for more detail.

## Demos

- [Timeline](/components/timeline/)

