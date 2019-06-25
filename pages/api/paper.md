---
filename: /packages/material-ui/src/Paper/Paper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Paper API

<p class="description">The API documentation of the Paper React component. Learn more about the properties and the CSS customization points.</p>

```js
import Paper from '@material-ui/core/Paper';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">elevation</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | Shadow depth, corresponds to `dp` in the spec. It accepts values between 0 and 24 inclusive. |
| <span class="prop-name">square</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, rounded corners are disabled. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

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

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Paper/Paper.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiPaper`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Autocomplete](/components/autocomplete/)
- [Cards](/components/cards/)
- [Paper](/components/paper/)

