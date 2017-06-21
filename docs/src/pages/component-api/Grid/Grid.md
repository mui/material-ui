# Grid



## Properties
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | The content of the component. |
| classes | Object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;Function<br> | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| container | boolean | false | If `true`, the component will have the flex *container* behavior. You should be wrapping *items* with a *container*. |
| item | boolean | false | It true, the component will have the flex *item* behavior. You should be wrapping *items* with a *container*. |
| align | union:&nbsp;'flex-start'<br>&nbsp;'center'<br>&nbsp;'flex-end'<br>&nbsp;'stretch'<br> | 'stretch' | Defines the `align-items` style property. It's applied for all screen sizes. |
| direction | union:&nbsp;'row'<br>&nbsp;'row-reverse'<br>&nbsp;'column'<br>&nbsp;'column-reverse'<br> | 'row' | Defines the `flex-direction` style property. It is applied for all screen sizes. |
| gutter | union:&nbsp;0, 8, 16, 24, 40<br> | 16 | Defines the space between the type `item` component. It can only be used on a type `container` component. |
| hidden | [HiddenProps](/layout/hidden) | undefined | If provided, will wrap with [Hidden](/component-api/Hidden) component and given properties. |
| justify | union:&nbsp;'flex-start', 'center', 'flex-end', 'space-between', 'space-around'<br> | 'flex-start' | Defines the `justify-content` style property. It is applied for all screen sizes. |
| wrap | union:&nbsp;'nowrap'<br>&nbsp;'wrap'<br>&nbsp;'wrap-reverse'<br> | 'wrap' | Defines the `flex-wrap` style property. It's applied for all screen sizes. |
| xs | union:&nbsp;boolean, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> |  | Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority. |
| sm | union:&nbsp;boolean, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> |  | Defines the number of grids the component is going to use. It's applied for the `sm` breakpoint and wider screens if not overridden. |
| md | union:&nbsp;boolean, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> |  | Defines the number of grids the component is going to use. It's applied for the `md` breakpoint and wider screens if not overridden. |
| lg | union:&nbsp;boolean, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> |  | Defines the number of grids the component is going to use. It's applied for the `lg` breakpoint and wider screens if not overridden. |
| xl | union:&nbsp;boolean, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> |  | Defines the number of grids the component is going to use. It's applied for the `xl` breakpoint and wider screens. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `typeContainer`
- `typeItem`
- `direction-xs-column`
- `direction-xs-column-reverse`
- `direction-xs-row-reverse`
- `wrap-xs-nowrap`
- `align-xs-center`
- `align-xs-flex-start`
- `align-xs-flex-end`
- `justify-xs-center`
- `justify-xs-flex-end`
- `justify-xs-space-between`
- `justify-xs-space-around`
- `gutter-xs-8`
- `gutter-xs-16`
- `gutter-xs-24`
- `gutter-xs-40`
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
- `@media (min-width:600px)`
- `@media (min-width:960px)`
- `@media (min-width:1280px)`
- `@media (min-width:1920px)`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiGrid`.
