---
title: Componente React para Acesso Rápido
components: SpeedDial, SpeedDialAction, SpeedDialIcon
---

# Acesso Rápido

<p class="description">Quando pressionado, um botão de ação flutuante pode exibir de três a seis ações relacionadas na forma de um acesso rápido.</p>

Se mais de seis ações forem necessárias, algo diferente de um BAF deve ser usado para apresentá-las.

## Acesso rápido simples

O botão de ação flutuante pode exibir ações relacionadas.

{{"demo": "pages/components/speed-dial/SpeedDials.js"}}

## Ícone de fechamento customizado

Você pode fornecer um ícone alternativo para os estados de aberto e fechado usando as propriedades `icon` e `openIcon` do componente `SpeedDialIcon`.

{{"demo": "pages/components/speed-dial/OpenIconSpeedDial.js"}}

## Sugestões de ação fixadas

Os SpeedDialActions podem exibir dicas de forma fixadas para que os usuários não precisem manter as ações pressionadas para ver a dica nos dispositivos de toque.

A dica é ativada aqui em todos os dispositivos para fins de demonstração, mas em produção pode se usar uma lógica para definir condicionalmente a propriedade `isTouch`.

{{"demo": "pages/components/speed-dial/SpeedDialTooltipOpen.js"}}