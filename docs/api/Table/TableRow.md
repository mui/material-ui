TableRow
========

A material table row.

Will automatically set dynamic row height
based on the material table element parent (head, body, etc)

```jsx
<TableRow>
  <TableCell>....</TableCell>
</TableRow>
```

Props
-----


| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | Should be valid `<tr>` children such as `TableCell`. |
| className | string |  | The CSS class name of the root element. |
| hover | bool | false | If set to true, the table row will shade on hover. |
| selected | bool | false | If set to true, the table row will have the selected shading. |

Other properties (not documented) are applied to the root element.
