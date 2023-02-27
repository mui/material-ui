---
product: joy-ui
title: React Tabs component
components: Tab, TabList, TabPanel, Tabs
githubLabel: 'component: tabs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
unstyled: /base/react-tabs/
---

# Tabs

<p class="description">Tabs make it easy to explore and switch between different views.</p>

## Introduction

Joy UI provides four tabs-related components:

- `Tabs`: A context provider that synchronizes the selected `Tab` with the corresponding `TabPanel`.
- `TabList`: A container that consists of `Tab` items.
- `Tab`: A button to toggle a selected tab.
- `TabPanel`: A pane that displays on the screen when its value matches with the selected tab.

{{"demo": "TabsUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

export default function MyApp() {
  return (
    <Tabs defaultValue={1}>
      <TabList>
        <Tab value={1}>Tab A</Tab>
        <Tab value={2}>Tab B</Tab>
        <Tab value={3}>Tab C</Tab>
      </TabList>
    </Tabs>
  );
}
```

### Basic usage

The tabs structure follows [WAI ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). To target the initially selected tab, specify the `value` prop to the `TabPanel` and use `Tabs`'s `defaultValue`.

{{"demo": "TabsBasic.js"}}

### Variant

Both `TabList` and `Tab` accept [global variant](/joy-ui/main-features/global-variants/) values, so you can mix and match to get the desired result.

:::info
ℹ️ **Note:** the `TabPanel` component is the only one that doesn't support both global variant and color props.
:::

{{"demo": "TabsVariants.js"}}

### Disabled tab

To disable a tab, use the `disabled` prop on the `Tab` component.

{{"demo": "TabDisabled.js"}}

### Vertical

To set the tabs orientation to vertical, use the `orientation="vertical"` on the `Tabs` component. Keyboard navigation (e.g. arrow keys) will adapt automatically to the used orientation.

{{"demo": "TabsVertical.js"}}

### Icon

Since `TabList` uses the same style as the [`List`](/joy-ui/react-list/) component, you can use the icon directly as a child or use `ListItemDecorator` with a text.

{{"demo": "TabsIcon.js"}}

{{"demo": "TabsIconWithText.js"}}

### Accessibility

For ensuring proper accessibility, it's recommended by [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/#wai-aria-roles-states-and-properties-22) to associate a label to the Tabs component. To do that, there are two options:

#### Option one

Render a text element with an `id` and provide `aria-labelledby="$is"`to the Tabs component.

```js
<Typography id="tabs-accessibility-label">Meaningful label</Typography>
<Tabs aria-labelledby="tabs-accessibility-label">...</Tabs>
```

#### Option two

When not displaying a text element on the screen, use `aria-label` directly on the Tabs component. Screen readers will then properly announce the label.

```js
<Tabs aria-label="Meaningful label">...</Tabs>
```

## CSS Variables

Play around with all the CSS variables available in the slider component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "TabsVariables.js"}}

## Common examples

### Pricing tabs

{{"demo": "TabsPricingExample.js"}}

### Page tabs

{{"demo": "TabsPageExample.js"}}

### Mobile bottom navigation

{{"demo": "TabsBottomNavExample.js"}}
