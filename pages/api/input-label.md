---
filename: /packages/material-ui/src/InputLabel/InputLabel.js
title: InputLabel API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# InputLabel

<p class="description">The API documentation of the InputLabel React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | The contents of the `InputLabel`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">disableAnimation</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the transition animation is disabled. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool |   | If `true`, apply disabled class. |
| <span class="prop-name">error</span> | <span class="prop-type">bool |   | If `true`, the label will be displayed in an error state. |
| <span class="prop-name">focused</span> | <span class="prop-type">bool |   | If `true`, the input of this label is focused. |
| <span class="prop-name">FormLabelClasses</span> | <span class="prop-type">object |   | `classes` property applied to the `FormLabel` element. |
| <span class="prop-name">margin</span> | <span class="prop-type">enum:&nbsp;'dense'<br> |   | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| <span class="prop-name">required</span> | <span class="prop-type">bool |   | if `true`, the label will indicate that the input is required. |
| <span class="prop-name">shrink</span> | <span class="prop-type">bool |   | If `true`, the label is shrunk. |

Any other properties supplied will be spread to the root element ([FormLabel](/api/form-label)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">formControl</span> | Styles applied to the root element if the component is a descendant of `FormControl`.
| <span class="prop-name">marginDense</span> | Styles applied to the root element if `margin="dense"`.
| <span class="prop-name">shrink</span> | Styles applied to the `input` element if `shrink={true}`.
| <span class="prop-name">animated</span> | Styles applied to the `input` element if `disableAnimation={false}`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/InputLabel/InputLabel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiInputLabel`.

## Inheritance

The properties of the [FormLabel](/api/form-label) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Text Fields](/demos/text-fields)

