---
title: Componente React para Emblemas
components: Badge
---

# Emblemas

<p class="description"><code>Badge</code> gera um pequeno emblema no canto superior direito de seu(s) filho(s).</p>

## Emblemas Simples

Exemplos de emblemas contendo texto, usando cores primárias e secundárias. O emblema é aplicado aos seus filhos.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Valor Máximo

Você pode usar a propriedade `max` para limitar o valor do conteúdo do selo.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Emblema com Ponto

A propriedade `dot` altera um emblema para um pequeno ponto. Isto pode ser usado como uma notificação de que algo mudou sem fornecer uma contagem.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Visibilidade do Emblema

A visibilidade dos emblemas pode ser controlada usando a propriedade `invisible`.

O emblema se esconde automaticamente quando o badgeContent é zero. Você pode sobrescrever isso com a propriedade `showZero`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Emblemas Customizados

Aqui esta um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}