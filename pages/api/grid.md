---
filename: /packages/material-ui/src/Grid/Grid.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Grid



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">alignContent</span> | <span class="prop-type">enum:&nbsp;'stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'<br> | <span class="prop-default">'stretch'</span> | Defines the `align-content` style property. It's applied for all screen sizes. |
| <span class="prop-name">alignItems</span> | <span class="prop-type">enum:&nbsp;'flex-start', 'center', 'flex-end', 'stretch', 'baseline'<br> | <span class="prop-default">'stretch'</span> | Defines the `align-items` style property. It's applied for all screen sizes. |
| <span class="prop-name">children</span> | <span class="prop-type">node |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">component</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">container</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the component will have the flex *container* behavior. You should be wrapping *items* with a *container*. |
| <span class="prop-name">direction</span> | <span class="prop-type">enum:&nbsp;'row'&nbsp;&#124;<br>&nbsp;'row-reverse'&nbsp;&#124;<br>&nbsp;'column'&nbsp;&#124;<br>&nbsp;'column-reverse'<br> | <span class="prop-default">'row'</span> | Defines the `flex-direction` style property. It is applied for all screen sizes. |
| <span class="prop-name">item</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the component will have the flex *item* behavior. You should be wrapping *items* with a *container*. |
| <span class="prop-name">justify</span> | <span class="prop-type">enum:&nbsp;'flex-start', 'center', 'flex-end', 'space-between', 'space-around'<br> | <span class="prop-default">'flex-start'</span> | Defines the `justify-content` style property. It is applied for all screen sizes. |
| <span class="prop-name">lg</span> | <span class="prop-type">enum:&nbsp;false, true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `lg` breakpoint and wider screens if not overridden. |
| <span class="prop-name">md</span> | <span class="prop-type">enum:&nbsp;false, true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `md` breakpoint and wider screens if not overridden. |
| <span class="prop-name">sm</span> | <span class="prop-type">enum:&nbsp;false, true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `sm` breakpoint and wider screens if not overridden. |
| <span class="prop-name">spacing</span> | <span class="prop-type">enum:&nbsp;0, 8, 16, 24, 32, 40<br> | <span class="prop-default">0</span> | Defines the space between the type `item` component. It can only be used on a type `container` component. |
| <span class="prop-name">wrap</span> | <span class="prop-type">enum:&nbsp;'nowrap'&nbsp;&#124;<br>&nbsp;'wrap'&nbsp;&#124;<br>&nbsp;'wrap-reverse'<br> | <span class="prop-default">'wrap'</span> | Defines the `flex-wrap` style property. It's applied for all screen sizes. |
| <span class="prop-name">xl</span> | <span class="prop-type">enum:&nbsp;false, true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for the `xl` breakpoint and wider screens. |
| <span class="prop-name">xs</span> | <span class="prop-type">enum:&nbsp;false, true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> | <span class="prop-default">false</span> | Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority. |
| <span class="prop-name">zeroMinWidth</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, it sets `min-width: 0` on the item. Refer to the limitations section of the documentation to better understand the use case. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `container`
- `item`
- `zeroMinWidth`
- `direction-xs-column`
- `direction-xs-column-reverse`
- `direction-xs-row-reverse`
- `wrap-xs-nowrap`
- `wrap-xs-wrap-reverse`
- `align-items-xs-center`
- `align-items-xs-flex-start`
- `align-items-xs-flex-end`
- `align-items-xs-baseline`
- `align-content-xs-center`
- `align-content-xs-flex-start`
- `align-content-xs-flex-end`
- `align-content-xs-space-between`
- `align-content-xs-space-around`
- `justify-xs-center`
- `justify-xs-flex-end`
- `justify-xs-space-between`
- `justify-xs-space-around`
- `spacing-xs-8`
- `spacing-xs-16`
- `spacing-xs-24`
- `spacing-xs-32`
- `spacing-xs-40`
- `grid-xs`
- `grid-xs-1`
- `grid-xs-2`
- `grid-xs-3`
- `grid-xs-4`
- `grid-xs-5`
- `grid-xs-6`
- `grid-xs-7`
- `grid-xs-8`
- `grid-xs-9`
- `grid-xs-10`
- `grid-xs-11`
- `grid-xs-12`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui/src/Grid/Grid.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiGrid`.

## Demos

- [Grid](/layout/grid)

