---
title: Overview
---

# Joy UI - Overview

<p class="description">Joy UI is a library of beautifully designed React UI components built to spark joy in the development process.</p>

## Introduction

Joy UI is an open-source React component library, including many foundational pre-built components that follow a lightly opinionated design direction, thoughtfully crafted to ensure a great-looking UI while giving you plenty of room to customize how they look and feel.

:::warning
Joy UI is currently in active development, and breaking changes are to be expected.

We're adding new components and features regularly, and you're welcome to contribute!

Look for the [`package: joy-ui`](https://github.com/mui/material-ui/labels/package%3A%20joy-ui) label on open issues and pull requests in the `mui/material-ui` repository on GitHub to see what other community members are working on, and feel free to submit your own.
:::

## Why use Joy UI

Maintained by MUI, Joy UI is an alternative to Material UI for projects that aren't planning to adhere to or use it as a base, the Material Design specifications.

These two sister libraries feature many of the same components and similarly designed component APIs, so you can quickly start building with one if you've used the other before.

### Beautiful out of the box

Joy UI follows a lightly opinionated design direction we've been calling Joy Design.
Meant to be simple and functional, it offers a thoughtfully crafted set of defaults that ensure your next project starts off looking great, even without any deep customizations.

The [Order Dashboard](/joy-ui/getting-started/templates/order-dashboard/) template below, available on the [Templates](/joy-ui/getting-started/templates/) page, uses very light customizations to demonstrate how carefully designed all components were, ensuring they work well together.

<img src="/static/joy-ui/overview/order-dashboard.png" style="width: 814px; margin-top: 4px; margin-bottom: 8px;" alt="The Order Dashboard template, inspired by Untitled UI and built by the MUI team using Joy UI with very little customizations." width="1628" height="400" />

### Highly customizable

You should feel inspired and empowered to change, extend, and revamp Joy UI's appearance and behavior with ease.
Drawing from many years of experience with Material UI, Joy UI applies new approaches to customization, enabling you to customize every piece of the components to match your unique design.

Using Gatsby's documentation side nav as an example, the demo below shows how to customize the [List](/joy-ui/react-list/) component using built-in CSS variables.

{{"demo": "../../components/list/ExampleCollapsibleList.js"}}

### Developer experience

One of the main goals of Joy UI is to spark joy in the creative process of building apps.
This is why promoting an unrivaled developer experience is a big priority.

An example of this can be demonstrated by the automatic adjustment of the [Input](/joy-ui/react-input/) component, whereby by customizing its border radius, all components inside it will adapt accordingly, ensuring a great design and saving you time.

{{"demo": "../../main-features/automatic-adjustment/InputVariables.js"}}

### Accessibility

Joy UI components are built on top of [Base UI's unstyled components and low-level hooks](/base-ui/getting-started/), giving you support for many accessibility features out of the box.
We do our best to make all components screen reader-friendly and offer suggestions for optimizing accessibility throughout our documentation.

One example of this is the [Input](/joy-ui/react-input/) component that needs to have a descriptive label linked to help users understand its purpose.
Joy UI's Form Control component automatically generates a unique ID that links the Input with the Form Label and Form Helper Text components to ensure you adhere to this principle.

{{"demo": "../../components/input/InputField.js"}}
