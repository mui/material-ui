---
title: List React component
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---

# Lists

<p class="description">Lists are continuous, vertical indexes of text or images.</p>

[Lists](https://material.io/design/components/lists.html) are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.

## Simple List

{{"demo": "pages/components/lists/SimpleList.js"}}

The last item of the previous demo shows how you can render a link:

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

You can find a [demo with React Router following this section](/guides/composition/#react-router) of the documentation.

## Nested List

{{"demo": "pages/components/lists/NestedList.js"}}

## Folder List

{{"demo": "pages/components/lists/FolderList.js"}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "pages/components/lists/InteractiveList.js"}}

## Selected ListItem

{{"demo": "pages/components/lists/SelectedListItem.js"}}

## Align list items

You should change the list item alignment when displaying 3 lines or more, set the `alignItems="flex-start"` property.

{{"demo": "pages/components/lists/AlignItemsList.js"}}

## List Controls

### Checkbox

A checkbox can either be a primary action or a secondary action.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

{{"demo": "pages/components/lists/CheckboxList.js"}}

The checkbox is the secondary action for the list item and a separate target.

{{"demo": "pages/components/lists/CheckboxListSecondary.js"}}

### Switch

The switch is the secondary action and a separate target.

{{"demo": "pages/components/lists/SwitchListSecondary.js"}}

## Pinned Subheader List

Upon scrolling, subheaders remain pinned to the top of the screen until pushed off screen by the next subheader.

This feature is relying on the CSS sticky positioning.
Unfortunately it's [not implemented](https://caniuse.com/#search=sticky) by all the browsers we are supporting. We default to `disableSticky` when not supported.

{{"demo": "pages/components/lists/PinnedSubheaderList.js"}}

## Inset List

{{"demo": "pages/components/lists/InsetList.js"}}

## Virtualized List

In the following example, we demonstrate how to use [react-window](https://github.com/bvaughn/react-window) with the `List` component.
It renders 200 rows and can easily handle more.
Virtualization helps with performance issues.

{{"demo": "pages/components/lists/VirtualizedList.js"}}

We encourage the use of [react-window](https://github.com/bvaughn/react-window) when possible.
If this library doesn't cover your use case, you should consider using [react-virtualized](https://github.com/bvaughn/react-virtualized), then alternatives like [react-virtuoso](https://github.com/petyosi/react-virtuoso).
