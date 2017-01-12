Layout
======



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| className | string |  | The CSS class name of the root element. |
| component | union:&nbsp;string<br>&nbsp;func<br> | 'div' | The component used for the root node. Either a string to use a DOM element or a ReactElement. |
| container | bool | false | It true, the component will have the flex *container* behavior. You should be wrapping *items* with a *container*. |
| item | bool | false | It true, the component will have the flex *item* behavior. You should be wrapping *items* with a *container*. |
| xs | enum:&nbsp;true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> |  | Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority. |
| sm | enum:&nbsp;true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> |  | Defines the number of grids the component is going to use. It's applied for the `sm` breakpoint and wider screens if not overridden. |
| md | enum:&nbsp;true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> |  | Defines the number of grids the component is going to use. It's applied for the `md` breakpoint and wider screens if not overridden. |
| lg | enum:&nbsp;true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> |  | Defines the number of grids the component is going to use. It's applied for the `lg` breakpoint and wider screens if not overridden. |
| xl | enum:&nbsp;true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12<br> |  | Defines the number of grids the component is going to use. It's applied for the `xl` breakpoint and wider screens. |
| align | enum:&nbsp;"flex-start"<br>&nbsp;'center'<br>&nbsp;'flex-end'<br>&nbsp;'stretch'<br> | 'stretch' | Defines the `align-items` style property. It's applied for all the screen sizes. |
| direction | enum:&nbsp;"row"<br>&nbsp;'row-reverse'<br>&nbsp;'column'<br>&nbsp;'column-reverse'<br> | 'row' | Defines the `flex-direction` style property. It's applied for all the screen sizes. |
| gutter | enum:&nbsp;0, 8, 16, 24, 40<br> | 16 | Defines the space between the type `item` component. It can only be used on a type `container` component. |
| justify | enum:&nbsp;"flex-start", 'center', 'flex-end', 'space-between', 'space-around'<br> | 'flex-start' | Defines the `justify-content` style property. It's applied for all the screen sizes. |
| wrap | enum:&nbsp;"nowrap"<br>&nbsp;'wrap'<br>&nbsp;'wrap-reverse'<br> | 'wrap' | Defines the `flex-wrap` style property. It's applied for all the screen sizes. |

Any other properties supplied will be spread to the root element.
