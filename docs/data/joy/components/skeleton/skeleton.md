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

### Inline with Typography

Insert the Skeleton component between the Typography component and the text to display lines of placeholder.

### Geometry

Use the `shape` prop with a value of `circular` or `rectangular` to take full control of the size of the Skeleton component.

Use `width` and `height` prop to adjust the size of the Skeleton component.

<!-- demo circular, rectangular + width, height -->

### Text block

The `rectangular` shape can be used to mimic a block of text by using the `sx` prop to set the typography level based on the theme.

<!-- demo <Skeleton level="h1"> -->

### Animation

### Radius
