Table
=====

A material table root element.

```jsx
<Table>
  <TableHeader>....</TableHeader>
  <TableBody>....</TableBody>
</Table>
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | Should be valid `<table>` children such as `TableHeader` and `TableBody`. |
| className | string |  | The CSS class name of the root element. |

Any other properties supplied will be spread to the root element.
