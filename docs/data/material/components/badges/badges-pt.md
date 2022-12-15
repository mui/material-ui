---
product: material-ui
title: Componente React para emblemas
components: Badge
githubLabel: 'component: badge'
unstyled: /base/react-badge/
---

# Emblema

<p class="description">O componente <code>Badge</code> gera um pequeno emblema no canto superior direito de seu(s) filho(s).</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Emblemas básicos

Exemplos de emblemas contendo texto, usando cores primárias e secundárias. O emblema é aplicado aos seus filhos.

{{"demo": "SimpleBadge.js"}}

## Emblemas customizados

Você pode usar a propriedade `overlap` para colocar o emblema em relação ao canto do elemento envolvido.

{{"demo": "ColorBadge.js"}}

## Visibilidade do emblema

Aqui está um exemplo de customização do componente. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedBadges.js"}}

## Visibilidade do emblema

A visibilidade dos emblemas pode ser controlada usando a propriedade `invisible`.

{{"demo": "BadgeVisibility.js"}}

The badge hides automatically when `badgeContent` is zero. Você pode sobrescrever isso com a propriedade `showZero`.

{{"demo": "ShowZeroBadge.js"}}

## Valor máximo

Você pode usar a propriedade `max` para limitar o valor do conteúdo do emblema.

{{"demo": "BadgeMax.js"}}

## Emblema como ponto

A propriedade `dot` altera um emblema para um pequeno ponto. Isto pode ser usado como uma notificação de que algo mudou sem fornecer uma contagem.

{{"demo": "DotBadge.js"}}

## Alinhamento do emblema

Você pode usar a propriedade `overlap` para colocar o emblema em relação ao canto do elemento envolvido.

{{"demo": "BadgeOverlap.js"}}

## Alinhamento do emblema

Você pode usar a propriedade `anchorOrigin` para mover o emblema para qualquer canto do elemento envolvido.

{{"demo": "BadgeAlignment.js", "hideToolbar": true}}

## Accessibility

You can't rely on the content of the badge to be announced correctly. You should provide a full description, for instance, with `aria-label`:

{{"demo": "AccessibleBadges.js"}}
