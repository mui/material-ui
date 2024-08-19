---
productId: joy-ui
title: React Button component
components: Button, IconButton
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
unstyled: /base-ui/react-button/
---

# Button

<p class="description">Buttons let users take actions and make choices with a single tap.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Buttons communicate actions that users can take.
The Joy UI Button component replaces the native HTML `<button>` element and offers expanded options for styling and accessibility.

{{"demo": "ButtonUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Button from '@mui/joy/Button';
```

The Joy UI Button behaves similarly to the native HTML `<button>`, so it wraps around the text displayed on its surface.

The demo below shows the three basic states available to the Button: default, disabled, and loading.

{{"demo": "BasicButtons.js"}}

### Disabled

Use the `disabled` prop to disable interaction and focus:

{{"demo": "ButtonDisabled.js"}}

### Loading

Add the `loading` prop to show the Button's loading state.
The Button is [disabled](#disabled) as long as it's loading.
See [Loading indicator](#loading-indicator) and [Loading position](#loading-position) for customization options.

{{"demo": "ButtonLoading.js"}}

## Customization

### Variants

The Button component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid` (default), `soft`, `outlined`, and `plain`.

{{"demo": "ButtonVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The Button component comes in three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "ButtonSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors with different variants.

{{"demo": "ButtonColors.js"}}

### Decorators

Use the `startDecorator` and `endDecorator` props to append actions and icons to either side of the Button:

{{"demo": "ButtonIcons.js"}}

### Loading indicator

The default loading indicator uses the [Circular Progress](/joy-ui/react-circular-progress/) component.
Use the `loadingIndicator` prop to replace it with a custom indicator, as shown below:

{{"demo": "ButtonLoadingIndicator.js"}}

### Loading position

The `loadingPosition` prop sets the position of the Button's loading indicator.
It supports three values:

- `center` (default): The loading indicator is nested inside the `loadingIndicatorCenter` slot and replaces the Button's contents when in the loading state.
- `start`: The loading indicator replaces the [starting decorator](#decorators) when the Button is in the loading state.
- `end`: The loading indicator replaces the [ending decorator](#decorators) when the Button is in the loading state.

{{"demo": "ButtonLoadingPosition.js"}}

### Link Button

Buttons let users take actions, but if that action is to navigate to a new page, then an anchor tag is generally preferable over a button tag.

If you need the style of a button with the functionality of a link, then you can use the `component` prop to replace the default `<button>` with an `<a>`, as shown below:

{{"demo": "ButtonLink.js"}}

### File upload

To create a file upload button, turn the button into a label using `component="label"` and then create a visually-hidden input with type `file`.

{{"demo": "InputFileUpload.js"}}

## Icon Button

```jsx
import IconButton from '@mui/joy/IconButton';
```

Use the Icon Button component for a square button to house an icon with no text content.

{{"demo": "IconButtons.js"}}

## CSS variables playground

Play around with the CSS variables available to the Button and Icon Button components to see how the design changes.
You can use these to customize the components with both the `sx` prop and the theme.

### Button

{{"demo": "ButtonVariables.js", "hideToolbar": true, "bg": "gradient"}}

### Icon Button

{{"demo": "IconButtonVariables.js", "hideToolbar": true, "bg": "gradient"}}

## Accessibility

All Buttons must have a meaningful [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) so their purpose can be understood by users who require assistive technology.

This is especially important for [Icon Buttons](#icon-button) because they don't contain any text.
For example, an Icon Button that displays a `<FavoriteBorder />` icon might have a label that looks like this:

```js
<IconButton aria-label="Add to favorites">
  <FavoriteBorder />
</IconButton>
```

## Anatomy

The Button component is composed of a single root `<button>` element that wraps around its contents:

```html
<button class="MuiButton-root" type="button">
  <!-- Button contents -->
</button>
```
