---
product: joy-ui
title: React Button component
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
unstyled: /base/react-button/
---

# Button

<p class="description">Buttons allow users to take actions, and make choices, with a single tap.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

Buttons communicate actions that users can take.
They are typically placed throughout your UI, in places like:

- Modal windows
- Forms
- Cards
- Toolbars

## Variants

The `Button` comes with four global variants: `solid` (default), `soft`, `outlined` and `plain`.

{{"demo": "ButtonVariants.js"}}

## Colors

All theme palettes are available via the `color` prop which can be combined with the `variant` prop.

{{"demo": "ButtonColors.js"}}

## Sizes

The `Button` has three sizes: `sm`, `md` (default) and `lg`.

{{"demo": "ButtonSizes.js"}}

## Disabled

Specify `disabled` prop to the button to disable the interaction and focus.

{{"demo": "ButtonDisabled.js"}}

## With icons

Use `startIcon` and/or `endIcon` props to control the position of the specified icon.

{{"demo": "ButtonIcons.js"}}

## Icon button

If you want an equal width and height button without displaying the label, use `IconButton`. It accepts the same values for `variant`, `color`, and `size` props.

{{"demo": "IconButtons.js"}}

:::info
**♿️ Accessibility**: You have to provide an appropriate [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) to the icon button for screen readers. This is useful for people with severe visual impairments.

```js
<IconButton aria-label="Add to favorite">
  <FavoriteBorder />
</IconButton>
```

:::

## As link

Use `component="a"` prop to change the html element from `button` to `a`.

{{"demo": "ButtonLink.js"}}
