---
productId: joy-ui
title: React Circular Progress component
components: CircularProgress
githubLabel: 'component: CircularProgress'
---

# Circular Progress

<p class="description">The Circular Progress component showcases the duration of a process or an indefinite wait period.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

A circular progress indicator, often referred to as a spinner, is a visual representation of the progress of an operation or task.

The Circular Progress component defaults to indeterminate, signifying an undefined wait duration.
Use [determinate](#determinate) mode to indicate how long a given operation will take.

{{"demo": "CircularProgressUsage.js", "hideToolbar": true, "bg": "gradient"}}

:::info
The component's animations rely primarily on CSS to ensure that it functions even before JavaScript loads.
:::

## Basics

```jsx
import CircularProgress from '@mui/joy/CircularProgress';
```

The Circular Progress component provides users with updates on the status of ongoing processes such as loading an app, submitting a form, or saving updates.

## Customization

### Variants

The Circular Progress component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid` (default), `soft`, `outlined`, and `plain`.

{{"demo": "CircularProgressVariants.js"}}

### Sizes

Circular Progress comes in three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "CircularProgressSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.

{{"demo": "CircularProgressColors.js"}}

### Thickness

You can use the `thickness` prop to control the circle's stroke width.

{{"demo": "CircularProgressThickness.js"}}

### Determinate

The `determinate` prop lets you indicate a specified wait time.

{{"demo": "CircularProgressDeterminate.js"}}

### Children

By default, any children nested inside the Circular Progress will be centered.

{{"demo": "CircularProgressChildren.js"}}

:::info
For plain texts and icons, the dimension is relative to the circular progress's CSS variable (`--CircularProgress-size`).
:::

### With a button

The Circular Progress component can be used as a decorator to show loading on a button.

The size of the Circular Progress is controlled by a button, an icon button, or a link unless the `size` prop is explicitly specified on the progress.

{{"demo": "CircularProgressButton.js"}}

## Third-party integrations

### use-count-up

Use the `useCountUp` hook from the [use-count-up](https://www.npmjs.com/package/use-count-up) package to create a counting animation by providing `start`, `end`, and `duration` values.

{{"demo": "CircularProgressCountUp.js"}}

## CSS variables playground

Play around with all the CSS variables available on the component to see how the design changes.
You can use these to customize the component with both the `sx` prop and the theme.

{{"demo": "CircularProgressVariables.js", "hideToolbar": true, "bg": "gradient"}}

## Accessibility

Out of the box, the `aria-valuenow` attribute will indicate the current value of the progress bar only when the value is not indeterminate.
This attribute will display the value as a percentage.

Here are a few tips to make sure you have an accessible circular progress component:

- When creating your circular progress component, ensure sufficient color contrast between it and the background, using a minimum of [WCAG 2.0's color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) of 4.5:1.
- To define a human-readable text alternative to `aria-valuenow`, the `aria-valuetext` will show the current value in a more user-friendly way.
  For example, downloading files might be conveyed as `aria-valuetext="8% (34 minutes) remaining`.
- The `aria-valuemin` and `aria-valuemax` attributes are commonly used to indicate the minimum and maximum values of a range.
  By default, these attributes are set to 0 and 100, respectively.
  If you need to set a different minimum or maximum value for your range, you can use the these attributes to do so.
- Use the `aria-label` or `aria-labelledby` attribute to provide an accessible name for your progress component.
  These define the string value or identifies the element(s) that label the progress component.

## Anatomy

The Circular Progress component is composed of a single root `<span>` with an `<svg>` component that wraps around two `<circle>`.

```html
<span role="progressbar" class="MuiCircularProgress-root">
  <svg class="MuiCircularProgress-svg">
    <circle class="MuiCircularProgress-track"></circle>
    <circle class="MuiCircularProgress-progress"></circle>
  </svg>
  <!-- children are nested here when present -->
</span>
```
