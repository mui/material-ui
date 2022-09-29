---
title: An introduction to the MUI ecosystem
description: MUI is more than just Material UI. Consider Joy UI, MUI Base, MUI X, and Toolpad for your next project.
date: 2022-10-03T00:00:00.000Z
authors: ['samuelsycamore']
card: false
tags: ['Product']
---

MUI is so much more than Material UI!

You'll be forgiven if you thought MUI was merely shorthand for our most popular product.
What began as an open-source React UI library has evolved over time into a full-fledged startup with a whole suite of related products.

Material UI is the flagship; but it's also the gateway to MUI's ever-expanding ecosystem of UI tools.

Though our roots are in [Material Design](https://material.io/), we're branching out well beyond those constraints these days to deliver a wider range of tools for developers to ship new features faster.

Our primary offerings fall into two product lines: Core and X.
MUI Core contains our foundational component libraries (like Material UI), while MUI X offers components that are significantly more complex (like the Data Grid).

We're also in the early stages of developing a low-code internal tool builder called [MUI Toolpad](https://mui.com/toolpad/), in which you can build with every Core and X component in a drag-and-drop interface.

Read on for more details on each of our products.

## MUI Core

The Core is MUI's foundational product line.
It grew out of Material UI, and that library's legacy lives on in the name of the repo on GitHub: [`mui/material-ui`](https://github.com/mui/material-ui).

But this repo contains much more than just Material UI these days.
More recent additions include Joy UI and MUI Base, as well as our in-house styling solution, MUI System.

### Material UI

Material UI is an open-source React component library that implements Google's Material Design.
It includes a comprehensive collection of prebuilt components that are ready for use in production right out of the box.

Material UI is beautiful by design and features a suite of customization options that make it easy to implement your own custom design system on top of our components.

Get started in the [Material UI docs](/material-ui/getting-started/overview/).

#### Key features

- **Material Design:** Your app will look and feel excellent by default, thanks to our meticulous implementation of Material Design.
- **Comprehensiveness:** with over 50 foundational components and counting, you've got everything you need to ship new features fast.
- **Maturity:** Material UI's age and maturity rival that of React itself, with its origins spanning all the way back to 2014.
- **Community:** Over 2,500 open-source contributors have made this library what it is today.

#### Ideal use cases

- User interfaces that adhere closely to Material Design
- Internal/admin tools
- Dev teams that need to ship features in hours rather than weeks

### Joy UI

Joy UI is an open-source React component library that implements MUI's own in-house design principles.
It's intended to serve as an alternative to Material UI for designs that don't adhere to Material Design specifications.

Try Joy UI if you appreciate the comprehensiveness and reliability of Material UI, but don't need all of the additional baggage that comes along with Material Design.

Get started in the [Joy UI docs](/joy-ui/getting-started/overview/).

#### Key features

- **Innovative design:** Free from the constraints of Material Design, Joy UI is where we can innovate and experiment with fresh new ideas in design, UX, and DX.
- **Flexibility:** Customize with ease, and leverage the power of CSS variables to ensure consistency when making pixel-perfect adjustments.

#### Ideal use cases

- Projects that don't involve Material Design
- Designs that would benefit from less opinionated defaults when customizing
- Client-facing apps that need to look and feel distinctly like _your_ brand

### MUI Base

MUI Base is a library of headless ("unstyled") React UI components and hooks.
These components were extracted from Material UI, and are now available as a standalone package.
They feature the same robust engineering but without any default styling solution or theme.

MUI Base includes prebuilt components with production-ready functionality, along with low-level hooks for transferring that functionality to other components.

Get started in the [MUI Base docs](/base/getting-started/overview/).

#### Key features

- **Total control over styles:** Unlike Material UI and Joy UI, MUI Base doesn't ship with any default styles or styling solution.
  Write CSS however you'd prefer—vanilla, modules, styled-components—or integrate a styling library like Tailwind CSS or Emotion.
- **Hooks for fully custom components:** When pre-built components aren't flexible enough, low-level hooks enable you to quickly add sophisticated functionality to your custom components.
- **Accessibility:** MUI Base components are built with accessibility in mind. We do our best to make all components screen reader-friendly, and offer suggestions for optimizing accessibility throughout our documentation.
- **The core of MUI Core:** MUI Base serves as the scaffold for Joy UI components, and future versions Material UI will also be built with MUI Base as the foundation.

#### Ideal use cases

- Implementing fully custom designs
- Creating custom components within a Material UI or Joy UI app
- Adding functionality to fully custom components

### MUI System

MUI System is a set of CSS utilities to help you build custom designs more efficiently when working with MUI component libraries like Material UI, Joy UI, and MUI Base.

The System gives you a set of flexible, generic wrapper components like Box and Container that can be quickly customized using the `sx` prop.
This prop lets you define styles directly within the components themselves, rather than creating bulky and redundant const definitions with styled-components.
It also gives you direct access to your theme's custom design tokens to ensure consistency in one-off styles.

Get started in the [MUI System docs](/system/getting-started/overview/).

#### Key features

#### Ideal use cases

## MUI X

MUI X is a collection of advanced UI components, including the Data Grid and the Date and Time Pickers.

These components are significantly more complex than the ones found in the MUI Core libraries.
They feature advanced functionality for data-rich applications and a wide range of other use cases.

Get started in the [MUI X docs](/x/introduction/).

### Data Grid

#### Key features

#### Ideal use cases

- data-rich applications
- data analytics tools
- admin tools

### Date and Time Pickers

#### Key features

#### Ideal use cases

## MUI Toolpad

Toolpad is a self-hosted low-code internal tools builder designed to extend MUI's suite of React components.
It's designed for developers of all trades who want to save time building internal applications.
Drag and drop pre-built UI components, connect your data sources, and your app is ready for deployment.

### Key features

### Ideal use cases
