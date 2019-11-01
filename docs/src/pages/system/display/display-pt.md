# Exibição

<p class="description">Troque rapidamente, de forma responsiva, a propriedade 'display' dos seus componentes e faça muito mais com as ferramentas de exibição. Inclui suporte para alguns dos valores mais comuns, bem como alguns extras para controlar a exibição durante a impressão.</p>

## Exemplos

### Inline

{{"demo": "pages/system/display/Inline.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" display="inline">inline</Box>
<Box component="div" display="inline">inline</Box>
```

### Block

{{"demo": "pages/system/display/Block.js", "defaultCodeOpen": false}}

```jsx
<Box component="span" display="block">block</Box>
<Box component="span" display="block">block</Box>
```

## Ocultando elementos

Para um desenvolvimento mais rápido para dispositivos móveis, use classes de exibição responsivas para mostrar e ocultar elementos por dispositivo. Evite criar versões totalmente diferentes do mesmo site, em vez disso, oculte o elemento de forma responsiva para cada tamanho de tela.

| Tamanho da tela | Classe                                               |
|:--------------- |:---------------------------------------------------- |
| Oculto em todas | `display="none"`                                     |
| Oculto em xs    | `display={{ xs: 'none', sm: 'block' }}`              |
| Oculto em sm    | `display={{ xs: 'block', sm: 'none', md: 'block' }}` |
| Oculto em md    | `display={{ xs: 'block', md: 'none', lg: 'block' }}` |
| Oculto em lg    | `display={{ xs: 'block', lg: 'none', xl: 'block' }}` |
| Oculto em xl    | `display={{ xs: 'block', xl: 'none' }}`              |
| Visível em xs   | `display={{ xs: 'block', sm: 'none' }}`              |
| Visível em sm   | `display={{ xs: 'none', sm: 'block', md: 'none' }}`  |
| Visível em md   | `display={{ xs: 'none', md: 'block', lg: 'none' }}`  |
| Visível em lg   | `display={{ xs: 'none', lg: 'block', xl: 'none' }}`  |
| Visível em xl   | `display={{ xs: 'none', xl: 'block' }}`              |


{{"demo": "pages/system/display/Hiding.js", "defaultCodeOpen": false}}

```jsx
<Box display={{ xs: 'block', md: 'none' }}>
  ocultar em telas maiores que md
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
  esconder em telas menores que md
</Box>
```

## Exibição na impressão

{{"demo": "pages/system/display/Print.js", "defaultCodeOpen": false}}

```jsx
<Box display="block" displayPrint="none">
  Somente tela (Ocultar somente na impressão)
</Box>
<Box display="none" displayPrint="block">
  Somente impressão (somente na tela)
</Box>
```

## Estouro

{{"demo": "pages/system/display/Overflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" overflow="hidden">
  Estouro oculto
</Box>
<Box component="div" overflow="visible">
  Estouro visível
</Box>
```

## Estouro de texto

{{"demo": "pages/system/display/TextOverflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" textOverflow="clip">
  Estouro de texto com corte
</Box>
<Box component="div" textOverflow="ellipsis">
  Estouro de texto com reticências
</Box>
```

## Visibilidade

{{"demo": "pages/system/display/Visibility.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" visibility="visible">
  Visibilidade visível
</Box>
<Box component="div" visibility="hidden">
  Visibilidade oculta
</Box>
```

## Espaço em branco

{{"demo": "pages/system/display/WhiteSpace.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" whiteSpace="nowrap">
  Espaço em branco sem quebra
</Box>
<Box component="div" whiteSpace="normal">
  Espaço em branco normal
</Box>
```

## API

```js
import { display } from '@material-ui/system';
```

| Nome da importação | Propriedade    | Propriedade CSS | Chave do tema |
|:------------------ |:-------------- |:--------------- |:------------- |
| `displayPrint`     | `displayPrint` | `display`       | none          |
| `displayRaw`       | `display`      | `display`       | none          |
| `overflow`         | `overflow`     | `overflow`      | none          |
| `textOverflow`     | `textOverflow` | `text-overflow` | none          |
| `visibility`       | `visibility`   | `visibility`    | none          |
| `whiteSpace`       | `whiteSpace`   | `white-space`   | none          |