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

O componente suporta 3 variantes de forma.

{{"demo": "pages/components/skeleton/Variants.js"}}

## Animações

Por padrão, o skeleton pulsa, mas você pode mudar a animação para uma onda ou desativá-la completamente.

{{"demo": "pages/components/skeleton/Animations.js"}}

## Exemplo YouTube

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

## Exemplo Facebook

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}

## Inferring dimensions

In addition to accepting `width` and `height` props, the component can also infer the dimensions.

It works well when it comes to typography as its height is set using `em` units.

```jsx
<Typography variant="h1">
  {loading ? <Skeleton /> : 'h1'}
</Typography>
```

{{"demo": "pages/components/skeleton/SkeletonTypography.js", "defaultCodeOpen": false}}

But when it comes to other components, you may not want to repeat the width and height. In these instances, you can pass `children` and it will infer its width and height from them.

```jsx
loading
  ? <Skeleton><Avatar /></Skeleton>
  : <Avatar src={data.avatar} />
```

{{"demo": "pages/components/skeleton/SkeletonChildren.js", "defaultCodeOpen": false}}