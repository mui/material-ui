---
productId: base-ui
title: React Menu components and hooks
components: Menu, MenuItem, MenuButton, Dropdown
hooks: useMenu, useMenuItem, useMenuButton, useDropdown, useMenuItemContextStabilizer
githubLabel: 'component: menu'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
---

# Menu

<p class="description">The Dropdown Menu components provide end users with a list of options on temporary surfaces.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

The Base UI Dropdown Menu is implemented using a collection of related components:

- Dropdown - The outermost container that houses all Menu components.
- Menu Button - The button that toggles the visibility of the Menu.
- Menu - The unordered list of Menu Items.
- Menu Item - The individual list items of the Menu.

{{"demo": "MenuIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Components

```jsx
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
```

The demo below shows how to create and style a Dropdown Menu.
Click **Dashboard** to view the menu.
Note that it uses the built-in [Popper](/base-ui/react-popper/) component to visually break out of its parent container:

{{"demo": "MenuSimple"}}

The `<Dropdown />` should be the outermost component—all other Menu-related components must be placed as its children (but not necessarily as direct ones).
If you need to control the open state of the Menu or react to its changes, place `open`/`onOpenChange` props on the `<Dropdown />`.

The `<Dropdown />` must only contain one `<MenuButton />` and one `<Menu />`.
It will wire them together, so that pressing the Button will open the Menu.
It also takes care of assigning proper accessibility attributes, so the Dropdown Menu can be used with assistive technologies or a keyboard.

The `<Menu />` hosts `<MenuItem />` components can be wrapped in arbitrary tags and components, as well as grouped together.
Clicking on a Menu Item closes its associated Menu.

### Anatomy

- The `<Dropdown />` does not render any HTML element—it only provides the context that links a Menu Button to a Menu, so you don't have to.
- The `<MenuButton />` renders a `<button>`.
- The `<Menu />` component renders a `<div>` with a `<ul>` nested inside.
- The `<MenuItem />` renders a `<li>`.

```html
<button class="base-MenuButton-root">Click me</button>
<div class="base-Menu-root">
  <ul class="base-Menu-listbox">
    <li class="base-MenuItem-root">List item</li>
  </ul>
</div>
```

### Custom structure

Use the `slots` prop to override the slots on any component except the `<Dropdown />` (since it renders no HTML):

```jsx
<Menu slots={{ listbox: 'ol' }} />
```

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for complete details.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-listbox` to the listbox slot on the Menu:

```jsx
<Menu slotProps={{ listbox: { className: 'my-listbox' } }} />
```

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component.
This way, you can safely provide the custom root's props directly on the component:

```tsx
<Menu<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies to props specific to custom primitive elements:

```tsx
<Menu<'ol'> slots={{ root: 'ol' }} start={5} />
```

### Transitions

The Menu component supports the [Transitions API](/base-ui/react-transitions/), so it's possible to animate the appearing and disappearing Listbox.
To do this, override the Listbox slot of the Menu and wrap it with a transition component ([CssTransition](/base-ui/react-transitions/#css-transition), [CssAnimation](/base-ui/react-transitions/#css-animation), or a custom-built one).

{{"demo": "MenuTransitions.js", "defaultCodeOpen": false}}

## Hooks

```jsx
import { useDropdown } from '@mui/base/useDropdown';
import { useMenuButton } from '@mui/base/useMenuButton';
import { useMenu } from '@mui/base/useMenu';
import { useMenuItem } from '@mui/base/useMenuItem';
```

The Dropdown Menu hooks let you apply the functionality of the Dropdown Menu suite to fully custom components.
They return props to be placed on the custom components, along with fields representing the components' internal states.

Hooks _do not_ support [slot props](#custom-structure), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization but require more work to implement.
With hooks, you can take complete control over how your component is rendered and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires a significantly different [structure](#anatomy).
:::

The following demo shows how to build a Dropdown Menu using hooks:

{{"demo": "UseMenu.js"}}

Components and their corresponding hooks work interchangeably with one another—for example, you can create a Menu component that contains custom menu items built with the `useMenuItem` hook.

### Performance

The `useMenuItem` hook listens to changes in a context that is set up by the parent Menu component.
This context changes every time an item is highlighted.
Usually, it shouldn't be a problem, however, when your menu has hundreds of items, you may notice it's not very responsive, as every item is rerendered whenever highlight changes.

To improve performance by preventing menu items from rendering unnecessarily, you can create a component that wraps the menu item.
Inside this component, call `useMenuItemContextStabilizer` and create a ListContext with the value from the hook's result:

```tsx
const StableMenuItem = React.forwardRef(function StableMenuItem(
  props: MenuItemProps,
  ref: React.ForwardedRef<Element>,
) {
  const { contextValue, id } = useMenuItemContextStabilizer(props.id);

  return (
    <ListContext.Provider value={contextValue}>
      <MenuItem {...props} id={id} ref={ref} />
    </ListContext.Provider>
  );
});
```

The `useMenuItemContextStabilizer` hook ensures that the context value changes only when the state of the menu item is updated.

## Customization

:::info
The following features can be used with both components and hooks.
For the sake of simplicity, demos, and code snippets primarily feature components.
:::

### Wrapping Menu Items

Menu Item components don't have to be direct children of a Menu component.
You can wrap them in any component needed to achieve the desired appearance.

In addition to Menu Item components, the Menu component can also contain non-interactive children, such as helper text.

The following demo shows an example of a Dropdown Menu with Items grouped under non-interactive headers, along with helper text that displays the **Current zoom level**:

{{"demo": "WrappedMenuItems.js"}}
