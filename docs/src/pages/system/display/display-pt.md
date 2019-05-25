# Display

<p class="description">Quickly and responsively toggle the display value of components and more with our display utilities. Includes support for some of the more common values, as well as some extras for controlling display when printing.</p>

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

## Hiding elements

For faster mobile-friendly development, use responsive display classes for showing and hiding elements by device. Avoid creating entirely different versions of the same site, instead hide element responsively for each screen size.

| Screen Size        | Class                                                |
|:------------------ |:---------------------------------------------------- |
| Hidden on all      | `display="none"`                                     |
| Hidden only on xs  | `display={{ xs: 'none', sm: 'block' }}`              |
| Hidden only on sm  | `display={{ xs: 'block', sm: 'none', md: 'block' }}` |
| Hidden only on md  | `display={{ xs: 'block', md: 'none', lg: 'block' }}` |
| Hidden only on lg  | `display={{ xs: 'block', lg: 'none', xl: 'block' }}` |
| Hidden only on xl  | `display={{ xs: 'block', xl: 'none' }}`              |
| Visible only on xs | `display={{ xs: 'block', sm: 'none' }}`              |
| Visible only on sm | `display={{ xs: 'none', sm: 'block', md: 'none' }}`  |
| Visible only on md | `display={{ xs: 'none', md: 'block', lg: 'none' }}`  |
| Visible only on lg | `display={{ xs: 'none', lg: 'block', xl: 'none' }}`  |
| Visible only on xl | `display={{ xs: 'none', xl: 'block' }}`              |

```jsx
<Box display={{ xs: 'block', md: 'none' }}>
  ocultar em telas maiores que md
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
  esconder em telas menores que md
</Box>
```

{{"demo": "pages/system/display/Hiding.js"}}

## Display in print

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

| Nome da importação | Prop           | Propriedade CSS | Chave do tema |
|:------------------ |:-------------- |:--------------- |:------------- |
| `displayRaw`       | `display`      | `display`       | none          |
| `displayPrint`     | `displayPrint` | `display`       | none          |