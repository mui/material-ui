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



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" class="prop-name">icon</a> | <span class="prop-type">node</span> |  | The icon to display in the SpeedDial Floating Action Button. |
| <a class="anchor-link" id="props--openIcon"></a><a href="#props--openIcon" class="prop-name">openIcon</a> | <span class="prop-type">node</span> |  | The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiSpeedDialIcon`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiSpeedDialIcon-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--icon"></a><a href="#css--icon" class="prop-name">icon</a> | <span class="prop-name">.MuiSpeedDialIcon-icon</span> | Styles applied to the icon component.
| <a class="anchor-link" id="css--iconOpen"></a><a href="#css--iconOpen" class="prop-name">iconOpen</a> | <span class="prop-name">.MuiSpeedDialIcon-iconOpen</span> | Styles applied to the icon component if `open={true}`.
| <a class="anchor-link" id="css--iconWithOpenIconOpen"></a><a href="#css--iconWithOpenIconOpen" class="prop-name">iconWithOpenIconOpen</a> | <span class="prop-name">.MuiSpeedDialIcon-iconWithOpenIconOpen</span> | Styles applied to the icon when and `openIcon` is provided and if `open={true}`.
| <a class="anchor-link" id="css--openIcon"></a><a href="#css--openIcon" class="prop-name">openIcon</a> | <span class="prop-name">.MuiSpeedDialIcon-openIcon</span> | Styles applied to the `openIcon` if provided.
| <a class="anchor-link" id="css--openIconOpen"></a><a href="#css--openIconOpen" class="prop-name">openIconOpen</a> | <span class="prop-name">.MuiSpeedDialIcon-openIconOpen</span> | Styles applied to the `openIcon` if provided and if `open={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/SpeedDialIcon/SpeedDialIcon.js) for more detail.

## Demos

- [Speed Dial](/components/speed-dial/)

