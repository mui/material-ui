---
title: Componente React para capturar foco
components: Unstable_TrapFocus
githubLabel: 'component: TrapFocus'
---

# Capturar foco

<p class="description">Capturar foco dentro de um nó DOM.</p>

TrapFocus é um componente que gerencia o foco para seus descendentes. This is useful when implementing overlays such as modal dialogs, which should not allow the focus to escape while open.

When `open={true}` the trap is enabled, and pressing <kbd class="key">Tab</kbd> or <kbd><kbd  class="key">Shift</kbd>+<kbd class="key">Tab</kbd></kbd> will rotate focus within the inner focusable elements of the component.

- 📦 [1.5 kB gzipped](https://material-ui.com/size-snapshot).
- ⚛️ Suporte para portais

[A paleta](/system/palette/) com funções de estilo.

> ⚠️ O componente é experimental e instável.

## Exemplo

{{"demo": "pages/components/trap-focus/BasicTrapFocus.js"}}

## Desabilitar o forçar foco

Cliques dentro do capturar foco se comportam normalmente; mas cliques fora do capturar foco estão bloqueados.

Você pode desativar esse comportamento com a propriedade `disableEnforceFocus`.

{{"demo": "pages/components/trap-focus/DisableEnforceFocus.js"}}

## Ativação tardia

Por padrão, o componente move o foco para seus descendentes assim que abre: `open={true}`.

Você pode desabilitar esse comportamento e deixá-lo de forma tardia com a propriedade  `disableAutoFocus`. Quando o foco automático é desabilitado, como na demonstração abaixo, o componente só captura o foco quando ele for focado.

{{"demo": "pages/components/trap-focus/LazyTrapFocus.js"}}

## Portal

A demonstração a seguir usa o componente [`Portal`](/components/portal/)para renderizar um subconjunto de elementos filhos de captura de foco em uma nova "sub-árvore" fora da atual hierarquia do DOM, para que eles não façam mais parte do ciclo de foco.

{{"demo": "pages/components/trap-focus/PortalTrapFocus.js"}}
