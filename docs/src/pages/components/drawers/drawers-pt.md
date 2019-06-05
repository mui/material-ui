---
title: Componente React para Drawer
components: Drawer, SwipeableDrawer
---

# Drawer

<p class="description">A navegação por drawers fornece acessos para destinos dentro de sua aplicação. As folhas laterais são locais contendo o conteúdo suplementar que é ancorado do lado esquerdo ou direito da tela.</p>

[Navegação por drawers](https://material.io/design/components/navigation-drawer.html) dá acesso a destinos e funcionalidades do aplicativo, como por exemplo, a mudança de usuário. Eles podem estar permanentemente na tela ou controlados por um ícone de menu de navegação.

[Folhas laterais](https://material.io/design/components/sheets-side.html) são superfícies complementares usadas principalmente em tablets e computadores.

## Drawer temporário

Drawers de navegação temporária podem alternar entre aberto ou fechado. Por padrão fechado, o drawer abre temporariamente acima de todo o conteúdo até que uma seção seja selecionada.

O Drawer pode ser cancelado clicando fora de seu conteúdo ou pressionando a tecla Esc. Fecha quando um item é selecionado, ou manipulado pela propriedade `open`.

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

## Drawer temporário deslizável (Swipeable)

Voê pode fazer um drawer deslizável (swipeable) com o componente `SwipeableDrawer`.

Este componente vem sobrecarregado com 2 kB gzipped de utilidades. Alguns dispositivos móveis de baixo custo podem não ser capazes de seguir os dedos a 60 FPS. Você pode usar a propriedade `disableBackdropTransition` para ajudar.

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

Estamos usando o seguinte conjunto de propriedades nesta documentação para otimizar a usabilidade do componente: - o iOS é hospedado em dispositivos de última geração. Podemos ativar a transição backdrop sem perder quadros. O desempenho será suficientemente bom. - iOS tem um recurso "deslize para voltar" que bagunça com o recurso de descoberta. Tivemos que desativá-lo.

```jsx
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />
```

## Drawer responsivo

O componente responsivo `Hidden` auxilia na exibição de diferentes tipos de drawer, dependendo da largura da tela. Um drawer `temporary` é exibido para telas pequenas enquanto um drawer `permanent` é exibido para telas maiores.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Drawer persistente

Drawers de navegação persistente podem alternar entre aberto ou fechado. O drawer, quando exibido, fica no mesmo plano (superfície) que o conteúdo. Ele é fechado por padrão e aberto quando selecionado por um ícone de menu e permanecendo aberto até ser fechado pelo usuário. O estado do drawer é lembrado de ação para ação e de sessão para sessão.

Quando o drawer está fora da grade da página e se abre, o drawer força o outro conteúdo a alterar o tamanho e a adaptar-se à janela de visualização (viewport).

Drawers de navegação persistente são aceitáveis para todos os tamanhos maiores que os móveis (mobile). Eles não são recomendados para aplicativos com vários níveis de hierarquia que exigem o uso de uma seta para navegação.

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Mini variant drawer

Nesta variação, o drawer de navegação persistente muda sua largura. Seu estado de recolhido é como um mini-drawer no mesmo plano de elevação do conteúdo, recortado pela barra de aplicativos. Quando expandido, ele aparece da forma padrão de um drawer de navegação persistente.

A mini variação é recomendada para seções de aplicativos que necessitam ser selecionadas por um acesso rápido ao lado do conteúdo.

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Drawer permanente

Drawers de navegação permanente são sempre visíveis e fixados na borda esquerda, no mesmo plano de elevação do conteúdo ou plano de fundo. Eles não podem ser fechados.

Drawers de navegação permanente são **recomendados por padrão para aplicações desktop**.

### Navegação em altura cheia

Aplicativos focados no consumo de informações que usam uma hierarquia da esquerda para a direita.

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### Cortado sob a barra de aplicativos

Aplicativos focados em produtividade que exigem consistência na tela.

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}