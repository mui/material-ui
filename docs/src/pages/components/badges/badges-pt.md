---
title: Componente React para Emblemas
components: Badge
---

# Emblemas

<p class="description"><code>Badge</code> gera um pequeno emblema no canto superior direito de seu(s) filho(s).</p>

## Emblemas Simples

Exemplos de emblemas contendo texto, usando cores primárias e secundárias. O emblema é aplicado em seus filhos.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Valor Máximo

Você pode usar a propriedade `max` para limitar o valor do conteúdo do selo.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Emblema com Ponto

A propriedade `dot` altera o emblema para um pequeno ponto. Isso pode ser usado como uma notificação de que algo mudou sem dar muita enfase.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Visibilidade do Emblema

A visibilidade dos emblemas pode ser controlada usando a propriedade `invisible`.

O emblema se esconde quando a propriedade `badgeContent` é zero. Caso queira que o emblema seja exibido mesmo quando `badgeContent` seja zero, utilize a propriedade `showZero`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Emblemas Customizados

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}