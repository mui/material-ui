---
title: Bringing consistency to Material UI customization APIs
description: We're standardizing two key areas of the Material UI customization APIs to reduce complexity and cognitive overhead. Read on to learn what's changing.
date: 2024-03-18T10:00:00.000Z
authors: ['diegoandai']
tags: ['Material UI', 'Product']
manualCard: true
---

The Material UI team is working on two initiatives to standardize the Material UI API: The first applies to overriding inner elements, and the second applies to component CSS classes.
In both cases, the purpose is to provide a more consistent developer experience for the community.

Let's explore how these changes are taking shape:

## Inner element overrides

Because Material UI components often contain multiple DOM nodes, it's common to need to modify the structure, behavior, and style of inner elements.
For example, you might want to modify the Slider's thumb element to grow in size when dragged:

<iframe src="https://codesandbox.io/embed/nw34ry?view=Editor+%2B+Preview&module=%2Fsrc%2FDemo.tsx&hidenavigation=1"
     style="width:100%; height: 200px; border:0; border-radius: 4px; overflow:hidden;"
     title="blog/material-ui-early-2024-standardization/slider-slots-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You can achieve this by providing custom components through the `slots` prop.
The demo above provides a custom thumb component that uses the Slider's internal `dragging` and `focusedThumbIndex` states to change its appearance.
[Open the CodeSandbox](https://codesandbox.io/p/sandbox/blog-material-ui-early-2024-deprecations-slider-slots-example-nw34ry?file=%2Fsrc%2FDemo.tsx) to see the implementation.

The problem is that this slot pattern exposed through the `slots` prop is not consistent across the library.
Some components implement the `slots` prop, but others have a `components` prop, which works the same as the `slots` prop.
Other components have props named `<SlotName>Component` for more specific use cases—for example, the Accordion features a `TransitionComponent` prop for implementing custom transitions.

The same inconsistencies are found with the `slotProps` prop, which is used to provide custom props to inner elements.
Some components have the `slotsProps` prop; others have a `componentsProps` prop; and still others have props named `<SlotName>Props`.

This lack of consistency leads to unnecessary complexity for both developers and maintainers.
To resolve this, the `slots` and `slotProps` API will be standardized across all components, and the analogous APIs will be deprecated and eventually removed.

## Component CSS classes

The most common way to customize a component's look and feel is to target its CSS classes.
For example, you might want to customize a Chip's primary color and set it to a different color when it's clickable:

<iframe src="https://codesandbox.io/embed/d7xqr6?view=Editor+%2B+Preview&module=%2Fsrc%2FDemo.tsx&hidenavigation=1"
     style="width:100%; height: 200px; border:0; border-radius: 4px; overflow:hidden;"
     title="blog/material-ui-early-2024-standardization/chip-classes-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You can do this by targeting `chipClasses.colorPrimary` and `chipClasses.clickable`, respectively.
The demo above targets `.MuiChip-colorPrimary` and `.MuiChip-clickable.MuiChip-colorPrimary` to achieve this result.
[Open the CodeSandbox](https://codesandbox.io/p/sandbox/blog-material-ui-early-2024-deprecations-chip-classes-example-d7xqr6?file=%2Fsrc%2FDemo.tsx) to see the implementation.

The problem is that you could also use the `chipClasses.clickableColorPrimary` composed class, which composes the atomic clickable and color classes.
These composed classes bloat the API without adding significant improvements: For example, this pattern adds 26 possible CSS classes to the Chip component.

The composed classes also reduce the predictability of the CSS classes API, as the compose order and which props get composed are arbitrary decisions.
This adds unnecessary cognitive overhead for developers as well as significant complexity for maintainers.
Because of these issues, composed CSS classes will be deprecated and eventually removed in favor of atomic class alternatives.

## Standardization process

This initiative aims to improve the developer experience for the Material UI community.
To provide the smoothest migration from the inconsistent APIs, they will be deprecated first and removed later, giving you plenty of time to adjust.
With each deprecation, we'll update the [migration guide](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) and provide [codemods](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#deprecations) to simplify the process.

As always, we'd love to hear what you think! Please [open a GitHub issue](https://github.com/mui/material-ui/issues/new/choose) if you encounter any unexpected behavior with the standardized APIs or if you have any other suggestions you'd like us to discuss.
