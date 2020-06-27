---
filename: /packages/material-ui-lab/src/SpeedDialAction/SpeedDialAction.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SpeedDialAction API

<p class="description">The API documentation of the SpeedDialAction React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
// or
import { SpeedDialAction } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiSpeedDialAction` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">delay</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | Adds a transition delay, to allow a series of SpeedDialActions to be animated. |
| <span class="prop-name">FabProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Fab`](/api/fab/) component. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The Icon to display in the SpeedDial Fab. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id. |
| <span class="prop-name">open</span> | <span class="prop-type">bool</span> |  | If `true`, the tooltip is shown. |
| <span class="prop-name">TooltipClasses</span> | <span class="prop-type">object</span> |  | `classes` prop applied to the [`Tooltip`](/api/tooltip/) element. |
| <span class="prop-name">tooltipOpen</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Make the tooltip always visible when the SpeedDial is open. |
| <span class="prop-name">tooltipPlacement</span> | <span class="prop-type">'bottom-end'<br>&#124;&nbsp;'bottom-start'<br>&#124;&nbsp;'bottom'<br>&#124;&nbsp;'left-end'<br>&#124;&nbsp;'left-start'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right-end'<br>&#124;&nbsp;'right-start'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'top-end'<br>&#124;&nbsp;'top-start'<br>&#124;&nbsp;'top'</span> | <span class="prop-default">'left'</span> | Placement of the tooltip. |
| <span class="prop-name">tooltipTitle</span> | <span class="prop-type">node</span> |  | Label to display in the tooltip. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Tooltip](/api/tooltip/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">fab</span> | <span class="prop-name">.MuiSpeedDialAction-fab</span> | Styles applied to the Fab component.
| <span class="prop-name">fabClosed</span> | <span class="prop-name">.MuiSpeedDialAction-fabClosed</span> | Styles applied to the Fab component if `open={false}`.
| <span class="prop-name">staticTooltip</span> | <span class="prop-name">.MuiSpeedDialAction-staticTooltip</span> | Styles applied to the root element if `tooltipOpen={true}`.
| <span class="prop-name">staticTooltipClosed</span> | <span class="prop-name">.MuiSpeedDialAction-staticTooltipClosed</span> | Styles applied to the root element if `tooltipOpen={true}` and `open={false}`.
| <span class="prop-name">staticTooltipLabel</span> | <span class="prop-name">.MuiSpeedDialAction-staticTooltipLabel</span> | Styles applied to the static tooltip label if `tooltipOpen={true}`.
| <span class="prop-name">tooltipPlacementLeft</span> | <span class="prop-name">.MuiSpeedDialAction-tooltipPlacementLeft</span> | Styles applied to the root if `tooltipOpen={true}` and `tooltipPlacement="left"``
| <span class="prop-name">tooltipPlacementRight</span> | <span class="prop-name">.MuiSpeedDialAction-tooltipPlacementRight</span> | Styles applied to the root if `tooltipOpen={true}` and `tooltipPlacement="right"``

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/SpeedDialAction/SpeedDialAction.js) for more detail.

## Inheritance

The props of the [Tooltip](/api/tooltip/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Speed Dial](/components/speed-dial/)

