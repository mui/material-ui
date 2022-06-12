---
product: joy-ui
title: React List component
githubLabel: 'component: list'
---

# Lists

<p class="description">Lists are continuous, vertical indexes of text or images.</p>

Joy provides 4 List related components:

- `List`: The wrapper of list items (default as `ul`).
- `ListItem`: The list item (default as `li`).
- `ListItemButton`: The action element that is used inside a list item.
- `ListItemDecorator`: The decorator of an item, usually used to display an icon.
- `ListItemContent`: The container inside a list item, used to display text content.
- `ListDivider`: The separator between list items.

## Basic

Use `List` and `ListItem` to create a simple list without interaction. It is recommended to provide a text that describe the list.

{{"demo": "BasicList.js", "bg": true}}

:::info
Use `component` prop to control the semantic element of the component for screen readers. eg, to render an ordered list:

```js
<List component="ol">
```

:::

## Decorator

To show a decorator, eg. an icon, use `ListItemDecorator` component. It comes with a minimum width that you can adjust via `--List-decorator-width` on the `List` component.

{{"demo": "DecoratedList.js", "bg": true}}

## Ellipsis content

To show to ellipsis for the content that has long text, use `ListItemContent` component in combination with a `<Typography noWrap>`.

{{"demo": "EllipsisList.js", "bg": true}}

## Divider

The `ListDivider` comes with 4 `inset` patterns:

- Default (without providing the `inset` prop): stretches from edge to edge of the list.
- `inset="gutter"`: from the start of the decorator to the end of the content.
- `inset="startDecorator"`: from the start of the decorator to the end of the list.
- `inset="startContent"`: from the start of the content to the end of the list.

{{"demo": "DividedList.js", "bg": true}}

## Actionable

To make a list item interactive, use `ListItemButton` **inside** a `ListItem`. They are designed to give the same layout and spacing when used together.

{{"demo": "ActionableList.js", "bg": true}}

### Non-list

If you don't want to use only the style without rendering a list (`ul`) element, provide an appropriate `component` prop. The `ListItem` component is optional (if used, it will change the semantic from the default `li` to `div` automatically).

{{"demo": "NavList.js", "bg": true}}

### Selected

When `ListItemButton` receives a `selected` prop, it applies the `color="primary"` and extra style (eg. font-weight) to the button.

{{"demo": "SelectedList.js", "bg": true}}

### Variants and colors

The `ListItemButton` uses the global variant `plain` and color `neutral` by default. You can change them to create various designs of the selected list item.

{{"demo": "VariantsColorsList.js", "hideToolbar": true}}

### Secondary action

To create a secondary interaction, you have to wrap the `ListItemButton` with a `ListItem` and then provide the start/end action element to it.

{{"demo": "SecondaryList.js", "bg": true}}

:::info
The list item button and the secondary action render as sibling so that they can be interacted in an appropriate semantics.

```js
<ul>                    {/* List */}
  <li>                  {/* ListItem */}
    <div role="button"> {/* ListItemButton */}
    <button>            {/* IconButton */}
```

:::

## Sizes

Use `size` prop to control the font-size and density of the list.

{{"demo": "SizesList.js", "bg": true}}

## Nested list

To create a nested list, provides `nested` to the `ListItem` that contain a nested list. The layout and spacing of the nested list remains intact as if it is not nesting.

The nested list inherits `size` and CSS variables, eg. `--List-radius`, `--List-item-radius`, from the root `List` to make the design consistent.

{{"demo": "NestedList.js", "bg": true}}

:::info
By default, the nested lists stick to the left of the root list. If you want to add spacing to the start of the nested lists, use `--List-nestedInsetStart: ${value}`:

```js
<List sx={{ '--List-nestedInsetStart': '1rem' }}> {/* This is the root List */}
```

:::

## Sticky item

The `Sheet` component automatically adjusts the `sticky` list item to have the same background so that the content does not overflow when scroll. It works on light and dark mode by default.

{{"demo": "StickyList.js", "bg": true}}

## Horizontal list

To show a list in a horizontal direction, provide `row` prop to the `List` component.

:::warning
Nested list does not work in horizontal direction. You should create a custom popup instead (take a look at the [Navigation menu](#navigation-menu) example).
:::

{{"demo": "HorizontalList.js", "bg": true}}

## Component variables

{{"demo": "ListVariables.js", "bg": true, "hideToolbar": true}}

## Common examples

### iOS Settings

Inspired by the iPhone settings screen. This example uses nested lists to split settings into groups.

{{"demo": "ExampleIOSList.js", "bg": true}}

### Gmail navigation

Inspired by Gmail web application sidebar.

{{"demo": "ExampleGmailList.js", "bg": true}}

### Collapsible list

Inspired by [Gatsby documentation](https://www.gatsbyjs.com/docs) sidebar. This example use start action (a prop of `ListItem`) to create a collapsible button.

{{"demo": "ExampleCollapsibleList.js", "bg": true}}

### Navigation menu

Inspired by the [APG Navigation Menubar](https://www.w3.org/WAI/ARIA/apg/example-index/menubar/menubar-navigation.html) design pattern. This example demonstrates a combination of horizontal and vertical list to form a navigation menu bar.

It also supports keyboard navigation which inspired by the [roving ux](https://github.com/argyleink/roving-ux) technique.

{{"demo": "ExampleNavigationMenu.js", "bg": true}}
