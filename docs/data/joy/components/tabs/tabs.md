---
product: joy-ui
title: React Tabs component
githubLabel: 'component: tabs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
unstyled: /base/react-tabs/
---

# Tabs

<p class="description">Tabs make it easy to explore and switch between different views.</p>

Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

{{"demo": "TabsUsage.js", "hideToolbar": true}}

Joy UI provides four menu-related components:

- `Tabs`: A context provider that synchronize the selected `Tab` with the correspond `TabPanel`.
- `TabList`: A container that consists of `Tab` items.
- `Tab`: A button for toggle a selected tab.
- `TabPanel` A pane that displays on the screen when its value matches with the selected tab.

## Component

### Basic

The tabs structure follows [WAI ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/). All you need is specifying `value` prop to the `TabPanel` and use `Tabs`'s `defaultValue` to target the initial selected tab.

{{"demo": "TabsBasic.js"}}

### Variant

Both `TabList` and `Tab` accept [global variant](/joy-ui/main-features/global-variants/) values, so you can mix and match to get the desired result.

{{"demo": "TabsVariants.js"}}

### Disabled tab

You can disable a tab by providing `disabled` prop to the `Tab` component.

{{"demo": "TabDisabled.js"}}

### Vertical

Provides `orientation="vertical"` to the `Tabs` to render in vertical mode. The keyboard navigation such as arrow keys also adapt to the orientation of the tabs.

{{"demo": "TabsVertical.js"}}

### Icon

Since `TabList` uses the same style as the [`List`](/joy-ui/react-list/) component, you can use the icon directly as a child or use `ListItemDecorator` with a text.

{{"demo": "TabsIcon.js"}}

{{"demo": "TabsIconWithText.js"}}

### Accessibility

It is recommended to associate a label to the Tabs, you have two options:

- Renders a text element with an `id` and provides `aria-labelledby="$id"` to the tabs.
  ```js
  <Typography id="tabs-accessibility-label">Meaningful label</Typography>
  <Tabs aria-labelledby="tabs-accessibility-label">...</Tabs>
  ```
- Uses `aria-label` directly on the tabs when you don't want to display a text element on the screen.
  ```js
  <Tabs aria-label="Meaningful label">...</Tabs>
  ```

Screen readers will announce the label which helps providing information about the tabs to the users.

## CSS Variables

{{"demo": "TabsVariables.js"}}

## Common examples

### Pricing tabs

{{"demo": "TabsPricingExample.js"}}

### Page tabs

{{"demo": "TabsPageExample.js"}}

### Mobile bottom navigation

{{"demo": "TabsBottomNavExample.js"}}
