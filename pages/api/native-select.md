---
filename: /packages/material-ui/src/NativeSelect/NativeSelect.js
title: NativeSelect API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# NativeSelect

<p class="description">The API documentation of the NativeSelect React component.</p>

An alternative to `<Select native />` with a much smaller dependency graph.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | The option elements to populate the select with. Can be some `&lt;option>` elements. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">IconComponent</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">ArrowDropDownIcon</span> | The icon that displays the arrow. |
| <span class="prop-name">input</span> | <span class="prop-type">element | <span class="prop-default">&lt;Input /></span> | An `Input` element; does not have to be a material-ui specific `Input`. |
| <span class="prop-name">inputProps</span> | <span class="prop-type">object |   | Attributes applied to the `select` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func |   | Callback function fired when a menu item is selected.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value`. |
| <span class="prop-name">value</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;number<br> |   | The input value. |

Any other properties supplied will be spread to the root element ([Input](/api/input)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the `Input` component `root` class.
| <span class="prop-name">select</span> | Styles applied to the `Input` component `select` class.
| <span class="prop-name">selectMenu</span> | Styles applied to the `Input` component `selectMenu` class.
| <span class="prop-name">disabled</span> | Styles applied to the `Input` component `disabled` class.
| <span class="prop-name">icon</span> | Styles applied to the `Input` component `icon` class.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/NativeSelect/NativeSelect.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiNativeSelect`.

## Inheritance

The properties of the [Input](/api/input) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Selects](/demos/selects)

