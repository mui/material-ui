# Espaçamento

<p class="description">Use o auxiliar theme.spacing() para criar um espaçamento consistente entre os elementos da sua UI.</p>

Material-UI usa [um fator de escala recomendado de 8px](https://material.io/design/layout/understanding-layout.html) por padrão.

```js
const theme = createMuiTheme();

theme.spacing(2) // = 8 * 2
```

## Espaçamento customizado

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

## Aridade múltipla

O auxiliar ` theme.spacing()` aceita até 4 argumentos. You can use the arguments to reduce the boilerplate. Instead of doing:

```js
padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`, // '8px 16px'
```

you can do:

```js
padding: theme.spacing(1, 2), // '8px 16px'
```