---
product: base
title: Unstyled React Badge component
components: BadgeUnstyled
githubLabel: 'component: badge'
packageName: '@mui/base'
---

# Badge sem estilo

<p class="description">The `BadgeUnstyled` component generates a small label that is attached to its children elements.</p>

```js
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
```

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Uso básico

{{"demo": "UnstyledBadge.js", "defaultCodeOpen": false}}

## Visibilidade do badge

You can control the visibility of a `BadgeUnstyled` by using the `invisible` prop. Setting a badge to `invisible` does not actually hide it—instead, this prop adds the `MuiBadge-invisible` class to the badge, which you can target with styles to hide however you prefer:

{{"demo": "BadgeVisibility.js"}}

## Badge númericos

As propriedades a seguir são úteis quando `badgeContent` é um número.

### A propriedade showZero

By default, badges automatically hide when `badgeContent={0}`. You can override this behavior with the `showZero` prop:

{{"demo": "ShowZeroBadge.js"}}

### A propriedade max

You can use the `max` prop to set a maximum value for `badgeContent`. The default is 99.

{{"demo": "BadgeMax.js"}}

## Acessibilidade

Leitores de tela podem não fornecer aos usuários informações suficientes sobre o conteúdo de um emblema. Para tornar o seu `BadgeUnstyled` acessível, você deve fornecer uma descrição completa com a propriedade `aria-label`:

{{"demo": "AccessibleBadges.js", "defaultCodeOpen": false}}
