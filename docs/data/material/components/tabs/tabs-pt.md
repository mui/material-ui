---
product: material-ui
title: Componente React Abas
components: Tabs, Tab, TabScrollButton, TabContext, TabList, TabPanel, TabsUnstyled, TabUnstyled, TabPanelUnstyled, TabsListUnstyled
githubLabel: 'component: tabs'
materialDesign: https://m2.material.io/components/tabs
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
unstyled: /base/react-tabs/
---

# Abas

<p class="description">As abas facilitam a exploração e alternam entre diferentes visualizações.</p>

As [abas](https://m2.material.io/design/components/tabs.html) organizam e permitem a navegação entre grupos de conteúdo relacionados e no mesmo nível hierárquico.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Abas simples

Um exemplo básico com painéis de guias.

{{"demo": "BasicTabs.js"}}

## API experimental

`@mui/lab` offers utility components that inject props to implement accessible tabs following [WAI-ARIA authoring practices](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

{{"demo": "LabTabs.js"}}

## Rótulos com quebras

Long labels will automatically wrap on tabs. If the label is too long for the tab, it will overflow, and the text will not be visible.

{{"demo": "TabsWrappedLabel.js"}}

## Abas coloridas

{{"demo": "ColorTabs.js"}}

## Aba desativada

A tab can be disabled by setting the `disabled` prop.

{{"demo": "DisabledTabs.js"}}

## Abas fixas

Fixed tabs should be used with a limited number of tabs, and when a consistent placement will aid muscle memory.

### Largura total

A propriedade `variant="fullWidth"` deve ser usada em telas menores. Esta demo também usa [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) para animar a transição das abas e permite que estas sejam trocadas em dispositivos que permitem o toque.

{{"demo": "FullWidthTabs.js", "bg": true}}

### Centralizado

A propriedade `centered` deve ser usada para telas maiores.

{{"demo": "CenteredTabs.js", "bg": true}}

## Abas roláveis

### Botões de rolagem automáticos

Botões de rolagem para a esquerda e para a direita serão automaticamente apresentados em visualizações desktop e ocultos em móveis. (com base na largura da janela de visualização)

{{"demo": "ScrollableTabsButtonAuto.js", "bg": true}}

### Botões de rolagem forçados

Botões de rolagem esquerda e direita são apresentados (espaço reserva) independente da largura de exibição com `scrollButtons={true}` `allowScrollButtonsMobile`:

{{"demo": "ScrollableTabsButtonForce.js", "bg": true}}

Se você quiser certificar-se de que os botões são sempre visíveis, você deve customizar a opacidade.

```css
.MuiTabs-scrollButtons.Mui-disabled {
  opacity: 0.3;
}
```

{{"demo": "ScrollableTabsButtonVisible.js", "bg": true}}

### Impedir botões de rolagem

Botões de rolagem da esquerda e direita nunca serão apresentados com `scrollButtons={false}`. All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift mouse wheel, etc.)

{{"demo": "ScrollableTabsButtonPrevent.js", "bg": true}}

## Abas customizadas

Aqui está um exemplo de customização do componente. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedTabs.js"}}

🎨 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/styles/tabs/).

## Abas verticais

O rótulo das abas podem ser compostos apenas por ícones ou apenas por texto.

{{"demo": "VerticalTabs.js", "bg": true}}

Note que você pode restaurar a barra de rolagem com `visibleScrollbar`.

## Guias de navegação

Por padrão, as guias usam um elemento `botão`, mas você pode fornecer sua tag ou componente personalizado. Veja um exemplo de implementação da navegação por abas:

{{"demo": "NavTabs.js"}}

## Abas com ícones

O rótulo das abas podem ser compostos apenas por ícones ou apenas por texto.

{{"demo": "IconTabs.js"}}

{{"demo": "IconLabelTabs.js"}}

## Biblioteca de roteamento de terceiros

By default, the icon is positioned at the `top` of a tab. Other supported positions are `start`, `end`, `bottom`.

{{"demo": "IconPositionTabs.js"}}

## Acessibilidade

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. O componente `Aba` fornece o `componente` prop para lidar com este caso de uso. Here is a [more detailed guide](/material-ui/guides/routing/#tabs).

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

As etapas a seguir são necessárias para fornecer a informação coerente para as tecnologias assistivas:

1. Rotule o componente `Tabs` com `aria-label` ou `aria-labelledby`.
2. Para os componentes `Tab`, precisam estar conectados com seu correspondente `[role="tabpanel"]` definindo o correto `id`, `aria-controls` e `aria-labelledby`.

Um exemplo para a implementação atual pode ser encontrado nas demonstrações desta página. Nós também publicamos [uma API experimental](#experimental-api) no pacote `@material-ui/lab` que não requer nenhum trabalho extra.

### Navegação por teclado

Os componentes implementam a navegação do teclado usando o comportamento de "ativação manual". Se você quiser mudar para o comportamento "seleção segue automaticamente o foco" você deve definir `selectionFollowsFocus` no componente `Tabs`. The WAI-ARIA authoring practices have a detailed guide on [how to decide when to make selection automatically follow focus](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#x6-4-deciding-when-to-make-selection-automatically-follow-focus).

#### Demonstração

As duas demonstrações seguintes diferem apenas no seu comportamento de navegação por teclado. Focus a tab and navigate with arrow keys to notice the difference, e.g. <kbd class="key">Arrow Left</kbd>.

```jsx
/* Abas onde a seleção segue o foco */
<Tabs selectionFollowsFocus />
```

{{"demo": "AccessibleTabs1.js", "defaultCodeOpen": false}}

```jsx
/* Tabs where each tab needs to be selected manually */
<Tabs />
```

{{"demo": "AccessibleTabs2.js", "defaultCodeOpen": false}}
