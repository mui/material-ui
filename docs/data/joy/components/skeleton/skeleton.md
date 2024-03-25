---
productId: joy-ui
title: React Skeleton component
githubLabel: 'component: skeleton'
components: Skeleton, AspectRatio, Avatar, Typography
---

# Skeleton

<p class="description">Skeletons are preview placeholders for components that haven't loaded yet, reducing load-time frustration.</p>

## Introduction

Skeletons provide users an expectation of what the UI looks like while data loads.
It helps reducing the perception of long loading times while being a more interesting loading state to look at.

{{"demo": "BasicSkeleton.js"}}

## Basics

```jsx
import Skeleton from '@mui/joy/Skeleton';
```

There are two methods of using the Skeleton component:

1. **Masking a component**: see the [Avatar](#avatar), [Image](#image) and [Typography](#inline-with-typography) examples. The Skeleton component will inherit their dimension which makes for a more predictable UI while also preventing layout shift when the loading is done.
2. **Setting a custom width and height**: see the [Geometry](#geometry) and [Text block](#text-block) examples. Use this for full control of the Skeleton size, ignoring its parent dimensions entirely. Be aware that this option _can_ generate layout shift if the actual component the Skeleton is mimicking has a different size.

## Customization

### Loading

The Skeleton has the `loading` prop set to `true` by default.

Set it to `false` to hide the Skeleton component.
If the Skeleton has children, they will be rendered instead.

{{"demo": "LoadingSkeleton.js"}}

### Animation

Use the `animation` prop to control how the Skeleton component animates.
The `animation` prop value can be one of the following:

- `pulse` (default): The background of the Skeleton fades in and out.
- `wave`: A wave animation flowing from left to right.
- `false`: Disable the animation entirely.

The demo below shows the wave animation:

{{"demo": "AnimationSkeleton.js"}}

To set the `wave` animation as the default for all Skeleton component instances, use the theme's default props:

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  components: {
    JoySkeleton: {
      defaultProps: {
        animation: 'wave',
      },
    },
  },
});

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <Skeleton />{' '}
      {/* The Skeleton component will have the wave animation by default */}
    </CssVarsProvider>
  );
}
```

:::info
To learn more about global theme changes, see [Themed Components](/joy-ui/customization/themed-components/) page.
:::

### Avatar

Use the [Avatar](/joy-ui/react-avatar/) component to wrap the Skeleton when displaying an avatar.

{{"demo": "AvatarSkeleton.js"}}

### Image

Use the [AspectRatio](/joy-ui/react-aspect-ratio/) component to wrap the Skeleton when displaying an image.

{{"demo": "ImageSkeleton.js"}}

### Inline with Typography

Insert the Skeleton between the Typography component and the text to display placeholder lines.

{{"demo": "InlineSkeleton.js"}}

### Geometry

To build a specific Skeleton shape, use the `variant` prop and choose between `circular` or `rectangular`.
And to have it on a specific dimension, use the `width` and `height` props.

{{"demo": "GeometrySkeleton.js"}}

:::success
The `width` and `height` props support object notation for responsive values.

The example below shows how to create a Skeleton component with a circular shape that is 40x40px on mobile and 48x48px on desktop.

```js
<Skeleton
  variant="circular"
  width={{ xs: 40, md: 48 }}
  height={{ xs: 40, md: 48 }}
/>
```

:::

### Text block

Use the `variant="text"` and `level` props to create a block of skeleton text that follows the theme's typography styles.

The `level` prop value can be a theme's typography-related token.
The result of the skeleton text will have the same height as the text of the `level` prop.

{{"demo": "TextBlockSkeleton.js"}}

## Common examples

### Basic card

{{"demo": "BasicCardSkeleton.js"}}

### Comment

{{"demo": "CommentSkeleton.js"}}
