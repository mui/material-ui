---
filename: /packages/material-ui/src/Paper/Paper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Paper API

<p class="description">The API documentation of the Paper React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Paper from '@material-ui/core/Paper';
// or
import { Paper } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiPaper` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">elevation</span> | <span class="prop-type">number</span> | <span class="prop-default">1</span> | Shadow depth, corresponds to `dp` in the spec. It accepts values between 0 and 24 inclusive. |
| <span class="prop-name">square</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, rounded corners are disabled. |
| <span class="prop-name">variant</span> | <span class="prop-type">'elevation'<br>&#124;&nbsp;'outlined'</span> | <span class="prop-default">'elevation'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiPaper-root</span> | Styles applied to the root element.
| <span class="prop-name">rounded</span> | <span class="prop-name">.MuiPaper-rounded</span> | Styles applied to the root element if `square={false}`.
| <span class="prop-name">outlined</span> | <span class="prop-name">.MuiPaper-outlined</span> | Styles applied to the root element if `variant="outlined"`.
| <span class="prop-name">elevation0</span> | <span class="prop-name">.MuiPaper-elevation0</span> | 
| <span class="prop-name">elevation1</span> | <span class="prop-name">.MuiPaper-elevation1</span> | 
| <span class="prop-name">elevation2</span> | <span class="prop-name">.MuiPaper-elevation2</span> | 
| <span class="prop-name">elevation3</span> | <span class="prop-name">.MuiPaper-elevation3</span> | 
| <span class="prop-name">elevation4</span> | <span class="prop-name">.MuiPaper-elevation4</span> | 
| <span class="prop-name">elevation5</span> | <span class="prop-name">.MuiPaper-elevation5</span> | 
| <span class="prop-name">elevation6</span> | <span class="prop-name">.MuiPaper-elevation6</span> | 
| <span class="prop-name">elevation7</span> | <span class="prop-name">.MuiPaper-elevation7</span> | 
| <span class="prop-name">elevation8</span> | <span class="prop-name">.MuiPaper-elevation8</span> | 
| <span class="prop-name">elevation9</span> | <span class="prop-name">.MuiPaper-elevation9</span> | 
| <span class="prop-name">elevation10</span> | <span class="prop-name">.MuiPaper-elevation10</span> | 
| <span class="prop-name">elevation11</span> | <span class="prop-name">.MuiPaper-elevation11</span> | 
| <span class="prop-name">elevation12</span> | <span class="prop-name">.MuiPaper-elevation12</span> | 
| <span class="prop-name">elevation13</span> | <span class="prop-name">.MuiPaper-elevation13</span> | 
| <span class="prop-name">elevation14</span> | <span class="prop-name">.MuiPaper-elevation14</span> | 
| <span class="prop-name">elevation15</span> | <span class="prop-name">.MuiPaper-elevation15</span> | 
| <span class="prop-name">elevation16</span> | <span class="prop-name">.MuiPaper-elevation16</span> | 
| <span class="prop-name">elevation17</span> | <span class="prop-name">.MuiPaper-elevation17</span> | 
| <span class="prop-name">elevation18</span> | <span class="prop-name">.MuiPaper-elevation18</span> | 
| <span class="prop-name">elevation19</span> | <span class="prop-name">.MuiPaper-elevation19</span> | 
| <span class="prop-name">elevation20</span> | <span class="prop-name">.MuiPaper-elevation20</span> | 
| <span class="prop-name">elevation21</span> | <span class="prop-name">.MuiPaper-elevation21</span> | 
| <span class="prop-name">elevation22</span> | <span class="prop-name">.MuiPaper-elevation22</span> | 
| <span class="prop-name">elevation23</span> | <span class="prop-name">.MuiPaper-elevation23</span> | 
| <span class="prop-name">elevation24</span> | <span class="prop-name">.MuiPaper-elevation24</span> | 

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Paper/Paper.js) for more detail.

## Demos

- [Cards](/components/cards/)
- [Paper](/components/paper/)

