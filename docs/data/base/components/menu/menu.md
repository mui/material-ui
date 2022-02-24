---
product: base
title: React Menu unstyled component and hook
components: ''
githubLabel: 'component: menu'
waiAria: https://www.w3.org/TR/wai-aria-practices/#menu
---

# Menu

<p class="description">Menus display a list of choices on temporary surfaces.</p>

## MenuUnstyled and MenuItemUnstyled components

```jsx
import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';
```

The MenuUnstyled components can be used to create custom menus.
It renders a list of items in a popup and allows mouse and keyboard navigation through them.

When not customized, the MenuItem renders a plain `ul` element.

### Basic usage

{{"demo": "MenuSimple.js"}}

### Wrapping MenuItems

MenuItemUnstyled components don't have to be direct descendants of the MenuUnstyled.
Developers can wrap them in arbitrary components to achieve desired appearance.

Additionally, MenuUnstyled may contain non-interactive children (such as help text).

{{"demo": "WrappedMenuItems.js"}}

### Customization

#### Slots

The MenuUnstyled has two slots:

- Root - represents the popup container the menu is placed in.
  Can be customized by setting the `component` or `components.Root` props.
  By default set to `PopperUnstyled`.
- Listbox - set to `ul` by default.

The MenuItemUnstyled has just the root slot.
It renders `li` by default.
Similarly to MenuUnstyled, it can be customized by setting the `component` or `components.Root` props.

#### CSS classes

The MenuUnstyled can set the following class:

- `Mui-expanded` - set when the menu is open. This class is set on both Root and Popper slots.

The MenuItemUnstyled can set the following classes:

- `Mui-disabled` - set when the MenuItem has the `disabled` prop.
- `Mui-focusVisible` - set when the MenuItem is highligthed via keyboard navigation.
  This is a polyfill for the native `:focus-visible` pseudoclass as it's not available in Safari.

## useMenu and useMenuItem hooks

```jsx
import { useMenu } from '@mui/base/MenuUnstyled';
import { useMenuItem } from '@mui/base/MenuItemUnstyled';
```

The useMenu and useMenuItem hooks provide even greater flexibility.

{{"demo": "UseMenu.js"}}

It is possible to mix and match the built-in unstyled components and the ones made with hooks
(i.e. having a custom MenuItem built with useMenuItem hook inside a MenuItemUnstyled).
