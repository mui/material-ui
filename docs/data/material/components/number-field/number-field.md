---
productId: material-ui
title: Number field React component
components: Button, IconButton, InputLabel, FormControl, FormLabel, FormHelperText, OutlinedInput
---

# Number Field

<p class="description">A Number Field is designed to receive numeric input from the user.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

The Number Field combines the best of both worlds:

- Base UI [NumberField](https://base-ui.com/react/components/number-field) provides unstyled, robust, and fully accessible components.
- Material UI building blocks provide the visual representation and styling.

It gives developers the flexibility to create various designs while keeping the same foundation for behavior and accessibility.

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

## Usage

1. Pick a demo from below that fits your visual design needs.
2. Click "Expand code" from the toolbar
3. Select the file that starts with `./components/`
4. Click the copy icon from the toolbar and paste it into your codebase.

:::info
The Number Field component is **NOT** included in `@mui/material`.

You must install [Base UI](https://base-ui.com/react/overview/quick-start#install-the-library) and copy the code from one of the demos below to use it.
:::

## Outlined

Uses [text field composition](/material-ui/react-text-field/#components) with end adornments for the increment and decrement buttons.

{{"demo": "FieldDemo.js"}}

## Spinner

The increment and decrement buttons are placed next to the outlined input. Best for touch devices and narrow ranges of values.

{{"demo": "SpinnerDemo.js"}}
