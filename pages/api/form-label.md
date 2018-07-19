---
filename: /packages/material-ui/src/FormLabel/FormLabel.js
title: FormLabel API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormLabel

<p class="description">The API documentation of the FormLabel React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'label'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool |   | If `true`, the label should be displayed in a disabled state. |
| <span class="prop-name">error</span> | <span class="prop-type">bool |   | If `true`, the label should be displayed in an error state. |
| <span class="prop-name">focused</span> | <span class="prop-type">bool |   | If `true`, the input of this label is focused (used by `FormGroup` components). |
| <span class="prop-name">required</span> | <span class="prop-type">bool |   | If `true`, the label will indicate that the input is required. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">focused</span> | Styles applied to the root element if `focused={true}`.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">error</span> | Styles applied to the root element if `error={true}`.
| <span class="prop-name">asterisk</span> | 

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/FormLabel/FormLabel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormLabel`.

## Demos

- [Selection Controls](/demos/selection-controls)

