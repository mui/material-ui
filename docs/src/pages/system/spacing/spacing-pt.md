# Espaçamento

<p class="description">Uma ampla variedade de classes de utilitário responsivos de preenchimento e margem, para modificar a aparência de um elemento.</p>

## Notação

O utilitário de espaço converte margens e propriedades de preenchimento para margem e preenchimento de declarações CSS. As propriedades são nomeadas usando o formato `{property}{sides}`.

Onde a *propriedade* é uma das seguintes:

- `m` - para classes que definem *margin*
- `p` - para classes que definem *padding*

Onde os *sides* é um dos seguintes:

- `t` - para classes que configuram *margin-top* ou *padding-top*
- `b` - para classes que configuram *margin-bottom* ou *padding-bottom*
- `l` - para classes que configuram *margin-left* ou *padding-left*
- `r` - para classes que configuram *margin-right* ou *padding-right*
- `x` - para classes que configuram ambos **-left* e **-right*
- `y` - para classes que configuram **-top* e **-bottom*
- blank - para classes que configuram margin ou padding nos 4 lados do elemento

## Transformação

Dependendo da entrada e da configuração do tema, a seguinte transformação é aplicada:

- entrada: `number` & tema: `number`: a propriedade é multiplicada pelo valor do tema.

```jsx
const theme = {
  spacing: 8,
}

<Box m={-2} /> // margin: -16px;
<Box m={0} /> // margin: 0px;
<Box m={0.5} /> // margin: 4px;
<Box m={2} /> // margin: 16px;
```

- entrada: `number` & tema: `array`: a propriedade é o valor do índice no array.

```jsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box m={-2} /> // margin: -3px;
<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 3px;
```

- entrada: `number` & tema: `function`: a função é chamada com o valor da propriedade.

```jsx
const theme = {
  spacing: value => value ** 2,
}

<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 4px;
```

- entrada: `string`: a propriedade é passada como valor CSS bruto.

```jsx
<Box m="2rem" /> // margin: 2rem;
<Box mx="auto" /> // margin-left: auto; margin-right: auto;
```

## Exemplo

{{"demo": "pages/system/spacing/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box p={1}>…
<Box m={1}>…
<Box p={2}>…
```

## Centralização horizontal

{{"demo": "pages/system/spacing/HorizontalCentering.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box mx="auto">…
```

## API

```js
import { spacing } from '@material-ui/system';
```

| Nome da importação | Propriedade | Propriedade CSS                 | Chave do tema                                                    |
|:------------------ |:----------- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing`          | `m`         | `margin`                        | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `mt`        | `margin-top`                    | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `mr`        | `margin-right`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `mb`        | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `ml`        | `margin-left`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `mx`        | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `my`        | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `p`         | `padding`                       | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `pt`        | `padding-top`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `pr`        | `padding-right`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `pb`        | `padding-bottom`                | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `pl`        | `padding-left`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `px`        | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing`          | `py`        | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |


*Algumas pessoas acham a propriedade abreviada confusa, você pode usar a versão completa se preferir:*

```diff
-<Box pt={2} />
+<Box paddingTop={2} />
```

```diff
-<Box px={2} />
+<Box paddingX={2} />
```