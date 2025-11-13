---
productId: material-ui
title: Number field React component
components: Button, IconButton, InputLabel, FormControl, FormLabel, FormHelperText, OutlinedInput
---

# Number Field

<p class="description">A React component for capturing numeric input from users.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

Number Field is _not_ a built-in `@mui/material` component—it's composed of a [Base UI Number Field](https://base-ui.com/react/components/number-field) and styled to align with Material UI specs.

As such, you must install Base UI before proceeding.
The examples that follow can then be copied and pasted directly into your app.
Note that Base UI is tree-shakeable, so the final bundle will only include the components used in your project.

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

1. Select one of the demos below that fits your visual design needs.
2. Click **Expand code** in the toolbar.
3. Select the file that starts with `./components/`.
4. Copy the code and paste it into your project.

## Outlined field

The outlined field component uses [text-field composition](/material-ui/react-text-field/#components) with end adornments for the increment and decrement buttons.

{{"demo": "FieldDemo.js"}}

## Spinner field

For the spinner field component, the increment and decrement buttons are placed next to the outlined input.
This is ideal for touch devices and narrow ranges of values.

{{"demo": "SpinnerDemo.js"}}

## Base UI API

See the documentation below for a complete reference to all of the props.

- [`<NumberField />`](https://base-ui.com/react/components/number-field#api-reference)
