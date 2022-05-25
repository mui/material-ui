# Material UI - Overview

<p class="description">Material UI is library of React UI components that implements Google's Material Design.</p>

## Introduction

Material UI is an open-source React component library that implements Google's [Material Design](https://material.io/).

It includes a comprehensive collection of prebuilt components that are ready for use in production right out of the box.

Material UI is beautiful by design, and features a suite of customization options that make it easy to implement your own custom design system on top of our components.

:::info
Material UI currently supports Material Design v2.
Adoption of v3 is tentatively planned for Material UI v6.
You can follow [this GitHub issue](https://github.com/mui/material-ui/issues/29345) for future updates.
:::

## Advantages of Material UI

- **Ship faster:** thousands of open-source contributors have poured countless hours into these components. Focus on your core business logic—we've got your UI covered.
- **Beautiful by default:** we're meticulous about our implementation of Material Design, ensuring that every Material UI component meets the highest standards of form and function.
- **Cross-team collaboration:** Material UI's intuitive developer experience reduces the barrier to entry for back-end devs and less technical designers, empowering teams to collaborate more effectively.
- **Reliability:** Material UI is almost as old as React itself—its history stretches back to 2014—and we're in this for the long haul. When you build with Material UI, you can count on our community's support for years to come.
- **Design kits:** streamline your workflow and boost consistency between designers and developers by using our [design kits](https://mui.com/design-kits/) in your favorite design tool.

## Material UI vs. MUI Base

Material UI and [MUI Base](/base/getting-started/overview/) feature many of the same UI components, but MUI Base comes without any default styles or styling solution.

Material UI is _comprehensive_ in that it comes packaged with default styles, and is optimized to work with [Emotion](https://emotion.sh/docs/introduction) (or [styled-components](https://styled-components.com/)).

MUI Base, by contrast, could be considered the "skeletal" or "headless" counterpart to Material UI—in fact, Material UI v6 will use MUI Base components and hooks for its foundational structure.
