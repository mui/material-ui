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

### Exemplo com efeito de pulsação

{{"demo": "pages/components/skeleton/YouTube.js", "defaultCodeOpen": false}}

### Exemplo com efeito de ondas

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

Mas quando se trata de outros componentes, você pode não querer repetir a largura e a altura. Nessas situações, você pode passar componentes como `children`, e ele vai inferir a sua largura e a altura a partir deles.

```jsx
loading
  ? <Skeleton><Avatar /></Skeleton>
  : <Avatar src={data.avatar} />
```

{{"demo": "pages/components/skeleton/SkeletonChildren.js", "defaultCodeOpen": false}}

## Acessibilidade

Telas com Skeleton fornecem uma alternativa aos métodos tradicionais de feedback. Em vez de mostrar um resumo abstrato na tela, telas com skeleton criam uma expectativa do que está por vir, reduzindo a sensação cognitiva do processo de carregamento.

A cor de fundo do skeleton usa uma quantidade menor de luminância para ser visível em boas condições (boa luz ambiente, boa tela, sem deficiência visual).