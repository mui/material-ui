# Sombras

<p class="description">Adicione ou remova sombras dos elementos usando os utilitários box-shadow.</p>

## Exemplo

The helpers allow you to control relative depth, or distance, between two surfaces along the z-axis. By default, there is 25 elevation levels.

{{"demo": "pages/system/shadows/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box boxShadow={0}>…
<Box boxShadow={1}>…
<Box boxShadow={2}>…
<Box boxShadow={3}>…
```

## API

```js
import { shadows } from '@material-ui/system';
```

| Nome da importação | Prop        | Propriedade CSS | Chave do tema |
|:------------------ |:----------- |:--------------- |:------------- |
| `boxShadow`        | `boxShadow` | `box-shadow`    | `shadows`     |