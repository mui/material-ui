---
product: joy-ui
title: React Chip component
githubLabel: 'component: chip'
unstyled: /base/react-chip/
---

# Chip

<p class="description">Chip generates a compact element that can represent an input, attribute, or action.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

{{"demo": "ChipUsage.js", "hideToolbar": true}}

## Basic

The `Chip` comes with four global variants: `plain`, `outlined`, `soft` and `solid` (default).

{{"demo": "SimpleChip.js"}}

## Decorators

Specify the `startDecorator` prop or `endDecorator` prop as a `ReactNode` to the `Chip` to display the decorators.

{{"demo": "ChipWithDecorators.js"}}

## Delete button

The `Chip` has a complementary component called `ChipDelete`. Use it for the purpose of deletable `Chip` components.

{{"demo": "DeleteButtonChip.js"}}

## Clickable

Specify the `onClick` prop in order to enable the clickability of the `Chip` component.

{{"demo": "ClickableChip.js"}}

## With checkbox

You can wrap the Joy `Checkbox` component with the Joy `Chip` component.

{{"demo": "CheckboxChip.js", "hideToolbar": true}}

## With Radio

You can wrap the Joy `Radio` component with the Joy `Chip` component.

{{"demo": "RadioChip.js", "hideToolbar": true}}
