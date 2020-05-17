---
title: Skeleton React component
components: Skeleton
---

# Skeleton

<p class="description">Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration.</p>

The data for your components might not be immediately available. You can increase the perceived performance for users by using skeletons. It feels like things are happening immediately, then the information is incrementally displayed on the screen (Cf. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797)).

The component is designed to be used **directly in your components**.
For instance:

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## Variants

The component supports 3 shape variants.

{{"demo": "pages/components/skeleton/Variants.js"}}

## Animations

By default, the skeleton pulsate, but you can change the animation for a wave or disable it entirely.

{{"demo": "pages/components/skeleton/Animations.js"}}

## YouTube example

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

## Facebook example

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}

## Inferring width and height

In addition to accepting `width` and `height` props, `Skeleton` can also infer
those in other ways. It already works well when it comes to `Typography`, as
its height is set using `rem` units.

{{"demo": "pages/components/skeleton/Typography.js", "defaultCodeOpen": false}}

But when it comes to other components, you may not want to repeat the width and
height. In these instances, you can pass children to `Skeleton` and it will
infer its width and height from them.

{{"demo": "pages/components/skeleton/Children.js", "defaultCodeOpen": false}}
