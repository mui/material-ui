# Default theme

<p class="description">Here's what the theme object looks like with the default values.</p>

:::warning
**⚠️ Work in progress:** we're still iterating on the whole Joy UI default theme.
:::

**Typography-related:**

```js
extendTheme({
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xl2: '1.875rem',
    xl3: '2.25rem',
    xl4: '3rem',
    xl5: '3.75rem',
    xl6: '4.5rem',
  },
});
```

```js
extendTheme({
  fontFamily: {
    body: '"Public Sans", var(--joy-fontFamily-fallback)',
    display: '"Public Sans", var(--joy-fontFamily-fallback)',
    code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    fallback:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
});
```

```js
extendTheme({
  fontWeight: {
    xs: 200,
    sm: 300,
    md: 500,
    lg: 700,
    xl: 800,
  },
});
```

```js
extendTheme({
  lineHeight: {
    sm: 1.25,
    md: 1.5,
    lg: 1.7,
  },
});
```

```js
extendTheme({
  letterSpacing: {
    sm: '-0.01em',
    md: '0.083em',
    lg: '0.125em',
  },
});
```

```js
extendTheme({
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
});
}
```

**Box shadows:**

All the shadows are listed [here](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/types/shadow.ts).
We recommend to use `var(--joy-shadowRing)` and `var(--joy-shadowChannel)` for creating the shadows because you can customize the shadow color on the component.

```js
extendTheme({
  shadows: {
    // default tokens
    xs: 'var(--joy-shadowRing), 0 1px 2px 0 rgba(var(--joy-shadowChannel) / 0.12)',
    sm: '...',
    md: '...',
    lg: '...',
    xl: '...',
  },
});
```
