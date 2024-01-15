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

### Start and end icons

Use the `startIcon` or `endIcon` prop to append an icon to the beginning or end of a Button's contents.

{{"demo": "IconLabelButtons.js"}}

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

## Customization

```jsx
import ButtonBase from '@mui/material/ButtonBase';
```

Material UI's Buttons are all built on top of the Button Base component.
You can take advantage of this lower-level component to create custom interactions, as shown in the demo below.

{{"demo": "ButtonBaseDemo.js"}}

#### Routing

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server.
The Button Base component provides the `component` prop to handle this use case.
For more information, see the [Routing—Button](/material-ui/guides/routing/#button) doc.

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

:::

### Material 3 Button

The default Material UI Button component follows the Material Design 2 specs.
To use the [Material 3](https://m3.material.io/) version, install the experimental `@mui/material-next` package.

```js
import Button from '@mui/material-next/Button';
```

{{"demo": "ButtonMaterialYouPlayground.js", "hideToolbar": true, "bg": "playground"}}

To learn more about Material UI's MD3 implementation, visit the [Material 3 Components documentation](/material-ui/guides/material-3-components/).
