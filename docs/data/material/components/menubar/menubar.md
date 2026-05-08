---
productId: material-ui
title: Menubar React component
components: MenuBar, MenuBarMenu, MenuBarTrigger, MenuBarPortal, MenuBarPositioner, MenuBarPopup, MenuBarItem, MenuBarSeparator, MenuBarSubmenuRoot, MenuBarSubmenuTrigger, MenuBarCheckboxItem, MenuBarRadioGroup, MenuBarRadioItem, MenuBarGroup, MenuBarGroupLabel
---

# Menubar

<p class="description">A React component for building accessible application menus.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

The menu bar is a visually persistent menu similar to those found in desktop applications that provides a consistent set of frequently used commands.

Material UI includes a `MenuBar` component in the `@mui/lab` package.
It's built on top of the [Base UI `Menubar`](https://base-ui.com/react/components/menubar) and styled to align with Material Design specifications.

<!-- #npm-tag-reference -->

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/lab
```

```bash pnpm
pnpm add @mui/lab
```

```bash yarn
yarn add @mui/lab
```

</codeblock>

## Usage

1. Select one of the demos below that fits your visual design needs.
2. Click **Expand code** in the toolbar.
3. Select the file that starts with `./Menubar`.
4. Copy the code and paste it into your project.

## Basic menubar

The basic menubar component displays a row of menu triggers with dropdowns containing menu items.

{{"demo": "BasicMenubar.js"}}

## Shortcut hints

Display keyboard shortcuts alongside menu items using the `hint` prop.

{{"demo": "ShortcutHintsMenubar.js"}}

## Checkbox items

For toggle options that can be independently enabled or disabled.

{{"demo": "CheckboxItemsMenubar.js"}}

## Radio group items

For mutually exclusive options where only one can be selected at a time.

{{"demo": "RadioGroupItemsMenubar.js"}}

## Icon menu items

Add icons to menu items using the `icon` prop for faster visual recognition.

{{"demo": "IconItemsMenubar.js"}}

## Group labels

Organize menu items into logical sections with labeled groups.

{{"demo": "GroupLabelMenubar.js"}}

## Base UI API

See the documentation below for a complete reference to all of the props.

- [`Menubar`](https://base-ui.com/react/components/menubar#api-reference)
- [`Menu`](https://base-ui.com/react/components/menu#api-reference)
