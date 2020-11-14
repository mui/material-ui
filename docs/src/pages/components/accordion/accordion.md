---
title: React Accordion component
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
---

# Accordion

<p class="description">Accordions contain creation flows and allow lightweight editing of an element.</p>

[An accordion](https://material.io/archive/guidelines/components/expansion-panels.html) is a lightweight container that may either stand alone or be connected to a larger surface, such as a card.

> **Note:** Accordions are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them. It was formerly known as the "expansion panel".

## Simple accordion

{{"demo": "pages/components/accordion/SimpleAccordion.js", "bg": true}}

## Controlled accordion

Extend the default behavior to create an accordion with the `Accordion` component.

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Customized accordions

Here is an example of customizing the component. You can learn more about this in the
[overrides documentation page](/customization/components/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Additional actions

In order to put an action such as a `Checkbox` or a button inside of the `AccordionSummary`, you need to stop the propagation of the focus and click events to prevent the accordion from
expanding/collapsing when using the action.
You should also provide an `aria-label` for the action, otherwise the label of the nested action will be included in
the label of the parent button that controls the accordion expansion.

{{"demo": "pages/components/accordion/ActionsInAccordionSummary.js", "bg": true}}

## Performance

The content of Accordions is mounted by default even if the accordion is not expanded.
This default behavior has server-side rendering and SEO in mind.
If you render expensive component trees inside your accordion details or simply render many
accordions it might be a good idea to change this default behavior by enabling the
`unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

As with any performance optimization this is not a silver bullet. Be sure to identify
bottlenecks first and then try out these optimization strategies.

## Secondary heading and columns

Multiple columns can be used to structure the content, and a helper text may be added to the accordion to assist the user.

{{"demo": "pages/components/accordion/DetailedAccordion.js", "bg": true}}

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

For optimal accessibility we recommend setting `id` and `aria-controls` on the
`AccordionSummary`. The `Accordion` will derive the necessary `aria-labelledby`
and `id` for the content region of the accordion.
