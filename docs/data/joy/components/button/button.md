---
product: joy-ui
title: React Button component
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
unstyled: /base/react-button/
---

# Button

<p class="description">Buttons let users take actions and make choices with a single tap.</p>

## Introduction

Buttons communicate actions that users can take.
The Jopy UI Button component replaces the native HTML `<button>` element, and offers expanded options for styling and accessibility.

{{"demo": "ButtonUsage.js", "hideToolbar": true, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basics

```jsx
import Button from '@mui/joy/Button';
```

## Customization

### Variants

The Alert component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid` (default), `soft`, `outlined`, and `plain`.

{{"demo": "ButtonVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The button components comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

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

### Disabled

Use the `disabled` prop to disable interaction and focus:

{{"demo": "ButtonDisabled.js"}}

### Loading

Add the `loading` prop to show the Button's loading state.
The Button is [disabled]](#disabled) as long as it's loading.

#### Loading indicator

The default loading indicator uses the [Circular Progress](/joy-ui/react-circular-progress/) component.
Use the `loadingIndicator` prop to replace it with a custom indicator, as shown below:

{{"demo": "ButtonLoading.js"}}

#### Loading position

The `loadingPosition` prop sets the position of the Button's loading indicator.
It supports three values:

- `center` (default): The loading indicator is nested inside the `loadingIndicatorCenter` slot and replaces the Button's contents when in the loading state.
- `start`: The loading indicator replaces the [starting decorator](#decorators) when the Button is in the loading state.
- `end`: The loading indicator replaces the [ending decorator](#decorators) when the Button is in the loading state.

{{"demo": "ButtonLoadingPosition.js"}}

## Icon Button

```jsx
import IconButton from '@mui/joy/IconButton';
```

Use the Icon Button component for a square button to house an icon with no text contents.

{{"demo": "IconButtons.js"}}

:::warning
Icon Buttons must have a meaningful [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) so their purpose can be understood by users who require assistive technology.
They've been omitted from the demo above for the sake of brevity, but an appropriate label would look like this:

```js
<IconButton aria-label="Add to favorites">
  <FavoriteBorder />
</IconButton>
```

:::

## Link Button

Buttons let users take actions, but if that action is to navigate to a new page, then an anchor tag may be preferable over a button.

If you need the style of a button with the functionality of a link, you can use the `component` prop to replace the default `<button>` with an `<a>` tag, as shown below:

{{"demo": "ButtonLink.js"}}

## CSS variables

{{"demo": "ButtonVariables.js", "hideToolbar": true}}

{{"demo": "IconButtonVariables.js", "hideToolbar": true}}

## Anatomy

The Button component is composed of a single root `<button>` element:

```html
<button>
  <!-- Button contents -->
</button>
```
