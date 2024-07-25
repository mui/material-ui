---
productId: material-ui
title: React Button component
components: Button, IconButton, ButtonBase, LoadingButton
materialDesign: https://m2.material.io/components/buttons
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
unstyled: /base-ui/react-button/
---

# Button

<p class="description">Buttons enable users to take actions and make choices.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Introduction

Buttons communicate actions that users can take.
The Material UI Button component replaces the native HTML `<button>` element and offers expanded options for styling and accessibility.

{{"demo": "IntroButtons.js"}}

## Basics

```jsx
import Button from '@mui/material/Button';
```

### Links

The Material UI Button accepts an `href` prop, which turns the HTML `<button>` element into an `<a>` with the target link.

```jsx
<Button href="/home">Home</Button>

// renders as

<a href="/home">Home</a>
```

### Variants

The Button component supports three values for the `variant` prop: `text` (default), `contained`, and `outlined`.

{{"demo": "BasicButtons.js"}}

#### Elevation

Apply the `disableElevation` prop to remove the default drop shadow from the `contained` variant.

{{"demo": "DisableElevation.js"}}

### Colors

Every palette included in the theme is available via the `color` prop.

{{"demo": "ColorButtons.js"}}

:::success
If the default colors aren't sufficient, you can add custom colors and remove defaults that you don't need.
See the [Palette—Custom colors](/material-ui/customization/palette/#custom-colors) doc for more info.
:::

### Sizes

The Button component comes in three sizes: `small`, `medium` (default), and `large`.

{{"demo": "ButtonSizes.js"}}

#### Width

Use the `fullWidth` prop to stretch the Button to fill its container.

{{"demo": "FullWidthButton.js"}}

### Start and end icons

Use the `startIcon` or `endIcon` prop to append an icon to the beginning or end of a Button's contents.

{{"demo": "IconLabelButtons.js"}}

### Ripple effect

The ripple effect provides visual feedback to the user that the Button is being clicked or focused.
Use the `disableFocusRipple` prop to remove only the focus effect, or `disableRipple` to remove the ripple when focusing and clicking.

:::warning
These props remove _all_ default styles from the `:focus-visible` state, which means the user won't have any visual indication that the Button is focused.
You can target the `.Mui-focusVisible` class to define your own styles for a better user experience.

The demo below shows what happens if you don't define custom styles for the focus state.
:::

{{"demo": "RippleButtons.js"}}

### Icon Buttons

```jsx
import IconButton from '@mui/material/IconButton';
```

Icon buttons are commonly found in app bars and toolbars.
They're also useful for toggle buttons that give the user a single choice to be selected or deselected, such as adding or removing a star to an item.

The Material UI Icon Button component accepts the same props and values as the Button for [sizes](#sizes) and [colors](#colors).

{{"demo": "IconButtons.js"}}

### Handling clicks

Material UI Buttons accept an `onClick` handler that's applied to the root DOM element.

```jsx
<Button
  onClick={() => {
    alert('clicked');
  }}
>
  Click me
</Button>
```

#### Disable

Use the `disabled` prop to disable clicking on a Button.

{{"demo": "DisabledButton.js"}}

## Customization

### Button Base

```jsx
import ButtonBase from '@mui/material/ButtonBase';
```

Material UI's Buttons are all built on top of the Button Base component.
You can take advantage of this lower-level component to create custom interactions, as shown in the demo below.

{{"demo": "ButtonBaseDemo.js"}}

#### Routing

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server.
The Button Base component provides the `component` prop to handle this use case.
For more information, see the [Routing—Button](/material-ui/integrations/routing/#button) doc.

#### Limitations

##### Cursor not-allowed

The Button Base component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

If you wish to use `not-allowed`, you have two options:

1. **CSS only**. You can remove the pointer-events style on the disabled state of the `<button>` element:

```css
.MuiButtonBase-root:disabled {
  cursor: not-allowed;
  pointer-events: auto;
}
```

However:

- You should add `pointer-events: none;` back when you need to display [tooltips on disabled elements](/material-ui/react-tooltip/#disabled-elements).
- The cursor won't change if you render something other than a button element—for instance, a link `<a>` element.

2. **DOM change**. You can wrap the Button:

```jsx
<span style={{ cursor: 'not-allowed' }}>
  <Button component={Link} disabled>
    disabled
  </Button>
</span>
```

This has the advantage of supporting any element—for instance, a link `<a>` element.

## Common examples

### File upload button

To create a file upload button, turn the Button into a label using `component="label"` and then create a visually-hidden input with type `file`, as shown in the demo below:

{{"demo": "InputFileUpload.js"}}

## Experimental APIs

### Loading Button

```jsx
import LoadingButton from '@mui/lab/LoadingButton';
```

The [`@mui/lab`](/material-ui/about-the-lab/) package offers a Loading Button component, which displays a loading state and disables interactions.

{{"demo": "LoadingButtons.js"}}

Toggle the loading switch to see the transition between the different states.

{{"demo": "LoadingButtonsTransition.js"}}

:::warning
There is a [known issue](https://github.com/mui/material-ui/issues/27853) with translating a page using Chrome tools when a Loading Button is present.
After the page is translated, the application crashes when the loading state of a Button changes.
To prevent this, ensure that the contents of the Loading Button are nested inside any HTML element, such as a `<span>`:

```jsx
<LoadingButton loading variant="outlined">
  <span>Submit</span>
</LoadingButton>
```
