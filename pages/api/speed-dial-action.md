---
filename: /packages/material-ui-lab/src/SpeedDialAction/SpeedDialAction.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SpeedDialAction API

<p class="description">The API documentation of the SpeedDialAction React component. Learn more about the properties and the CSS customization points.</p>

```js
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">ButtonProps</span> | <span class="prop-type">object</span> |  | Properties applied to the [`Button`](/api/button/) component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">delay</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | Adds a transition delay, to allow a series of SpeedDialActions to be animated. |
| <span class="prop-name required">icon&nbsp;*</span> | <span class="prop-type">node</span> |  | The Icon to display in the SpeedDial Floating Action Button. |
| <span class="prop-name">TooltipClasses</span> | <span class="prop-type">object</span> |  | Classes applied to the [`Tooltip`](/api/tooltip/) element. |
| <span class="prop-name">tooltipOpen</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Make the tooltip always visible when the SpeedDial is open. |
| <span class="prop-name">tooltipPlacement</span> | <span class="prop-type">enum:&nbsp;'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'<br></span> | <span class="prop-default">'left'</span> | Placement of the tooltip. |
| <span class="prop-name required">tooltipTitle&nbsp;*</span> | <span class="prop-type">node</span> |  | Label to display in the tooltip. |

The component cannot hold a ref.

Any other properties supplied will be provided to the root element ([Tooltip](/api/tooltip/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">button</span> | Styles applied to the `Button` component.
| <span class="prop-name">buttonClosed</span> | Styles applied to the `Button` component if `open={false}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/SpeedDialAction/SpeedDialAction.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiSpeedDialAction`.

## Inheritance

The properties of the [Tooltip](/api/tooltip/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Speed Dial](/components/speed-dial/)

