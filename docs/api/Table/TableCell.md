TableCell
=========

A material table cell.

When placed in a `TableHead`, this will automatically render a `th` element.

```jsx
<TableCell>Hello</TableCell>
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checkbox | bool | false | If `true`, the cell padding will be adjusted to better accomodate a checkbox. |
| children | node |  | The table cell contents. |
| className | string |  | The CSS class name of the root element. |
| compact | bool | false | If set to true, will use more compact cell padding to accomodate more content. |
| numeric | bool | false | If set to true, will align content to the right hand side. |
| padding | bool | true | If set to false, will disable left/right cell padding. |

Any other properties supplied will be spread to the root element.
