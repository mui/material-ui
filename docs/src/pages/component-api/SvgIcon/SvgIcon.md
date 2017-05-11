SvgIcon
=======



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | Elements passed into the SVG Icon. |
| className | string |  | The CSS class name of the root element. |
| titleAccess | string |  | Provides a human-readable title for the element that contains it. https://www.w3.org/TR/SVG-access/#Equivalent |
| viewBox | string | '0 0 24 24' | Allows you to redefine what the coordinates without units mean inside an svg element. For example, if the SVG element is 500 (width) by 200 (height), and you pass viewBox="0 0 50 20", this means that the coordinates inside the svg will go from the top left corner (0,0) to bottom right (50,20) and each unit will be worth 10px. |

Any other properties supplied will be spread to the root element.
