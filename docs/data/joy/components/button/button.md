---
product: joy-ui
title: React Button component
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
unstyled: /base/react-button/
---

# Button

<p class="description">Buttons allow users to take actions, and make choices, with a single tap.</p>

Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like:

- Modal windows
- Forms
- Cards
- Toolbars

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic button

The `Button` comes with four global variants: `plain`, `outlined`, `soft` and `solid` (default).

{{"demo": "ButtonVariants.js"}}

## Colors

All theme palettes are available via the `color` prop which can be combined with the `variant` prop.

{{"demo": "ButtonColors.js"}}

## Sizes

The `Button` has three sizes: `sm`, `md` (default) and `lg`.

{{"demo": "ButtonSizes.js"}}

## Icons

Use `startIcon` and/or `endIcon` props to control the position of the specified icon.

{{"demo": "ButtonIcons.js"}}
