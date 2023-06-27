# Using CSS variables

<p class="description">Learn how to use CSS variables to customize Joy UI's components.</p>

## Theme object

The `CssVarsProvider` reads the theme input (or the default theme) and creates the CSS variables according to the theme structure.
It also creates an object that refers to the generated CSS variables under `theme.vars` so that you can use them from the JavaScript theme object.

The `theme.vars` is available in all styling APIs that Joy UI offers:

1. The `styled` function

```js
const Div = styled('div')(({ theme }) => ({
  // The result is 'var(--joy-palette-primary-500)'
  color: theme.vars.palette.primary[500],
}));
```

2. The `sx` prop

```jsx
// The result is 'var(--joy-shadow-sm)'
<Chip sx={(theme) => ({ boxShadow: theme.vars.shadow.sm })} />
```

3. Style overrides (themed components)

```jsx
extendTheme({
  components: {
    JoyButton: {
      root: ({ theme }) => ({
        // The result is 'var(--joy-fontFamily-display)'
        fontFamily: theme.vars.fontFamily.display,
      }),
    },
  },
});
```

4. The `useTheme` hook.

### Alpha channel colors

Joy UI automatically generates the channel tokens (`mainChannel`, `lightChannel` and `darkChannel`) to be used with an opacity.
You will find them in these palettes:

- primary
- neutral
- danger
- info
- success
- warning

You can combine the channel tokens with an opacity value like this:

```js
const Div = styled('div')(({ theme }) => ({
  backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`,
}));
```

:::warning
The format of the channel tokens uses a space as a separator, e.g. `61 131 246`, which means you have to use `/` to combine the channel token with an opacity value.

```js
`rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`, ✅ correct
`rgba(${theme.vars.palette.primary.mainChannel}, 0.12)`, 🚫 incorrect
```

:::

### Raw value

In some cases, you might want to use the raw value to create a new one.
For example, you can create the `inset` shadow from the theme like this:

```js
const Div = styled('div')(({ theme }) => ({
  // Note that it's using `theme.shadow`, not `theme.vars.shadow`
  boxShadow: theme.shadow.sm.replace(/,/g, ', inset'),
}));
```

:::warning
You can't use `theme.vars` to create an inset shadow because the value refers to the CSS variable, not the actual shadow.

- `theme.vars.shadow.sm` returns `'var(--joy-shadow-sm)'`
- `theme.shadow.sm` returns `'var(--joy-shadowRing), 0 1px 2px 0 rgba(var(--joy-shadowChannel) / 0.12)'`

:::

## sx prop

When using the short-hand syntax inside the `sx` prop, Joy UI will try to resolve the value from `theme.vars.*`.
You can use the `.` notation to get the value of an object.

```js
<Chip
  sx={{
    border: '1px solid',

    // For color related properties, lookup from `theme.vars.palette`
    color: 'neutral.800', // 'var(--joy-palette-neutral-800)'
    borderColor: 'neutral.400', // 'var(--joy-palette-neutral-400)'

    // lookup from `theme.vars.shadow`
    shadow: 'sm', // 'var(--joy-shadow-sm)'

    // lookup from `theme.vars.fontSize`
    fontSize: 'sm', // 'var(--joy-fontSize-sm)'
  }}
/>
```

## Custom prefix

By default, the generated CSS variables are prefixed with `joy`.
If you want to change the prefix to something else, provide the `cssVarPrefix` to the `extendTheme`:

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

The generated CSS variables will be:

```diff
- --joy-fontSize-md: 1rem;
+ --company-fontSize-md: 1rem;
```

### Remove the prefix

Specify `""` as a value to `extendTheme({ cssVarPrefix: '' })`.

The generated CSS variables will be:

```diff
- --joy-fontSize-md: 1rem;
+ --fontSize-md: 1rem;
```
