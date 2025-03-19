---
title: Material UI v7 is out 🚀
description: Material UI v7 is now stable, improving integration with modern tools and consistency across the library.
date: 2025-03-31T12:00:00.000Z
authors: ['diegoandai']
tags: ['Material UI', 'Product']
manualCard: true
---

Material UI v7 is now stable.
This major improves the integration with modern tools and consistency across the library.
It's a lean upgrade designed to be straightforward to upgrade to.

## Improved ESM support

The package layout has been updated to comply with ESM.
This is achieved by adding the `exports` field to the `package.json` file.
The `export` field indicates where bundlers can find CJS, ESM, and modern bundle files.
You can read more about this in the [Node.js documentation](https://nodejs.org/api/packages.html#packages_exports).

This update fixes several issues with popular bundlers like Vite and webpack.
It also reduces the amount of setup required to work with these tools.

## Opt-in support for CSS layers

The `enableCssLayer` prop has been added to `ThemeProvider`.
When enabled, Material UI styles are wrapped in a CSS layer named `@mui`.

This allows Material UI to integrate with modern tools that rely on CSS layers, like Tailwind CSS v4.

## Completed the slot pattern implementation

The API for replacing or modifying inner elements of components has been standardized.
All components that require it now implement the slot pattern through the `slots` and `slotProps` props.
A [guide about this pattern](/material-ui/customization/overriding-component-structure/) has been added to the documentation.

This increases the consistency between components, making it possible to transfer knowledge from one to the other and improving the developer experience overall.

## Reduced bloat

APIs that were deprecated in v5 have been removed.
This reduces the library's bloat, keeping the API and docs leaner and easier to navigate.
Visit the upgrade guide for a [list of removed APIs](/material-ui/migration/upgrade-to-v7/#deprecated-apis-removed).

## Get started

Ready to upgrade to Material UI v7?
Head to [the v7 upgrade guide](/material-ui/migration/upgrade-to-v7/) next.
