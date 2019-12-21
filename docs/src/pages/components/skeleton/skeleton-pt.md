---
title: Componente React para Skeleton
components: Skeleton
---

# Skeleton

<p class="description">Exiba uma visualização do espaço reservado de seu conteúdo antes que os dados sejam carregados, reduzindo a sensação de lentidão do tempo de carregamento.</p>

Os dados dos seus componentes podem não estar imediatamente disponíveis. Você pode aumentar o desempenho percebido pelos usuários usando esqueletos. Ele passa a sensação de que as coisas estão acontecendo imediatamente, então a informação é mostrada incrementalmente na tela (Cf. [Evite uso de progressos](https://www.lukew.com/ff/entry.asp?1797)).

O componente é projetado para ser usado **diretamente em seus componentes**. Por exemplo:

```jsx
{item ? (
  <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
) : (
  <Skeleton variant="rect" width={210} height={118} />
)}
```

## Variantes

The component supports 3 variants.

{{"demo": "pages/components/skeleton/Variants.js"}}

## Exemplo YouTube

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

## Exemplo Facebook

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}