# Spacing

<p class="description">Use the theme.spacing() helper to create consistent spacing between the elements of your UI.</p>

Material-UI uses [a recommended 8px scaling factor](https://material.io/design/layout/understanding-layout.html) by default.

```js
const theme = createMuiTheme();

theme.spacing(2) // = 8 * 2
```

## Custom spacing

You can change the spacing transformation by providing:

- a number

```js
const theme = createMuiTheme({
  spacing: 4,
});

theme.spacing(2) // = 4 * 2
```

- a function

```js
const theme = createMuiTheme({
  spacing: factor => `${0.25 * factor}rem`, // (Bootstrap strategy)
});

theme.spacing(2); // = 0.25 * 2rem = 0.5rem = 8px
```

- an array

```js
const theme = createMuiTheme({
  spacing: [0, 4, 8, 16, 32, 64],
});

theme.spacing(2); // = 8
```

## Multiple arity

The `theme.spacing()` helper accepts up to 4 arguments.
You can use the arguments to reduce the boilerplate.

```diff
-padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`, // '8px 16px'
+padding: theme.spacing(1, 2), // '8px 16px'
```

Mixing string values is also supported:

```js
margin: theme.spacing(1, 'auto'), // '8px auto'
```
