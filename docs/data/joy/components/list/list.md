---
productId: joy-ui
title: React List component
components: List, ListDivider, ListItem, ListItemButton, ListItemContent, ListItemDecorator, ListSubheader
githubLabel: 'component: list'
---

# Lists

<p class="description">Lists are organizational tools that enhance the readability and organization of content.</p>

## Introduction

Lists present information in a concise, easy-to-follow format through a continuous, vertical index of text or images.

Joy UI Lists are implemented using a collection of related components:

- [List](#basics) - a wrapper for list items. Renders as a `<ul>` by default.
- [List Item](#basics) - a common list item. Renders as an `<li>` by default.
- [List Item Button](#actionable) - an action element to be used inside a list item.
- [List Item Decorator](#decorator) - a decorator of a list item, usually used to display an icon.
- [List Item Content](#ellipsis-content) - a container inside a list item, used to display text content.
- [List Divider](#divider) - a separator between list items.
- [List Subheader](#nested-list) - a label for a nested list.

{{"demo": "ListUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
```

## Customization

### Variants

The List component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid`, `soft`, `outlined`, and `plain`.

### Sizes

The List component comes in three sizes: `sm`, `md`, and `lg`.
The size of the List determines its font size and density.

{{"demo": "SizesList.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.

### Decorators

Use the List Item Decorator component to add supporting icons or elements to the list item.

{{"demo": "DecoratedList.js"}}

:::info
The `ListItemDecorator` comes with a minimum set width that can be adjusted using the `--list-decorator-size` CSS variable within the List component.
:::

### Horizontal list

To show a list in a horizontal direction, you can use the `orientation="horizontal"` prop on the List component.

{{"demo": "HorizontalList.js"}}

:::warning
While nested lists will not work in a horizontal direction, you can create a custom pop-up component to achieve a similar effect (see the [Navigation menu](#navigation-menu) example).
:::

### Semantic elements

If you would like to control which HTML tag should be rendered in a one-off situation, you can use the `component` prop.

```js
<List component="ol">
```

The example below renders the List component as an HTML `<nav>` element.

{{"demo": "NavList.js"}}

:::info
The List Item component is optional in this case.
If used, it will automatically change the semantic element from the default `<li>` to `<div>`.
:::

### Ellipsis content

When working with longer content in a List, you can use the List Item component in combination with `<Typography noWrap />` to display an ellipsis when the content exceeds the available space.
This can help to keep the list items visually consistent and prevent text from overflowing outside of the list item's container.

{{"demo": "EllipsisList.js"}}

### Divider

The List Divider component comes with four `inset` patterns:

- Default (no `inset` prop provided): stretches form one edge of the list to the other.
- `inset="gutter"`: from the start of List Item Decorator to the end of the content.
- `inset="startDecorator"`: from the start of List Item Decorator to the end of the edge of the container.
- `inset="startContent"`: from the start of the content to the edge of the container.

{{"demo": "DividedList.js"}}

If you're using a horizontal list, only `inset="gutter"` will work as the list divider.

{{"demo": "HorizontalDividedList.js"}}

### Sticky item

To have a sticky list item, you can use List as a child of the Sheet component.
On the item you wish to stick, you can then add the `sticky` prop.

The Sheet component automatically adjusts the `sticky` list item to have the same background so that content does not overflow when scrolling.

{{"demo": "StickyList.js"}}

:::info
By default, this works on both light and dark modes.
:::

### Nested list

Within the List Item component, you can create a nested list using the `nested` prop.
The nested list will inherit the list `size` as well as other CSS variables like `--List-radius` and `--ListItem-radius` from the root List component to adjust the design consistently.
The layout and spacing of the nested list will remain intact, however, as if it isn't nested.

{{"demo": "NestedList.js"}}

:::info
Nested lists will stick to the left of the root list, by default. If you need to add spacing to the start of the nested list you can use `--List-nestedInsetStart: ${value}`.

```js
<List sx={{ '--List-nestedInsetStart': '1rem' }}> {/* This is the root List */}
```

:::

### Interactive list items

To make a list item interactive, you can use List Item Button _inside_ a List Item.

{{"demo": "ActionableList.js"}}

To add a secondary action to the List Item Button, wrap it in a List Item component and then add the desired start or end action elements to it.

{{"demo": "SecondaryList.js"}}

:::info
The List Item Button and the secondary action render as siblings so that the rendered semantic element is appropriately adjusted.

```js
<ul>                    {/* List */}
  <li>                  {/* ListItem */}
    <div role="button"> {/* ListItemButton */}
    <button>            {/* IconButton */}
```

### Selected

Use the `selected` prop to signal whether a List Item Button is selected or not.
It applies `color="primary"` and a few extra styles (e.g. font weight) to visually communicate the selected state.

:::info
A selected List Item Button does not apply `:hover` and `:active` global variant styles.
:::

The `selected` prop in the List Item Button component can be used to indicate whether an item is currently selected or not.
When the item is selected, it applies `color="primary"` and a few extra styles, such as font weight, to visually communicate the selected state.

{{"demo": "SelectedList.js"}}

## CSS variables playground

Play around with all the CSS variables available in the list component to see how the design changes.

{{"demo": "ListVariables.js", "hideToolbar": true, "bg": "gradient"}}

## Common examples

### iOS settings

This example uses nested lists to split the settings into groups.

{{"demo": "ExampleIOSList.js"}}

### Gmail navigation

Inspired by Gmail's web sidenav.

{{"demo": "ExampleGmailList.js"}}

### Collapsible list

Inspired by [Gatsby's documentation](https://www.gatsbyjs.com/docs) sidenav.
This example uses the start action (a prop of List Item) prop to create a collapsible button.

{{"demo": "ExampleCollapsibleList.js"}}

### Navigation menu

Inspired by the [APG Navigation Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/) design pattern.
This example uses a combination of horizontal and vertical lists to form the navigation menu bar.

It also supports keyboard navigation, inspired by the [Roving UX](https://github.com/argyleink/roving-ux) technique.

{{"demo": "ExampleNavigationMenu.js"}}

## CSS variables

Play around with all the CSS variables available in the list component to see how the design changes.

You can use these to customize the component with both the `sx` prop and the theme.

{{"demo": "ListVariables.js", "hideToolbar": true}}

## Accessibility

To ensure that your List is accessible, here are some factors you should consider:

- Use the appropriate HTML semantic element for the list (eg. `ol` or `ul`), to ensure assistive technologies can correctly interpret the list structure.
- Make sure to use a meaningful name that describes the content of the list in the `aria-labelledby` prop.
- Use `role` attributes to provide additional information about the purpose of the list and its items.
  For example, use `role="list"` for the list and `role="listitem"` for each list item.

## Anatomy

The List component, by default, is composed of a root `<ul>` element that contains one or more child `<li>` elements.

```html
<ul class="MuiList-root">
  <li class="MuiListItem-root">
    <!-- List item content --->
  </li>
</ul>
```
