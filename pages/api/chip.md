<!--- This documentation is automatically generated, do not try to edit it. -->

# Chip

Chips represent complex entities in small blocks, such as a contact.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| avatar | node |  | Avatar element. |
| classes | object |  | Useful to extend the style applied to components. |
| label | node |  | The content of the label. |
| onRequestDelete | function |  | Callback function fired when the delete icon is clicked. If set, the delete icon will be shown.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `clickable`
- `deletable`
- `avatar`
- `avatarChildren`
- `label`
- `deleteIcon`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiChip`.

## Demos

- [Chips](/demos/chips)

