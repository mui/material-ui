# Bordas

<p class="description">Use os utilitários de borda para rapidamente estilizar "border" e "border-radius" de um elemento. Ótimo para imagens, botões ou qualquer outro elemento.</p>

## Border

Use os utilitários de borda para adicionar ou remover as bordas de um elemento. Escolha para todas as bordas ou separadamente.

### Adicionando

```jsx
<Box border={1}>…
<Box borderTop={1}>…
<Box borderRight={1}>…
<Box borderBottom={1}>…
<Box borderLeft={1}>…
```

{{"demo": "pages/system/borders/BorderAdditive.js"}}

### Removendo

```jsx
<Box border={0}>…
<Box borderTop={0}>…
<Box borderRight={0}>…
<Box borderBottom={0}>…
<Box borderLeft={0}>…
```

{{"demo": "pages/system/borders/BorderSubtractive.js"}}

## Cor da Borda

```jsx
<Box borderColor="primary.main">…
<Box borderColor="secondary.main">…
<Box borderColor="error.main">…
<Box borderColor="grey.500">…
<Box borderColor="text.primary">…
```

{{"demo": "pages/system/borders/BorderColor.js"}}

## Border-radius

```jsx
<Box borderRadius="50%">…
<Box borderRadius="borderRadius">…
<Box borderRadius={16}>…
```

{{"demo": "pages/system/borders/BorderRadius.js"}}

## API

```js
import { borders } from '@material-ui/system';
```

| Nome da importação | Prop           | Propriedade CSS | Chave do tema                                                    |
|:------------------ |:-------------- |:--------------- |:---------------------------------------------------------------- |
| `border`           | `border`       | `border`        | `borders`                                                        |
| `borderTop`        | `borderTop`    | `border-top`    | `borders`                                                        |
| `borderLeft`       | `borderLeft`   | `border-left`   | `borders`                                                        |
| `borderRight`      | `borderRight`  | `border-right`  | `borders`                                                        |
| `borderBottom`     | `borderBottom` | `border-bottom` | `borders`                                                        |
| `borderColor`      | `borderColor`  | `border-color`  | [`palette`](/customization/default-theme/?expend-path=$.palette) |
| `borderRadius`     | `borderRadius` | `border-radius` | [`shape`](/system/borders/)                                      |