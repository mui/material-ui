---
product: joy-ui
title: React Aspect Ratio component
---

# Aspect ratio

<p class="description">The aspect ratio component shapes the content with the specified ratio.</p>

The default aspect ratio implementation combines `height: 0px` with percentage padding-bottom to create the proper aspect ratio for the content.
(It will be replaced by the [CSS aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) in the future once it has sufficient browser support).

- The content to fit the area of the aspect ratio component must be its first direct child.
- It's designed to be composed with other components, e.g. [`Card`](/joy-ui/react-card/).

## Basic usage

The default aspect ratio is `16/9`.

{{"demo": "BasicRatio.js"}}

## Ratio

Use the `ratio` prop to change the aspect ratio.
The value will used by the [CSS `calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc).

{{"demo": "CustomRatio.js"}}

## Media

Place a native html `<img>` or `<video>` as a first direct child of the aspect ratio component.

Use the `objectFit` prop to change how the media should be resized in order to fit the aspect ratio component.
It has `object-fit: cover` by default.

{{"demo": "MediaRatio.js"}}

## Placeholder

When the media does not exist, you can render a placeholder inside an aspect ratio component. Wrap the placeholder with a `<div>` or `Box` component to center the content.

{{"demo": "PlaceholderAspectRatio.js"}}

## Controlling the height

Use `minHeight` and `maxHeight` to set the lower and upper bound of the component's height.
This is useful when the aspect ratio is used in a component that has dynamic width.

{{"demo": "MinMaxRatio.js"}}

## Inside a flex row

When the aspect ratio component is placed as a child of a flexbox `row` container, use `flex-basis` to set the ideal width of the aspect ratio.

{{"demo": "FlexRowRatio.js"}}

## Integration

### Next.js Image

The `AspectRatio` component can be used with [Next.js Image](https://nextjs.org/docs/basic-features/image-optimization) component.

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
Always use `layout="fill"` on the image component, otherwise you don't need to use aspect ratio because the height is based on the image.
:::

## Common examples

### Mobile carousel

Make sure to keep your content concise given the limited width real estate available.
Since the texts are short, we can set `white-space: nowrap` to make the title stay in one line.
The `min-width` CSS property is necessary on the aspect ratio component to prevent it from shrinking to zero.

{{"demo": "CarouselRatio.js"}}

### List stack

This is a simple illustration of composing aspect ratio with list components.

{{"demo": "ListStackRatio.js"}}
