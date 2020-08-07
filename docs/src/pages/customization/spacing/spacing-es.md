# Espaciado

<p class="description">Use el ayudante theme.spacing() para crear un espacio consistente entre los elementos de su interfaz de usuario.</p>

Material-UI utiliza [un factor recomendado de escalado de 8px](https://material.io/design/layout/understanding-layout.html) por defecto.

```js
const theme = createMuiTheme();

theme.spacing(2) // = 8 * 2
```

## Espacio personalizado

Puede cambiar la transformacin de espaciado proporcionando:

- un número

```js
const theme = createMuiTheme({
  spacing: 4,
});

theme.spacing(2) // = 4 * 2
```

- una función

```js
const theme = createMuiTheme({
  spacing: factor => `${0. 5 * factor}rem`, // (estrategia de Bootstrap)
});

theme.spacing(2); // = 0.25 * 2rem = 0.5rem = 8px
```

- una lista

```js
const theme = createMuiTheme({
  spacing: [0, 4, 8, 16, 32, 64],
});

theme.spacing(2); // = 8
```

## Entidad múltiple

El ayudante `theme.spacing()` acepta hasta 4 argumentos. Puede utilizar los argumentos para reducir el boilerplate.

```diff
-padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`, // '8px 16px'
+padding: theme.spacing(1, 2), // '8px 16px'
```

Mezclar valores de texto también es compatible:

```js
margin: theme.spacing(1, 'auto'), // '8px auto'
```