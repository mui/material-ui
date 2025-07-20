---
title: Overview
---

# MUI System - Overview

<p class="description">MUI System is a set of CSS utilities to help you build custom designs more efficiently. It makes it possible to rapidly lay out custom designs.</p>

## Introduction

MUI System is a set of CSS utilities to help you build custom designs more efficiently.
It's used internally by libraries like [Material UI](/material-ui/), [Joy UI](/joy-ui/getting-started/).
It can also be used to style MUI Base components.

MUI System gives you a set of flexible, generic wrapper components like [`Box`](/system/react-box/) and [`Container`](/system/react-container/) that can be quickly customized using the `sx` prop.
This prop lets you define styles directly within the components themselves, rather than creating bulky and redundant `const` definitions with styled-components.
It also gives you direct access to your theme's custom design tokens to ensure consistency in one-off styles.
Learn more on [the `sx` prop page](/system/getting-started/the-sx-prop/).

## Advantages of MUI System

- **Write less code:** in situations where styled-components would be overkill, the `sx` prop can [replace dozens of lines of code](/system/getting-started/usage/#why-use-mui-system).
- **Write the CSS you already know:** the `sx` prop features a superset of CSS, so it's intuitive to pick up and start working with right away if you're comfortable with CSS.
- **Avoid context-switching:** with styled-components, you frequently have to jump between the usage and the definition to find what you need. With MUI System, it's all in one place.
- **Forget unnecessary custom names:** if you've ever struggled to come up with a good name for a styled-component, then you'll appreciate skipping that step entirely when using MUI System.

## MUI System vs. MUI Base

MUI Base is a library of "unstyled" React components, while MUI System is a set of utilities for quickly applying styles to those components (as well as our other component libraries like Material UI and Joy UI).

MUI Base is a standalone component library, whereas MUI System is _supplemental_ in that it's designed to be paired with MUI Base or any third-party components.
See the [Custom components page](/system/getting-started/custom-components/) for details on how to use MUI System.
