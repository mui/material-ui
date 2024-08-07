# Color inversion

<p class="description">Joy UI components can invert their colors to match with the parent's variant.</p>

## Motivation

The Joy UI [global variants feature](/joy-ui/main-features/global-variants/) provides a consistent set of values for the `variant` prop.
But these variants can sometimes cause quirks when the same styles are applied to both parent and child components.
Check out the two demo cards below to see how things can go wrong:

{{"demo": "ColorInversionMotivation.js"}}

- On the left, the Button variant is `solid`, while its parent Card is the default `outlined`, so the design works well.
- On the right, the `solid` variant is applied to both the Button and the Card, disrupting the design's hierarchy and contrast.

Joy UI's color inversion feature prevents this kind of situation from occurring, while still preserving the hierarchical meaning of the global variants themselves.

## Overview

When color inversion is enabled on a parent component, all children components invert their styles (regardless of their respective color props) to match the parent's background.
The inverted styles maintain the semantic meaning of their corresponding global variants—in the example below, the Button is still `solid` even though it's been inverted to contrast with its container.
If you change the Button's variant to `outlined`, you'll see that the design still works; but try removing the `invertedColors` prop from the parent Card, and you'll see how the design falls apart (and thus, why this feature is so useful):

{{"demo": "ColorInversionOverview.js"}}

:::info
The color inversion feature is only available for `soft` and `solid` variants because the rest of the global variants don't have background by default.
:::

### Benefits

- Color inversion reduces a significant amount of styling effort. It handles all of the visual states (hover, active, and focus) on all the children.
- It makes your interface scalable. New components added to the area will just work.
- It works for both client-side and server-side rendering.
- It works for both light and dark mode.
- It can be disabled at any time without impacting the structure of the components.
- It is an opt-in feature. If you don't use it, the extra CSS variables won't be included in the production style sheet.
- Some children can be excluded from the color inversion, see ["skip color inversion on a child"](#skip-inversion-on-a-child) section.

### Trade-offs

- If the parent component contains just a few children, the size of the stylesheet generated may be significantly larger than it would be if you customized each child individually. (This may be inconsequential for overall performance.)
- It doesn't work with browsers that don't support [CSS variables](https://caniuse.com/css-variables).

## Usage

### Supported components

The following components accept the `invertedColors` prop when applied in conjunction with the `solid` or `soft` variants:

- [Alert](/joy-ui/react-alert/)
- [Card](/joy-ui/react-card/)
- [Drawer](/joy-ui/react-drawer/)
- [Modal Dialog](/joy-ui/react-modal/#modal-dialog)
- [Menu](/joy-ui/react-menu/)
- [Sheet](/joy-ui/react-sheet/)

{{"demo": "ColorInversionSurface.js"}}

### Exceptions

Color inversion does not affect the popup slot of the Autocomplete, Menu, or Tooltip components by default.
To enable it, set `disablePortal` to `"true"` using `slotProps` on the respective child component, as demonstrated below:

{{"demo": "ColorInversionPopup.js"}}

:::info
To learn more about the concept of component slots and slot props, visit the [Overriding component structure](/joy-ui/customization/overriding-component-structure/) guide.
:::

### Skip inversion on a child

When `invertedColors` is applied to a parent, you can add the `data-skip-inverted-colors` attribute to a child to prevent that child from being inverted.

{{"demo": "ColorInversionSkip.js"}}

### Apply color inversion to any parent

```js
import { applySolidInversion, applySoftInversion } from '@mui/joy/colorInversion';
```

If you need color inversion for a parent component that isn't [supported by default](#supported-components), you can use the `applySolidInversion` or `applySoftInversion` utilities to add it to any component that contains children.
(This is what the supported components use behind the scenes when the `invertedColors` prop is applied.)

The examples below show how to use these utilities with both the `sx` prop and the `styled` API:

#### With the sx prop

```jsx
<Box sx={[{ ...baseStyles }, applySolidInversion('neutral')]}>...</Box>
```

{{"demo": "ColorInversionAnyParent.js"}}

#### With the styled API

```jsx
const Parent = styled('div')([{ ...baseStyles }, applySolidInversion('neutral')]);
```

{{"demo": "ColorInversionAnyParentStyled.js"}}

## How it works

Color inversion adds CSS variables to the component using the `invertedColors` prop or the apply utilities. There's no [React context](https://react.dev/learn/passing-data-deeply-with-context) involved in this feature.

```jsx
<Sheet invertedColors variant="solid" color="neutral">

// The parent's style sheet
{
  // the values of these variables depends on the parent's variant and color.
  --variant-softColor: …;
  --variant-softBg: …;
  --variant-softHoverColor: …;
  --variant-softHoverBg: …;
  --variant-softActiveBg: …;
  … // other variants
  --joy-palette-text-primary: …;
  --joy-palette-text-secondary: …;
  --joy-palette-text-tertiary: …;
  --joy-palette-background-surface: …;
  … // other theme palette tokens
}
```

As a result, the children will use these CSS variables instead of the theme:

```jsx
// The children style sheet
// The values of these variables are inherited from the parent.
{
  color: var(--joy-palette-text-primary);
  background: var(--joy-palette-background-surface);
  …
}
```

## Common examples

### Header

{{"demo": "ColorInversionHeader.js"}}

### Footer

{{"demo": "ColorInversionFooter.js"}}

### Side navigation

{{"demo": "ColorInversionNavigation.js"}}

### Marketing section

{{"demo": "ColorInversionMarketing.js"}}
