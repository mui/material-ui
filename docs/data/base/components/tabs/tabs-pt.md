---
product: base
title: Unstyled React Tabs components
components: TabsUnstyled, TabUnstyled, TabPanelUnstyled, TabsListUnstyled
githubLabel: 'component: tabs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
---

# Unstyled tabs

<p class="description">Tabs are UI elements for organizing and navigating between groups of related content.</p>

## Introduction

Tabs are implemented using a collection of related components:

- `TabUnstyled` - the tab element itself. Clicking on a tab displays its corresponding panel.
- `TabsListUnstyled` - the container that houses the tabs. Responsible for handling focus and keyboard navigation between tabs.
- `TabPanelUnstyled` - the card that hosts the content associated with a tab.
- `TabsUnstyled` - the top-level component that wraps `TabsListUnstyled` and `TabPanelUnstyled` so that tabs and their panels can communicate with one another.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Components

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component collection using the following basic elements:

```jsx
import TabUnstyled from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabUnstyled';
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

By default, tabs and their corresponding panels are **zero-indexed** (i.e. the first tab has a `value` of `0`, then `1`, `2`, etc.). Clicking on a given tab opens the panel with the same `value`, which corresponds to the order in which each component is nested within its container.

Though not required, you can add the `value` prop to `TabUnstyled` and `TabPanelUnstyled` to take control over how these components are associated with one another.

The following demo omits the `value` prop from the `TabUnstyled` components, and also defines `0` as the `defaultValue` for `TabsUnstyled`, which sets the first tab and panel as the defaults:

{{"demo": "UnstyledTabsBasic.js"}}

The next demo shows how to apply custom styles to a set of tabs:

{{"demo": "UnstyledTabsCustomized.js"}}

### Anatomy

The tab components are each composed of a root slot with no interior slots:

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
The following props are available on all non-utility Base components. See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<TabUnstyled component="span" />
```

If you provide a non-interactive element such as a `<span>`, the `TabUnstyled` component will automatically add the necessary accessibility attributes.

Use the `components` prop to override any interior slots in addition to the root:

```jsx
<TabUnstyled components={{ Root: 'span' }} />
```

:::warning
If the root element is customized with both the `component` and `components` props, then `component` will take precedence.
:::

Use the `componentsProps` prop to pass custom props to internal slots. The following code snippet applies a CSS class called `my-tab-list` to the root slot:

```jsx
<TabListUnstyled componentsProps={{ root: { className: 'my-tab-list' } }} />
```

:::warning
Note that `componentsProps` slot names are written in lowercase (`root`) while `components` slot names are capitalized (`Root`).
:::

## Customization

### Third-party routing library

A common use case for tabs is to implement client-side navigation that doesn't require an HTTP round-trip to the server.

The `TabUnstyled` component provides the `component` prop to handle this use case—see [the Material UI documentation on routing](/material-ui/guides/routing/#tabs) for more details.

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

The following steps are necessary to make the tab component suite accessible to assistive technology:

1. Label `TabsUnstyled` with `aria-label` or `aria-labelledby`.
2. Connect each `TabUnstyled` component to its corresponding `TabPanelUnstyled` by setting the correct `id`, `aria-controls` and `aria-labelledby`.

The demos below illustrate the proper use of ARIA labels.

### Keyboard navigation

By default, when using keyboard navigation, the tab components open via **manual activation**—that is, the next panel is displayed only after the user activates the tab with either <kbd class="key">Space</kbd>, <kbd class="key">Enter</kbd>, or a mouse click.

This is the preferable behavior for tabs in most cases, according to [the WAI-ARIA authoring practices](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

Alternatively, you can set the panels to be displayed automatically when their corresponding tabs are in focus—this behavior of the selection following the focus is known as **automatic activation**.

To enable automatic activation, pass the `selectionFollowsFocus` prop to the `TabsUnstyled` component:

```jsx
/* Tabs where selection follows focus */
<TabsUnstyled selectionFollowsFocus />
```

The following demo pair illustrates the difference between manual and automatic activation. Move the focus to a tab in either demo and navigate with the arrow keys to observe the difference:

{{"demo": "KeyboardNavigation.js"}}
