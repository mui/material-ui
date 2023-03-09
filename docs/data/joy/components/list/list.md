---
product: joy-ui
title: React List component
components: List, ListDivider, ListItem, ListItemButton, ListItemContent, ListItemDecorator, ListSubheader
githubLabel: 'component: list'
---

# Lists

<p class="description">Use lists as an organizational tool to enhance the readability and organization of content.</p>

## Introduction

The `List` component is a versatile tool that presents information in a concise, easy-to-follow format through a continuous, vertical index of text or images.

{{"demo": "ListUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import List from '@mui/joy/List';
```

The `List` component is made up of several individual pieces that, when combined, create a customized list to suit the needs of your project.
The list-related components wrap around content for specific purposes. An overview of the individual components within the Joy UI's `List` component are:

- [`List`](#basic-usage): A wrapper for list items (defaulting as `ul`).
- [`ListItem`](#basic-usage): A common list item (default as `li`).
- [`ListItemButton`](#actionable): An action element to be used inside a list item.
- [`ListItemDecorator`](#decorator): A decorator of a list item, usually used to display an icon.
- [`ListItemContent`](#ellipsis-content): A container inside a list item, used to display text content.
- [`ListDivider`](#divider): A separator between list items.
- [`ListSubheader`](#nested-list): A label for a nested list.

## Customization

### System Props

The List component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid`, `soft`, `outlined`, and `plain`.

### Sizes

The `size` prop comes in three sizes: `sm`, `md`, and `lg`.
It controls the font-size and general density of the list.

{{"demo": "SizesList.js"}}

:::info
If you are looking to add more sizes to the component, you can check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.

### Decorators

By default, the List component does not apply any specific list style types by default.
If you'd like to add supporting icons or elements to the list item, you can use the `ListItemDecorator` prop.

{{"demo": "DecoratedList.js"}}

:::info
The `ListItemDecorator` comes with a minimum set width that can be adjusted using the `--list-decorator-size` CSS variable within the `List` component.
:::

### Horizontal list

To show a list in a horizontal direction, you can use the `orientation="horizontal"` prop on the `List` component.

{{"demo": "HorizontalList.js"}}

:::warning
While nested lists will not work in a horizontal direction, you can create a custom pop-up component to achieve a similar effect (see the [Navigation menu](#navigation-menu) example).
:::

### Semantic elements

If you would like to control which HTML tag should be rendered in a one-off situation, you can use the `component` prop.

```js
<List component="ol">
```

In the example below, we're rendering the `List` component as an HTML `<nav>` element.

{{"demo": "NavList.js"}}

:::info
**Tip**: The `ListItem` component is optional in this case.
If used, it will automatically change the semantic element from the default `li` to `div`.
:::

## Basic Usage

### Ellipsis content

When working with longer content in a `List` component, you can use the `ListItem` component in combination with `<Typography noWrap>` to display an ellipsis when the content exceeds the available space.
This can help to keep the list items visually consistent and prevent text from overflowing outside of the list item's container.

{{"demo": "EllipsisList.js"}}

### Divider

The `ListDivider` component comes with four `inset` patterns:

- Default (no `inset` prop provided): stretches form one edge of the list to the other.
- `inset="gutter"`: from the start of `ListItemDecorator` to the end of the content.
- `inset="startDecorator"`: from the start of `ListItemDecorator` to the end of the edge of the container.
- `inset="startContent"`: from the start of the content to the edge of the container.

{{"demo": "DividedList.js"}}

If you're using a horizontal list, only `inset="gutter"` will work as the list divider.

{{"demo": "HorizontalDividedList.js"}}

### Sticky item

To have a sticky list item, you can use `List` as a child of the `Sheet` component.
On the item you wish to stick, you can then add the `sticky` prop.

The `Sheet` component automatically adjusts the `sticky` list item to have the same background so that content does not overflow when scrolling.

{{"demo": "StickyList.js"}}

:::info
By default, this works on both light and dark modes.
:::

### Nested list

Within the `ListItem` component, you can create a nested list using the `nested` prop.
The nested list will inherit the list `size` as well as other CSS variables like `--List-radius` and `--List-item-radius` from the root `List` component to adjust the design consistently.
The layout and spacing of the nested list will remain intact, however, as if it isn't nested.

{{"demo": "NestedList.js"}}

:::info
Nested lists will stick to the left of the root list, by default. If you need to add spacing to the start of the nested list you can use `--List-nestedInsetStart: ${value}`.

```js
<List sx={{ '--List-nestedInsetStart': '1rem' }}> {/* This is the root List */}
```

:::

### Interactive list items

To make a list item interactive, you can use `ListItemButton` _inside_ a `ListItem`.

{{"demo": "ActionableList.js"}}

To add a secondary action to the `ListItemButton`, wrap it in a `ListItem` component and then add the desired start or end action elements to it.

{{"demo": "SecondaryList.js"}}

:::info
The `ListItemButton` and the secondary action render as siblings so that the rendered semantic element is appropriately adjusted.

```js
<ul>                    {/* List */}
  <li>                  {/* ListItem */}
    <div role="button"> {/* ListItemButton */}
    <button>            {/* IconButton */}
```

:::

The `selected` prop in the `ListItemButton` component can be used to indicate whether an item is currently selected or not.
When the item is selected, it applies `color="primary"` and a few extra styles, such as font weight, to visually communicate the selected state.

{{"demo": "SelectedList.js"}}

:::info
A selected `ListItemButton` does not apply `:hover` or `:active` global variant styles.
:::

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

## CSS variables

Play around with all the CSS variables available in the list component to see how the design changes.

You can use these to customize the component with both the `sx` prop and the theme.

{{"demo": "ListVariables.js", "hideToolbar": true}}

## Accessibility

To ensure the `List` component is accessible, here are some factors you should consider:

- Use the appropriate HTML semantic element for the list (eg. `ol` or `ul`), to ensure assistive technologies can correctly interpret the list structure.
- Make sure to use a meaningful name that describes the content of the list in the `aria-labelledby` prop.
- Use `role` attributes to provide additional information about the purpose of the list and its items.
  For example, use `role="list"` for the list and `role="listitem"` for each list item.

## Anatomy

The `List` component, by default, is composed of a root `<ul>` element that contains one or more child `<li>` elements.

```html
<ul class="MuiList-root">
  <li class="MuiListItem-root">
    <!-- List item content --->
  </li>
</ul>
```
