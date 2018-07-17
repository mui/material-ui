---
filename: /packages/material-ui/src/LinearProgress/LinearProgress.js
title: LinearProgress API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# LinearProgress

<p class="description">The API documentation of the LinearProgress React component.</p>

## ARIA

If the progress bar is describing the loading progress of a particular region of a page,
you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
attribute to `true` on that region until it has finished loading.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'<br> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">value</span> | <span class="prop-type">number |   | The value of the progress indicator for the determinate and buffer variants. Value between 0 and 100. |
| <span class="prop-name">valueBuffer</span> | <span class="prop-type">number |   | The value for the buffer variant. Value between 0 and 100. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'determinate'&nbsp;&#124;<br>&nbsp;'indeterminate'&nbsp;&#124;<br>&nbsp;'buffer'&nbsp;&#124;<br>&nbsp;'query'<br> | <span class="prop-default">'indeterminate'</span> | The variant to use. Use indeterminate or query when there is no progress value. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root & bar2 element if `color="primary"`; bar2 if `variant-"buffer"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root & bar2 elements if `color="secondary"`; bar2 if variant="buffer".
| <span class="prop-name">buffer</span> | Styles applied to the root element if `variant="buffer"`.
| <span class="prop-name">query</span> | Styles applied to the root element if `variant="query"`.
| <span class="prop-name">dashed</span> | Styles applied to the additional bar element if `variant="buffer"`.
| <span class="prop-name">dashedColorPrimary</span> | Styles applied to the additional bar element if `variant="buffer"` & `color="primary"`.
| <span class="prop-name">dashedColorSecondary</span> | Styles applied to the additional bar element if `variant="buffer"` & `color="secondary"`.
| <span class="prop-name">bar</span> | Styles applied to the layered bar1 & bar2 elements.
| <span class="prop-name">barColorPrimary</span> | Styles applied to the bar elements if `color="primary"`; bar2 if `variant` not "buffer".
| <span class="prop-name">barColorSecondary</span> | Styles applied to the bar elements if `color="secondary"`; bar2 if `variant` not "buffer".
| <span class="prop-name">bar1Indeterminate</span> | Styles applied to the bar1 element if `variant="indeterminate or query"`.
| <span class="prop-name">bar1Determinate</span> | Styles applied to the bar1 element if `variant="determinate"`.
| <span class="prop-name">bar1Buffer</span> | Styles applied to the bar1 element if `variant="buffer"`.
| <span class="prop-name">bar2Indeterminate</span> | Styles applied to the bar2 element if `variant="indeterminate or query"`.
| <span class="prop-name">bar2Determinate</span> | Styles applied to the bar2 element if `variant="determinate"`.
| <span class="prop-name">bar2Buffer</span> | Styles applied to the bar2 element if `variant="buffer"`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/LinearProgress/LinearProgress.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiLinearProgress`.

## Demos

- [Progress](/demos/progress)

