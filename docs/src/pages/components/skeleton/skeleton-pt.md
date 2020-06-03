---
title: Componente React para Skeleton
components: Skeleton
---

# Skeleton

<p class="description">Exiba uma visualização do espaço reservado de seu conteúdo antes que os dados sejam carregados, reduzindo a sensação de lentidão do tempo de carregamento.</p>

Os dados dos seus componentes podem não estar imediatamente disponíveis. Você pode aumentar o desempenho percebido pelos usuários usando skeletons. Ele passa a sensação de que as coisas estão acontecendo imediatamente, então a informação é mostrada incrementalmente na tela (Cf. [Evite uso de progressos](https://www.lukew.com/ff/entry.asp?1797)).

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

### Pulsate example

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

### Wave example

{{"demo": "pages/components/skeleton/Facebook.js", "defaultCodeOpen": false, "bg": true}}

## Inferindo dimensões

Além de aceitar as propriedades `width` e `height`, o componente também pode inferir as dimensões.

Ele funciona bem quando se trata de tipografia, pois sua altura é definida usando a unidade `em`.

```jsx
<Typography variant="h1">
  {loading ? <Skeleton /> : 'h1'}
</Typography>
```

{{"demo": "pages/components/skeleton/SkeletonTypography.js", "defaultCodeOpen": false}}

Mas quando se trata de outros componentes, você pode não querer repetir a largura e a altura. Nesses casos, você pode passar componentes como `children`, e ele vai inferir a sua largura e a altura a partir deles.

```jsx
loading
  ? <Skeleton><Avatar /></Skeleton>
  : <Avatar src={data.avatar} />
```

{{"demo": "pages/components/skeleton/SkeletonChildren.js", "defaultCodeOpen": false}}

## Acessibilidade

Skeleton screens provide an alternative to the traditional spinner methods. Rather than showing an abstract widget, skeleton screens create anticipation of what is to come and reduce cognitive load.

The background color of the skeleton uses the least amount of luminance to be visible in good conditions (good ambient light, good screen, no visual impairments).