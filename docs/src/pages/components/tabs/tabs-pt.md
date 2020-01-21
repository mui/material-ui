---
title: Componente React para Guias
components: Tabs, Tab
---

# Guias

<p class="description">As guias facilitam a exploração e alternam entre diferentes visualizações.</p>

As [guias](https://material.io/design/components/tabs.html) organizam e permitem a navegação entre grupos de conteúdo relacionados e no mesmo nível hierárquico.

## Guias simples

Um exemplo simples sem frescuras.

{{"demo": "pages/components/tabs/SimpleTabs.js", "bg": true}}

### Rótulos com quebras

Os rótulos longos serão quebrados automaticamente nas guias. Se o rótulo for muito longo para a guia, ele irá exceder e o texto não ficará visível.

{{"demo": "pages/components/tabs/TabsWrappedLabel.js", "bg": true}}

### Guia desativada

Uma guia pode ser desabilitada definindo a propriedade `disabled`.

{{"demo": "pages/components/tabs/DisabledTabs.js", "bg": true}}

## Guias fixas

As guias fixas devem ser usadas com um número limitado de guias e quando o posicionamento consistente ajudar a memória muscular.

### Largura total

A propriedade `variant="fullWidth"` deve ser usada em views menores. Esta demo também usa [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) para animar a transição de Guias e permite que estas sejam trocadas ao toque nos dispositivos.

{{"demo": "pages/components/tabs/FullWidthTabs.js", "bg": true}}

### Centralizado

A propriedade `centered` deve ser usada para views maiores.

{{"demo": "pages/components/tabs/CenteredTabs.js", "bg": true}}

## Guias roláveis

### Botões de rolagem automáticos

Botões de rolagem para a esquerda e para a direita serão automaticamente apresentados em visualizações desktop e ocultos em móveis. (com base na largura da janela de visualização)

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js", "bg": true}}

### Botões de rolagem forçados

Botões de rolagem para esquerda e direita serão apresentados independente da largura de exibição do dispositivo.

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js", "bg": true}}

### Impedir botões de rolagem

Botões de rolagem para a esquerda e para a direita nunca serão apresentados. Toda rolagem deve ser iniciada por meio de mecanismos de rolagem do agente do usuário (por exemplo, deslizar para a esquerda/direita, rolar scroll do mouse, etc.)

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js", "bg": true}}

## Guias customizadas

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/tabs/CustomizedTabs.js", "bg": true}}

👑 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/components/tabs).

## Guias verticais

{{"demo": "pages/components/tabs/VerticalTabs.js", "bg": true}}

## Guias de navegação

Por padrão, as guias usam um elemento `button`, mas você pode fornecer sua própria tag personalizada ou componente. Veja um exemplo de implementação da navegação por guias:

{{"demo": "pages/components/tabs/NavTabs.js", "bg": true}}

## Guias com ícones

O rótulo das guias podem ser compostos apenas por ícones ou apenas por texto.

{{"demo": "pages/components/tabs/IconTabs.js", "bg": true}}

{{"demo": "pages/components/tabs/IconLabelTabs.js", "bg": true}}