---
productId: material-ui
title: React Accordion component
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'scope: accordion'
materialDesign: https://m1.material.io/components/expansion-panels.html
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
githubSource: packages/mui-material/src/Accordion
---

# Accordion

<p class="description">The Accordion component lets users show and hide sections of related content on a page.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

:::info
This component is no longer documented in the [Material Design guidelines](https://m2.material.io/), but Material UI will continue to support it.
:::

{{"demo": "AccordionUsage.js", "bg": true}}

## Anatomy

The Accordion components form a header and panel:

- `Accordion`: groups `AccordionSummary` and `AccordionDetails`. Renders a `<div>` element.
- `AccordionSummary`: a trigger that expands or collapses the panel. Renders an `h3` containing a `<button>` element.
- `AccordionDetails`: contains the panel content. Renders a `<div>` element.
- `AccordionActions`: groups actions for the panel. Renders a `<div>` element.

```jsx title="Anatomy"
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';

<Accordion>
  <AccordionSummary>Accordion summary</AccordionSummary>
  <AccordionDetails>Accordion details</AccordionDetails>
  <AccordionActions>
    <Button>Cancel</Button>
    <Button>Save</Button>
  </AccordionActions>
</Accordion>;
```

## Usage guidelines

- **Make summaries descriptive**: The summary is the accordion header button, so it should clearly identify the content that expands.
- **Keep the heading hierarchy logical**: Accordion uses an `h3` by default. Change it with `slotProps.heading.component` when your page structure requires a different level.
- **Use the documented structure**: Place `AccordionSummary` before `AccordionDetails` so the summary button and panel region are wired automatically.
- **Limit expanded regions**: Each panel is a `region` landmark. If many panels can be open at once, consider allowing only one expanded panel at a time.

## Basics

### Expand icon

Use the `expandIcon` prop on the Accordion Summary component to change the expand indicator icon.
The component handles the turning upside-down transition automatically.

{{"demo": "AccordionExpandIcon.js", "bg": true}}

### Expanded by default

Use the `defaultExpanded` prop on the Accordion component to have it opened by default.

{{"demo": "AccordionExpandDefault.js", "bg": true}}

### Disabled item

Use the `disabled` prop on the Accordion component to disable interaction and focus.

{{"demo": "DisabledAccordion.js", "bg": true}}

## Expansion behavior

### Controlled accordion

The Accordion component can be controlled or uncontrolled.

{{"demo": "ControlledAccordions.js", "bg": true}}

:::info

- A component is **controlled** when it's managed by its parent using props.
- A component is **uncontrolled** when it's managed by its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

### Only one expanded at a time

Use the `expanded` prop with React's `useState` hook to allow only one Accordion item to be expanded at a time.
The demo below also shows a bit of visual customization.

{{"demo": "CustomizedAccordions.js", "bg": true}}

### Transition

Use the `slots.transition` and `slotProps.transition` props to change the Accordion's default transition.

{{"demo": "AccordionTransition.js", "bg": true}}

### Unmounting collapsed content

The Accordion content is mounted by default even if it's not expanded.
This default behavior has server-side rendering and SEO in mind.

If you render the Accordion Details with a big component tree nested inside, or if you have many Accordions, you may want to change this behavior by setting `unmountOnExit` to `true` inside the `slotProps.transition` prop to improve performance:

```jsx
<Accordion slotProps={{ transition: { unmountOnExit: true } }} />
```

## Customization

### Heading level

By default, the Accordion uses an `h3` element for the heading. You can change the heading element using the `slotProps.heading.component` prop to ensure the correct heading hierarchy in your document.

```jsx
<Accordion slotProps={{ heading: { component: 'h4' } }}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>Accordion</AccordionSummary>
  <AccordionDetails>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
    lacus ex, sit amet blandit leo lobortis eget.
  </AccordionDetails>
</Accordion>
```

### Actions

Use the `AccordionActions` component to group buttons related to the panel content.

```jsx
<Accordion>
  <AccordionSummary>Accordion</AccordionSummary>
  <AccordionDetails>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </AccordionDetails>
  <AccordionActions>
    <Button>Cancel</Button>
    <Button>Save</Button>
  </AccordionActions>
</Accordion>
```
