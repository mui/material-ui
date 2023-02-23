---
product: joy-ui
title: React Button component
components: Button, IconButton, LoadingButton
githubLabel: 'component: button'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/button/
unstyled: /base/react-button/
---

# Button

<p class="description">Buttons allow users to take actions, and make choices, with a single tap.</p>

## Introduction

Buttons communicate actions that users can take.

{{"demo": "ButtonUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Button from '@mui/joy/Button';

export default function MyApp() {
  return <Button>My button</Button>;
}
```

### Variants

The button component supports the four global variants: `solid` (default), `soft`, `outlined` and `plain`. Choose one of them depending on the button's action importance.

{{"demo": "ButtonVariants.js"}}

### Colors

Every palette included in the theme is available via the `color` prop. Play around combining different colors with different variants.

{{"demo": "ButtonColors.js"}}

### Sizes

The button components comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

{{"demo": "ButtonSizes.js"}}

### Disabled

Use the `disabled` prop to disable interaction and focus.

{{"demo": "ButtonDisabled.js"}}

### With decorators

Use the `startDecorator` and/or `endDecorator` props to add supporting decorators to the button.

{{"demo": "ButtonIcons.js"}}

### Icon button

Use the `IconButton` component if you want width and height to be the same while not having a label. Every prop previously covered are available for this component as well.

```jsx
import IconButton from '@mui/joy/IconButton';
```

{{"demo": "IconButtons.js"}}

:::info
**♿️ Accessibility tip**: Make sure to provide a meaningful [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) to the icon button. It helps screen readers to properly identify the component.

```js
<IconButton aria-label="Add to favorite">
  <FavoriteBorder />
</IconButton>
```

:::

### As a link

You can also use the button component as a link by assigning a value of `a` to the `component` prop. Since links are the most appropriate component for navigating through pages, that's useful when you want the same button design for a link.

Doing so will automatically change the rendered HTML tag from `<button>` to `<a>`.

{{"demo": "ButtonLink.js"}}

## CSS Variables

{{"demo": "ButtonVariables.js", "hideToolbar": true}}

{{"demo": "IconButtonVariables.js", "hideToolbar": true}}
