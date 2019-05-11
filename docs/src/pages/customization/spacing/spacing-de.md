# Abstände

<p class="description">Use the theme.spacing() helper to create consistent spacing between the elements of your UI.</p>

Die Material-UI verwendet standardmäßig den [empfohlenen 8px-Skalierungsfaktor](https://material.io/design/layout/understanding-layout.html).

```js
const styles = theme => ({
  root: {
    // JSS verwendet px als Standardeinheiten für diese CSS-Eigenschaft.
    padding: theme.spacing(2), // = 8 * 2
  },
});
```

Sie können die Abstandstransformation ändern, indem Sie Folgendes angeben:

- eine Zahl

```js
const theme = createMuiTheme({
  spacing: 4,
});

theme.spacing(2) // = 4 * 2
```

- eine Funktion

```js
const theme = createMuiTheme({
  spacing: factor => `${0.25 * factor}rem`, // (Bootstrap Strategie)
});

theme.spacing(2); // = 0.25 * 2rem = 0.5rem = 8px
```

- eine Array

```js
const theme = createMuiTheme({
  spacing: factor => [0, 4, 8, 16, 32, 64][factor],
});

theme.spacing(2); // = 8
```

## Mehrere Aritäten

Der`theme.spacing ()` Helfer akzeptiert bis zu 4 Argumente. Sie können die Argumente verwenden, um den Boilerplate zu reduzieren:

```diff
<br />-  padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
+  padding: theme.spacing(1, 2), // '8px 16px'
```