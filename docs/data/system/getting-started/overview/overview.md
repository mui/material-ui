---
title: Overview
---

# MUI System - Overview

<p class="description">MUI System is a set of CSS utilities to help you build custom designs more efficiently. It makes it possible to rapidly lay out custom designs.</p>

## Introduction

MUI System is a set of CSS utilities to help you build custom designs more efficiently. It's used internally by libraries like [Material UI](/material-ui/), [Joy UI](/joy-ui/getting-started/), and can also be applied to style [Base UI](/base-ui/) components.

MUI System provides a collection of flexible, generic wrapper components such as [`Box`](/system/react-box/) and [`Container`](/system/react-container/), which can be easily customized using the `sx` prop. This prop allows you to define styles directly within the components themselves, eliminating the need for cumbersome and redundant `const` definitions with styled-components. It also grants direct access to your theme's custom design tokens, ensuring consistency in one-off styles. Learn more on [the `sx` prop page](/system/getting-started/the-sx-prop/).

## Advantages of MUI System

- **Streamline Development:** By replacing verbose styled-components code with the concise `sx` prop, MUI System significantly accelerates development cycles, enabling developers to focus on crafting exceptional user experiences.
- **Leverage Existing CSS Knowledge:** Built on a CSS superset, the `sx` prop is inherently intuitive, making it accessible to developers familiar with CSS. This familiarity expedites the adoption process and empowers teams to hit the ground running.
- **Enhance Workflow Efficiency:** With MUI System, developers can bid farewell to context-switching between styled-component usage and definition. By consolidating styling efforts within components, MUI System enhances workflow efficiency and promotes collaboration.
- **Simplify Naming Conventions:** Say goodbye to the struggle of naming styled-components. MUI System's straightforward approach eliminates the need for convoluted naming conventions, allowing developers to focus on building exceptional interfaces.
- **Boost Performance:** MUI System optimizes rendering performance by employing efficient CSS utilities, resulting in faster load times and smoother user interactions.
- **Ensure Cross-Browser Compatibility:** With built-in support for modern CSS features and automatic vendor prefixing, MUI System ensures consistent rendering across various browsers, saving developers time and effort in addressing compatibility issues.
- **Promote Code Reusability:** MUI System facilitates code reuse through its modular and composable design, allowing developers to create reusable styling patterns that can be easily applied across different components and projects.

## MUI System vs. Base UI

[Base UI](/base-ui/) is a library of "unstyled" React components, while MUI System is a set of utilities for quickly applying styles to those components (as well as our other component libraries like Material UI and Joy UI).

Base UI is a standalone component library, whereas MUI System is _supplemental_ in that it's designed to be paired with Base UI or any third-party components. See the [Custom components page](/system/getting-started/custom-components/) for details on how to use MUI System.

