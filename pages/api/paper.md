---
filename: /packages/material-ui/src/Paper/Paper.js
title: Paper API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Paper

<p class="description">The API documentation of the Paper React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node |   | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">elevation</span> | <span class="prop-type">number | <span class="prop-default">2</span> | Shadow depth, corresponds to `dp` in the spec. It's accepting values between 0 and 24 inclusive. |
| <span class="prop-name">square</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, rounded corners are disabled. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">rounded</span> | Styles applied to the root element if `square={false}`.
| <span class="prop-name">elevation0</span> | 
| <span class="prop-name">elevation1</span> | 
| <span class="prop-name">elevation2</span> | 
| <span class="prop-name">elevation3</span> | 
| <span class="prop-name">elevation4</span> | 
| <span class="prop-name">elevation5</span> | 
| <span class="prop-name">elevation6</span> | 
| <span class="prop-name">elevation7</span> | 
| <span class="prop-name">elevation8</span> | 
| <span class="prop-name">elevation9</span> | 
| <span class="prop-name">elevation10</span> | 
| <span class="prop-name">elevation11</span> | 
| <span class="prop-name">elevation12</span> | 
| <span class="prop-name">elevation13</span> | 
| <span class="prop-name">elevation14</span> | 
| <span class="prop-name">elevation15</span> | 
| <span class="prop-name">elevation16</span> | 
| <span class="prop-name">elevation17</span> | 
| <span class="prop-name">elevation18</span> | 
| <span class="prop-name">elevation19</span> | 
| <span class="prop-name">elevation20</span> | 
| <span class="prop-name">elevation21</span> | 
| <span class="prop-name">elevation22</span> | 
| <span class="prop-name">elevation23</span> | 
| <span class="prop-name">elevation24</span> | 

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Paper/Paper.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiPaper`.

## Demos

- [Autocomplete](/demos/autocomplete)
- [Cards](/demos/cards)
- [Paper](/demos/paper)

