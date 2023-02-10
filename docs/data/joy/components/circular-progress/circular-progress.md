---
product: joy-ui
title: React Circular Progress component
githubLabel: 'component: CircularProgress'
---

# Circular Progress

<p class="description">The Circular Progress component showcases the duration of a process or an indefinite wait period.</p>

## Introduction

The Circular Progress Indicator, often referred to as a Spinner, is a visual representation of the progress of an operation or task.

`CircularProgress` defaults to indeterminate, signifying an undefined wait duration.
If you'd like to represent how long an operation will take, you can use [determinate](#determinate) mode.

{{"demo": "CircularProgressUsage.js", "hideToolbar": true, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

:::info
The animations of the components rely on CSS as much as possible to work, even before the JavaScript is loaded.
:::

## Basics

```jsx
import CircularProgress from '@mui/joy/CircularProgress';
```

`CircularProgress` provides users with updates on the status of ongoing processes such as loading an app, submitting a form, or saving updates.

## Customization

### Variants

The Circular Progress component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid` (default), `soft`, `outlined`, and `plain`.

{{"demo": "CircularProgressVariants.js"}}

### Sizes

The Circular progress component comes in three sizes: `sm`, `md` (default), and `lg`.

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

By default, the circular progress component places any children in the center.

{{"demo": "CircularProgressChildren.js"}}

:::info
For plain texts and icons, the dimension is relative to the circular progress's CSS variable (`--CircularProgress-size`).
:::

### With a button

`CircularProgress` can be used as a decorator to show loading on a button.

The size of the circular progress is controlled by a button, an icon button, or a link unless the `size` prop is explicitly specified on the progress.

{{"demo": "CircularProgressButton.js"}}

## CSS variables

Play around with all the CSS variables available on the component to see how the design changes.

You can use these to customize the component with both the `sx` prop and the theme.

{{"demo": "CircularProgressVariables.js", "hideToolbar": true}}

## Accessibility

When creating your circular progress component, ensure sufficient color contrast between the it and the background, using a minimum of [WCAG 2.0's color contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) of 4.5:1.

## Anatomy

The Circular Progress component is composed of a single root `<span>` with an `<svg>` component that wraps around two `<circle>`.

```html
<span
  role="progressbar"
  style="--CircularProgress-percent:25"
  class="MuiCircularProgress-root"
>
  <svg class="MuiCircularProgress-svg">
    <circle class="MuiCircularProgress-track"></circle>
    <circle class="MuiCircularProgress-progress"></circle>
  </svg>
</span>
```
