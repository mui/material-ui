---
title: Material UI early 2024 API standardization
description: Read about the standardization of Material UI's APIs happening in Q1 of 2024
date: 2024-02-09T00:00:00.000Z
authors: ['diegoandai']
tags: ['MUI Core', 'Product']
card: false
---

The MUI Core team is working on two initiatives to standardize Material UI APIs.
This aims to provide a more consistent developer experience for the community.
The first API being standardized is the one used for deep element overrides, and the second one is the component CSS classes API.

## Deep element overrides

Modifying the inner elements of a Material UI component to customize its behavior or look is an everyday use case.
For example, you might want to modify the `Slider`'s thumb element to grow in size when it's being dragged:

<iframe src="https://codesandbox.io/embed/nw34ry?view=preview&module=%2Fsrc%2FDemo.tsx"
     style="width:100%; height: 400px; border:0; border-radius: 4px; overflow:hidden;"
     title="using-slider-slots"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

In the demo above, the `slots` prop is used to provide a custom thumb.
You can open the sandbox to check the implementation in detail.
The usage of this prop looks like this:

```tsx
<Slider
  value={value}
  onChange={handleChange}
  slots={{ thumb: CustomizedSliderThumb }}
/>
```

The problem is that the slot pattern API exposed through `slots` needs to be standardized throughout.
Some components have a `components` prop, which works almost exactly as the `slots` prop.
Some components have props named `*Component` prop for this use, for example, the `Accordion`'s `TransitionComponent` prop.

The `slotProps` prop is used to provide custom props to inner elements.
This prop presents the same lack of standardization.
Some components have a `componentsProps` prop.
Some components have props named `*Props` prop for this use.
Both are analogous to `slotProps`.

This lack of consistency adds cognitive load to the developers.
It also adds complexity to maintaining the components.
The slots pattern will be standardized throughout to solve these issues, and the analogous APIs will be deprecated and eventually removed.

## Component CSS classes

[WIP]

## Standardization process

[WIP]
