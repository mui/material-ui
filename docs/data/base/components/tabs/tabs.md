---
productId: base-ui
title: React Tabs components
components: Tabs, Tab, TabPanel, TabsList
hooks: useTab, useTabPanel, useTabs, useTabsList
githubLabel: 'component: tabs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
---

# Tabs

<p class="description">Tabs are UI elements for organizing and navigating between groups of related content.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

Tabs are implemented using a collection of related components:

- `<Tab />` - the tab element itself. Clicking on a tab displays its corresponding panel.
- `<TabsList />` - the container that houses the tabs. Responsible for handling focus and keyboard navigation between tabs.
- `<TabPanel />` - the card that hosts the content associated with a tab.
- `<Tabs />` - the top-level component that wraps the Tabs List and Tab Panel components so that tabs and their panels can communicate with one another.

{{"demo": "UnstyledTabsIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Components

```jsx
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';
```

By default, Tab components and their corresponding panels are **zero-indexed** (that is the first tab has a `value` of `0`, then `1`, `2`, etc.).
Clicking on a given Tab opens the panel with the same `value`, which corresponds to the order in which each component is nested within its container.

Though not required, you can add the `value` prop to the Tab and Tab Panel to take control over how these components are associated with one another.

The following demo omits the `value` prop from the Tab components, and also defines `0` as the `defaultValue` for the Tabs component, which sets the first Tab and Panel as the defaults:

{{"demo": "UnstyledTabsBasic.js"}}

The next demo shows how to apply custom styles to a set of tabs:

{{"demo": "UnstyledTabsCustomized"}}

### Anatomy

The Tab components are each composed of a root slot with no interior slots:

```html
<div class="Tabs-root">
  <div class="TabsList-root">
    <button class="Tab-root">First tab</button>
    <button class="Tab-root">Second tab</button>
    <button class="Tab-root">Third tab</button>
  </div>
  <div class="TabPanel-root">First panel</div>
  <div class="TabPanel-root">Second panel</div>
  <div class="TabPanel-root">Third panel</div>
</div>
```

### Custom structure

Use the `slots` prop to override the root or any other interior slot:

```jsx
<Tab slots={{ root: 'span' }} />
```

If you provide a non-interactive element such as a `<span>`, the Tab components will automatically add the necessary accessibility attributes.

:::info
The `slots` prop is available on all non-utility Base components.
See [Overriding component structure](/base-ui/guides/overriding-component-structure/) for full details.
:::

## Customization

### Vertical

Tab components can be arranged vertically as well as horizontally.

When vertical, you must set `orientation="vertical"` on the `<Tabs />` component so the user can navigate with the up and down arrow keys (rather than the default left-to-right behavior for horizontal tabs).

{{"demo": "UnstyledTabsVertical.js"}}

### Usage with TypeScript

In TypeScript, you can specify the custom component type used in the `slots.root` as a generic parameter of the unstyled component.
This way, you can safely provide the custom root's props directly on the component:

```tsx
<Tab<typeof CustomComponent> slots={{ root: CustomComponent }} customProp />
```

The same applies for props specific to custom primitive elements:

```tsx
<Tab<'button'> slots={{ root: 'button' }} onClick={() => {}} />
```

### Third-party routing library

A common use case for tabs is to implement client-side navigation that doesn't require an HTTP round-trip to the server.

The Tab component provides the `slots` prop to handle this, as shown below:

{{"demo": "UnstyledTabsRouting.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

The following steps are necessary to make the Tab component suite accessible to assistive technology:

1. Label `<Tabs />` with `aria-label` or `aria-labelledby`.
2. Connect each `<Tab />` to its corresponding `<TabPanel />` by setting the correct `id`, `aria-controls` and `aria-labelledby`.

The demos below illustrate the proper use of ARIA labels.

### Keyboard navigation

By default, when using keyboard navigation, the Tab components open via **manual activation**—that is, the next panel is displayed only after the user activates the tab with either <kbd class="key">Space</kbd>, <kbd class="key">Enter</kbd>, or a mouse click.

This is the preferable behavior for tabs in most cases, according to [the WAI-ARIA authoring practices](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

Alternatively, you can set the panels to be displayed automatically when their corresponding tabs are in focus—this behavior of the selection following the focus is known as **automatic activation**.

To enable automatic activation, pass the `selectionFollowsFocus` prop to the `<Tabs />` component:

```jsx
/* Tabs where selection follows focus */
<Tabs selectionFollowsFocus />
```

The following demo pair illustrates the difference between manual and automatic activation.
Move the focus to a tab in either demo and navigate with the arrow keys to observe the difference:

{{"demo": "KeyboardNavigation.js"}}
