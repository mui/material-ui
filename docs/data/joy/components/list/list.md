---
product: joy-ui
title: React List component
githubLabel: 'component: list'
---

# Lists

<p class="description">Lists are continuous, vertical indexes of text or images.</p>

There are four list-related components in Joy UI:

- `List`: A wrapper for list items (defaulting as `ul`).
- `ListItem`: The list item (default as `li`).
- `ListItemButton`: An action element to be used inside a list item.
- `ListItemDecorator`: A decorator of a list item, usually used to display an icon.
- `ListItemContent`: A container inside a list item, used to display text content.
- `ListDivider`: A separator between list items.

## Basic

Use the `List` and `ListItem` components to create a basic, non-interactive, list.
For the `aria-labelledby` attribute, make sure to use a name that describe what the list is about.

{{"demo": "BasicList.js"}}

You can use the `component` prop to choose what HTML element the list should render as for screen reader.
Here's an ordered list as an example:

```js
<List component="ol">
```

## Decorator

Decorators are usually graphic elements that appear before or after the list item title.
Use the `ListItemDecorator` component to display them.

It comes with a minimum set width that you can adjust via the `--List-decorator-width` variable in the `List` component.

{{"demo": "DecoratedList.js"}}

## Ellipsis content

To show to ellipsis for content with long text, use the `ListItemContent` component in combination with `<Typography noWrap>`.

{{"demo": "EllipsisList.js"}}

## Divider

The `ListDivider` component comes with four `inset` patterns:

- Default (without providing the `inset` prop): stretches from edge to edge of the list.
- `inset="gutter"`: from the start of the decorator to the end of the content.
- `inset="startDecorator"`: from the start of the decorator to the end of the list.
- `inset="startContent"`: from the start of the content to the end of the list.

{{"demo": "DividedList.js"}}

## Actionable

To make a list item interactive, use `ListItemButton` **inside** a `ListItem`.
They are designed to give the same layout and spacing when used together.

{{"demo": "ActionableList.js"}}

### Non-list

If you want the same list styles but don't want the component to be rendered as a list (`ul` element), use an appropriate value for the `component` prop.
The `ListItem` component is optional－if used, it will change the semanting from the default `li` to `div` automatically.

In the example below, we're rendering a `List` as a `<nav>` HTML element.

{{"demo": "NavList.js"}}

### Selected

You can use the `selected` prop to signal whether a `ListItemButton` is selected or not.
It will apply `color="primary"` and a few extra styles (e.g. font weight) to visually communicate the selected state.

{{"demo": "SelectedList.js"}}

### Variants and colors

`ListItemButton` has `plain` and `neutral` as default values for the variant and color props, respectivelly.
Play aroun with them to create various designs of the selected list item.

{{"demo": "VariantsColorsList.js", "hideToolbar": true}}

### Secondary action

To add a secondary action to the `ListItemButton` wrap it in a `ListItem` component and then provide the desired start or end action elements to it.

{{"demo": "SecondaryList.js"}}

The `ListItemButton` and the secondary action render as siblings so that they can be interacted with appropriate semantics.

```js
<ul>                    {/* List */}
  <li>                  {/* ListItem */}
    <div role="button"> {/* ListItemButton */}
    <button>            {/* IconButton */}
```

## Sizes

Use the `size` prop to control font-size and density of the list.

{{"demo": "SizesList.js"}}

## Nested list

Use the `nested` prop, within the `ListItem` component, to create a nested list.
Note that layout and spacing of the nested list remain intact, as if it isn't nested.

The nested list inherits the list `size` and a few CSS variables, such as `--List-radius` and `--List-item-radius` from the root `List` component to make the design consistent.

{{"demo": "NestedList.js"}}

:::info
By default, nested lists stick to the left of the root list.
To add spacing to the start of the nested list, use `--List-nestedInsetStart: ${value}`:

```js
<List sx={{ '--List-nestedInsetStart': '1rem' }}> {/* This is the root List */}
```

:::

## Sticky item

The `Sheet` component automatically adjusts the `sticky` list item to have the same background so that the content does not overflow when scroll.
It works by default on both light and dark modes.

{{"demo": "StickyList.js"}}

## Horizontal list

To show a list in a horizontal direction, use the `row` prop on the `List` component.

:::warning
**Note:** Nested lists don't work in the horizontal direction.
To do that, you'll need to create a custom pop-up component instead (see the [Navigation menu](#navigation-menu) example).
:::

{{"demo": "HorizontalList.js"}}

## Component variables

Play around with each CSS variables to see how they affect the list design.

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

Inspired by the [APG Navigation Menubar](https://www.w3.org/WAI/ARIA/apg/example-index/menubar/menubar-navigation.html) design pattern.
This example uses a combination of horizontal and vertical lists to form the navigation menu bar.

It also supports keyboard navigation, inspired by the [roving ux](https://github.com/argyleink/roving-ux) technique.

{{"demo": "ExampleNavigationMenu.js"}}
