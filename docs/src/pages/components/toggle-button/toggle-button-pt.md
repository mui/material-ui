---
title: Componente React para Botões de Alternância
components: ToggleButton, ToggleButtonGroup
---

# Botões de alternância

<p class="description">Os botões de alternância podem ser usados para agrupar opções relacionadas.</p>

Para enfatizar grupos de [botões de alternância](https://material.io/design/components/buttons.html#toggle-button) relacionados, o grupo deve ter um container em comum.

O `ToggleButtonGroup` controlará o estado selecionado de seus botões filhos quando receber sua propriedade `value`.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Tamanhos

Gosta de botões maiores ou menores? Use a propriedade `size`.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Botão de alternância autônomo

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Botão de alternância customizado

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Acessibilidade

ToggleButtonGroup possui `role="group"`. Você deve fornecer um rótulo acessível com `arial-label="label"`, `aria-labelledby="id"` ou `<label>`.

ToggleButton define `aria-pressed="<bool>"` de acordo com o estado do botão. Você deve rotular cada botão com `aria-label`.