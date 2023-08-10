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

The tabs structure follows [WAI ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).
To target the initially selected tab, specify the `value` prop to the `TabPanel` and use `Tabs`'s `defaultValue`.

{{"demo": "TabsBasic.js"}}

### Variants

Both `TabList` and `Tab` accept [global variant](/joy-ui/main-features/global-variants/) values, so you can mix and match to get the desired result.

:::info
A selected `Tab` does not apply `:hover` and `:active` global variant styles.
:::

{{"demo": "TabsVariants.js"}}

:::info
To learn how to add more variants to the component, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
:::

### Disabled tab

To disable a tab, use the `disabled` prop on the `Tab` component.

{{"demo": "TabDisabled.js"}}

### Vertical

To set the tabs orientation to vertical, use the `orientation="vertical"` on the `Tabs` component.
Keyboard navigation (e.g. arrow keys) will adapt automatically to the used orientation.

{{"demo": "TabsVertical.js"}}

### Placement

To change the placement, you should provide the value of `top`, `bottom`, `left` or `right`.

This prop can be applied on the TabList component to change the `underlinePlacement` as in the example:

{{"demo": "TabsUnderlinePlacement.js"}}

Or, it can be applied on the Tab component to change the `indicatorPlacement`:

{{"demo": "TabsIndicatorPlacement.js"}}

The flex direction of the Tabs component will need to be changed based on each placement.

{{"demo": "TabsFlexPlacement.js"}}

### Sticky

For long content, you can use the `sticky="top"` prop on the TabList component to keep the tabs visible while scrolling.

To stick the TabList at the bottom, use `sticky="bottom"` and render the TabList at the end of the Tabs component.

{{"demo": "TabsSticky.js"}}

### Tab flex

Use the `tabFlex` prop on the TabList component to make the Tab elements fill the available space as shown in the example below.

The first demo, `tabFlex={1}`, the Tab elements will fill the available space equally.

The second demo, `tabFlex="auto`, the Tab elements will fill the available space equally, but the width of each Tab element will be based on the content.

{{"demo": "TabsFlex.js"}}

:::success
The value of the `tabFlex` can be any valid [CSS flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) value.
:::

### Icon

Since `TabList` uses the same style as the [`List`](/joy-ui/react-list/) component, you can use the icon directly as a child or use `ListItemDecorator` with a text.

{{"demo": "TabsIcon.js"}}

{{"demo": "TabsIconWithText.js"}}

### Accessibility

For ensuring proper accessibility, it's recommended by [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/#wai-aria-roles-states-and-properties-22) to associate a label to the Tabs component.
To do that, there are two options:

#### Option one

Render a text element with an `id` and provide `aria-labelledby="$is"`to the Tabs component.

```js
<Typography id="tabs-accessibility-label">Meaningful label</Typography>
<Tabs aria-labelledby="tabs-accessibility-label">...</Tabs>
```

#### Option two

When not displaying a text element on the screen, use `aria-label` directly on the Tabs component.
Screen readers will then properly announce the label.

```js
<Tabs aria-label="Meaningful label">...</Tabs>
```

## CSS Variables

Play around with all the CSS variables available in the slider component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "TabsVariables.js"}}

## Common examples

### Segmented controls

To mimic the iOS segmented controls, add the border-radius to the `sx` prop of the TabList and set the selected Tab's background to `background.surface`.

{{"demo": "TabsSegmentedControls.js"}}

### Browser tabs

In this example, the Tab's variant is set to `outlined` and the indicator is moved to the top via `indicatorPlacement="top"`. The borders of the Tab are set to `transparent` based on the selected state.

{{"demo": "TabsBrowserExample.js"}}

### Pricing tabs

This example removes the background of the selected Tab by targeting `[aria-selected="true"]` on the `sx` prop.

{{"demo": "TabsPricingExample.js"}}

### With counter chips

To render tab items at the center of the TabList, use `justifyContent: 'center'` on the `sx` prop of the TabList and set `flex: initial` to each of the Tab to override the default `flex-grow`.

{{"demo": "TabsPageExample.js"}}

### Mobile bottom navigation

In this example, each Tab's is applied with one of the theme's color palette when it is selected.

{{"demo": "TabsBottomNavExample.js"}}
