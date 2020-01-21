---
title: Expansion Panel React component
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion Panel

<p class="description">Expansion panels contain creation flows and allow lightweight editing of an element.</p>

[An expansion panel](https://material.io/archive/guidelines/components/expansion-panels.html) is a lightweight container that may either stand alone or be connected to a larger surface, such as a card.

> **Note:** Expansion panels are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them.

## Simple Expansion Panel

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js", "bg": true}}

## Controlled Accordion

Extend the default panel behavior to create an accordion with the `ExpansionPanel` component.

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js", "bg": true}}

## Customized expansion panels

Here is an example of customizing the component. You can learn more about this in the
[overrides documentation page](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}

## Additional actions

In order to put an action such as a `Checkbox` or a button inside of the `ExpansionPanelSummary`, you need to stop the propagation of the focus and click events to prevent the panel from
expanding/collapsing when using the action.
You should also provide an `aria-label` for the action, otherwise the label of the nested action will be included in
the label of the parent button that controls the panel expansion.

{{"demo": "pages/components/expansion-panels/ActionsInExpansionPanelSummary.js", "bg": true}}

## Performance

The content of ExpansionPanels is mounted by default even if the panel is not expanded.
This default behavior has server-side rendering and SEO in mind.
If you render expensive component trees inside your panels or simply render many
panels it might be a good idea to change this default behavior by enabling the
`unmountOnExit` in `TransitionProps`:

```jsx
<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />
```

As with any performance optimization this is not a silver bullet. Be sure to identify
bottlenecks first and then try out these optimization strategies.

## Secondary heading and Columns

Multiple columns can be used to structure the content, and a helper text may be added to the panel to assist the user.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js", "bg": true}}

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

For optimal accessibility we recommend setting `id` and `aria-controls` on the
`ExpansionPanelSummary`. The `ExpansionPanel` will derive the necessary `aria-labelledby`
and `id` for the content region of the panel.
