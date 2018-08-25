---
filename: /packages/material-ui-lab/src/Backdrop/BackdropFront.js
title: BackdropFront API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# BackdropFront

<p class="description">The API documentation of the BackdropFront React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |   | The content of the front panel. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool |   | If `true`, the panel will be displayed in a disabled state, with a scrim overlay |
| <span class="prop-name">expanded</span> | <span class="prop-type">bool | <span class="prop-default">true</span> | If `true`, expands the panel, otherwise collapse it to a minimized view. |
| <span class="prop-name">onExpand</span> | <span class="prop-type">func |   | Callback fired when minimized, non-disabled panel is clicked.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |

Any other properties supplied will be spread to the root element ([Paper](/api/paper)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:

- `root`
- `scrim`
- `scrimActive`
- `minimized`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-lab/src/Backdrop/BackdropFront.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBackdropFront`.

## Inheritance

The properties of the [Paper](/api/paper) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

