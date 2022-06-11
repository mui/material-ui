---
product: joy-ui
title: React Chip component
githubLabel: 'component: chip'
---

# Chip

<p class="description">Chip generates a compact element that can represent an input, attribute, or action.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

{{"demo": "ChipUsage.js", "hideToolbar": true}}

## Decorators

Specify the `startDecorator` prop or `endDecorator` prop as a `ReactNode` to the `Chip` to display the decorators.

{{"demo": "ChipWithDecorators.js"}}

## Delete button

The `Chip` has a complementary component called `ChipDelete`. Use it for the purpose of deletable `Chip` components.
The variant of the `ChipDelete` changes based on the parent `Chip` unless you specify a specific variant to it.

{{"demo": "DeleteButtonChip.js"}}

## Clickable

Specify the `onClick` prop in order to enable the clickability of the `Chip` component.

{{"demo": "ClickableChip.js"}}

## As link

Pass component prop to the action slot to change from button to anchor tag. The rest of the props are spread to the DOM.

{{"demo": "LinkChip.js"}}

## Clickable and Deletable

Specify the `onClick` prop on the `ChipDelete` to trigger some action.

{{"demo": "ClickableAndDeletableChip.js"}}

## Component variables

The `Chip` component contains these CSS variables to communicate with `ChipDelete` and `Avatar` components. The demo below demonstrates the customization of a chip using the variables through the `sx` prop.

{{"demo": "ChipVariables.js", "hideToolbar": true}}

## With checkbox

You can wrap the Joy `Checkbox` component with the Joy `Chip` component.

{{"demo": "CheckboxChip.js"}}

## With radio

You can wrap the Joy `Radio` component with the Joy `Chip` component.

{{"demo": "RadioChip.js"}}
