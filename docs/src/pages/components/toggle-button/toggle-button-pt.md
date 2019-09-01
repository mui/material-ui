---
title: Componente React para Botões de Alternância
components: ToggleButton, ToggleButtonGroup
---

# Botões de alternância

<p class="description">Os botões de alternância podem ser usados para agrupar opções relacionadas.</p>

Para enfatizar grupos de [botões de alternância](https://material.io/design/components/buttons.html#toggle-button) relacionados, o grupo deve ter um container em comum.

The `ToggleButtonGroup` will control the selected state of its child buttons when given its own `value` prop.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Tamanhos

Gosta de botões maiores ou menores? Use a propriedade `size`.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Standalone toggle button

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Acessibilidade

ToggleButtonGroup has `role="group"`. You should provide an accessible label with `arial-label="label"`, `aria-labelledby="id"` or `<label>`.

ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.