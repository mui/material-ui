# Exibição

<p class="description">Rapidamente e responsivamente alterne o valor de exibição de componentes e muito mais com nossos utilitários de exibição. Inclui suporte para alguns dos valores mais comuns, bem como alguns extras para controlar a exibição durante a impressão.</p>

## Exemplos

```jsx
<Box component="div" display="inline">inline</Box>
<Box component="div" display="inline">inline</Box>
```

{{"demo": "pages/system/display/Inline.js"}}

```jsx
<Box component="span" display="block">block</Box>
<Box component="span" display="block">block</Box>
```

{{"demo": "pages/system/display/Block.js"}}

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

```jsx
<Box display={{ xs: 'block', md: 'none' }}>
  ocultar em telas maiores que md
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
  esconder em telas menores que md
</Box>
```

{{"demo": "pages/system/display/Hiding.js"}}

## Exibição na impressão

```jsx
<Box display="block" displayPrint="none">
  Somente tela (Ocultar somente na impressão)
</Box>
<Box display="none" displayPrint="block">
  Somente impressão (somente na tela)
</Box>
```

{{"demo": "pages/system/display/Print.js"}}

## API

```js
import { display } from '@material-ui/system';
```

| Nome da importação | Propriedade    | Propriedade CSS | Chave do tema |
|:------------------ |:-------------- |:--------------- |:------------- |
| `displayRaw`       | `display`      | `display`       | none          |
| `displayPrint`     | `displayPrint` | `display`       | none          |