---
product: joy-ui
title: React Circular Progress component
githubLabel: 'component: CircularProgress'
---

# Circular Progress

<p class="description">Circular Progress indicators, commonly known as spinners, express an unspecified wait time or display the length of a process.</p>

## Introduction

Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates.

The `CircularProgress` is indeterminate by default, indicating an unspecified wait time.
To actually have it represent how long an operation will take, use the [determinate](#determinate) mode.

The animations of the components rely on CSS as much as possible to work even before the JavaScript is loaded.

{{"demo": "CircularProgressUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import CircularProgress from '@mui/joy/CircularProgress';

export default function MyApp() {
  return <CircularProgress />;
}
```

### Variants

The circular progress component supports the four global variants: `solid`, `soft` (default), `outlined`, and `plain`.

{{"demo": "CircularProgressVariants.js"}}

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors.

{{"demo": "CircularProgressColors.js"}}

### Sizes

The circular progress component comes with three sizes out of the box: `sm`, `md` (default), and `lg`.

{{"demo": "CircularProgressSizes.js"}}

:::success
To learn how to add more sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Determinate

You can use the `determinate` prop if you want to indicate a specified wait time.

{{"demo": "CircularProgressDeterminate.js"}}

### Thickness

Provides a number to `thickness` prop to control the circle's stroke width.

{{"demo": "CircularProgressThickness.js"}}

### Children

The circular progress component places the provided children in the center by default.

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

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "CircularProgressVariables.js", "hideToolbar": true}}
