---
productId: base-ui
title: React Menu components and hooks
components: Menu, MenuItem, MenuButton, Dropdown
hooks: useMenu, useMenuItem, useMenuButton, useDropdown
githubLabel: 'component: menu'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
---

# Menu

<p class="description">The Menu components provide your users with a list of options on temporary surfaces.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Menu component gives users a list of items in a popup that they can navigate through with a mouse or keyboard.
It renders an unordered list (`<ul>`) by default.

Use the Menu Item to add items to the Menu.
These are rendered as `<li>` elements.

{{"demo": "MenuIntroduction.js", "defaultCodeOpen": false, "bg": "gradient"}}

## Components

### Usage

After [installation](/base-ui/getting-started/quickstart/#installation), you can start building with this component collection using the following basic elements:

```jsx
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';

export default function MyApp() {
  return (
    <Dropdown>
      <MenuButton>Settings</MenuButton>
      <Menu>
        <MenuItem>My account</MenuItem>
        <MenuItem>Notification preferences</MenuItem>
      </Menu>
    </Dropdown>
  );
}
```

### Basics

The Menu replaces the native HTML `<ul>`, and the Menu Item corresponds to the `<li>` tag.

The visibility of the menu is controlled by the Menu Button.

The following demo shows how to create and style a Menu component.
Click **Dashboard** to view the menu.
Notice that it uses the built-in [Popper](/base-ui/react-popper/) component to break out of its parent container visually:

{{"demo": "MenuSimple"}}

The Dropdown should be the outermost component—all other menu-related components must be placed as its children (not necessarily as direct ones).
If you need to control the open state of the menu or react to its changes, place an `open`/`onOpenChange` props on the Dropdown.

The Dropdown should contain at most one Menu Button and one Menu.
It will wire them together, so that pressing the button will open the menu.
It also takes care of assigning proper accessibility attributes, so the menu can be used with assistive technologies or a keyboard.

The Menu hosts Menu Items.
They can be wrapped in arbitrary tags and components or even grouped together.
Clicking on a menu item closes the associated menu.

### Anatomy

- The Menu component comprises a root slot that renders an `<div>` by default and a listbox slot that is a `<li>`.
- The Menu Item has a single root `<li>` slot.
- The Menu Button is a native HTML `<button>`.
- The Dropdown does not render any HTML element.
  It only provides a context that links Menu Button and Menu.
  Thanks to this context, developers do not have to wire these components using custom logic.

```html
<button class="MuiMenuButton-root">Click me</button>
<div class="MuiMenu-root">
  <ul class="MuiMenu-listbox">
    <li class="MuiMenuItem-root">List item</li>
  </ul>
</div>
```

### Custom structure

Use the `slots` prop to override the slots on any component except the Dropdown:

```jsx
<Menu slots={{ listbox: 'ol' }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for complete details.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-listbox` to the listbox slot:

```jsx
<Menu slotProps={{ listbox: { className: 'my-listbox' } }} />
```

#### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component. This way, you can safely provide the custom root's props directly on the component:

```tsx
<Menu<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies to props specific to custom primitive elements:

```tsx
<Menu<'ol'> slots={{ root: 'ol' }} start={5} />
```

### CSS classes

Menu can set the following class:

- `Mui-expanded` - set on the root slot when the Menu is open

Menu Item can set the following classes:

- `Mui-disabled` - set when the Menu Item has the `disabled` prop
- `Mui-focusVisible` - set when the Menu Item is highlighted via keyboard navigation.
  This is a polyfill for the native `:focus-visible` pseudoclass, as it's not available in older versions of Safari.

On the Menu Button, these classes are available:

- `Mui-active` - set when the button is pressed.
- `Mui-disabled` - set when the button has the `disabled` prop.
  It's equivalent to the native `:active` pseudoclass.
- `Mui-expanded` - set when the menu associated with the given button is open.

## Hooks

```jsx
import { useMenu } from '@mui/base/useMenu';
import { useMenuItem } from '@mui/base/useMenuItem';
import { useMenuButton } from '@mui/base/useMenuButton';
import { useDropdown } from '@mui/base/useDropdown';
```

The `useMenu` and `useMenuItem` hooks let you apply the functionality of the Menu to fully custom components.
They return props to be placed on the custom components, along with fields representing the components' internal states.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization but require more work to implement.
With hooks, you can take complete control over how your component is rendered and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires a significantly different [structure](#anatomy).
:::

The following demo shows how to build a menu using hooks:

{{"demo": "UseMenu.js"}}

Components and their corresponding hooks work interchangeably with one another—for example, you can create a Menu component that contains menu items built with the `useMenuItem` hook.

## Customization

### Wrapping MenuItems

Menu Item components don't have to be direct children of a Menu component.
You can wrap them in any component needed to achieve the desired appearance.

In addition to Menu Item components, the Menu component can also contain non-interactive children, such as helper text.

The following demo shows an example of a menu with items grouped under non-interactive headers, along with helper text that displays the **Current zoom level**:

{{"demo": "WrappedMenuItems.js"}}
