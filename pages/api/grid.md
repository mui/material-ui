---
filename: /packages/material-ui/src/Grid/Grid.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Grid API

<p class="description">The API documentation of the Grid React component. Learn more about the properties and the CSS customization points.</p>

```js
import Grid from '@material-ui/core/Grid';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">alignContent</span> | <span class="prop-type">enum:&nbsp;'stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'<br></span> | <span class="prop-default">'stretch'</span> | Defines the `align-content` style property. It's applied for all screen sizes. |
| <span class="prop-name">alignItems</span> | <span class="prop-type">enum:&nbsp;'flex-start', 'center', 'flex-end', 'stretch', 'baseline'<br></span> | <span class="prop-default">'stretch'</span> | Defines the `align-items` style property. It's applied for all screen sizes. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">container</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component will have the flex *container* behavior. You should be wrapping *items* with a *container*. |
| <span class="prop-name">direction</span> | <span class="prop-type">enum:&nbsp;'row'&nbsp;&#124;<br>&nbsp;'row-reverse'&nbsp;&#124;<br>&nbsp;'column'&nbsp;&#124;<br>&nbsp;'column-reverse'<br></span> | <span class="prop-default">'row'</span> | Defines the `flex-direction` style property. It is applied for all screen sizes. |
| <span class="prop-name">item</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component will have the flex *item* behavior. You should be wrapping *items* with a *container*. |
| <span class="prop-name">justify</span> | <span class="prop-type">enum:&nbsp;'flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'<br></span> | <span class="prop-default">'flex-start'</span> | Defines the `justify-content` style property. It is applied for all screen sizes. |
| <span class="prop-name">lg</span> | <span class="prop-type">enum:&nbsp;false, 'auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br></span> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `lg` breakpoint and wider screens if not overridden. |
| <span class="prop-name">md</span> | <span class="prop-type">enum:&nbsp;false, 'auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br></span> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `md` breakpoint and wider screens if not overridden. |
| <span class="prop-name">sm</span> | <span class="prop-type">enum:&nbsp;false, 'auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br></span> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `sm` breakpoint and wider screens if not overridden. |
| <span class="prop-name">spacing</span> | <span class="prop-type">enum:&nbsp;0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10<br></span> | <span class="prop-default">0</span> | Defines the space between the type `item` component. It can only be used on a type `container` component. |
| <span class="prop-name">wrap</span> | <span class="prop-type">enum:&nbsp;'nowrap'&nbsp;&#124;<br>&nbsp;'wrap'&nbsp;&#124;<br>&nbsp;'wrap-reverse'<br></span> | <span class="prop-default">'wrap'</span> | Defines the `flex-wrap` style property. It's applied for all screen sizes. |
| <span class="prop-name">xl</span> | <span class="prop-type">enum:&nbsp;false, 'auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br></span> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `xl` breakpoint and wider screens. |
| <span class="prop-name">xs</span> | <span class="prop-type">enum:&nbsp;false, 'auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br></span> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority. |
| <span class="prop-name">zeroMinWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, it sets `min-width: 0` on the item. Refer to the limitations section of the documentation to better understand the use case. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element
| <span class="prop-name">container</span> | Styles applied to the root element if `container={true}`.
| <span class="prop-name">item</span> | Styles applied to the root element if `item={true}`.
| <span class="prop-name">zeroMinWidth</span> | Styles applied to the root element if `zeroMinWidth={true}`.
| <span class="prop-name">direction-xs-column</span> | 
| <span class="prop-name">direction-xs-column-reverse</span> | 
| <span class="prop-name">direction-xs-row-reverse</span> | 
| <span class="prop-name">wrap-xs-nowrap</span> | 
| <span class="prop-name">wrap-xs-wrap-reverse</span> | 
| <span class="prop-name">align-items-xs-center</span> | 
| <span class="prop-name">align-items-xs-flex-start</span> | 
| <span class="prop-name">align-items-xs-flex-end</span> | 
| <span class="prop-name">align-items-xs-baseline</span> | 
| <span class="prop-name">align-content-xs-center</span> | 
| <span class="prop-name">align-content-xs-flex-start</span> | 
| <span class="prop-name">align-content-xs-flex-end</span> | 
| <span class="prop-name">align-content-xs-space-between</span> | 
| <span class="prop-name">align-content-xs-space-around</span> | 
| <span class="prop-name">justify-xs-center</span> | 
| <span class="prop-name">justify-xs-flex-end</span> | 
| <span class="prop-name">justify-xs-space-between</span> | 
| <span class="prop-name">justify-xs-space-around</span> | 
| <span class="prop-name">justify-xs-space-evenly</span> | 
| <span class="prop-name">spacing-xs-1</span> | 
| <span class="prop-name">spacing-xs-2</span> | 
| <span class="prop-name">spacing-xs-3</span> | 
| <span class="prop-name">spacing-xs-4</span> | 
| <span class="prop-name">spacing-xs-5</span> | 
| <span class="prop-name">spacing-xs-6</span> | 
| <span class="prop-name">spacing-xs-7</span> | 
| <span class="prop-name">spacing-xs-8</span> | 
| <span class="prop-name">spacing-xs-9</span> | 
| <span class="prop-name">spacing-xs-10</span> | 
| <span class="prop-name">grid-xs-auto</span> | 
| <span class="prop-name">grid-xs-true</span> | 
| <span class="prop-name">grid-xs-1</span> | 
| <span class="prop-name">grid-xs-2</span> | 
| <span class="prop-name">grid-xs-3</span> | 
| <span class="prop-name">grid-xs-4</span> | 
| <span class="prop-name">grid-xs-5</span> | 
| <span class="prop-name">grid-xs-6</span> | 
| <span class="prop-name">grid-xs-7</span> | 
| <span class="prop-name">grid-xs-8</span> | 
| <span class="prop-name">grid-xs-9</span> | 
| <span class="prop-name">grid-xs-10</span> | 
| <span class="prop-name">grid-xs-11</span> | 
| <span class="prop-name">grid-xs-12</span> | 

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Grid/Grid.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiGrid`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Grid](/components/grid/)

