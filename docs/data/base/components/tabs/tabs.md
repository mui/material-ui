---
product: base
title: Unstyled React Tabs components
components: TabsUnstyled, TabUnstyled, TabPanelUnstyled, TabsListUnstyled
githubLabel: 'component: tabs'
waiAria: https://www.w3.org/TR/wai-aria-practices/#tabpanel
packageName: '@mui/base'
---

# Tabs

<p class="description">Tabs make it easy to explore and switch between different views.</p>

Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basic tabs

Tabs are implemented using a handful of components, each with a specific purpose:

- `TabUnstyled` - the tab element itself. Clicking on it displays the associated content.
- `TabsListUnstyled` - the container that houses the tabs. Responsible for handling focus and keyboard navigation between tabs.
- `TabPanelUnstyled` - the card that hosts the content associated with a tab.
- `TabsUnstyled` - the top-level component that wraps `TabsListUnstyled` and `TabPanelUnstyled` so they can communicate.

```js
import TabUnstyled from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
```

By default, tabs and their corresponding panels are zero-indexed (i.e. the first tab has a `value` of `0`, then `1`, `2`, etc.). Clicking on a given tab opens the panel with the same `value`.

Though not required, you can add the `value` prop to `TabUnstyled` and `TabPanelUnstyled` to take control over how these components are associated with one another.

The following demo omits the `value` prop from the `TabUnstyled` components, and also defines `0` as the `defaultValue` for `TabsUnstyled`, which sets the first tab and panel as the defaults:

{{"demo": "UnstyledTabsBasic.js"}}

## Customizing the root element

By default, `TabUnstyled` renders a native HTML `<button>` element.
You can override this by setting the `component` or `components.Root` prop.

If a non-interactive element (such as a `<span>`) is provided this way, the `TabUnstyled` will take care of adding the necessary accessibility attributes.

The `TabPanelUnstyled` renders a native `<div>` element by default.
You can override by setting the `component` or `components.Root` prop on the `TabPanelUnstyled`.

{{"demo": "UnstyledTabsCustomized.js"}}

## Third-party routing library

A common use case for tabs is to implement client-side navigation that doesn't require an HTTP round-trip to the server.

The `TabUnstyled` component provides the `component` prop to handle this use case—see [the Material UI documentation on routing](/material-ui/guides/routing/#tabs) for more details.

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tabpanel)

The following steps are necessary to make the tab components accessible to assistive technology:

1. Label `TabsUnstyled` with `aria-label` or `aria-labelledby`.
2. Connect each `TabUnstyled` component to its corresponding `TabPanelUnstyled` by setting the correct `id`, `aria-controls` and `aria-labelledby`.

The demos below illustrate the proper use of ARIA labels.

### Keyboard navigation

By default, when using keyboard navigation, the tab components open via **manual activation**—that is, the next panel is displayed only after the user activates the tab with either <kbd class="key">Space</kbd>, <kbd class="key">Enter</kbd>, or a mouse click.

This is the preferable behavior for tabs, acccording to [the WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus).

Alternatively, you can set the panels to be displayed automatically when their corresponding tabs are in focus—this behavior is known as **selection following focus**.

Pass the `selectionFollowsFocus` prop to the `TabsUnstyled` component to enable this behavior.

#### Accessibility demos

The following demos differ only in their keyboard navigation behavior.
Move the focus to a tab and navigate with the arrow keys to observe the difference:

```jsx
/* Tabs where selection follows focus */
<TabsUnstyled selectionFollowsFocus />
```

{{"demo": "KeyboardNavigation.js"}}
