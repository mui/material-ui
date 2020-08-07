# Abstände (Spacing)

<p class="description">Verwende den theme.spacing() Helfer, um einen konsistenten Abstand zwischen den Elementen Ihrer Benutzeroberfläche zu erstellen.</p>

Material-UI uses [a recommended 8px scaling factor](https://material.io/design/layout/understanding-layout.html) by default.

```js
const theme = createMuiTheme();

theme.spacing(2) // = 8 * 2
```

## Custom spacing

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
  spacing: [0, 4, 8, 16, 32, 64],
});

theme.spacing(2); // = 8
```

## Mehrere Aritäten

Der `theme.spacing ()` Helfer akzeptiert bis zu 4 Argumente. Sie können die Argumente verwenden, um den Boilerplate zu reduzieren.

```diff
-padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`, // '8px 16px'
+padding: theme.spacing(1, 2), // '8px 16px'
```

Mixing string values is also supported:

```js
margin: theme.spacing(1, 'auto'), // '8px auto'
```