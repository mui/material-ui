---
product: joy-ui
title: React Circular Progress component
components: CircularProgress
githubLabel: 'component: CircularProgress'
---

# Circular Progress

<p class="description">The Circular Progress component showcases the duration of a process or an indefinite wait period.</p>

## Introduction

A circular progress indicator, often referred to as a spinner, is a visual representation of the progress of an operation or task.

The Circular Progress component defaults to indeterminate, signifying an undefined wait duration.
Use [determinate](#determinate) mode to indicate how long a given operation will take.

{{"demo": "CircularProgressUsage.js", "hideToolbar": true, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

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

The Circular Progress component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid` (default), `soft`, `outlined`, and `plain`.

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

## CSS variable playground

Play around with all the CSS variables available on the component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "CircularProgressVariables.js", "hideToolbar": true}}
