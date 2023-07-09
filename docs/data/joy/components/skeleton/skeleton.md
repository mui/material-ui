---
productId: joy-ui
title: React Skeleton component
githubLabel: 'component: skeleton'
---

# Skeleton

<p class="description">Skeletons are preview placeholders for components that haven't loaded yet, reducing load-time frustration.</p>

## Introduction

## Basics

```jsx
import Skeleton from '@mui/joy/Skeleton';
```

There are two methods of using the Skeleton component:

- Masking the component (**👍 Recommended**), see [Avatar](#avatar), [Image](#image) and [Typography](#inline-with-typography). The parent components control the layout of the interface which prevent layout shifts when the loading state is no longer exisiting.
- Custom width and height, see [Geometry](#geometry) and [Text block](#text-block). This method is useful when you have no control of the parent component or you want to separate the loading state from the component itself. This method could cause layout shifts when the component gets bigger or smaller.

### Loading

The Skeleton has `loading` prop set to `true` by default.

Set it to `false` to hide the Skeleton component. If the Skeleton has children, the children will be rendered instead.

{{"demo": "LoadingSkeleton.js"}}

## Customization

### Avatar

We recommend using the [Avatar](/joy-ui/react-avatar/) to wrap the Skeleton component when displaying an avatar.

{{"demo": "AvatarSkeleton.js"}}

### Image

We recommend using the [AspectRatio](/joy-ui/react-aspect-ratio/) to wrap the Skeleton component when displaying an image.

{{"demo": "ImageSkeleton.js"}}

### Inline with Typography

Insert the Skeleton component between the Typography component and the text to display lines of placeholder.

{{"demo": "InlineSkeleton.js"}}

### Geometry

Use the `shape` prop with a value of `circular` or `rectangular` to take full control of the size of the Skeleton component.

Use `width` and `height` prop to adjust the size of the Skeleton component.

{{"demo": "GeometrySkeleton.js"}}

:::success
`width` and `height` prop supports object notion for responsive values.

The example below shows how to create a Skeleton component with a circular shape that is 40px wide and 40px high on mobile and 48px wide and 48px high on desktop.

```js
<Skeleton
  variant="circular"
  width={{ xs: 40, md: 48 }}
  height={{ xs: 40, md: 48 }}
/>
```

:::

### Text block

Use `variant="text"` and `level` props to create a block of skeleton text that follows the theme's typography styles.

The value of the `level` prop can be one of the theme's typography. The result of the skeleton text will have the same height as the text of the `level` prop.

{{"demo": "TextBlockSkeleton.js"}}

### Animation

Use the `animation` prop to control the animation of the Skeleton component. The value of the `animation` prop can be one of the following:

- `pulse` (default): The background of the Skeleton is faded in and out.
- `wave`: The wave animation from left to right.

The demo below shows the wave animation.

{{"demo": "AnimationSkeleton.js"}}

:::success
To set the `wave` animation as the default animation for all Skeleton components, set the default props of the Skeleton component to the theme.

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

To learn more about this, see [Themed Components](/joy-ui/customization/themed-components/) page.
```

:::
