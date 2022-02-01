---
title: Componente React para Grupo de botões
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Grupo de botões

<p class="description">O componente ButtonGroup pode ser usado para agrupar botões relacionados.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Grupo de botões básico

Os botões podem ser agrupados envolvendo-os com o componente `ButtonGroup`. Eles precisam ser filhos imediatos.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Variantes de botão

Todas as variantes padrão de botões são suportadas.

{{"demo": "pages/components/button-group/VariantButtonGroup.js"}}

## Tamanhos e cores

As propriedades `size` e `color` podem ser usadas para controlar a aparência do grupo de botões.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Grupo vertical

O grupo de botões pode ser exibido verticalmente usando a propriedade `orientation`.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Botão dividido

`ButtonGroup` também pode ser usado para criar um botão dividido. A lista suspensa pode alterar a ação do botão (como neste exemplo) ou ser usada para acionar imediatamente uma ação relacionada.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Elevação desabilitada

Você pode remover a elevação com a propriedade `disableElevation`.

{{"demo": "pages/components/button-group/DisableElevation.js"}}
