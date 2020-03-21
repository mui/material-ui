---
title: Componente React para Emblemas
components: Badge
---

# Badge (Emblema)

<p class="description"><code>Badge</code> gera um pequeno emblema no canto superior direito de seu(s) filho(s).</p>

## Basic badges

Exemplos de emblemas contendo texto, usando cores primárias e secundárias. O emblema é aplicado aos seus filhos.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Emblemas Customizados

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Visibilidade do emblema

A visibilidade dos emblemas pode ser controlada usando a propriedade `invisible`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

O emblema se esconde automaticamente quando o badgeContent é zero. Você pode sobrescrever isso com a propriedade `showZero`.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Maximum value

Você pode usar a propriedade `max` para limitar o valor do conteúdo do selo.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot badge

A propriedade `dot` altera um emblema para um pequeno ponto. Isto pode ser usado como uma notificação de que algo mudou sem fornecer uma contagem.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Sobreposição de emblema

Você pode usar a propriedade `overlap` para colocar o emblema em relação ao canto do elemento envolvido.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Alinhamento de emblema

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideToolbar": true}}