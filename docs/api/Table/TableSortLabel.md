TableSortLabel
==============

A button based label for placing inside `TableCell` for column sorting.

Props
-----


| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| active | bool | false | If set to true, will have the active styling (should be true for the sorted column). |
| children | node |  | Label contents, the arrow will be appended automatically and aligned using flexbox. |
| className | string |  | The CSS class name of the root element. |
| direction | enum:&nbsp;'asc'<br>&nbsp;'desc'<br> | 'desc' | The current sort direction. |

Other properties (not documented) are applied to the root element.
