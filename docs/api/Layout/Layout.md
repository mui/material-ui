Layout
======



Props
-----


| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| className | string |  | The CSS class name of the root element. |
| component | union | 'div' | The element or component used for the root node. |
| type | enum:&nbsp;'container'<br>&nbsp;'item'<br> | 'item' | Defines the type of the component. You should be wrapping a type `item` by a type `container`. |
| xs | gridPropType |  | Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority. |
| sm | gridPropType |  | Defines the number of grids the component is going to use. It's applied for the `sm` breakpoint and wider screens if not overridden. |
| md | gridPropType |  | Defines the number of grids the component is going to use. It's applied for the `md` breakpoint and wider screens if not overridden. |
| lg | gridPropType |  | Defines the number of grids the component is going to use. It's applied for the `lg` breakpoint and wider screens if not overridden. |
| xl | gridPropType |  | Defines the number of grids the component is going to use. It's applied for the `xl` breakpoint and wider screens. |
| xsAlign | enum:&nbsp;'flex-start'<br>&nbsp;'center'<br>&nbsp;'flex-end'<br>&nbsp;'stretch'<br> | 'flex-start' | Defines the `align-items` style property. It's applied for all the screen sizes. |
| xsDirection | enum:&nbsp;'column'<br>&nbsp;'row'<br> | 'row' | Defines the `flex-direction` style property. It's applied for all the screen sizes. |
| xsGutter | union | 16 | Defines the space between the type `item` component. It can only be used on a type `container` component. |
| xsJustify | enum:&nbsp;'flex-start'<br>&nbsp;'center'<br>&nbsp;'flex-end'<br>&nbsp;'space-between'<br>&nbsp;'space-around'<br> | 'flex-start' | Defines the `justify-content` style property. It's applied for all the screen sizes. |
| xsWrap | enum:&nbsp;'nowrap'<br>&nbsp;'wrap'<br>&nbsp;'wrap-reverse'<br> | 'wrap' | Defines the `flex-wrap` style property. It's applied for all the screen sizes. |

Other properties (not documented) are applied to the root element.
