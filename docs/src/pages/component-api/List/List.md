List
====

A material list root element.

```jsx
<List>
  <ListItem>....</ListItem>
</List>
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| className | string |  | The CSS class name of the root element. |
| component | union:&nbsp;string<br>&nbsp;func<br> | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| dense | bool | false | If `true`, compact vertical padding designed for keyboard and mouse input will be used for the list and list items. The property is available to descendant components as the `dense` context. |
| disablePadding | bool | false | If `true`, vertical padding will be removed from the list. |
| subheader | node |  | The content of the component, normally `ListItem`. |

Any other properties supplied will be spread to the root element.
