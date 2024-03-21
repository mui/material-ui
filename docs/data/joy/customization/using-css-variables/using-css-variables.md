# Using CSS variables

<p class="description">Learn how to use CSS variables to customize Joy UI components.</p>

## Introduction

To use CSS variables, you must wrap your app with the `<CssVarsProvider />` utility.

```jsx
import { CssVarsProvider } from '@mui/joy/styles';

function App() {
  return <CssVarsProvider>...</CssVarsProvider>;
}
```

Then you can apply styles based on CSS variables using the `theme.vars.*` notation.
This notation is available to all styling APIs that Joy UI supports, including the `styled()` function and the `sx` prop.

## Styling APIs

Use the `theme.vars.*` notation with any styling APIs supported by Joy UI:

:::success
Visit [the Approaches page](/joy-ui/customization/approaches/) to understand how to use the supported styling APIs.
:::

### styled function

```js
const Div = styled('div')(({ theme }) => ({
  // Outputs 'var(--joy-palette-primary-500)'
  color: theme.vars.palette.primary[500],
}));
```

### sx prop

```jsx
// Outputs 'var(--joy-shadow-sm)'
<Chip sx={(theme) => ({ boxShadow: theme.vars.shadow.sm })} />
```

You can also use a short-hand syntax to resolve the values from the `theme.vars.*` the same way the example above does.

```js
<Chip
  sx={{
    border: '1px solid',

    // For color properties, lookup from `theme.vars.palette`
    color: 'neutral.800', // 'var(--joy-palette-neutral-800)'
    borderColor: 'neutral.400', // 'var(--joy-palette-neutral-400)'

    // lookup from `theme.vars.shadow`
    shadow: 'sm', // 'var(--joy-shadow-sm)'

    // lookup from `theme.vars.fontSize`
    fontSize: 'sm', // 'var(--joy-fontSize-sm)'
  }}
/>
```

### Themed components

```jsx
extendTheme({
  components: {
    JoyButton: {
      root: ({ theme }) => ({
        // Outputs 'var(--joy-fontFamily-display)'
        fontFamily: theme.vars.fontFamily.display,
      }),
    },
  },
});
```

### useTheme hook

```jsx
import { useTheme } from '@mui/joy/styles';

const SomeComponent = () => {
  const theme = useTheme(); // The runtime theme.

  return (
    <div>
      <p style={{ color: {theme.vars.palette.primary[500]} }}>Some text here.</p>
    </div>
  );
};
```

## Creating new variables

To create new CSS variables, use raw theme values (`theme.*` as opposed to `theme.vars.*`). The code below shows an example of how to create a new shadow theme value:

```js
const Div = styled('div')(({ theme }) => ({
  // Note that it's using `theme.shadow`, not `theme.vars.shadow`
  boxShadow: theme.shadow.sm.replace(/,/g, ', inset'),
}));
```

:::warning
You can't use `theme.vars` to create an inset shadow because the value refers to the CSS variable, not the actual shadow.

- `theme.vars.shadow.sm` returns `'var(--joy-shadow-sm)'`
- `theme.shadow.sm` returns `'var(--joy-shadowRing), 0 1px 2px 0 rgba(var(--joy-shadowChannel) / 0.2)'`

:::

## Adjust color opacity

Use the automatically generated opacity channel tokens (`mainChannel`, `lightChannel` and `darkChannel`), together with the `rgba` color notation, to adjust color opacity in all [available palettes](/joy-ui/customization/theme-colors/#default-color-tokens) in Joy UI.

```js
const Div = styled('div')(({ theme }) => ({
  backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.2)`,
}));
```

:::warning
The format of the channel tokens uses a space as a separator (for example `61 131 246`), which means you have to use `/` to combine the channel token with an opacity value.

```js
`rgba(${theme.vars.palette.primary.mainChannel} / 0.2)`, //  ✅ correct
`rgba(${theme.vars.palette.primary.mainChannel}, 0.2)`, // 🚫 incorrect
```

:::

## Custom prefixes

Every Joy UI CSS variable is prefixed with `joy` by default.
To change this prefix, use the `cssVarPrefix` property inside an `extendTheme` function on the `<CssVarsProvider />` component.

```jsx
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

function App() {
  return (
    <CssVarsProvider theme={extendTheme({ cssVarPrefix: 'company' })}>
      ...
    </CssVarsProvider>
  );
}
```

The generated CSS variables will then be:

```diff
- --joy-fontSize-md: 1rem;
+ --company-fontSize-md: 1rem;
```

### Removing the default prefix

Use an empty value (`''`) in the `cssVarPrefix` property to remove the default `joy` prefix from the generated CSS variables:

```jsx
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

function App() {
  return (
    <CssVarsProvider theme={extendTheme({ cssVarPrefix: '' })}>...</CssVarsProvider>
  );
}
```

```diff
- --joy-fontSize-md: 1rem;
+ --fontSize-md: 1rem;
```
