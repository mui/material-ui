---
title: React Speed Dial component
components: SpeedDial, SpeedDialAction, SpeedDialIcon
githubLabel: 'component: SpeedDial'
0: 'https://material.io/components/buttons-floating-action-button#types-of-transitions'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#menubutton'
---

# Acesso Rápido

<p class="description">Quando pressionado, um botão de ação flutuante pode exibir de três a seis ações relacionadas na forma de um acesso rápido.</p>

Se mais de seis ações forem necessárias, algo diferente de um BAF deve ser usado para apresentá-las.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Acesso rápido simples

O botão de ação flutuante pode exibir ações relacionadas.

{{"demo": "pages/components/speed-dial/BasicSpeedDial.js"}}

## Ícone de fechamento customizado

Você pode fornecer um ícone alternativo para os estados de aberto e fechado usando as propriedades `icon` e `openIcon` do componente `SpeedDialIcon`.

Os SpeedDialActions podem exibir dicas de forma fixadas para que os usuários não precisem manter as ações pressionadas para ver a dica nos dispositivos de toque.

## Ícone de fechamento customizado

Você pode fornecer um ícone alternativo para os estados de aberto e fechado usando as propriedades `icon` e `openIcon` do componente `SpeedDialIcon`.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## Dicas de ação fixadas

The SpeedDialActions tooltips can be displayed persistently so that users don't have to long-press in order to see the tooltip on touch devices.

It is enabled here across all devices for demo purposes, but in production it could use the `isTouch` logic to conditionally set the prop.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}

## Acessibilidade

### ARIA

#### Required

- You should provide an `ariaLabel` for the speed dial component.
- You should provide a `tooltipTitle` for each speed dial action.

#### Provided

- The Fab has `aria-haspopup`, `aria-expanded` and `aria-controls` attributes.
- The speed dial actions container has `role="menu"` and `aria-orientation` set acccording to the direction.
- The speed dial actions have `role="menuitem"`, and an `aria-describedby` attribute that references the associated tooltip.

### Teclado

- The speed dial opens on focus.
- The Space and Enter keys trigger the selected speed dial action, and toggle the speed dial open state.
- The cursor keys move focus to the next or previous speed dial action. (Note that any cursor direction can be used initially to open the speed dial. This enables the expected behavior for the actual or percieved orientation of the speed dial, for example for a screen reader user who percieves the speed dial as a drop-down menu.)
- The Escape key closes the speed dial and, if a speed dial action was focused, returns focus to the Fab.
