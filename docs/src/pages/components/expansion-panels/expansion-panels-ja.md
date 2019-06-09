---
title: Expansion Panel React component
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion Panels

<p class="description">Expansion panels contain creation flows and allow lightweight editing of an element.</p>

[An expansion panel](https://material.io/archive/guidelines/components/expansion-panels.html) is a lightweight container that may either stand alone or be connected to a larger surface, such as a card.

> **Note:** Expansion panels are no longer documented in the Material Design documentation.

## アクセシビリティ

For optimal accessibility we recommend setting `id` and `aria-controls` on the `ExpansionPanelSummary`. The `ExpansionPanel` will derive the necessary `aria-labelledby` and `id` for the content region of the panel.

## Simple Expansion Panel

{{"demo": "pages/components/expansion-panels/SimpleExpansionPanel.js"}}

## Controlled Accordion

Extend the default panel behavior to create an accordion with the `ExpansionPanel` component.

{{"demo": "pages/components/expansion-panels/ControlledExpansionPanels.js"}}

## Secondary heading and Columns

Multiple columns can be used to structure the content, and a helper text may be added to the panel to assist the user.

{{"demo": "pages/components/expansion-panels/DetailedExpansionPanel.js"}}

## Performance

The content of ExpansionPanels is mounted by default even if the panel is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`: `<ExpansionPanel TransitionProps={{ unmountOnExit: true }} />`. As with any performance optimization this is not a silver bullet. Be sure to identify bottlenecks first and then try out these optimization strategies.

## Customized expansion panels

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/expansion-panels/CustomizedExpansionPanels.js"}}