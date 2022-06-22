---
product: base
title: Unstyled React Menu components and hooks
components: MenuUnstyled, MenuItemUnstyled
githubLabel: 'component: menu'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
packageName: '@mui/base'
---

# Unstyled menu

<p class="description">The menu components provide your users with a list of options on temporary surfaces.</p>

## Introduction

The `MenuUnstyled` component gives users a list of items in a popup that they can navigate through with a mouse or keyboard.
It renders an unordered list (`<ul>`) by default.

Use `MenuItemUnstyled` to add items to the menu.
These are rendered as `<li>` elements.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Components

### Anatomy

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

### Basic usage

The following demo shows how to create and style a menu component.
Click **Dashboard** to view the menu—notice that it uses the [`Popper`](/base/react-popper/) component to visually break out of its parent container:

{{"demo": "MenuSimple.js"}}

### Wrapping MenuItems

`MenuItemUnstyled` components don't have to be direct children of a `MenuUnstyled` component.
You can wrap them in any component needed to achieve the desired appearance.

In addition to `MenuItemUnstyled` components, the `MenuUnstyled` component can also contain non-interactive children, such as helper text.

The following demo shows an example of a menu with items grouped under non-interactive headers, along with helper text that displays the **Current zoom level**:

{{"demo": "WrappedMenuItems.js"}}

### Customization

#### Slots

`MenuUnstyled` has two slots:

- Root - represents the popup container the menu is placed in; set to `PopperUnstyled` by default.
  Can be customized by setting the `component` or `components.Root` props.
- Listbox - set to `<ul>` by default

The `MenuItemUnstyled` component has one slot: the root, which renders an `<li>` element by default.
Just like `MenuUnstyled`, it can be customized by setting the `component` or `components.Root` props.

#### CSS classes

`MenuUnstyled` can set the following class:

- `Mui-expanded` - set when the menu is open; this class is set on both Root and Popper slots

`MenuItemUnstyled` can set the following classes:

- `Mui-disabled` - set when the MenuItem has the `disabled` prop
- `Mui-focusVisible` - set when the MenuItem is highligthed via keyboard navigation.
  This is a polyfill for the native `:focus-visible` pseudoclass as it's not available in Safari.

## Hooks

```jsx
import { useMenu } from '@mui/base/MenuUnstyled';
import { useMenuItem } from '@mui/base/MenuItemUnstyled';
```

You can use the `useMenu` and `useMenuItem` hooks to apply the functionality of the unstyled menu components to a different component.
These hooks gives you the most customization options, but require more work to implement.
Using the hooks allows you to take full control over the rendered components, their props and CSS classes.

{{"demo": "UseMenu.js"}}

Unstyled components and their corresponding hooks work interchangeably with one another—for example, you can create a `MenuUnstyled` component that contains menu items built with the `useMenuItem` hook.
