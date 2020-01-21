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

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Maximum value

You can use the `max` property to cap the value of the badge content.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot badge

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Sobreposição de emblema

You can use the `overlap` property to place the badge relative to the corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Alinhamento de emblema

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideHeader": true}}