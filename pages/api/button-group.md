---
filename: /packages/material-ui/src/ButtonGroup/ButtonGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ButtonGroup API

<p class="description">The API documentation of the ButtonGroup React component. Learn more about the properties and the CSS customization points.</p>

```js
import ButtonGroup from '@material-ui/core/ButtonGroup';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The content of the button group. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'<br></span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the buttons will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button ripple effect will be disabled. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the buttons will take up the full width of its container. |
| <span class="prop-name">size</span> | <span class="prop-type">enum:&nbsp;'small'&nbsp;&#124;<br>&nbsp;'medium'&nbsp;&#124;<br>&nbsp;'large'<br></span> | <span class="prop-default">'medium'</span> | The size of the button. `small` is equivalent to the dense button styling. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'outlined'&nbsp;&#124;<br>&nbsp;'contained'<br></span> | <span class="prop-default">'outlined'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` prop.
This prop accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">contained</span> | Styles applied to the root element if variant="contained".
| <span class="prop-name">fullWidth</span> | Styles applied to the root element if fullWidth={true}.
| <span class="prop-name">grouped</span> | Styles applied to the children.
| <span class="prop-name">groupedOutlined</span> | Styles applied to the children if variant="outlined".
| <span class="prop-name">groupedOutlinedPrimary</span> | Styles applied to the children if variant="outlined" & color="primary".
| <span class="prop-name">groupedOutlinedSecondary</span> | Styles applied to the children if variant="outlined" & color="secondary".
| <span class="prop-name">groupedContained</span> | Styles applied to the children if variant="contained".
| <span class="prop-name">groupedContainedPrimary</span> | Styles applied to the children if variant="contained" & color="primary".
| <span class="prop-name">groupedContainedSecondary</span> | Styles applied to the children if variant="contained" & color="secondary".

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ButtonGroup/ButtonGroup.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiButtonGroup`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Buttons](/components/buttons/)

