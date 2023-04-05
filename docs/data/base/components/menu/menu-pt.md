---
product: base
title: Unstyled React Menu components and hooks
components: MenuUnstyled, MenuItemUnstyled
githubLabel: 'component: menu'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
---

# Unstyled menu

<p class="description">The menu components provide your users with a list of options on temporary surfaces.</p>

## Introduction

The `MenuUnstyled` component gives users a list of items in a popup that they can navigate through with a mouse or keyboard. It renders an unordered list (`<ul>`) by default.

Use `MenuItemUnstyled` to add items to the menu. These are rendered as `<li>` elements.

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

`MenuUnstyled` serves as a replacement for the native HTML `<ul>`, and `MenuItemUnstyled` corresponds to the `<li>` tag.

The following demo shows how to create and style a menu component. Click **Dashboard** to view the menu—notice that it uses the built-in [`PopperUnstyled`](/base/react-popper/) component to visually break out of its parent container:

{{"demo": "MenuSimple.js"}}

### Anatomy

The `MenuUnstyled` component is composed of a root slot that renders a `PopperUnstyled` `<div>` by default. It contains one interior listbox `<ul>` slot. `MenuItemUnstyled` has a single root `<li>` slot.

```html
<div class="MuiMenuUnstyled-root">
  <ul class="MuiMenuUnstyled-listbox">
    <li class="MuiMenuItemUnstyled-root">List item</li>
  </ul>
</div>
```

### Slot props

:::info
The following props are available on all non-utility Base components. See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<MenuItemUnstyled component="span" />
```

Use the `components` prop to override any interior slots in addition to the root:

```jsx
<MenuUnstyled components={{ Root: 'nav', Listbox: 'ol' }} />
```

:::warning
If the root element is customized with both the `component` and `components` props, then `component` will take precedence.
:::

Use the `componentsProps` prop to pass custom props to internal slots. The following code snippet applies a CSS class called `my-listbox` to the listbox slot:

```jsx
<MenuUnstyled componentsProps={{ listbox: { className: 'my-listbox' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

### CSS classes

`MenuUnstyled` can set the following class:

- `Mui-expanded` - set when the menu is open; this class is set on both Root and Popper slots

`MenuItemUnstyled` can set the following classes:

- `Mui-disabled` - set when the MenuItem has the `disabled` prop
- `Mui-focusVisible` - set when the MenuItem is highlighted via keyboard navigation. This is a polyfill for the native `:focus-visible` pseudoclass as it's not available in Safari.

## Hooks

```jsx
import { useMenu } from '@mui/base/MenuUnstyled';
import { useMenuItem } from '@mui/base/MenuItemUnstyled';
```

The `useMenu` and `useMenuItem` hooks let you apply the functionality of the menu components to fully custom components. They return props to be placed on the custom components, along with fields representing the components' internal states.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement. With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#component-slots).
:::

The following demo shows how to build a menu using hooks:

{{"demo": "UseMenu.js"}}

Unstyled components and their corresponding hooks work interchangeably with one another—for example, you can create a `MenuUnstyled` component that contains menu items built with the `useMenuItem` hook.

## Customization

### Wrapping MenuItems

`MenuItemUnstyled` components don't have to be direct children of a `MenuUnstyled` component. You can wrap them in any component needed to achieve the desired appearance.

In addition to `MenuItemUnstyled` components, the `MenuUnstyled` component can also contain non-interactive children, such as helper text.

The following demo shows an example of a menu with items grouped under non-interactive headers, along with helper text that displays the **Current zoom level**:

{{"demo": "WrappedMenuItems.js"}}
