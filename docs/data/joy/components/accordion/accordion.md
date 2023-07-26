---
productId: joy-ui
title: React Accordion component
githubLabel: 'component: accordion'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
---

# Accordion

<p class="description">Accordions let users show and hide sections of related content on a page.</p>

## Introduction

<!-- TODO: improve content -->

Accordion components are used to expand and collapse sections of content.

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

{{"demo": "AccordionSizes.js"}}

### Controlled accordion

{{"demo": "AccordionControlled.js"}}

### Disabled

{{"demo": "AccordionDisabled.js"}}

### Divider

{{"demo": "AccordionDivider.js"}}

### Expanding transition

{{"demo": "AccordionTransition.js", "hideToolbar": true}}

### Indicator

{{"demo": "AccordionIndicator.js"}}

### Styling on expansion

{{"demo": "AccordionStylingExpansion.js"}}

## Common examples

### Depth panel

{{"demo": "AccordionDepthPanel.js"}}

## Accessibility

The built-in accessibility of the accordion follows [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

- The accordion summary has a root slot (`div`) that can be changed, for example using `h3`, based on the hierarchy of the accordion.
- The accordion summary contains a button with `aria-expanded` and `aria-controls` attributes.
- The accordion details contains a div with `role="region"` and `aria-labelledby` attributes.
