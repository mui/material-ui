---
title: React ButtonGroup component
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Grupo de botões

<p class="description">O componente ButtonGroup pode ser usado para agrupar botões relacionados.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Grupo de botões básico

The standard Button variants are supported.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Tamanhos e cores

The `size` and `color` props can be used to control the appearance of the ButtonGroup.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Grupo vertical

The ButtonGroup can be displayed veritcally using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Botão dividido

`ButtonGroup` também pode ser usado para criar um botão dividido. A lista suspensa pode alterar a ação do botão (como neste exemplo), ou ser usada para acionar imediatamente uma ação relacionada.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Elevação desabilitada

Você pode remover a elevação com a propriedade `disableElevation`.

{{"demo": "pages/components/button-group/DisableElevation.js"}}
