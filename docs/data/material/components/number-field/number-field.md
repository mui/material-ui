---
productId: material-ui
title: Number field React component
components: Button, IconButton, InputLabel, FormControl, FormLabel, FormHelperText, OutlinedInput
---

# Number Field

<p class="description">A React component for capturing numeric input from users.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

The Number Field integrates the best of both worlds:

- Base UI provides unstyled, robust, and fully accessible number field.
- Material UI components for the visual representation and styles.

It gives developers the flexibility to create various designs while keeping the same foundation for behavior and accessibility. Make sure to install Base UI before continuing the sections below.

<!-- #npm-tag-reference -->

<codeblock storageKey="package-manager">

```bash npm
npm install @base-ui-components/react
```

```bash pnpm
pnpm add @base-ui-components/react
```

```bash yarn
yarn add @base-ui-components/react
```

</codeblock>

:::info
The Number Field component is **NOT** a built-in component of `@mui/material`, you must install our headless library — [Base UI](https://base-ui.com/react/overview/quick-start#install-the-library).

Base UI is tree-shakeable, so the final bundle will only include the components used in your project.
:::

## Usage

1. Pick a demo from below that fits your visual design needs.
2. Click "Expand code" from the toolbar
3. Select the file that starts with `./components/`
4. Click the copy icon from the toolbar and paste it into your project.

## Outlined field

Uses [text-field composition](/material-ui/react-text-field/#components) with end adornments for the increment and decrement buttons.

{{"demo": "FieldDemo.js"}}

## Spinner field

The increment and decrement buttons are placed next to the outlined input. Best for touch devices and narrow ranges of values.

{{"demo": "SpinnerDemo.js"}}

## Base UI API

See the documentation below for a complete reference to all of the props.

- [`<NumberField />`](https://base-ui.com/react/components/number-field#api-reference)
