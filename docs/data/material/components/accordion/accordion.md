---
productId: material-ui
title: React Accordion component
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'component: accordion'
materialDesign: https://m1.material.io/components/expansion-panels.html
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
---

# Accordion

<p class="description">The accordion component allows the user to show and hide sections of related content on a page.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Introduction

The Material UI Accordion component includes several complementary utility components to handle various use cases:

- Accordion: the wrapper for grouping related components.
- Accordion Summary: the wrapper for the Accordion header, which expands or collapses the content when clicked.
- Accordion Details: the wrapper for the Accordion content.
- Accordion Actions: an optional wrapper that groups a set of buttons.

{{"demo": "AccordionUsage.js", "bg": true}}

:::info
This component is no longer documented in the [Material Design guidelines](https://m2.material.io/), but Material UI will continue to support it.
:::

## Basics

```jsx
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
```

### Controlled Accordion

The Accordion component can be controlled or uncontrolled.

{{"demo": "ControlledAccordions.js", "bg": true}}

:::info

- A component is **controlled** when it's managed by its parent using props.
- A component is **uncontrolled** when it's managed by its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

### Disabled item

Use the disabled prop on the `Accordion` component to disable interaction and focus.

{{"demo": "DisabledAccordion.js", "bg": true}}

## Customization

### One opened item per time

Use the `expanded` prop, together with React's `useState` to set only one opened item per time.
The demo below also shows a bit of visual customziation.

{{"demo": "CustomizedAccordions.js"}}

## Performance

The Accordion's content is mounted by default even if it's not expanded.
This default behavior has server-side rendering and SEO in mind.

However, if you render the Accordion Details with a big component tree inside it, or if you have many Accordions, we recommend changing this behavior by turning `unmountOnExit` on inside the `TransitionProps` prop:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

## Accessibility

For an optimal accessibility, based on the [WAI-ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), set an `id` and `aria-controls` on the Accordion Summary component.
The Accordion component will then derive the necessary `aria-labelledby` and `id` from its content.

```jsx
<Accordion>
  <AccordionSummary id="panel-header" aria-controls="panel-content">
    Header
  </AccordionSummary>
  <AccordionDetails>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </AccordionDetails>
</Accordion>
```

## Anatomy

The Accordion component is composed of a root `<div>` that houses interior elements like the Accordion Summary and other optional components (such as buttons or decorators).

```jsx
<div class="MuiAccordion-root">
  <div class="MuiButtonBase-root MuiAccordionSummary-root" role="button" aria-expanded="">
      <!-- Accordion header button goes here -->
  </div>
  <div class="MuiAccordion-region" role="region">
    <div class="MuiAccordionDetails-root">
      <!-- Accordion content goes here -->
    </div>
  </div>
</div>
```
