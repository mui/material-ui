---
filename: /packages/material-ui-lab/src/ToggleButtonGroup/ToggleButtonGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ToggleButtonGroup API

<p class="description">The API documentation of the ToggleButtonGroup React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// or
import { ToggleButtonGroup } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiToggleButtonGroup` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the button. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">exclusive</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, only allow one of the child ToggleButton values to be selected. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback.<br>*value:* of the selected buttons. When `exclusive` is true this is a single value; when false an array of selected values. If no value is selected and `exclusive` is true the value is null; when false an empty array. |
| <span class="prop-name">orientation</span> | <span class="prop-type">'horizontal'<br>&#124;&nbsp;'vertical'</span> | <span class="prop-default">'horizontal'</span> | The group orientation (layout flow direction). |
| <span class="prop-name">size</span> | <span class="prop-type">'large'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the buttons. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The currently selected value within the group or an array of selected values when `exclusive` is false.<br>The value must have reference equality with the option in order to be selected. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiToggleButtonGroup-root</span> | Styles applied to the root element.
| <span class="prop-name">vertical</span> | <span class="prop-name">.MuiToggleButtonGroup-vertical</span> | Styles applied to the root element if `orientation="vertical"`.
| <span class="prop-name">grouped</span> | <span class="prop-name">.MuiToggleButtonGroup-grouped</span> | Styles applied to the children.
| <span class="prop-name">groupedHorizontal</span> | <span class="prop-name">.MuiToggleButtonGroup-groupedHorizontal</span> | Styles applied to the children if `orientation="horizontal"`.
| <span class="prop-name">groupedVertical</span> | <span class="prop-name">.MuiToggleButtonGroup-groupedVertical</span> | Styles applied to the children if `orientation="vertical"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/ToggleButtonGroup/ToggleButtonGroup.js) for more detail.

## Demos

- [Toggle Button](/components/toggle-button/)

