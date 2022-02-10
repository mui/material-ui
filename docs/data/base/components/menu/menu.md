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
It renders a list of items and allows mouse and keyboard navigation through them.

When not customized, the MenuItem renders a plain `ul` element.

### Basic usage

{{"demo": "UnstyledMenuSimple.js"}}

### Wrapping MenuItems

MenuItemUnstyled components don't have to be direct descendants of the MenuUnstyled.
Developers can wrap them in arbitrary components to achieve desired appearance.

{{"demo": "WrappedMenuItems.js"}}

### Popup menu

The MenuUnstyled component does not include the trigger button or the popup.
It's just the list of options.
Developers are free to compose it with their own triggering elements and popups.

Additionally, MenuUnstyled may contain non-interactive children (such as help text).

{{"demo": "UnstyledMenuPopup.js"}}

### Customization

#### Slots

The MenuUnstyled has just the root slot.
It is set to `ul` by default.
It can be customized by setting the `component` or `components.Root` props.

The MenuItemUnstyled also has just the root slot.
It renders `li` by default.
Similarly to MenuUnstyled, it can be customized by setting the `component` or `components.Root` props.

#### CSS classes

The MenuUnstyled does not receive any state classes.

The MenuItemUnstyled can receive the following classes:

- `MuiMenuItemUnstyled-disabled` - set when the MenuItem has the `disabled` prop.
- `MuiMenuItemUnstyled-highlighted` - set when the MenuItem is highligthed via keyboard navigation.

## useMenu and useMenuItem hooks

```jsx
import { useMenu } from '@mui/base/MenuUnstyled';
import { useMenuItem } from '@mui/base/MenuItemUnstyled';
```

The useMenu and useMenuItem hooks provide even greater flexibility.

{{"demo": "UseMenu.js"}}

It is possible to mix and match the built-in unstyled components and the ones made with hooks
(i.e. having a custom MenuItem built with useMenuItem hook inside a MenuItemUnstyled).
