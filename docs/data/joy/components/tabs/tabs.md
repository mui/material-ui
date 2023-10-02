---
productId: joy-ui
title: React Tabs component
components: Tab, TabList, TabPanel, Tabs
githubLabel: 'component: tabs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
unstyled: /base-ui/react-tabs/
---

# Tabs

<p class="description">Tabs make it easy to explore and switch between different views.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

Joy UI provides four tabs-related components:

- `Tabs`: A context provider that synchronizes the selected `Tab` with the corresponding `TabPanel`.
- `TabList`: A container that consists of `Tab` items.
- `Tab`: A button to toggle a selected tab.
- `TabPanel`: A pane that displays on the screen when its value matches with the selected tab.

{{"demo": "TabsUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
```

The Joy UI set of Tabs components follows the [WAI ARIA design pattern guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

Use the `value` prop on the Tab Panel and the `defaultValue` prop on the Tabs component to target the selected tab.

{{"demo": "TabsBasic.js"}}

### Disabled tab

Use the `disabled` prop to disable interaction and focus.

{{"demo": "TabDisabled.js"}}

## Customization

### Variants

The Tab List and Tab components accept the global `variant` prop values.

:::info
The selected Tab won't apply the `:hover` and `:active` styles defined globally.
:::

{{"demo": "TabsVariants.js"}}

:::info
To learn how to add more variants to the component, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
:::

### Vertical

Use the `orientation="vertical"` prop on the Tabs component to make it vertical.
Keyboard navigation using arrow keys adapts automatically.

{{"demo": "TabsVertical.js"}}

### Indicator placement

Use the `underlinePlacement` prop on the Tab List component to change the Tabs' underline border placement.

{{"demo": "TabsUnderlinePlacement.js"}}

Control the selected Tab indicator independently using the `indicatorPlacement` prop.

{{"demo": "TabsIndicatorPlacement.js"}}

Depending on the underline and selected indicator placement, you may need to change the Tabs component flex-direction.

{{"demo": "TabsFlexPlacement.js"}}

### Sticky

Use the `sticky` prop to place the Tab List component at the top or bottom in a long content scenario.

{{"demo": "TabsSticky.js"}}

### Tab flex

Use the `tabFlex` prop on the Tab List component to make the Tab elements fill the available space as shown in the example below.

- In the first demo, the Tab elements fill the available space using `tabFlex={1}`.

- In the second demo, the Tab elements fill the available space equally using `tabFlex="auto"`, but the width of each one of them is based on the content.

{{"demo": "TabsFlex.js"}}

:::info
The value of the `tabFlex` prop can be any [valid CSS flex value](https://developer.mozilla.org/en-US/docs/Web/CSS/flex).
:::

### Icon

Since the Tab List component uses the same style as the [List](/joy-ui/react-list/) component, you can use the icon directly as a child or use List Item Decorator with a text.

{{"demo": "TabsIcon.js"}}

{{"demo": "TabsIconWithText.js"}}

### Scrollable tabs

Add the `overflow: auto` property to the Tab List component to make the tabs scrollable.

Polish it further by making the scrollbar hidden with `'&::-webkit-scrollbar': { display: 'none' }` and snapping the scroll to the edge of the Tab List component with [CSS scroll snap properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap).

{{"demo": "TabsScrollable.js"}}

## CSS variables playground

Play around with all the CSS variables available in the slider component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "TabsVariables.js", "hideToolbar": true, "bg": "gradient"}}

## Common examples

### Segmented controls

To mimic the iOS segmented controls, add a border-radius to the Tab List component and set the selected Tab background to `background.surface`.

{{"demo": "TabsSegmentedControls.js"}}

### Browser tabs

In this example, the Tab's variant prop is set to `outlined` and the indicator is moved to the top via `indicatorPlacement="top"`.
The borders are then set to `transparent` based on the selected state.

{{"demo": "TabsBrowserExample.js"}}

### Pricing tabs

This example removes the background of the selected Tab by targeting the `aria-selected="true"` attribute.

{{"demo": "TabsPricingExample.js"}}

### Centralized tabs

To make each Tab component centralized in the Tab List, add the `flex: initial` property to override the default `flex-grow` behavior.
Then, on the list, add `justifyContent: center`.

{{"demo": "TabsPageExample.js"}}

### Mobile bottom navigation

In this example, each Tab is painted with a color from the theme when it is selected.

{{"demo": "TabsBottomNavExample.js"}}

## Accessibility

To ensure proper accessibility, [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/#wai-aria-roles-states-and-properties-22) recommends to associate a label to the Tabs component.
There are two options to do that:

### Using the id attribute

Add a text element close to the tabs with the `id` attribute.
Then, on the Tabs component, add the `aria-labelledby` attribute.
Make sure to use meaningful labels for both.

```js
<Typography id="tabs-accessibility-label">Meaningful label</Typography>
<Tabs aria-labelledby="tabs-accessibility-label">...</Tabs>
```

### Using aria-label

If a text element does not accompany your Tabs component, use the `aria-label` attribute directly to make it readable by screen readers.

```js
<Tabs aria-label="Meaningful label">...</Tabs>
```
