# Exibição

<p class="description">De forma rápida e responsiva alterne o valor de exibição de componentes e faça muito mais com os utilitários de exibição. Inclui suporte para alguns dos valores mais comuns, bem como alguns extras para controlar a exibição durante a impressão.</p>

## Exemplos

### Em linha

{{"demo": "Inline.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="div" sx={{ display: 'inline' }}>inline</Box>
<Box component="div" sx={{ display: 'inline' }}>inline</Box>
```

### Bloco

{{"demo": "Block.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="span" sx={{ display: 'block' }}>block</Box>
<Box component="span" sx={{ display: 'block' }}>block</Box>
```

## Ocultando elementos

Para um desenvolvimento ágil para dispositivos móveis, use classes de exibição responsivas para mostrar e ocultar elementos por dispositivo. Evite criar versões totalmente diferentes do mesmo site, em vez disso, oculte o elemento de forma responsiva para cada tamanho de tela.

| Tamanho da tela | Classe                                                       |
|:--------------- |:------------------------------------------------------------ |
| Oculto em todas | `sx={{ display: 'none' }}`                                   |
| Oculto em xs    | `sx={{ display: { xs: 'none', sm: 'block' } }}`              |
| Oculto em sm    | `sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}` |
| Oculto em md    | `sx={{ display: { xs: 'block', md: 'none', lg: 'block' } }}` |
| Oculto em lg    | `sx={{ display: { xs: 'block', lg: 'none', xl: 'block' } }}` |
| Oculto em xl    | `sx={{ display: { xs: 'block', xl: 'none' } }}`              |
| Visível em xs   | `sx={{ display: { xs: 'block', sm: 'none' } }}`              |
| Visível em sm   | `sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}`  |
| Visível em md   | `sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}`  |
| Visível em lg   | `sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}`  |
| Visível em xl   | `sx={{ display: { xs: 'none', xl: 'block' } }}`              |

{{"demo": "Hiding.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ display: { xs: 'block', md: 'none' }}}>
  oculta em telas maiores que md
</Box>
<Box sx={{ display: { xs: 'none', md: 'block' }}}>
  oculta em telas menores que md
</Box>
```

## Exibição na impressão

{{"demo": "Print.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ display: 'block', displayPrint: 'none' }}>
  Somente tela (Oculta somente em impressão)
</Box>
<Box sx={{ display: 'none', displayPrint: 'block' }}>
  Somente impressão (Oculta somente em tela)
</Box>
```

## Estouro

{{"demo": "Overflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ overflow: 'hidden' }}>
  Estouro oculto
</Box>
<Box component="div" sx={{ overflow: 'visible' }}>
  Estouro visível
</Box>
```

## Estouro de texto

{{"demo": "TextOverflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ textOverflow: 'clip' }}>
  Estouro de texto com corte
</Box>
<Box component="div" sx={{ textOverflow: 'ellipsis' }}>
  Estouro de texto com reticências
</Box>
```

## Visibilidade

{{"demo": "Visibility.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ visibility: 'visible' }}>
  Visibilidade visível
</Box>
<Box component="div" sx={{ visibility: 'hidden' }}>
  Visibilidade oculta
</Box>
```

## Espaço em branco

{{"demo": "WhiteSpace.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ whiteSpace: 'nowrap' }}>
  Espaço em branco sem quebra
</Box>
<Box component="div" sx={{ whiteSpace: 'normal' }}>
  Espaço em branco normal
</Box>
</Box>
<Box component="div" sx={{ whiteSpace: 'normal' }}>
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
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
