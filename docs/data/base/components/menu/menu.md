---
product: base
title: Unstyled React Menu components and hooks
components: MenuUnstyled, MenuItemUnstyled
hooks: useMenu, useMenuItem
githubLabel: 'component: menu'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
---

# Unstyled Menu

<p class="description">The Menu components provide your users with a list of options on temporary surfaces.</p>

## Introduction

The Unstyled Menu component gives users a list of items in a popup that they can navigate through with a mouse or keyboard.
It renders an unordered list (`<ul>`) by default.

Use the Unstyled Menu Item to add items to the menu.
These are rendered as `<li>` elements.

{{"demo": "UnstyledMenuIntroduction.tsx", "defaultCodeOpen": false, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Components

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component collection using the following basic elements:

```jsx
import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';

export default function MyApp() {
  return (
    <MenuUnstyled>
      <MenuItemUnstyled>{/* item one */}</MenuItemUnstyled>
      <MenuItemUnstyled>{/* item two */}</MenuItemUnstyled>
    </MenuUnstyled>
  );
}
```

### Basics

The Unstyled Menu serves as a replacement for the native HTML `<ul>`, and the Unstyled Menu Item corresponds to the `<li>` tag.

The following demo shows how to create and style a Menu component.
Click **Dashboard** to view the menu—notice that it uses the built-in [Unstyled Popper](/base/react-popper/) component to visually break out of its parent container:

{{"demo": "MenuSimple.js"}}

### Anatomy

The Unstyled Menu component is composed of a root slot that renders an Unstyled Popper `<div>` by default.
It contains one interior listbox `<ul>` slot.
The Unstyled Menu Item has a single root `<li>` slot.

```html
<div class="MuiMenuUnstyled-root">
  <ul class="MuiMenuUnstyled-listbox">
    <li class="MuiMenuItemUnstyled-root">List item</li>
  </ul>
</div>
```

### Slot props

:::info
The following props are available on all non-utility Base components.
See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<MenuItemUnstyled component="span" />
```

Use the `slots` prop to override any interior slots in addition to the root:

```jsx
<MenuUnstyled slots={{ root: 'nav', listbox: 'ol' }} />
```

:::warning
If the root element is customized with both the `component` and `slots` props, then `component` will take precedence.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-listbox` to the listbox slot:

```jsx
<MenuUnstyled slotProps={{ listbox: { className: 'my-listbox' } }} />
```

### CSS classes

Unstyled Menu can set the following class:

- `Mui-expanded` - set when the menu is open; this class is set on both Root and Popper slots

Unstyled Menu Item can set the following classes:

- `Mui-disabled` - set when the MenuItem has the `disabled` prop
- `Mui-focusVisible` - set when the MenuItem is highlighted via keyboard navigation.
  This is a polyfill for the native `:focus-visible` pseudoclass as it's not available in Safari.

## Hooks

```jsx
import { useMenu } from '@mui/base/MenuUnstyled';
import { useMenuItem } from '@mui/base/MenuItemUnstyled';
```

The `useMenu` and `useMenuItem` hooks let you apply the functionality of the Menu components to fully custom components.
They return props to be placed on the custom components, along with fields representing the components' internal states.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

The following demo shows how to build a menu using hooks:

{{"demo": "UseMenu.js"}}

Unstyled components and their corresponding hooks work interchangeably with one another—for example, you can create an Unstyled Menu component that contains menu items built with the `useMenuItem` hook.

## Customization

### Wrapping MenuItems

Unstyled Menu Item components don't have to be direct children of a Unstyled Menu component.
You can wrap them in any component needed to achieve the desired appearance.

In addition to Unstyled Menu Item components, the Unstyled Menu component can also contain non-interactive children, such as helper text.

The following demo shows an example of a menu with items grouped under non-interactive headers, along with helper text that displays the **Current zoom level**:

{{"demo": "WrappedMenuItems.js"}}
