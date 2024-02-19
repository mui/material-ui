---
title: Material UI early 2024 API standardization
description: Read about the standardization of Material UI API happening in Q1 of 2024
date: 2024-02-19T00:00:00.000Z
authors: ['diegoandai']
tags: ['MUI Core', 'Product']
card: false
---

The MUI Core team is working on two initiatives to standardize the Material UI API.
This aims to provide a more consistent developer experience for the community.
The first API being standardized is the one used for inner element overrides, and the second one is the component CSS classes API.

## Inner element overrides

Modifying the inner elements of a component to customize its behavior or look is an everyday use case.
For example, you might want to modify the `Slider`'s thumb element to grow in size when it’s dragged:

<iframe src="https://codesandbox.io/embed/nw34ry?view=Editor+%2B+Preview&module=%2Fsrc%2FDemo.tsx&hidenavigation=1"
     style="width:100%; height: 200px; border:0; border-radius: 4px; overflow:hidden;"
     title="blog/material-ui-early-2024-standardization/slider-slots-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You can achieve this by providing custom components through the `slots` prop.
The demo above provides a custom thumb component that uses the `Slider`’s internal state `dragging` and `focusedThumbIndex` to change its appearance.
[Open the sandbox](https://codesandbox.io/p/sandbox/blog-material-ui-early-2024-deprecations-slider-slots-example-nw34ry?file=%2Fsrc%2FDemo.tsx) to see the implementation.

The problem is that this slot pattern exposed through the `slots` prop needs to be standardized.
Some components implement the `slots` prop, but others have a `components` prop, which works almost exactly as the `slots` prop.
Other components have props named `<SlotName>Component` for the same use, for example, the `Accordion`'s `TransitionComponent` prop.

The `slotProps` prop, used to provide custom props to inner elements, has the same problem.
Some components have the `slotsProps` prop, others have a `componentsProps` prop, and others have props named `<SlotName>Props`.

This lack of consistency adds cognitive load to developers.
It also adds complexity for maintainers.
The `slots` and `slotProps` API will be standardized to solve these issues, and the analogous APIs will be deprecated and eventually removed.

## Component CSS classes

One way to customize the look of components is to target their CSS classes.
For example, you might want to modify the `Chip` component’s primary color and have it be different when it’s clickable.

<iframe src="https://codesandbox.io/embed/d7xqr6?view=Editor+%2B+Preview&module=%2Fsrc%2FDemo.tsx&hidenavigation=1"
     style="width:100%; height: 200px; border:0; border-radius: 4px; overflow:hidden;"
     title="blog/material-ui-early-2024-standardization/chip-classes-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You can do this by targeting the `chipClasses.clickable` and `chipClasses.colorPrimary` accordingly.
The demo above targets `.MuiChip-colorPrimary` and `.MuiChip-clickable.MuiChip-colorPrimary` to achieve the result.
[Open the sandbox](https://codesandbox.io/p/sandbox/blog-material-ui-early-2024-deprecations-chip-classes-example-d7xqr6?file=%2Fsrc%2FDemo.tsx) to see the implementation.

The problem is that you could also use the `chipclasses.clickableColorPrimary` composed class, which composes the clickable and color atomic classes.
These composed classes bloat the API without adding significant improvements.
For example, this pattern adds 26 CSS classes to the `Chip` component.

The composed classes also reduce the predictability of the CSS classes API, as the compose order and which props get composed are arbitrary decisions.
This adds cognitive load to the developers and complexity for maintainers.
The composed CSS classes will be deprecated and eventually removed in favor of atomic class alternatives.

## Standardization process

This initiative aims to improve the developer experience for the Material UI community.
To provide the smoothest migration from these APIs, they will be deprecated first and removed at a future date, likely the end of 2024.
A [migration guide](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) and [codemods](https://github.com/mui/material-ui/tree/master/packages/mui-codemod#deprecations) will be released alongside each deprecation.
As always, please [open a GitHub issue](https://github.com/mui/material-ui/issues/new/choose) if anything is not working as expected.
