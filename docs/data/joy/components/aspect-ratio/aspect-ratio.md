---
product: joy-ui
title: React Aspect Ratio component
---

# Aspect Ratio

<p class="description">The Aspect Ratio component crops its contents to match the desired ratio.</p>

## Introduction

Aspect Ratio is a wrapper component for quickly cropping content (such as images) to conform to your preferred ratio of width to height.

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

Its default implementation combines `height: 0px` with percentage `padding-bottom` to properly accommodate the content.
The default aspect ratio is `16/9`.
Make sure that the content you want to fit the aspect ratio is its first direct child.

{{"demo": "BasicRatio.js"}}

### Anatomy

The Aspect Ratio component is composed of a root `<div>` with a content `<div>` nested inside; the child component, in turn, is given a `data-first-child` attribute:

```html
<div class="JoyAspectRatio-root">
  <div class="JoyAspectRatio-content JoyAspectRatio-variantSoft JoyAspectRatio-colorNeutral css-1obyd74-JoyAspectRatio-content">
    <some-element data-first-child>
      This is how an Aspect Ratio component renders in the DOM.
    </some-element>
  </div>
</div>
```

## Customization

### Variants

The Aspect Ratio component supports the four [global variants](/joy-ui/main-features/global-variants/): `soft` (default), `solid`, `outlined`, and `plain`.

{{"demo": "VariantsRatio.js"}}

### Ratio

Use the `ratio` prop to change the aspect ratio.
The value will used by the [CSS `calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) function.

{{"demo": "CustomRatio.js"}}

### Media

When using media elements as first child of the aspect ratio component, use the `objectFit` prop to control how it should be resized.
It comes with `object-fit: cover` set by default.

{{"demo": "MediaRatio.js"}}

### Media placeholder

Use a `<div>` or `Box` component with an icon as fallback when there is no media content provided.

{{"demo": "PlaceholderAspectRatio.js"}}

### Controlling the height

Use `minHeight` and `maxHeight` to set the lower and upper bound of the component's height.
This is useful when the aspect ratio is used in a component that has dynamic width.

{{"demo": "MinMaxRatio.js"}}

### Inside a flex row

When the aspect ratio component is placed as a child of a flexbox `row` container, use `flex-basis` to set the ideal width of the aspect ratio.

{{"demo": "FlexRowRatio.js"}}

## Integration with Next.js Image component

The `AspectRatio` component can also be used with a [Next.js Image](https://nextjs.org/docs/basic-features/image-optimization) component as child.

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
**Tip:** Always use `layout="fill"` on the `Image` component, otherwise you don't need to use aspect ratio because the height is based on the image.
:::

## Common examples

### Mobile carousel

In designs such as this one, make sure to assign a `minWidth` value to prevent the aspect ratio component from shrinking.

{{"demo": "CarouselRatio.js"}}

### List stack

This is a simple illustration of composing aspect ratio with list components.

{{"demo": "ListStackRatio.js"}}
