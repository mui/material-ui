---
product: base
title: Unstyled React Tabs components
components: TabsUnstyled, TabUnstyled, TabPanelUnstyled, TabsListUnstyled
hooks: useTab, useTabPanel, useTabs, useTabsList
githubLabel: 'component: tabs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
---

# Unstyled Tabs

<p class="description">Tabs are UI elements for organizing and navigating between groups of related content.</p>

{{"component": "modules/components/ComponentPageTabs.js"}}

## Introduction

Tabs are implemented using a collection of related components:

- `<TabUnstyled />` - the tab element itself. Clicking on a tab displays its corresponding panel.
- `<TabsListUnstyled />` - the container that houses the tabs. Responsible for handling focus and keyboard navigation between tabs.
- `<TabPanelUnstyled />` - the card that hosts the content associated with a tab.
- `<TabsUnstyled />` - the top-level component that wraps the Tabs List and Tab Panel components so that tabs and their panels can communicate with one another.

{{"demo": "UnstyledTabsIntroduction.tsx", "defaultCodeOpen": false, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Components

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component collection using the following basic elements:

```jsx
import TabUnstyled from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';

export default function MyApp() {
  return (
    <TabsUnstyled>
      <TabsListUnstyled>
        <TabUnstyled>{/* tab one */}</TabUnstyled>
        <TabUnstyled>{/* tab two */}</TabUnstyled>
      </TabsListUnstyled>
      <TabPanelUnstyled>{/* panel one */}</TabPanelUnstyled>
      <TabPanelUnstyled>{/* panel two */}</TabPanelUnstyled>
    </TabsUnstyled>
  );
}
```

### Basics

By default, Tab components and their corresponding panels are **zero-indexed** (i.e. the first tab has a `value` of `0`, then `1`, `2`, etc.).
Clicking on a given Tab opens the panel with the same `value`, which corresponds to the order in which each component is nested within its container.

Though not required, you can add the `value` prop to the Tab and Tab Panel to take control over how these components are associated with one another.

The following demo omits the `value` prop from the Tab components, and also defines `0` as the `defaultValue` for the Tabs component, which sets the first Tab and Panel as the defaults:

{{"demo": "UnstyledTabsBasic.js"}}

The next demo shows how to apply custom styles to a set of tabs:

{{"demo": "UnstyledTabsCustomized.js"}}

### Anatomy

The Tab components are each composed of a root slot with no interior slots:

```html
<div class="TabsUnstyled-root">
  <div class="TabsListUnstyled-root">
    <button class="TabUnstyled-root">First tab</button>
    <button class="TabUnstyled-root">Second tab</button>
    <button class="TabUnstyled-root">Third tab</button>
  </div>
  <div class="TabPanelUnstyled-root">First panel</div>
  <div class="TabPanelUnstyled-root">Second panel</div>
  <div class="TabPanelUnstyled-root">Third panel</div>
</div>
```

### Slot props

:::info
The following props are available on all non-utility Base components.
See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<TabUnstyled component="span" />
```

If you provide a non-interactive element such as a `<span>`, the Tab components will automatically add the necessary accessibility attributes.

## Customization

### Third-party routing library

A common use case for tabs is to implement client-side navigation that doesn't require an HTTP round-trip to the server.

The Tab component provides the `component` prop to handle this use case—see [the Material UI documentation on routing](/material-ui/guides/routing/#tabs) for more details.

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/)

The following steps are necessary to make the Tab component suite accessible to assistive technology:

1. Label `<TabsUnstyled />` with `aria-label` or `aria-labelledby`.
2. Connect each `<TabUnstyled />` to its corresponding `<TabPanelUnstyled />` by setting the correct `id`, `aria-controls` and `aria-labelledby`.

The demos below illustrate the proper use of ARIA labels.

### Keyboard navigation

By default, when using keyboard navigation, the Tab components open via **manual activation**—that is, the next panel is displayed only after the user activates the tab with either <kbd class="key">Space</kbd>, <kbd class="key">Enter</kbd>, or a mouse click.

This is the preferable behavior for tabs in most cases, according to [the WAI-ARIA authoring practices](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/).

Alternatively, you can set the panels to be displayed automatically when their corresponding tabs are in focus—this behavior of the selection following the focus is known as **automatic activation**.

To enable automatic activation, pass the `selectionFollowsFocus` prop to the `<TabsUnstyled />` component:

```jsx
/* Tabs where selection follows focus */
<TabsUnstyled selectionFollowsFocus />
```

The following demo pair illustrates the difference between manual and automatic activation.
Move the focus to a tab in either demo and navigate with the arrow keys to observe the difference:

{{"demo": "KeyboardNavigation.js"}}
