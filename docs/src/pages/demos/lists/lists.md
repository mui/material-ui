---
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---

# Lists

[Lists](https://material.io/design/components/lists.html) present multiple line items vertically as a single continuous element.

Lists are made up of a continuous column of rows. Each row contains a tile. Primary actions fill the tile, and supplemental actions are represented by icons and text.

Lists are best suited for similar data types.

### Simple List

{{"demo": "pages/demos/lists/SimpleList.js"}}

### Folder List

{{"demo": "pages/demos/lists/FolderList.js"}}

### Inset List

{{"demo": "pages/demos/lists/InsetList.js"}}

### Nested List

{{"demo": "pages/demos/lists/NestedList.js"}}

### Pinned Subheader List

Upon scrolling, subheaders remain pinned to the top of the screen until pushed off screen by the next subheader.

This feature is relying on the CSS sticky positioning.
Unfortunately it's [not implemented](https://caniuse.com/#search=sticky) by all the browsers we are supporting. We default to `disableSticky` when not supported.

{{"demo": "pages/demos/lists/PinnedSubheaderList.js"}}

## List Controls

### Checkbox

A checkbox can either be a primary action or a secondary action.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/demos/lists/CheckboxList.js"}}

The checkbox is the secondary action for the list item and a separate target.

{{"demo": "pages/demos/lists/CheckboxListSecondary.js"}}

### Switch

The switch is the secondary action and a separate target.

{{"demo": "pages/demos/lists/SwitchListSecondary.js"}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "pages/demos/lists/InteractiveList.js"}}
