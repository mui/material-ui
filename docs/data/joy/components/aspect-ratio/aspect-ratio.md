---
product: joy-ui
title: React Aspect Ratio component
---

# Aspect Ratio

<p class="description">The Aspect Ratio component resizes its contents to match the desired ratio.</p>

## Introduction

Aspect Ratio is a wrapper component for quickly resizing content to conform to your preferred ratio of width to height.
Media content like images can be stretched, resized, and cropped based on the CSS `object-fit` property.

:::info
A [native CSS `aspect-ratio` property](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) does exist, but MUI does not plan to implement it until browser compatibility increases.
:::

## Component

### Usage

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import AspectRatio from '@mui/joy/AspectRatio';

export default function MyApp() {
  return <AspectRatio />;
}
```

### Basics

The Aspect Ratio component wraps around the content that it resizes.
The element to be resized must be the first direct child.
The default ratio is `16/9`.

{{"demo": "BasicRatio.js"}}

### Anatomy

The Aspect Ratio component is composed of a root `<div>` with a content `<div>` nested inside; the child component is given a `data-first-child` attribute:

```html
<div class="JoyAspectRatio-root">
  <div class="JoyAspectRatio-content">
    <some-element data-first-child>
      This is how an Aspect Ratio component renders in the DOM.
    </some-element>
  </div>
</div>
```

### Overriding the root slot

Use the `component` prop to override the root slot with a custom element.
For example, the following code snippet replaces the default `<div>` with a `<section>`:

```jsx
<AspectRatio component="section" />
```

### Overriding interior slots

Use the `components` prop to override any interior slots in addition to the root:

<AspectRatio components={{ Content: 'article' }} />

:::warning
If the root element is customized with both the `component` and `components` props, then `component` will take precedence.
:::

Use the `componentsProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-content` to the content slot:

<AspectRatio componentsProps={{ content: { className: 'my-content' } }} />

:::warning
Note that `componentsProps` slot names are written in lowercase (root) while `components` slot names are capitalized (Root).
:::

## Customization

### Variants

The Aspect Ratio component supports the four [global variants](/joy-ui/main-features/global-variants/): `solid`, `soft` (default), `outlined`, and `plain`.

{{"demo": "VariantsRatio.js"}}

### Ratio

Use the `ratio` prop to change the aspect ratio, following the pattern `height/width`.
For example, the demo below uses a ratio of `4/3`, which is a common alternative to the default `16/9`:

{{"demo": "CustomRatio.js"}}

:::info
The `ratio` prop uses the [CSS `calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) function under the hood.
:::

### Object fit

When using media elements as first child of the aspect ratio component, use the `objectFit` prop to control how it should be resized.
It comes with `object-fit: cover` set by default.

{{"demo": "MediaRatio.js"}}

### Media placeholder

Use a `<div>` or `Box` component with an icon as fallback when there is no media content provided.

{{"demo": "PlaceholderAspectRatio.js"}}

### Minimum and maximum height

Use `minHeight` and `maxHeight` to set the lower and upper bound of the component's height.
This is useful when the aspect ratio is used in a component that has dynamic width.

{{"demo": "MinMaxRatio.js"}}

### Usage inside a flex row

When the aspect ratio component is placed as a child of a flexbox `row` container, use `flex-basis` to set the ideal width of the aspect ratio.

{{"demo": "FlexRowRatio.js"}}

### Usage with Next.js Image component

The Aspect Ratio component can be used with a [Next.js Image](https://nextjs.org/docs/basic-features/image-optimization) component as a child.

```js
import Image from 'next/image';
import AspectRatio from '@mui/joy/AspectRatio';
import mountains from '../public/mountains.jpg';

function App() {
  return (
    <AspectRatio variant="outlined" ratio="1" objectFit="cover">
      {/* only layout="fill" makes sense for using with AspectRatio */}
      <Image alt="Mountains" src={mountains} layout="fill" placeholder="blur" />
    </AspectRatio>
  );
}
```

:::info
Always use `layout="fill"` on the `Image` component, otherwise you won't need to use aspect ratio because the height is based on the image.
:::

## Common examples

### Mobile carousel

In designs such as this one, make sure to assign a `minWidth` value to prevent the aspect ratio component from shrinking.

{{"demo": "CarouselRatio.js"}}

### List stack

This is a simple illustration of composing aspect ratio with list components.

{{"demo": "ListStackRatio.js"}}
