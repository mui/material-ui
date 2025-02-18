---
productId: joy-ui
title: React Accordion component
components: Accordion, AccordionDetails, AccordionGroup, AccordionSummary
githubLabel: 'component: accordion'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
---

# Accordion

<p class="description">Accordions let users show and hide sections of related content on a page.</p>

## Introduction

Joy UI provides four accordion-related components:

- [Accordion Group](#basic-usage) - a container that groups multiple accordions. It **does not** control the state of each accordion.
- [Accordion](#basic-usage) - a component that contains the expansion logic and send to AccordionSummary and AccordionDetails.
- [Accordion Summary](#basic-usage) - a header of the accordion which contain a button that triggers the expansion.
- [Accordion Details](#basic-usage) - a wrapper for the accordion details.

{{"demo": "AccordionUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
```

{{"demo": "AccordionBasic.js"}}

## Customization

### Sizes

The AccordionGroup component comes in three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "AccordionSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Controlled accordion

Use the `expanded` prop to control the expansion state of the accordion and listen to the expansion event via `onChange` prop.

{{"demo": "AccordionControlled.js"}}

### Disabled

Use the `disabled` prop to disable the accordion trigger.

{{"demo": "AccordionDisabled.js"}}

:::info
Note: the `disabled` prop only disables the accordion trigger, not the accordion content.
:::

### Removing divider

Use `disableDivider` prop on the Accordion Group component to hide the divider between accordions.

{{"demo": "AccordionNoDivider.js"}}

:::info
**Good to know**: the reason that ListDivider can be used is because the accordion family reuses styles from the [List](/joy-ui/react-list/) family.
:::

### Animating the expansion

Use `transition` prop to animate the expansion. The value can be a **string** if you want the transition to be the same for initial and expanded states, or an **object** if you want to customize the transition for each state.

The object value can contain the following keys:

- `initial`: the transition when the accordion is closed
- `expanded`: the transition when the accordion is open

{{"demo": "AccordionTransition.js", "hideToolbar": true}}

### Indicator

Use `indicator` prop to customize the indicator of the accordion.

{{"demo": "AccordionIndicator.js"}}

### Styling on expansion

Use `sx` prop on the AccordionGroup to style all the accordions at once.

{{"demo": "AccordionStylingExpansion.js"}}

## Common examples

### Depth panel

This example shows how to customize the accordion to create lines and depth to make it look more realistic.

{{"demo": "AccordionDepthPanel.js"}}

### User settings

This example shows how to customize the accordion and craft diverse compositions using additional components.

{{"demo": "AccordionFilter.js"}}

## Accessibility

The built-in accessibility of the accordion follows [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

- The accordion summary has a root slot (`div`) that can be changed, for example using `h3`, based on the hierarchy of the accordion.
- The accordion summary contains a button with `aria-expanded` and `aria-controls` attributes.
- The accordion details contains a div with `role="region"` and `aria-labelledby` attributes.
