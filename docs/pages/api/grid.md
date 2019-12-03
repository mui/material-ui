---
filename: /packages/material-ui/src/Grid/Grid.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Grid API

<p class="description">The API documentation of the Grid React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Grid from '@material-ui/core/Grid';
// or
import { Grid } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--alignContent"></a><a href="#props--alignContent" class="prop-name">alignContent</a> | <span class="prop-type">'stretch'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'flex-start'<br>&#124;&nbsp;'flex-end'<br>&#124;&nbsp;'space-between'<br>&#124;&nbsp;'space-around'</span> | <span class="prop-default">'stretch'</span> | Defines the `align-content` style property. It's applied for all screen sizes. |
| <a class="anchor-link" id="props--alignItems"></a><a href="#props--alignItems" class="prop-name">alignItems</a> | <span class="prop-type">'flex-start'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'flex-end'<br>&#124;&nbsp;'stretch'<br>&#124;&nbsp;'baseline'</span> | <span class="prop-default">'stretch'</span> | Defines the `align-items` style property. It's applied for all screen sizes. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--container"></a><a href="#props--container" class="prop-name">container</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component will have the flex *container* behavior. You should be wrapping *items* with a *container*. |
| <a class="anchor-link" id="props--direction"></a><a href="#props--direction" class="prop-name">direction</a> | <span class="prop-type">'row'<br>&#124;&nbsp;'row-reverse'<br>&#124;&nbsp;'column'<br>&#124;&nbsp;'column-reverse'</span> | <span class="prop-default">'row'</span> | Defines the `flex-direction` style property. It is applied for all screen sizes. |
| <a class="anchor-link" id="props--item"></a><a href="#props--item" class="prop-name">item</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component will have the flex *item* behavior. You should be wrapping *items* with a *container*. |
| <a class="anchor-link" id="props--justify"></a><a href="#props--justify" class="prop-name">justify</a> | <span class="prop-type">'flex-start'<br>&#124;&nbsp;'center'<br>&#124;&nbsp;'flex-end'<br>&#124;&nbsp;'space-between'<br>&#124;&nbsp;'space-around'<br>&#124;&nbsp;'space-evenly'</span> | <span class="prop-default">'flex-start'</span> | Defines the `justify-content` style property. It is applied for all screen sizes. |
| <a class="anchor-link" id="props--lg"></a><a href="#props--lg" class="prop-name">lg</a> | <span class="prop-type">false<br>&#124;&nbsp;'auto'<br>&#124;&nbsp;true<br>&#124;&nbsp;1<br>&#124;&nbsp;2<br>&#124;&nbsp;3<br>&#124;&nbsp;4<br>&#124;&nbsp;5<br>&#124;&nbsp;6<br>&#124;&nbsp;7<br>&#124;&nbsp;8<br>&#124;&nbsp;9<br>&#124;&nbsp;10<br>&#124;&nbsp;11<br>&#124;&nbsp;12</span> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `lg` breakpoint and wider screens if not overridden. |
| <a class="anchor-link" id="props--md"></a><a href="#props--md" class="prop-name">md</a> | <span class="prop-type">false<br>&#124;&nbsp;'auto'<br>&#124;&nbsp;true<br>&#124;&nbsp;1<br>&#124;&nbsp;2<br>&#124;&nbsp;3<br>&#124;&nbsp;4<br>&#124;&nbsp;5<br>&#124;&nbsp;6<br>&#124;&nbsp;7<br>&#124;&nbsp;8<br>&#124;&nbsp;9<br>&#124;&nbsp;10<br>&#124;&nbsp;11<br>&#124;&nbsp;12</span> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `md` breakpoint and wider screens if not overridden. |
| <a class="anchor-link" id="props--sm"></a><a href="#props--sm" class="prop-name">sm</a> | <span class="prop-type">false<br>&#124;&nbsp;'auto'<br>&#124;&nbsp;true<br>&#124;&nbsp;1<br>&#124;&nbsp;2<br>&#124;&nbsp;3<br>&#124;&nbsp;4<br>&#124;&nbsp;5<br>&#124;&nbsp;6<br>&#124;&nbsp;7<br>&#124;&nbsp;8<br>&#124;&nbsp;9<br>&#124;&nbsp;10<br>&#124;&nbsp;11<br>&#124;&nbsp;12</span> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `sm` breakpoint and wider screens if not overridden. |
| <a class="anchor-link" id="props--spacing"></a><a href="#props--spacing" class="prop-name">spacing</a> | <span class="prop-type">0<br>&#124;&nbsp;1<br>&#124;&nbsp;2<br>&#124;&nbsp;3<br>&#124;&nbsp;4<br>&#124;&nbsp;5<br>&#124;&nbsp;6<br>&#124;&nbsp;7<br>&#124;&nbsp;8<br>&#124;&nbsp;9<br>&#124;&nbsp;10</span> | <span class="prop-default">0</span> | Defines the space between the type `item` component. It can only be used on a type `container` component. |
| <a class="anchor-link" id="props--wrap"></a><a href="#props--wrap" class="prop-name">wrap</a> | <span class="prop-type">'nowrap'<br>&#124;&nbsp;'wrap'<br>&#124;&nbsp;'wrap-reverse'</span> | <span class="prop-default">'wrap'</span> | Defines the `flex-wrap` style property. It's applied for all screen sizes. |
| <a class="anchor-link" id="props--xl"></a><a href="#props--xl" class="prop-name">xl</a> | <span class="prop-type">false<br>&#124;&nbsp;'auto'<br>&#124;&nbsp;true<br>&#124;&nbsp;1<br>&#124;&nbsp;2<br>&#124;&nbsp;3<br>&#124;&nbsp;4<br>&#124;&nbsp;5<br>&#124;&nbsp;6<br>&#124;&nbsp;7<br>&#124;&nbsp;8<br>&#124;&nbsp;9<br>&#124;&nbsp;10<br>&#124;&nbsp;11<br>&#124;&nbsp;12</span> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `xl` breakpoint and wider screens. |
| <a class="anchor-link" id="props--xs"></a><a href="#props--xs" class="prop-name">xs</a> | <span class="prop-type">false<br>&#124;&nbsp;'auto'<br>&#124;&nbsp;true<br>&#124;&nbsp;1<br>&#124;&nbsp;2<br>&#124;&nbsp;3<br>&#124;&nbsp;4<br>&#124;&nbsp;5<br>&#124;&nbsp;6<br>&#124;&nbsp;7<br>&#124;&nbsp;8<br>&#124;&nbsp;9<br>&#124;&nbsp;10<br>&#124;&nbsp;11<br>&#124;&nbsp;12</span> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority. |
| <a class="anchor-link" id="props--zeroMinWidth"></a><a href="#props--zeroMinWidth" class="prop-name">zeroMinWidth</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, it sets `min-width: 0` on the item. Refer to the limitations section of the documentation to better understand the use case. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiGrid`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiGrid-root</span> | Styles applied to the root element
| <span class="prop-name">container</span> | <span class="prop-name">.MuiGrid-container</span> | Styles applied to the root element if `container={true}`.
| <span class="prop-name">item</span> | <span class="prop-name">.MuiGrid-item</span> | Styles applied to the root element if `item={true}`.
| <span class="prop-name">zeroMinWidth</span> | <span class="prop-name">.MuiGrid-zeroMinWidth</span> | Styles applied to the root element if `zeroMinWidth={true}`.
| <span class="prop-name">direction-xs-column</span> | <span class="prop-name">.MuiGrid-direction-xs-column</span> | 
| <span class="prop-name">direction-xs-column-reverse</span> | <span class="prop-name">.MuiGrid-direction-xs-column-reverse</span> | 
| <span class="prop-name">direction-xs-row-reverse</span> | <span class="prop-name">.MuiGrid-direction-xs-row-reverse</span> | 
| <span class="prop-name">wrap-xs-nowrap</span> | <span class="prop-name">.MuiGrid-wrap-xs-nowrap</span> | 
| <span class="prop-name">wrap-xs-wrap-reverse</span> | <span class="prop-name">.MuiGrid-wrap-xs-wrap-reverse</span> | 
| <span class="prop-name">align-items-xs-center</span> | <span class="prop-name">.MuiGrid-align-items-xs-center</span> | 
| <span class="prop-name">align-items-xs-flex-start</span> | <span class="prop-name">.MuiGrid-align-items-xs-flex-start</span> | 
| <span class="prop-name">align-items-xs-flex-end</span> | <span class="prop-name">.MuiGrid-align-items-xs-flex-end</span> | 
| <span class="prop-name">align-items-xs-baseline</span> | <span class="prop-name">.MuiGrid-align-items-xs-baseline</span> | 
| <span class="prop-name">align-content-xs-center</span> | <span class="prop-name">.MuiGrid-align-content-xs-center</span> | 
| <span class="prop-name">align-content-xs-flex-start</span> | <span class="prop-name">.MuiGrid-align-content-xs-flex-start</span> | 
| <span class="prop-name">align-content-xs-flex-end</span> | <span class="prop-name">.MuiGrid-align-content-xs-flex-end</span> | 
| <span class="prop-name">align-content-xs-space-between</span> | <span class="prop-name">.MuiGrid-align-content-xs-space-between</span> | 
| <span class="prop-name">align-content-xs-space-around</span> | <span class="prop-name">.MuiGrid-align-content-xs-space-around</span> | 
| <span class="prop-name">justify-xs-center</span> | <span class="prop-name">.MuiGrid-justify-xs-center</span> | 
| <span class="prop-name">justify-xs-flex-end</span> | <span class="prop-name">.MuiGrid-justify-xs-flex-end</span> | 
| <span class="prop-name">justify-xs-space-between</span> | <span class="prop-name">.MuiGrid-justify-xs-space-between</span> | 
| <span class="prop-name">justify-xs-space-around</span> | <span class="prop-name">.MuiGrid-justify-xs-space-around</span> | 
| <span class="prop-name">justify-xs-space-evenly</span> | <span class="prop-name">.MuiGrid-justify-xs-space-evenly</span> | 
| <span class="prop-name">spacing-xs-1</span> | <span class="prop-name">.MuiGrid-spacing-xs-1</span> | 
| <span class="prop-name">spacing-xs-2</span> | <span class="prop-name">.MuiGrid-spacing-xs-2</span> | 
| <span class="prop-name">spacing-xs-3</span> | <span class="prop-name">.MuiGrid-spacing-xs-3</span> | 
| <span class="prop-name">spacing-xs-4</span> | <span class="prop-name">.MuiGrid-spacing-xs-4</span> | 
| <span class="prop-name">spacing-xs-5</span> | <span class="prop-name">.MuiGrid-spacing-xs-5</span> | 
| <span class="prop-name">spacing-xs-6</span> | <span class="prop-name">.MuiGrid-spacing-xs-6</span> | 
| <span class="prop-name">spacing-xs-7</span> | <span class="prop-name">.MuiGrid-spacing-xs-7</span> | 
| <span class="prop-name">spacing-xs-8</span> | <span class="prop-name">.MuiGrid-spacing-xs-8</span> | 
| <span class="prop-name">spacing-xs-9</span> | <span class="prop-name">.MuiGrid-spacing-xs-9</span> | 
| <span class="prop-name">spacing-xs-10</span> | <span class="prop-name">.MuiGrid-spacing-xs-10</span> | 
| <span class="prop-name">grid-xs-auto</span> | <span class="prop-name">.MuiGrid-grid-xs-auto</span> | 
| <span class="prop-name">grid-xs-true</span> | <span class="prop-name">.MuiGrid-grid-xs-true</span> | 
| <span class="prop-name">grid-xs-1</span> | <span class="prop-name">.MuiGrid-grid-xs-1</span> | 
| <span class="prop-name">grid-xs-2</span> | <span class="prop-name">.MuiGrid-grid-xs-2</span> | 
| <span class="prop-name">grid-xs-3</span> | <span class="prop-name">.MuiGrid-grid-xs-3</span> | 
| <span class="prop-name">grid-xs-4</span> | <span class="prop-name">.MuiGrid-grid-xs-4</span> | 
| <span class="prop-name">grid-xs-5</span> | <span class="prop-name">.MuiGrid-grid-xs-5</span> | 
| <span class="prop-name">grid-xs-6</span> | <span class="prop-name">.MuiGrid-grid-xs-6</span> | 
| <span class="prop-name">grid-xs-7</span> | <span class="prop-name">.MuiGrid-grid-xs-7</span> | 
| <span class="prop-name">grid-xs-8</span> | <span class="prop-name">.MuiGrid-grid-xs-8</span> | 
| <span class="prop-name">grid-xs-9</span> | <span class="prop-name">.MuiGrid-grid-xs-9</span> | 
| <span class="prop-name">grid-xs-10</span> | <span class="prop-name">.MuiGrid-grid-xs-10</span> | 
| <span class="prop-name">grid-xs-11</span> | <span class="prop-name">.MuiGrid-grid-xs-11</span> | 
| <span class="prop-name">grid-xs-12</span> | <span class="prop-name">.MuiGrid-grid-xs-12</span> | 

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Grid/Grid.js) for more detail.

## Demos

- [Grid](/components/grid/)

