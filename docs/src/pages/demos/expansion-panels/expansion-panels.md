---
title: Expansion Panel React component
components: ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary
---

# Expansion Panels

<p class="description">Expansion panels contain creation flows and allow lightweight editing of an element.</p>

[An expansion panel](https://material.io/archive/guidelines/components/expansion-panels.html) is a lightweight container that may either stand alone or be connected to a larger surface, such as a card.

> **Note:** Expansion panels are no longer documented in the Material Design documentation.

## Simple Expansion Panel

{{"demo": "pages/demos/expansion-panels/SimpleExpansionPanel.js"}}

## Controlled Accordion

Extend the default panel behavior to create an accordion with the `ExpansionPanel` component.

{{"demo": "pages/demos/expansion-panels/ControlledExpansionPanels.js"}}

## Secondary heading and Columns

Multiple columns can be used to structure the content, and a helper text may be added to the panel to assist the user.

{{"demo": "pages/demos/expansion-panels/DetailedExpansionPanel.js"}}

## Customized Expansion Panel

If you have been reading the [overrides documentation page](/customization/overrides/)
but you are not confident jumping in,
here is one example of how you can customize the background color of the `ExpansionPanelSummary` and padding of `ExpansionPanelDetails`.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/expansion-panels/CustomizedExpansionPanel.js"}}
