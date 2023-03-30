---
product: joy-ui
title: React List component
components: List, ListDivider, ListItem, ListItemButton, ListItemContent, ListItemDecorator, ListSubheader
githubLabel: 'component: list'
---

# Lists

<p class="description">Lists are continuous, vertical indexes of text or images.</p>

## Introduction

Joy UI provides four list-related components:

- [`List`](#basic-usage): A wrapper for list items (defaulting as `ul`).
- [`ListItem`](#basic-usage): A common list item (default as `li`).
- [`ListItemButton`](#actionable): An action element to be used inside a list item.
- [`ListItemDecorator`](#decorator): A decorator of a list item, usually used to display an icon.
- [`ListItemContent`](#ellipsis-content): A container inside a list item, used to display text content.
- [`ListDivider`](#divider): A separator between list items.
- [`ListSubheader`](#nested-list): A label for a nested list.

{{"demo": "ListUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

export default function MyApp() {
  return (
    <List aria-label="basic-list">
      <ListItem>Hello, world!</ListItem>
      <ListItem>Bye bye, world!</ListItem>
    </List>
  );
}
```

### Basic usage

Use the `List` and `ListItem` components to create a basic, non-interactive, list.
Make sure to use a meaningful name that describe the content of the list in the `aria-labelledby` prop.

{{"demo": "BasicList.js"}}

### Sizes

Use the `size` prop to control font-size and general list density.

{{"demo": "SizesList.js"}}

:::info
To learn how to add more sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Decorator

Use the `ListItemDecorator` component to add supporting icons or elements to the list item.

It comes with a minimum set width that you can adjust via the `--ListItemDecorator-size` CSS variable within the `List` component.

{{"demo": "DecoratedList.js"}}

### Ellipsis content

When dealing with long content, use the `ListItemComponent` together with `<Typography noWrap>` to show ellipsis.

{{"demo": "EllipsisList.js"}}

### Divider

The `ListDivider` component comes with four `inset` patterns:

- Default (without providing the `inset` prop): stretches from edge to edge of the list.
- `inset="gutter"`: from the start of the decorator to the end of the content.
- `inset="startDecorator"`: from the start of the decorator to the end of the list.
- `inset="startContent"`: from the start of the content to the end of the list.

{{"demo": "DividedList.js"}}

For horizontal list, only `inset="gutter"` works on list divider.

{{"demo": "HorizontalDividedList.js"}}

### Sticky item

To have a sticky list item, use a `List` as a child of the `Sheet` component.
Then, on the item you wish to stick, add the `sticky` prop.

The `Sheet` component automatically adjusts the `sticky` list item to have the same background so that the content does not overflow when scroll.
It works by default on both light and dark modes.

{{"demo": "StickyList.js"}}

### Nested list

Use the `nested` prop, within the `ListItem` component, to create a nested list.
Note that layout and spacing of the nested list remain intact, as if it isn't nested.

The nested list inherits the list `size` and a few other CSS variables, such as `--List-radius` and `--ListItem-radius` from the root `List` component to adjust the design consistently.

{{"demo": "NestedList.js"}}

:::info
By default, nested lists stick to the left of the root list.
To add spacing to the start of the nested list, use `--List-nestedInsetStart: ${value}`:

```js
<List sx={{ '--List-nestedInsetStart': '1rem' }}> {/* This is the root List */}
```

:::

### Horizontal list

To show a list in a horizontal direction, use the `orientation="horizontal"` prop on the `List` component.

:::warning
Nested lists don't work in the horizontal direction.
To do that, create a custom pop-up component instead (see the [Navigation menu](#navigation-menu) example).
:::

{{"demo": "HorizontalList.js"}}

### Changing the semantic element

To control which HTML tag should be rendered in a given, one-off, situation, use the `component` prop.

```js
<List component="ol">
```

#### Non-list

In the example below, we're rendering a `List` as a HTML `<nav>` element.

:::info
**Tip**: The `ListItem` component is optional in this case－if used, it will change the semantic element from the default `li` to `div` automatically.
:::

{{"demo": "NavList.js"}}

### Actionable

To make a list item interactive, use `ListItemButton` **inside** a `ListItem`.

{{"demo": "ActionableList.js"}}

### Secondary action

To add a secondary action to the `ListItemButton`, wrap it in a `ListItem` component and then add the desired start or end action elements to it.

{{"demo": "SecondaryList.js"}}

The `ListItemButton` and the secondary action render as siblings, that way, the semantic rendered element is appropriately adjusted.

```js
<ul>                    {/* List */}
  <li>                  {/* ListItem */}
    <div role="button"> {/* ListItemButton */}
    <button>            {/* IconButton */}
```

### Selected

Use the `selected` prop to signal whether a `ListItemButton` is selected or not.
It applies `color="primary"` and a few extra styles (e.g. font weight) to visually communicate the selected state.

:::info
A selected `ListItemButton` does not apply `:hover` and `:active` global variant styles.
:::

{{"demo": "SelectedList.js"}}

## CSS variables

Play around with all the CSS variables available in the list component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "ListVariables.js", "hideToolbar": true}}

## Common examples

### iOS settings

This example uses nested lists to split the settings into groups.

{{"demo": "ExampleIOSList.js"}}

### Gmail navigation

Inspired by Gmail's web sidenav.

{{"demo": "ExampleGmailList.js"}}

### Collapsible list

Inspired by [Gatsby's documentation](https://www.gatsbyjs.com/docs) sidenav.
This example uses the start action (a prop of `ListItem`) prop to create a collapsible button.

{{"demo": "ExampleCollapsibleList.js"}}

### Navigation menu

Inspired by the [APG Navigation Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/) design pattern.
This example uses a combination of horizontal and vertical lists to form the navigation menu bar.

It also supports keyboard navigation, inspired by the [Roving UX](https://github.com/argyleink/roving-ux) technique.

{{"demo": "ExampleNavigationMenu.js"}}
