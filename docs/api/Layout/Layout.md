Layout
======



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| className | string |  | The CSS class name of the root element. |
| component | union | 'div' | The element or component used for the root node. |
| container | bool | false | It true, the component will have the flex *container* behavior. You should be wrapping *items* with a *container*. |
| item | bool | false | It true, the component will have the flex *item* behavior. You should be wrapping *items* with a *container*. |
| xs | gridPropType |  | Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority. |
| sm | gridPropType |  | Defines the number of grids the component is going to use. It's applied for the `sm` breakpoint and wider screens if not overridden. |
| md | gridPropType |  | Defines the number of grids the component is going to use. It's applied for the `md` breakpoint and wider screens if not overridden. |
| lg | gridPropType |  | Defines the number of grids the component is going to use. It's applied for the `lg` breakpoint and wider screens if not overridden. |
| xl | gridPropType |  | Defines the number of grids the component is going to use. It's applied for the `xl` breakpoint and wider screens. |
| align | enum:&nbsp;"flex-start"<br>&nbsp;'center'<br>&nbsp;'flex-end'<br>&nbsp;'stretch'<br> | 'flex-start' | Defines the `align-items` style property. It's applied for all the screen sizes. |
| direction | enum:&nbsp;"row"<br>&nbsp;'row-reverse'<br>&nbsp;'column'<br>&nbsp;'column-reverse'<br> | 'row' | Defines the `flex-direction` style property. It's applied for all the screen sizes. |
| gutter | enum:&nbsp;0<br>&nbsp;8<br>&nbsp;16<br>&nbsp;24<br>&nbsp;40<br> | 16 | Defines the space between the type `item` component. It can only be used on a type `container` component. |
| justify | enum:&nbsp;"flex-start"<br>&nbsp;'center'<br>&nbsp;'flex-end'<br>&nbsp;'space-between'<br>&nbsp;'space-around'<br> | 'flex-start' | Defines the `justify-content` style property. It's applied for all the screen sizes. |
| wrap | enum:&nbsp;"nowrap"<br>&nbsp;'wrap'<br>&nbsp;'wrap-reverse'<br> | 'wrap' | Defines the `flex-wrap` style property. It's applied for all the screen sizes. |

Any other properties supplied will be spread to the root element.
