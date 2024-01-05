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

Buttons communicate actions that users can take.
The Material UI Button component replaces the native HTML `<button>` element and offers expanded options for styling and accessibility.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basics

```jsx
import Button from '@mui/material/Button';
```

### Variants

The Button component supports three values for the `variant` prop: `text` (default), `contained`, and `outlined`.

{{"demo": "BasicButtons.js"}}

### Colors

{{"demo": "ColorButtons.js"}}

In addition to using the default button colors, you can add custom ones, or disable any you don't need. See the [Adding new colors](/material-ui/customization/palette/#custom-colors) examples for more info.

### Sizes

The Button component comes in three sizes: `small`, `medium` (default), and `large`.

{{"demo": "ButtonSizes.js"}}

### Elevation

You can remove the elevation with the `disableElevation` prop.

{{"demo": "DisableElevation.js"}}

### Start and end icons

Use the `startIcon` or `endIcon` prop to affix an icon to the beginning or end of a Button's contents.

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

### File upload button

To create a file upload button, turn the Button into a label using `component="label"` and then create a visually-hidden input with type `file`.

{{"demo": "InputFileUpload.js"}}

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
Here is a [more detailed guide](/material-ui/guides/routing/#button).

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
- The cursor won't change if you render something other than a button element, for instance, a link `<a>` element.

2. **DOM change**. You can wrap the button:

```jsx
<span style={{ cursor: 'not-allowed' }}>
  <Button component={Link} disabled>
    disabled
  </Button>
</span>
```

This has the advantage of supporting any element, for instance, a link `<a>` element.

## Experimental APIs

### Loading button

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

### Material 3 version

The default Material UI Button component follows the Material Design 2 specs.
To get the [Material 3](https://m3.material.io/) version, use the new experimental `@mui/material-next` package.

```js
import Button from '@mui/material-next/Button';
```

{{"demo": "ButtonMaterialYouPlayground.js", "hideToolbar": true, "bg": "playground"}}

For more instructions on how to use it, visit the [detailed guide](/material-ui/guides/material-3-components/).
