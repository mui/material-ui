TableCell
=========

A material table cell.

When placed in a `TableHead`, this will automatically render a `th` element.

```jsx
<TableCell>...</TableCell>
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checkbox | bool | false | If `true`, the cell padding will be adjusted to accommodate a checkbox. |
| children | node |  | The table cell contents. |
| className | string |  | The CSS class name of the root element. |
| compact | bool | false | If `true`, compact cell padding will be used to accommodate more content. |
| disablePadding | bool | false | If `true`, left/right cell padding will be disabled. |
| numeric | bool | false | If `true`, content will align to the right. |

Any other properties supplied will be spread to the root element.
