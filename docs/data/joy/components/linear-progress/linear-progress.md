---
productId: joy-ui
title: React Linear Progress component
components: LinearProgress
githubLabel: 'component: LinearProgress'
---

# Linear Progress

<p class="description">Linear Progress indicators, commonly known as loaders, express an unspecified wait time or display the length of a process.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates.

The `LinearProgress` is indeterminate by default, indicating an unspecified wait time.
To actually have it represent how long an operation will take, use the [determinate](#determinate) mode.

The animations of the components rely on CSS as much as possible to work even before the JavaScript is loaded.

{{"demo": "LinearProgressUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import LinearProgress from '@mui/joy/LinearProgress';

export default function MyApp() {
  return <LinearProgress />;
}
```

### Variants

The linear progress component supports the four global variants: `solid`, `soft` (default), `outlined`, and `plain`.

{{"demo": "LinearProgressVariants.js"}}

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors.

{{"demo": "LinearProgressColors.js"}}

### Sizes

The linear progress component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

{{"demo": "LinearProgressSizes.js"}}

:::info
To learn how to add more sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Determinate

You can use the `determinate` prop if you want to indicate a specified wait time.

{{"demo": "LinearProgressDeterminate.js"}}

### Thickness

Provides a number to `thickness` prop to control the bar's stroke width.

{{"demo": "LinearProgressThickness.js"}}

## 3rd-party integration

### use-count-up

Using the [use-count-up](https://www.npmjs.com/package/use-count-up) package, you can create a counting animation by providing `start`, `end`, and `duration` values.

{{"demo": "LinearProgressCountUp.js"}}

## CSS variables playground

Play around with all the CSS variables available on the component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "LinearProgressVariables.js", "hideToolbar": true, "bg": "gradient"}}

## Common examples

### With label

{{"demo": "LinearProgressWithLabel.js"}}
