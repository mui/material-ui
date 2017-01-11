Chip
====

Chips represent complex entities in small blocks, such as a contact.

```jsx
<Chip avatar={<Avatar>} label="Label text" />
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| avatar | node |  | Avatar element. |
| className | string |  | CSS `className` of the root element. |
| deleteIconClassName | string |  | CSS `className` of the delete icon element. |
| label | string |  | Label |
| labelClassName | string |  | CSS `className` of the label. |
| onClick | function |  | Callback function fired when the `Chip` element is clicked. If set, the chip will by styled for hover focus and active states.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* `onClick` event targeting the root element. |
| onRequestDelete | function |  | Callback function fired when the delete icon is clicked. If set, the delete icon will be shown.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* `onClick` event targeting the delete icon element. |

Any other properties supplied will be spread to the root element.
