---
productId: material-ui
title: React Button component
components: Button, IconButton, ButtonBase
materialDesign: https://m2.material.io/components/buttons
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
githubSource: packages/mui-material/src/Button
---

# Button

<p class="description">Buttons allow users to take actions, and make choices, with a single tap.</p>

Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like:

- Modal windows
- Forms
- Cards
- Toolbars

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Basic button

The `Button` comes with three variants: text (default), contained, and outlined.

{{"demo": "BasicButtons.js"}}

### Text button

[Text buttons](https://m2.material.io/components/buttons#text-button)
are typically used for less-pronounced actions, including those located: in dialogs, in cards.
In cards, text buttons help maintain an emphasis on card content.

{{"demo": "TextButtons.js"}}

### Contained button

[Contained buttons](https://m2.material.io/components/buttons#contained-button)
are high-emphasis, distinguished by their use of elevation and fill.
They contain actions that are primary to your app.

{{"demo": "ContainedButtons.js"}}

You can remove the elevation with the `disableElevation` prop.

{{"demo": "DisableElevation.js"}}

### Outlined button

[Outlined buttons](https://m2.material.io/components/buttons#outlined-button) are medium-emphasis buttons.
They contain actions that are important but aren't the primary action in an app.

Outlined buttons are also a lower emphasis alternative to contained buttons,
or a higher emphasis alternative to text buttons.

{{"demo": "OutlinedButtons.js"}}

## Handling clicks

All components accept an `onClick` handler that is applied to the root DOM element.

```jsx
<Button
  onClick={() => {
    alert('clicked');
  }}
>
  Click me
</Button>
```

Note that the documentation [avoids](/material-ui/guides/api/#native-properties) mentioning native props (there are a lot) in the API section of the components.

## Color

{{"demo": "ColorButtons.js"}}

In addition to using the default button colors, you can add custom ones, or disable any you don't need. See the [Adding new colors](/material-ui/customization/palette/#custom-colors) examples for more info.

## Sizes

For larger or smaller buttons, use the `size` prop.

{{"demo": "ButtonSizes.js"}}

## Buttons with icons and label

Sometimes you might want to have icons for certain buttons to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.

{{"demo": "IconLabelButtons.js"}}

## Icon button

Icon buttons are commonly found in app bars and toolbars.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or
deselected, such as adding or removing a star to an item.

{{"demo": "IconButtons.js"}}

### Sizes

For larger or smaller icon buttons, use the `size` prop.

{{"demo": "IconButtonSizes.js"}}

### Colors

Use `color` prop to apply theme color palette to component.

{{"demo": "IconButtonColors.js"}}

### Loading

Starting from v6.4.0, use `loading` prop to set icon buttons in a loading state and disable interactions.

{{"demo": "LoadingIconButton.js"}}

### Badge

You can use the [`Badge`](/material-ui/react-badge/) component to add a badge to an `IconButton`.

{{"demo": "IconButtonWithBadge.js"}}

## File upload

To create a file upload button, turn the button into a label using `component="label"` and then create a visually-hidden input with type `file`.

{{"demo": "InputFileUpload.js"}}

## Loading

Starting from v6.4.0, use the `loading` prop to set buttons in a loading state and disable interactions.

{{"demo": "LoadingButtons.js"}}

Toggle the loading switch to see the transition between the different states.

{{"demo": "LoadingButtonsTransition.js"}}

:::warning
When the `loading` prop is set to `boolean`, the loading wrapper is always present in the DOM to prevent a [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).

The `loading` value should always be `null` or `boolean`. The pattern below is not recommended as it can cause the Google Translation crash:

```jsx
<Button {...(isFetching && { loading: true })}> // ❌ Don't do this
```

:::

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/?path=/docs/button-introduction--docs).

## Complex button

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`.
You can take advantage of this lower-level component to build custom interactions.

{{"demo": "ButtonBaseDemo.js"}}

## Third-party routing library

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server.
The `ButtonBase` component provides the `component` prop to handle this use case.
Here is a [more detailed guide](/material-ui/integrations/routing/#button).

## Limitations

### Cursor not-allowed

The ButtonBase component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

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
