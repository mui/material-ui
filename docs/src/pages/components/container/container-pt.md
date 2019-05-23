---
title: Componente React para Container
components: Container
---

# Container

<p class="description">O container centraliza seu conteúdo horizontalmente. É o elemento de leiaute mais básico.</p>

Enquanto os containers podem ser aninhados, a maioria dos leiautes não necessitam de um container aninhado.

## Fluído

A largura de um container fluído é limitada pelo valor da propriedade `maxWidth`.

```jsx
<Container maxWidth="sm">
```

{{"demo": "pages/components/container/SimpleContainer.js", "iframe": true}}

## Fixo

Se você preferir projetar um conjunto fixo de tamanhos em vez de tentar acomodar em uma visualização totalmente fluída, você pode definir a propriedade `fixed`. A largura máxima corresponde à largura mínima do ponto de interrupção atual.

```jsx
<Container fixed>
```

{{"demo": "pages/components/container/FixedContainer.js", "iframe": true}}