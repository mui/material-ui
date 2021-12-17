---
title: Componente React para Pano de Fundo
components: Backdrop, BackdropUnstyled
githubLabel: 'component: Backdrop'
---

# Backdrop

<p class="description">O componente backdrop (pano de fundo) é usado para fornecer ênfase em um elemento específico ou partes dele.</p>

O backdrop sinaliza para o usuário uma mudança de estado dentro do aplicativo e pode ser usado para criar progressos, diálogos e muito mais. Em seu formato mais simples, o componente backdrop irá adicionar uma camada escurecida sobre seu aplicativo.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Exemplo

{{"demo": "pages/components/backdrop/SimpleBackdrop.js"}}

## Unstyled

O badge também vem com uma versão sem estilo. É ideal para fazer personalizações pesadas e diminuir o tamanho do pacote.

```js
import BackdropUnstyled from '@mui/base/BackdropUnstyled';
```
