---
filename: /packages/material-ui-lab/src/SpeedDialIcon/SpeedDialIcon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SpeedDialIcon API

<p class="description">The API documentation of the SpeedDialIcon React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
// or
import { SpeedDialIcon } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiSpeedDialIcon` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon to display in the SpeedDial Floating Action Button. |
| <span class="prop-name">openIcon</span> | <span class="prop-type">node</span> |  | The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiSpeedDialIcon-root</span> | Styles applied to the root element.
| <span class="prop-name">icon</span> | <span class="prop-name">.MuiSpeedDialIcon-icon</span> | Styles applied to the icon component.
| <span class="prop-name">iconOpen</span> | <span class="prop-name">.MuiSpeedDialIcon-iconOpen</span> | Styles applied to the icon component if `open={true}`.
| <span class="prop-name">iconWithOpenIconOpen</span> | <span class="prop-name">.MuiSpeedDialIcon-iconWithOpenIconOpen</span> | Styles applied to the icon when and `openIcon` is provided and if `open={true}`.
| <span class="prop-name">openIcon</span> | <span class="prop-name">.MuiSpeedDialIcon-openIcon</span> | Styles applied to the `openIcon` if provided.
| <span class="prop-name">openIconOpen</span> | <span class="prop-name">.MuiSpeedDialIcon-openIconOpen</span> | Styles applied to the `openIcon` if provided and if `open={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/SpeedDialIcon/SpeedDialIcon.js) for more detail.

## Demos

- [Speed Dial](/components/speed-dial/)

