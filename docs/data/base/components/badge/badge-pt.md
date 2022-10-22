---
product: base
title: Componente e Hook do React Badge não estilizado
components: BadgeUnstyled
githubLabel: 'component: badge'
---

# Badge não estilizado

<p class="description">O componente BadgeUnstyled gera uma pequena label que é anexada ao seu(s) elemento(s) filho(s).</p>

## Introdução

Um emblema é um pequeno descritor para elementos de UI. Normalmente posicionado próximo de um elemento indicando o estado do elemento exibindo número, ícone ou qualquer pequeno conjunto de caracteres.

O componente `BadgeUnstyled` cria um emblema que é aplicado ao elemento filho.

{{"demo": "UnstyledBadgeIntroduction.tsx", "defaultCodeOpen": false, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Componente

### Uso

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import BadgeUnstyled from '@mui/base/BadgeUnstyled';

export default function MyApp() {
  return (
    <BadgeUnstyled>{/* o elemento ao qual o emblema será vinculado */}</BadgeUnstyled>
  );
}
```

### Básico

`BadgeUnstyled` wraps around the UI element that it's attached to. For instance, if the badge indicates the number of emails in an inbox, then the component will be structured like this:

```jsx
<BadgeUnstyled>
  <MailIcon />
</BadgeUnstyled>
```

### Anatomia

The `BadgeUnstyled` component is composed of a root `<span>` that houses the element that the badge is attached to, followed by a `<span>` slot to represent the badge itself:

```html
<span class="BaseBadge-root">
  <!-- o elemento ao qual o emblema está vinculado é aninhado aqui -->
  <span class="BaseBadge-badge">badge content</span>
</span>
```

### Propriedades slot

:::info The following props are available on all non-utility Base components. See [Usage](/base/getting-started/usage/) for full details. :::

Use the `component` prop to override the root slot with a custom element:

```jsx
<BadgeUnstyled component="div" />
```

Use the `slots` prop to override any interior slots in addition to the root:

```jsx
<BadgeUnstyled slots={{ root: 'div', badge: 'div' }} />
```

:::warning If the root element is customized with both the `component` and `slots` props, then `component` will take precedence. :::

Use the `slotProps` prop to pass custom props to internal slots. The following code snippet applies a CSS class called `my-badge` to the badge slot:

```jsx
<BadgeUnstyled slotProps={{ badge: { className: 'my-badge' } }} />
```

## Hook

```jsx
import { useBadge } from '@mui/base/BadgeUnstyled';
```

O hook `useBadge` permite aplicar a funcionalidade de `BadgeUnstyled` para um componente totalmente customizado. Ele retorna propriedades para serem colocadas no componente customizado, com campos que representam o estado interno do componente.

Hooks _não_ suportam [propriedades slot](#slot-props), mas eles suportam [propriedades customizadas](#customization).

:::info Hooks lhe darão maior flexibilidade para customização, porém requerem mais trabalho para implementar. Com hooks, você pode assumir total controle sobre como o seu componente é renderizado e definir todas as propriedades customizadas e classes CSS que você precisa.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy). :::

## Customização

:::info
As seguintes características podem ser usadas com componentes e hooks.
Por uma questão de simplicidade, demonstrações e trechos de código apresentam as funcionalidades principais do componente.
:::

### Conteúdo do emblema

A propriedade `badgeContent` define o conteúdo que é exibido dentro do badge. Quando este conteúdo é um número, existem propriedades adicionais que você pode usar para personalizar ainda mais — veja a [seção de badges numéricos](#numerical-badges) abaixo.

A demonstração a seguir mostra como criar e estilizar um badge numérico típico anexado a um elemento do tipo "box" genérico:

{{"demo": "UnstyledBadge.js", "defaultCodeOpen": false}}

### Visibilidade do badge

Você pode controlar a visibilidade de um badge usando a propriedade `invisible`. Definir um badge para `invisible`, na verdade, não esconde — em vez disso, esta propriedade adiciona a classe `BaseBadge-invisible` no badge, que você pode direcionar com estilos para esconder como preferir:

{{"demo": "BadgeVisibility.js"}}

### Badges numéricos

As propriedades a seguir são úteis quando `badgeContent` é um número.

#### A propriedade showZero

Por padrão, os badges se escondem automaticamente quando `badgeContent={0}`. Você pode sobrescrever esse comportamento com a propriedade `showZero`.

{{"demo": "ShowZeroBadge.js"}}

#### A propriedade max

Você pode usar a propriedade `max` para definir um valor máximo para `badgeContent`. O padrão é 99.

{{"demo": "BadgeMax.js"}}

## Acessibilidade

Leitores de tela podem não fornecer aos usuários informações suficientes sobre o conteúdo de um badge. Para tornar seu badge acessível, você deve fornecer uma descrição completa com `aria-label`, como mostrado na demonstração abaixo:

{{"demo": "AccessibleBadges.js"}}
