---
productId: joy-ui
title: React Menu component
components: Menu, MenuItem, MenuList, MenuButton
githubLabel: 'component: menu'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
unstyled: /base-ui/react-menu/
---

# Menu

<p class="description">Menus display a list of choices on temporary surfaces.</p>

## Introduction

Joy UI provides five menu-related components:

- Menu Button - a button that opens a menu. It reuses the styles from [`Button`](/joy-ui/react-button/).
- Menu - a listbox popup for wrapping the menu items which reuses the styles from [`List`](/joy-ui/react-list/).
- Menu Item - a menu item which reuses the styles from [`ListItemButton`](/joy-ui/react-list/).
- Menu List - a standalone listbox for composition usage. It also reuses the styles from [`List`](/joy-ui/react-list/).
- Dropdown - the outermost component that wires a button with a menu. It only provides a context and does not render anything.

{{"demo": "MenuUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

export default function MyApp() {
  return (
    <Dropdown>
      <MenuButton>Actions</MenuButton>
      <Menu>
        <MenuItem>Add item</MenuItem>
      </Menu>
    </Dropdown>
  );
}
```

### Basic usage

Place both the Menu and Menu Button inside a Dropdown component.
This will wire them together.
The Menu Button will toggle the visibility of the menu and act as an anchor for the Menu's popup.

The basic version of the menu opens over the anchor element by default.
You can change this via [specific positioning props](#menu-positioning).

When close to the screen's edge, the menu vertically realigns to make sure that all menu items are completely visible.
Choosing an option should immediately, and ideally, commit the option and close the menu.

{{"demo": "BasicMenu.js"}}

### Sizes

The menu component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

When specifying a size for the `Menu` component, menu items inside of it will inherit the value.

{{"demo": "SizeMenu.js"}}

:::info
To learn how to add more sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Selected

Use the `selected` prop to signal whether a `MenuItem` is selected or not.

The menu item uses the same styles as the [`ListItemButton`](/joy-ui/react-list/#interactive-list-items).

{{"demo": "SelectedMenu.js"}}

### Icon button menu

To use [IconButton](/joy-ui/react-button/#icon-button) component as a menu button, pass it to the root slot of the `MenuButton` component.

Use `slotProps` to pass props to the IconButton component.

{{"demo": "IconButtonMenu.js"}}

### Positioned menu

The `Menu` is based on the Base UI `Popper` component, which exposes a few [placement props](/base-ui/react-popper/#placement).
For example, this is how you'd go for displaying the menu on the bottom-end of the anchor button.

{{"demo": "PositionedMenu.js"}}

### Group menus

{{"demo": "GroupMenu.js"}}

### Controlling the open state

By default, the open/close state of the menu is managed internally by the Dropdown component.
To control it programmatically from the outside, apply the Dropdown's `open` and `onOpenChange` props as shown below:

{{"demo": "ControlledDropdown.js"}}

### `MenuList` composition

To get full control of the DOM structure, use the `MenuList` component.
You can use it to compose any popup-alike component.
The primary responsibility of this component is handling the focus state.

{{"demo": "MenuListComposition.js"}}

Or display the menu without a popup:

{{"demo": "MenuListGroup.js"}}

## Debugging

To keep the list box open for inspecting elements, enable the `Emulate a focused page` option from the [Chrome DevTool Rendering](https://developer.chrome.com/docs/devtools/rendering/apply-effects/#emulate-a-focused-page) tab.
You can also access this option by using [command menu and search for it](https://developer.chrome.com/docs/devtools/command-menu/).

## Common examples

### Apps menu

This example replicates a menu that contain links to other applications.

{{"demo": "AppsMenu.js"}}

### Menu bar

This example replicates the application menu bar on macOS.
It supports mouse and keyboard navigation between menu items.

{{"demo": "MenuToolbarExample.js"}}

### Side navigation icons

This example is quite common in dashboard applications where the side navigation is shrunk into icons, and the menu is triggered by hovering them.

{{"demo": "MenuIconSideNavExample.js"}}
