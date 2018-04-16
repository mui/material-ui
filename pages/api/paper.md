---
filename: /src/Paper/Paper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Paper



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">elevation</span> | <span class="prop-type">number | <span class="prop-default">2</span> | Shadow depth, corresponds to `dp` in the spec. It's accepting values between 0 and 24 inclusive. |
| <span class="prop-name">square</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, rounded corners are disabled. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `rounded`
- `elevation0`
- `elevation1`
- `elevation2`
- `elevation3`
- `elevation4`
- `elevation5`
- `elevation6`
- `elevation7`
- `elevation8`
- `elevation9`
- `elevation10`
- `elevation11`
- `elevation12`
- `elevation13`
- `elevation14`
- `elevation15`
- `elevation16`
- `elevation17`
- `elevation18`
- `elevation19`
- `elevation20`
- `elevation21`
- `elevation22`
- `elevation23`
- `elevation24`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Paper/Paper.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiPaper`.

## Demos

- [Autocomplete](/demos/autocomplete)
- [Paper](/demos/paper)

