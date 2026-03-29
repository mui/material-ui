# Spacing

<p class="description">Use the theme.spacing() helper to create consistent spacing between the elements of your UI.</p>

Material UI uses [a recommended 8px scaling factor](https://m2.material.io/design/layout/understanding-layout.html) by default.

```js
const theme = createTheme();

theme.spacing(2); // `${8 * 2}px` = '16px'
```

## Custom spacing

You can change the spacing transformation by providing:

- a number

```js
const theme = createTheme({
  spacing: 4,
});

theme.spacing(2); // `${4 * 2}px` = '8px'
```

- a function

```js
const theme = createTheme({
  spacing: (factor) => `${0.25 * factor}rem`, // (Bootstrap strategy)
});

theme.spacing(2); // = 0.25 * 2rem = 0.5rem = 8px
```

- an array

```js
const theme = createTheme({
  spacing: [0, 4, 8, 16, 32, 64],
});

theme.spacing(2); // = '8px'
```

:::warning
Note that when spacing is defined as an array, it only works with positive integers that will be used as array indexes.<br />
It doesn't support all possible signatures of the `theme.spacing()` helper, for example `theme.spacing(0.5)`, `theme.spacing(-1)`, or `theme.spacing(1, 'auto')`.

If you must use spacing array, consider using a function signature that can handle all possible signatures of the `theme.spacing()` helper:

<details>
<summary>Spacing function example</summary>

```tsx
const spacings = [0, 4, 8, 16, 32, 64];

const theme = createTheme({
  spacing: (factor: number | 'auto' = 1) => {
    if (factor === 'auto') {
      return 'auto';
    }
    const sign = factor >= 0 ? 1 : -1;
    const factorAbs = Math.min(Math.abs(factor), spacings.length - 1);
    if (Number.isInteger(factor)) {
      return spacings[factorAbs] * sign;
    }
    return interpolate(factorAbs, spacings) * sign;
  },
});

const interpolate = (value: number, array: readonly number[]) => {
  const floor = Math.floor(value);
  const ceil = Math.ceil(value);
  const diff = value - floor;
  return array[floor] + (array[ceil] - array[floor]) * diff;
};
```

</details>

:::

## Multiple arity

The `theme.spacing()` helper accepts up to 4 arguments.
You can use the arguments to reduce the boilerplate.

```diff
-padding: `${theme.spacing(1)} ${theme.spacing(2)}`, // '8px 16px'
+padding: theme.spacing(1, 2), // '8px 16px'
```

Mixing string values is also supported:

```js
margin: theme.spacing(1, 'auto'), // '8px auto'
```
