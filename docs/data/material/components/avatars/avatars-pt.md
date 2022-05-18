---
product: material-ui
title: Componente para Avatares
components: Avatar, AvatarGroup, Badge
githubLabel: 'component: avatar'
---

# Avatar

<p class="description">Os avatares são encontrados ao longo do material design, com usos em tudo, desde tabelas até menus de diálogo.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Avatares com imagens

Avatares com imagem podem ser criados utilizando as propriedades padrões `img`, `src` ou `srcSet` do componente.

{{"demo": "ImageAvatars.js"}}

## Avatares com letras

Avatares com letras podem ser criados passando sua string como `children`.

{{"demo": "LetterAvatars.js"}}

You can use different background colors for the avatar. The following demo generates the color based on the name of the person.

{{"demo": "BackgroundLetterAvatars.js"}}

## Tamanhos

Você pode alterar o tamanho do avatar com as propriedades CSS `height` e `width`.

{{"demo": "SizeAvatars.js"}}

## Avatares com ícones

Avatares com ícones são criados passando o ícone como `children`.

{{"demo": "IconAvatars.js"}}

## Variantes

Se você precisa de avatares com cantos quadrados ou arredondados, use a propriedade `variant`.

{{"demo": "VariantAvatars.js"}}

## Contingências (Fallbacks)

Se houver um erro ao carregar a imagem do avatar, o componente escolhe uma alternativa na seguinte ordem:

- o componente children fornecido
- a primeira letra do texto `alt`
- um ícone genérico de avatar

{{"demo": "FallbackAvatars.js"}}

## Agrupamento

`AvatarGroup` renders its children as a stack. Use the `max` prop to limit the number of avatars.

{{"demo": "GroupAvatars.js"}}

### Total avatars

If you need to control the total number of avatars not shown, you can use the `total` prop.

{{"demo": "TotalAvatars.js"}}

## Com emblema

{{"demo": "BadgeAvatars.js"}}
