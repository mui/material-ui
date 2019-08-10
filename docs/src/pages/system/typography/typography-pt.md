# Typography

<p class="description">Documentação e exemplos de texto, utilizações comuns para controlar o alinhamento, quebra, peso e muito mais.</p>

## Alinhamento do texto

```jsx
<Box textAlign="left">…
<Box textAlign="center">…
<Box textAlign="right">…
```

{{"demo": "pages/system/typography/TextAlignment.js"}}

## Peso da fonte

```jsx
<Box fontWeight="fontWeightLight">…
<Box fontWeight="fontWeightRegular">…
<Box fontWeight="fontWeightMedium">…
<Box fontWeight={500}>…
<Box fontWeight="fontWeightBold">…
```

{{"demo": "pages/system/typography/FontWeight.js"}}

## Tamanho da fonte

```jsx
<Box fontSize="fontSize">…
<Box fontSize="h6.fontSize">…
<Box fontSize={16}>…
```

{{"demo": "pages/system/typography/FontSize.js"}}

## Estilo da fonte

```jsx
<Box fontStyle="normal">…
<Box fontStyle="italic">…
<Box fontStyle="oblique">…
```

{{"demo": "pages/system/typography/FontStyle.js"}}

## Família da fonte

```jsx
<Box fontFamily="fontFamily">…
<Box fontFamily="Monospace">…
```

{{"demo": "pages/system/typography/FontFamily.js"}}

## Espaçamento das letras

```jsx
<Box letterSpacing={6}>…
<Box letterSpacing={10}>…
```

{{"demo": "pages/system/typography/LetterSpacing.js"}}

## Altura da linha

```jsx
<Box lineHeight="normal">…
<Box lineHeight={10}>…
```

{{"demo": "pages/system/typography/LineHeight.js"}}

## API

```js
import { typography } from '@material-ui/system';
```

| Nome da importação | Prop            | Propriedade CSS  | Chave do tema                       |
|:------------------ |:--------------- |:---------------- |:----------------------------------- |
| `fontFamily`       | `fontFamily`    | `font-family`    | [`typography`](/system/typography/) |
| `fontSize`         | `fontSize`      | `font-size`      | [`typography`](/system/typography/) |
| `fontStyle`        | `fontStyle`     | `font-style`     | [`typography`](/system/typography/) |
| `fontWeight`       | `fontWeight`    | `font-weight`    | [`typography`](/system/typography/) |
| `letterSpacing`    | `letterSpacing` | `letter-spacing` | none                                |
| `lineHeight`       | `lineHeight`    | `line-height`    | none                                |
| `textAlign`        | `textAlign`     | `text-align`     | none                                |