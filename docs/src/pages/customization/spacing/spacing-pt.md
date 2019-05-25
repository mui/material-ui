# Espaçamento

<p class="description">Use the theme.spacing() helper to create consistent spacing between the elements of your UI.</p>

Material-UI uses [a recommended 8px scaling factor by default](https://material.io/design/layout/understanding-layout.html).

```js
const styles = theme => ({
  root: {
    // O JSS usa px como unidade padrão para essa propriedade CSS.
    padding: theme.spacing(2), // = 8 * 2
  },
});
```

Você pode alterar a transformação do espaçamento fornecendo:

- um número

```js
const theme = createMuiTheme({
  spacing: 4,
});

theme.spacing(2) // = 4 * 2
```

- uma função

```js
const theme = createMuiTheme({
  spacing: factor => `${0.25 * factor}rem`, // (estratégia do Bootstrap)
});

theme.spacing(2); // = 0.25 * 2rem = 0.5rem = 8px
```

- um vetor

```js
const theme = createMuiTheme({
  spacing: factor => [0, 4, 8, 16, 32, 64][factor],
});

theme.spacing(2); // = 8
```

## Multiple arity

The `theme.spacing()` helper accepts up to 4 arguments. You can use the arguments to reduce the boilerplate:

```diff
<br />-  padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
+  padding: theme.spacing(1, 2), // '8px 16px'
```