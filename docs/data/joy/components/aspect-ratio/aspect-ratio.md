---
productId: joy-ui
title: React Aspect Ratio component
components: AspectRatio
---

# Aspect Ratio

<p class="description">The Aspect Ratio component resizes its contents to match the desired ratio.</p>

## Introduction

Aspect Ratio is a wrapper component for quickly resizing content to conform to your preferred ratio of width to height.
Media content like images can be stretched, resized, and cropped based on the CSS `object-fit` property.

:::info
A [native CSS `aspect-ratio` property](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) does exist, and we plan to implement it in Joy UI soon.
:::

## Basics

```jsx
import AspectRatio from '@mui/joy/AspectRatio';
```

The Aspect Ratio component wraps around the content that it resizes.
The element to be resized must be the first direct child.
The default ratio is `16/9`.

{{"demo": "BasicRatio.js"}}

## Customization

### Variants

The Aspect Ratio component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid`, `soft` (default), `outlined`, and `plain`.

{{"demo": "VariantsRatio.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Ratio

Use the `ratio` prop to change the aspect ratio, following the pattern `width/height`.
For example, the demo below uses a ratio of `4/3`, which is a common alternative to the default `16/9`:

{{"demo": "CustomRatio.js"}}

:::info
The `ratio` prop uses the [CSS `calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) function under the hood.
:::

### Object fit

When the content inside the Aspect Ratio component is an image or a video, you can use the `objectFit` prop to control how it's resized.

This prop gives you access to all of the values associated with the CSS `object-fit` property: `cover` (default), `contain`, `fill`, `scaleDown`, `initial`, `inherit`, and `none`.

{{"demo": "MediaRatio.js"}}

### Media placeholder

Use a `<div>`, or a [Box](/system/react-box/) component paired with an icon, as a fallback when there is no media content provided:

{{"demo": "PlaceholderAspectRatio.js"}}

### Minimum and maximum height

Use the `minHeight` and `maxHeight` props to set the lower and upper bound for the height of the content.
This is useful when the Aspect Ratio component wraps dynamic-width content, as shown in the demo below:

{{"demo": "MinMaxRatio.js"}}

## Using inside a flex row

When the Aspect Ratio component is a child of a flexbox `row` container, use `flex-basis` to set the ideal width of the content:

{{"demo": "FlexRowRatio.js"}}

By default, the Aspect Ratio component will retain the provided aspect ratio. If you want the Aspect Ratio component to fill the vertical space, set the `flex` prop to `true`:

{{"demo": "FlexAspectRatio.js"}}

## Using with Next.js Image

The Aspect Ratio component can be used with a [Next.js Image](https://nextjs.org/docs/app/building-your-application/optimizing/images) component as a child.
The Image should always include the `layout="fill"` property—otherwise it requires `height` and `width` values, which would defeat the purpose of the Aspect Ratio component.

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

## Using with an icon

The Aspect Ratio component can be a handy tool for creating a square container for an icon.

{{"demo": "IconWrapper.js"}}

## Common examples

### Mobile carousel

In designs like this, ensure to assign a `minWidth` value to prevent the Aspect Ratio component from shrinking.

{{"demo": "CarouselRatio.js"}}

### List stack

This is a simple illustration of how to use Aspect Ratio with list components:

{{"demo": "ListStackRatio.js"}}

## Anatomy

The Aspect Ratio component is composed of a root `<div>` with a content `<div>` nested inside; the child component is given a `data-first-child` attribute for styling purposes:

```html
<div class="MuiAspectRatio-root">
  <div class="MuiAspectRatio-content">
    <some-element data-first-child>
      <!-- Aspect Ratio contents -->
    </some-element>
  </div>
</div>
```
