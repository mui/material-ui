# Color inversion

<p class="description">Joy UI components can invert their colors to match with the parent's variant.</p>

## Motivation

[Global variants](/joy-ui/main-features/global-variants/) provide a consistent `variant` prop that lets you control the hierarchy of importance within a group of Joy UI components. However, they are not working as expected when global variants are used in multiple layers.

The example below (on your right-hand side) shows the problem when the interface has more than one layer that applies the global variants:

{{"demo": "ColorInversionMotivation.js"}}

On the **left**, the `Button`'s variant is `solid` which is the highest emphasis level compared to other components. This conforms to the visual appearance on the screen.

On the **right**, the problem arises when the container's variant becomes `solid`. The button is no longer the highest emphasis element because the it has the same background as the container. Also, the text and the icon button don't have enough contrast to the parent's background.

The color inversion is implemented to solves this issue, keeping the global variants meaningful when multiple layers of global variants are composed together.

## Overview

When color inversion is enabled on the parent component, the children with implicit color will invert their styles to match the parent's background by keeping the same hierarchy of importance based on their variants.

{{"demo": "ColorInversionOverview.js"}}

:::info
**Implicit** color refers to components that don't have the `color` prop specified.

Color inversion has **no effect** on those children that have an **explicit** `color` prop.

```js
// implicit color. The styles change when color inversion is enabled.
<Chip variant="soft">…</Chip>

// explicit color. Color inversion has no effect.
<Chip variant="soft" color="primary">…</Chip>
```

:::

### Benefits

- Color inversion reduces a significant amount of styling effort. It handles all of the visual states (hover, active, and focus) on all the children.
- It makes your interface scalable. New components added to the area will just work.
- It works for both client-side and server-side rendering.
- It works for both light and dark mode.
- It can be disabled at any time without impacting the structure of the components.
- It is an opt-in feature. If you don't use it, the extra CSS variables won't be included in the production style sheet.
- It doesn't alter the styles of the children if you explicitly specify the `color` prop on them.

### Trade-offs

- If the surface component contains just a few components, the style sheet size of the CSS variables might be **bigger** than customizing the styles of each individual child.
- It doesn't work with browsers that don't support [CSS variables](https://caniuse.com/css-variables).

## Usage

To enable the feature set `invertedColors` to true on the surface components:

```js
<Card variant="solid" color="primary" invertedColors>…</Card>

<Sheet variant="soft" color="info" invertedColors>…</Sheet>
```

:::info

- [`Sheet`](/joy-ui/react-sheet/) and [`Card`](/joy-ui/react-card/) are the only components that support this feature.
- The surface component should have `soft` or `solid` variant to enable this feature.
  :::

### Portal popup

By default, color inversion has no effect on the popup slot of `Autocomplete`, `Menu`, and `Tooltip`.

To enable color inversion for those slots, set `disablePortal` to true.

{{"demo": "ColorInversionPopup.js"}}

:::info
The popup slot of the `Select` component has `disablePortal` set to true by default.
:::

## Common examples

### Header

{{"demo": "ColorInversionHeader.js"}}

### Footer

{{"demo": "ColorInversionFooter.js"}}

### Side navigation

{{"demo": "ColorInversionNavigation.js"}}

### Marketing section

{{"demo": "ColorInversionMarketing.js"}}

## How it works

**Parent component**

When `invertedColors` is set to true on the surface component, a set of CSS variables are applied to it. The values of those variables comes from `theme.colorInversion[variant][color]` where `variant` and `color` are the component's props. The surface component also creates a React context to tell the children to update their styles.

```jsx
<Sheet invertedColors variant="solid" color="neutral">

// The component style sheet
{
  // the values of these variables depends on the parent's variant and color.
  --variant-softColor: …;
  --variant-softBg: …;
  --variant-softHoverColor: …;
  --variant-softHoverBg: …;
  --variant-softActiveBg: …;
  … // other variants
}
```

**Child component**

All Joy UI components that support global variants check the React context that contains the color inversion flag. If the flag is true and the child has an implicit color, the internal `color` value will switch to `context` and apply the styles from `theme.variants[variant].context`.

The styles will match the `--variant-*` variables that the parent has.

```jsx
<Chip variant="soft">

// Component style sheet
{
  background-color: var(--variant-softBg);
  color: var(--variant-softColor);
}
```

In summary, the parent creates a React context to tell the children that the feature is enabled, and generates CSS variables that will be used by the children. The children with an implicit color switch their default color value to `context` to get the styles from the theme.
